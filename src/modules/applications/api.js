import { request } from "../../lib/axios/client";

export const listApplications = (params) => {
  return request({
    url: "/admin/applications",
    method: "GET",
    params,
  });
};

export const getApplicationById = (id) => {
  return request({
    url: `/admin/applications/${id}`,
    method: "GET",
  });
};

export const updateApplicationStatus = (id, payload) => {
  return request({
    url: `/admin/applications/${id}/status`,
    method: "PATCH",
    data: payload,
  });
};

export const updateApplicationNotes = (id, payload) => {
  return request({
    url: `/admin/applications/${id}/notes`,
    method: "PUT",
    data: payload,
  });
};

export const archiveApplication = (id) => {
  return request({
    url: `/admin/applications/${id}`,
    method: "DELETE",
  });
};
