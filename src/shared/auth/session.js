const ACCESS_TOKEN_KEY = "yaxis_access_token";
const REFRESH_TOKEN_KEY = "yaxis_refresh_token";
const USER_KEY = "yaxis_user";

export const readSession = () => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY) || "";
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY) || "";
  const userRaw = localStorage.getItem(USER_KEY) || "null";

  let user = null;
  try {
    user = JSON.parse(userRaw);
  } catch {
    user = null;
  }

  return { token, refreshToken, user };
};

export const writeSession = ({ token, refreshToken, user }) => {
  if (token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

export const updateSessionUser = (updater) => {
  const current = readSession();
  const currentUser = current.user || null;

  const nextUser = typeof updater === "function" ? updater(currentUser) : updater;
  if (!nextUser) {
    return;
  }

  writeSession({ user: nextUser });
};

export const clearSession = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};
