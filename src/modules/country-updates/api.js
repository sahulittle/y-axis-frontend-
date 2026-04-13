import { request } from "../../lib/axios/client";

export const listCountryUpdates = (params) => {
  return request({
    url: "/visaassist/country-updates",
    method: "GET",
    params,
  });
};

export const createCountryUpdate = (payload) => {
  return request({
    url: "/visaassist/country-updates",
    method: "POST",
    data: payload,
  });
};

export const deleteCountryUpdate = (id) => {
  return request({
    url: `/visaassist/country-updates/${id}`,
    method: "DELETE",
  });
};
