import { apiRequest, getStoredSession } from "../../shared/api/http";

const withToken = (options = {}) => {
  const { token } = getStoredSession();
  return { ...options, token };
};

export const getAdminStats = () => apiRequest("/admin/stats", withToken());

export const listAdminUsers = (query) =>
  apiRequest("/admin/users", withToken({ query }));

export const updateAdminUser = (userId, payload) =>
  apiRequest(`/admin/users/${userId}`, withToken({ method: "PATCH", body: payload }));

export const deleteAdminUser = (userId) =>
  apiRequest(`/admin/users/${userId}`, withToken({ method: "DELETE" }));

export const listAdminConsultations = (query) =>
  apiRequest("/admin/consultations", withToken({ query }));

export const updateConsultationStatus = (consultationId, payload) =>
  apiRequest(`/admin/consultations/${consultationId}/status`, withToken({ method: "PATCH", body: payload }));

export const listAdminCountries = (query) =>
  apiRequest("/admin/countries", withToken({ query }));

export const createCountry = (payload) =>
  apiRequest("/admin/countries", withToken({ method: "POST", body: payload }));

export const updateCountry = (countryId, payload) =>
  apiRequest(`/admin/countries/${countryId}`, withToken({ method: "PUT", body: payload }));

export const deleteCountry = (countryId) =>
  apiRequest(`/admin/countries/${countryId}`, withToken({ method: "DELETE" }));

export const listAdminJobs = (query) =>
  apiRequest("/admin/jobs", withToken({ query }));

export const createJob = (payload) =>
  apiRequest("/admin/jobs", withToken({ method: "POST", body: payload }));

export const updateJob = (jobId, payload) =>
  apiRequest(`/admin/jobs/${jobId}`, withToken({ method: "PUT", body: payload }));

export const deleteJob = (jobId) =>
  apiRequest(`/admin/jobs/${jobId}`, withToken({ method: "DELETE" }));

export const listAdminBlogPosts = (query) =>
  apiRequest("/admin/blog-posts", withToken({ query }));

export const createBlogPost = (payload) =>
  apiRequest("/admin/blog-posts", withToken({ method: "POST", body: payload }));

export const updateBlogPost = (postId, payload) =>
  apiRequest(`/admin/blog-posts/${postId}`, withToken({ method: "PUT", body: payload }));

export const deleteBlogPost = (postId) =>
  apiRequest(`/admin/blog-posts/${postId}`, withToken({ method: "DELETE" }));
