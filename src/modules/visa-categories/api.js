import { request } from "../../lib/axios/client";

export const listVisaCategories = (params) => {
  return request({
    url: "/admin/visa-categories",
    method: "GET",
    params,
  });
};

export const getVisaCategoryById = (id) => {
  return request({
    url: `/admin/visa-categories/${id}`,
    method: "GET",
  });
};

export const createVisaCategory = (payload) => {
  return request({
    url: "/admin/visa-categories",
    method: "POST",
    data: payload,
  });
};

export const updateVisaCategory = (id, payload) => {
  return request({
    url: `/admin/visa-categories/${id}`,
    method: "PUT",
    data: payload,
  });
};

export const updateVisaCategoryStatus = (id, payload) => {
  return request({
    url: `/admin/visa-categories/${id}/status`,
    method: "PATCH",
    data: payload,
  });
};

export const deleteVisaCategory = (id) => {
  return request({
    url: `/admin/visa-categories/${id}`,
    method: "DELETE",
  });
};
