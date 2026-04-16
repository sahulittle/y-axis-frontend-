import { request } from "../../lib/axios/client";
import { writeSession } from "../../shared/auth/session";

const normalizeName = (name = "") => {
  const trimmed = String(name).trim();
  if (!trimmed) {
    return { firstName: "", lastName: "" };
  }

  const [firstName, ...rest] = trimmed.split(/\s+/);
  const safeFirstName = firstName.length >= 2 ? firstName : "User";
  const joinedLastName = rest.join(" ").trim();
  const safeLastName = joinedLastName.length >= 2 ? joinedLastName : "User";

  return {
    firstName: safeFirstName,
    lastName: safeLastName,
  };
};

const parseJsonSafe = (value, fallback = {}) => {
  if (!value || typeof value !== "string") {
    return fallback;
  }

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const toBoolean = (value) => {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "number") {
    return value === 1;
  }

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    return normalized === "true" || normalized === "1" || normalized === "yes";
  }

  return false;
};

const buildLegacyApplicationPayload = (payload) => {
  const isFormDataPayload = typeof FormData !== "undefined" && payload instanceof FormData;

  if (!isFormDataPayload) {
    return payload;
  }

  const applicantDetails = parseJsonSafe(payload.get("applicantDetails"), {});
  const customFields =
    applicantDetails && typeof applicantDetails.customFields === "object" && applicantDetails.customFields !== null
      ? applicantDetails.customFields
      : {};

  const fullName = String(payload.get("fullName") || "").trim();
  const fromFullName = normalizeName(fullName);

  const firstName = String(applicantDetails.firstName || "").trim() || fromFullName.firstName || "User";
  const lastName = String(applicantDetails.lastName || "").trim() || fromFullName.lastName || "User";

  const legacyPayload = {
    country: String(payload.get("country") || payload.get("countrySlug") || "").trim(),
    visaType: String(payload.get("visaType") || payload.get("visaTypeSlug") || "").trim(),
    firstName,
    lastName,
    email: String(applicantDetails.email || payload.get("email") || "").trim(),
    phone: String(applicantDetails.phone || payload.get("phone") || "").trim(),
    nationality: String(applicantDetails.nationality || payload.get("nationality") || "").trim(),
    passport: {
      passportNumber: String(applicantDetails.passportNumber || customFields.passportType || "").trim(),
    },
    travelProfile: {
      priorRefusal: toBoolean(customFields.priorRefusal),
      refusalDetails: String(customFields.refusalDetails || "").trim(),
      previousTravelCountries: [],
      previousVisaHistory: [],
    },
    occupation: String(customFields.occupation || "").trim(),
    uploadedFileRefs: [],
    consentAccepted: toBoolean(payload.get("consentAccepted")),
    disclaimerAccepted: toBoolean(payload.get("disclaimerAccepted")),
    refundPolicyAccepted: toBoolean(payload.get("refundPolicyAccepted")),
  };

  if (!legacyPayload.passport.passportNumber) {
    delete legacyPayload.passport;
  }

  if (!legacyPayload.occupation) {
    delete legacyPayload.occupation;
  }

  if (!legacyPayload.travelProfile.refusalDetails && !legacyPayload.travelProfile.priorRefusal) {
    delete legacyPayload.travelProfile;
  }

  return legacyPayload;
};

export const signupCustomer = async (payload) => {
  const { firstName, lastName } = normalizeName(payload.name);
  const phone = String(payload.phone || "").trim();

  const requestBody = {
    firstName,
    lastName,
    email: payload.email,
    password: payload.password,
  };

  if (phone) {
    requestBody.phone = phone;
  }

  const authData = await request({
    url: "/auth/signup",
    method: "POST",
    data: requestBody,
  });

  if (authData?.token && authData?.user) {
    writeSession({
      token: authData.token,
      refreshToken: authData.refreshToken,
      user: authData.user,
    });
  }

  return authData;
};

export const loginCustomer = async (payload) => {
  let authData;

  try {
    authData = await request({
      url: "/auth/customer-login",
      method: "POST",
      data: payload,
    });
  } catch (error) {
    if (error?.statusCode !== 404) {
      throw error;
    }

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
  const isFormDataPayload = typeof FormData !== "undefined" && payload instanceof FormData;

  return request({
    url: "/public/visa-applications",
    method: "POST",
    data: payload,
    headers: isFormDataPayload
      ? {
          "Content-Type": "multipart/form-data",
        }
      : undefined,
  }).catch((error) => {
    if (error?.statusCode !== 404) {
      throw error;
    }

    return request({
      url: "/public/applications",
      method: "POST",
      data: buildLegacyApplicationPayload(payload),
    });
  });
};

export const submitPublicEnquiry = (payload) => {
  return request({
    url: "/public/enquiries",
    method: "POST",
    data: payload,
  });
};

export const getPublicCountries = (params) => {
  return request({
    url: "/public/countries",
    method: "GET",
    params,
  });
};

export const getPublicSiteSettings = () => {
  return request({
    url: "/public/site-settings",
    method: "GET",
  });
};

export const getPublicCountryBySlug = (countrySlug) => {
  return request({
    url: `/public/countries/${encodeURIComponent(countrySlug)}`,
    method: "GET",
  });
};

export const getPublicVisaTypesByCountry = (countrySlug, params) => {
  return request({
    url: `/public/countries/${encodeURIComponent(countrySlug)}/visa-types`,
    method: "GET",
    params,
  });
};

export const getPublicVisaSearch = (params) => {
  return request({
    url: "/public/visa-search",
    method: "GET",
    params,
  });
};

export const getVisaTypeContentBySlug = (countrySlug, visaTypeSlug) => {
  return request({
    url: `/public/visa-types/${encodeURIComponent(countrySlug)}/${encodeURIComponent(visaTypeSlug)}`,
    method: "GET",
  }).catch(() =>
    request({
      url: `/visa-types/${encodeURIComponent(countrySlug)}/${encodeURIComponent(visaTypeSlug)}`,
      method: "GET",
    })
  );
};

export const getVisaApplicationConfig = (countrySlug, visaTypeSlug) => {
  return request({
    url: `/public/application-config/${encodeURIComponent(countrySlug)}/${encodeURIComponent(visaTypeSlug)}`,
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

export const uploadUserAvatar = (formData) => {
  return request({
    url: "/user/profile/avatar",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
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

export const getUserTickets = (params) => {
  return request({
    url: "/user/tickets",
    method: "GET",
    params,
  });
};

export const createUserTicket = (payload) => {
  return request({
    url: "/user/tickets",
    method: "POST",
    data: payload,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getUserTicketById = (id) => {
  return request({
    url: `/user/tickets/${id}`,
    method: "GET",
  });
};

export const replyUserTicket = (id, payload) => {
  return request({
    url: `/user/tickets/${id}/replies`,
    method: "POST",
    data: payload,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getUserDashboardSummary = () => {
  return request({
    url: "/user/dashboard-summary",
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
