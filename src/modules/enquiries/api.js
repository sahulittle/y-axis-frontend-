import { request } from "../../lib/axios/client";

export const listEnquiries = (params) => {
  return request({
    url: "/admin/enquiries",
    method: "GET",
    params,
  });
};

export const getEnquiryById = (id) => {
  return request({
    url: `/admin/enquiries/${id}`,
    method: "GET",
  });
};

export const updateEnquiryStatus = (id, payload) => {
  return request({
    url: `/admin/enquiries/${id}/status`,
    method: "PATCH",
    data: payload,
  });
};

export const updateEnquiryNotes = (id, payload) => {
  return request({
    url: `/admin/enquiries/${id}/notes`,
    method: "PUT",
    data: payload,
  });
};

export const deleteEnquiry = (id) => {
  return request({
    url: `/admin/enquiries/${id}`,
    method: "DELETE",
  });
};
