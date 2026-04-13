import { request } from "../../lib/axios/client";
import { writeSession } from "../../shared/auth/session";

const normalizeName = (name = "") => {
  const trimmed = String(name).trim();
  if (!trimmed) {
    return { firstName: "", lastName: "" };
  }

  const [firstName, ...rest] = trimmed.split(/\s+/);
  return {
    firstName,
    lastName: rest.join(" ") || "User",
  };
};

export const signupCustomer = async (payload) => {
  const { firstName, lastName } = normalizeName(payload.name);
  return request({
    url: "/auth/signup",
    method: "POST",
    data: {
      firstName,
      lastName,
      email: payload.email,
      password: payload.password,
      phone: payload.phone || "",
    },
  });
};

export const loginCustomer = async (payload) => {
  let authData;

  try {
    authData = await request({
      url: "/auth/customer-login",
      method: "POST",
      data: payload,
    });
  } catch {
    authData = await request({
      url: "/auth/login",
      method: "POST",
      data: payload,
    });
  }

  if (authData?.token && authData?.user) {
    writeSession({
      token: authData.token,
      refreshToken: authData.refreshToken,
      user: authData.user,
    });
  }

  return authData;
};

export const submitEligibilityCheck = (payload) => {
  return request({
    url: "/public/eligibility-check",
    method: "POST",
    data: payload,
  });
};

export const submitContactForm = (payload) => {
  return request({
    url: "/public/contact",
    method: "POST",
    data: payload,
  });
};

export const submitVisaApplication = (payload) => {
  return request({
    url: "/public/applications",
    method: "POST",
    data: payload,
  });
};

export const getVisaTypeContentBySlug = (countrySlug, visaTypeSlug) => {
  return request({
    url: `/visa-types/${encodeURIComponent(countrySlug)}/${encodeURIComponent(visaTypeSlug)}`,
    method: "GET",
  });
};

export const getUserProfile = () => {
  return request({
    url: "/user/profile",
    method: "GET",
  });
};

export const updateUserProfile = (payload) => {
  return request({
    url: "/user/profile",
    method: "PATCH",
    data: payload,
  });
};

export const getUserApplications = (params) => {
  return request({
    url: "/user/applications",
    method: "GET",
    params,
  });
};

export const getUserApplicationById = (id) => {
  return request({
    url: `/user/applications/${id}`,
    method: "GET",
  });
};

export const getUserDocuments = (params) => {
  return request({
    url: "/user/documents",
    method: "GET",
    params,
  });
};

export const uploadUserDocument = (formData) => {
  return request({
    url: "/user/documents",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getUserPayments = (params) => {
  return request({
    url: "/user/payments",
    method: "GET",
    params,
  });
};

export const getUserAppointments = (params) => {
  return request({
    url: "/user/appointments",
    method: "GET",
    params,
  });
};
