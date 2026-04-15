import axios from "axios";
import { env } from "../../app/config/env";
import { clearSession, readSession } from "../../shared/auth/session";

const unwrapApiData = (response) => {
  if (response?.data?.data !== undefined) {
    return response.data.data;
  }
  return response?.data;
};

const extractValidationMessage = (details) => {
  if (!details || typeof details !== "object") {
    return "";
  }

  const fieldErrors = details.fieldErrors;
  if (fieldErrors && typeof fieldErrors === "object") {
    for (const errors of Object.values(fieldErrors)) {
      if (Array.isArray(errors) && errors.length) {
        const firstMessage = String(errors[0] || "").trim();
        if (firstMessage) {
          return firstMessage;
        }
      }
    }
  }

  if (Array.isArray(details.formErrors) && details.formErrors.length) {
    const firstMessage = String(details.formErrors[0] || "").trim();
    if (firstMessage) {
      return firstMessage;
    }
  }

  return "";
};

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 20_000,
});

apiClient.interceptors.request.use((config) => {
  const { token } = readSession();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const statusCode = error?.response?.status;
    const apiError = error?.response?.data?.error || {};
    const detailedValidationMessage = extractValidationMessage(apiError.details);
    const message =
      detailedValidationMessage ||
      apiError.message ||
      error?.message ||
      "Request failed";

    if (statusCode === 401) {
      clearSession();
    }

    const wrapped = new Error(message);
    wrapped.statusCode = statusCode;
    throw wrapped;
  }
);

export const request = async (config) => {
  const response = await apiClient.request(config);
  return unwrapApiData(response);
};
