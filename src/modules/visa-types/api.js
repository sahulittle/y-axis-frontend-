import { request } from "../../lib/axios/client";

export const listAdminVisaTypes = (params) => {
  return request({
    url: "/admin/visa-types",
    method: "GET",
    params,
  });
};

export const getAdminVisaTypeById = (id) => {
  return request({
    url: `/admin/visa-types/${id}`,
    method: "GET",
  });
};

export const createAdminVisaType = (payload) => {
  return request({
    url: "/admin/visa-types",
    method: "POST",
    data: payload,
  });
};

export const updateAdminVisaType = (id, payload) => {
  return request({
    url: `/admin/visa-types/${id}`,
    method: "PUT",
    data: payload,
  });
};

export const toggleAdminVisaTypeStatus = (id, payload) => {
  return request({
    url: `/admin/visa-types/${id}/toggle-status`,
    method: "PATCH",
    data: payload,
  });
};

export const deleteAdminVisaType = (id) => {
  return request({
    url: `/admin/visa-types/${id}`,
    method: "DELETE",
  });
};
