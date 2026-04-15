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

export const uploadSiteAsset = (payload) => {
  return request({
    url: "/admin/settings/assets",
    method: "POST",
    data: payload,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
