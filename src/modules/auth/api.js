import { request } from "../../lib/axios/client";
import { clearSession, writeSession } from "../../shared/auth/session";

const saveAuthData = (data) => {
  const token = data?.token || "";
  const refreshToken = data?.refreshToken || "";
  const user = data?.user || null;

  if (!token || !user) {
    throw new Error("Invalid login response");
  }

  writeSession({ token, refreshToken, user });
  return data;
};

export const staffLogin = async (payload) => {
  try {
    const data = await request({
      url: "/visaassist/auth/staff-login",
      method: "POST",
      data: payload,
    });
    return saveAuthData(data);
  } catch (error) {
    if (error?.statusCode !== 404) {
      throw error;
    }

    const data = await request({
      url: "/auth/login",
      method: "POST",
      data: payload,
    });
    return saveAuthData(data);
  }
};

export const forgotPassword = async (payload) => {
  try {
    return await request({
      url: "/visaassist/auth/forgot-password",
      method: "POST",
      data: payload,
    });
  } catch {
    return request({
      url: "/auth/forgot-password",
      method: "POST",
      data: payload,
    });
  }
};

export const resetPassword = async (payload) => {
  try {
    return await request({
      url: "/visaassist/auth/reset-password",
      method: "POST",
      data: payload,
    });
  } catch {
    return request({
      url: "/auth/reset-password",
      method: "POST",
      data: payload,
    });
  }
};

export const logout = async () => {
  try {
    await request({
      url: "/auth/logout",
      method: "POST",
      data: {},
    });
  } catch {
    // Ignore network or endpoint mismatch for logout and clear local state.
  } finally {
    clearSession();
  }
};
