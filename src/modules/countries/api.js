import { request } from "../../lib/axios/client";

export const listCountries = (params) => {
  return request({
    url: "/admin/countries",
    method: "GET",
    params,
  });
};

export const getCountryById = (id) => {
  return request({
    url: `/admin/countries/${id}`,
    method: "GET",
  });
};

export const createCountry = (payload) => {
  return request({
    url: "/admin/countries",
    method: "POST",
    data: payload,
  });
};

export const updateCountry = (id, payload) => {
  return request({
    url: `/admin/countries/${id}`,
    method: "PUT",
    data: payload,
  });
};

export const updateCountryStatus = (id, payload) => {
  return request({
    url: `/admin/countries/${id}/status`,
    method: "PATCH",
    data: payload,
  });
};

export const deleteCountry = (id) => {
  return request({
    url: `/admin/countries/${id}`,
    method: "DELETE",
  });
};
