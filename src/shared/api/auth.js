import { apiRequest, clearStoredSession, getStoredSession } from "./http";

export const loginUser = async ({ email, password }) => {
  const data = await apiRequest("/auth/login", {
    method: "POST",
    body: { email, password },
  });

  const token = data?.token || "";
  const refreshToken = data?.refreshToken || "";
  const user = data?.user || null;

  if (!token || !user) {
    throw new Error("Invalid login response");
  }

  localStorage.setItem("yaxis_access_token", token);
  localStorage.setItem("yaxis_refresh_token", refreshToken);
  localStorage.setItem("yaxis_user", JSON.stringify(user));

  return data;
};

export const logoutUser = async () => {
  const { token } = getStoredSession();

  try {
    await apiRequest("/auth/logout", {
      method: "POST",
      token,
      body: { refreshToken: localStorage.getItem("yaxis_refresh_token") || "" },
    });
  } catch {
    // Ignore API failure and clear session locally.
  } finally {
    clearStoredSession();
  }
};
