import { request } from "../../lib/axios/client";

export const listSettings = (params) => {
  return request({
    url: "/visaassist/settings",
    method: "GET",
    params,
  });
};

export const patchSettings = (payload) => {
  return request({
    url: "/visaassist/settings",
    method: "PATCH",
    data: payload,
  });
};
