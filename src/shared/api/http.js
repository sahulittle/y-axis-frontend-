const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5010/api/v1";

const toQueryString = (query = {}) => {
  const entries = Object.entries(query).filter(([, value]) => value !== "" && value !== undefined && value !== null);
  if (!entries.length) {
    return "";
  }
  return `?${new URLSearchParams(entries).toString()}`;
};

export const apiRequest = async (path, options = {}) => {
  const {
    method = "GET",
    token,
    body,
    query,
    headers = {},
  } = options;

  const finalHeaders = {
    ...(body ? { "Content-Type": "application/json" } : {}),
    ...headers,
  };

  if (token) {
    finalHeaders.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}${toQueryString(query)}`, {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : { success: false, error: { message: await response.text() } };

  if (!response.ok || data?.success === false) {
    const message = data?.error?.message || "Request failed";
    throw new Error(message);
  }

  return data?.data;
};

export const getStoredSession = () => {
  const token = localStorage.getItem("yaxis_access_token") || "";
  const userRaw = localStorage.getItem("yaxis_user") || "null";

  let user = null;
  try {
    user = JSON.parse(userRaw);
  } catch (_error) {
    user = null;
  }

  return { token, user };
};

export const clearStoredSession = () => {
  localStorage.removeItem("yaxis_access_token");
  localStorage.removeItem("yaxis_refresh_token");
  localStorage.removeItem("yaxis_user");
};
