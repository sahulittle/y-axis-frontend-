import { request } from "../../lib/axios/client";

export const listServices = (params) => {
  return request({
    url: "/visaassist/services",
    method: "GET",
    params,
  });
};

export const createService = (payload) => {
  return request({
    url: "/visaassist/services",
    method: "POST",
    data: payload,
  });
};

export const deleteService = (serviceId) => {
  return request({
    url: `/visaassist/services/${serviceId}`,
    method: "DELETE",
  });
};
