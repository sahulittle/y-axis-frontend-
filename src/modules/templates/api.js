import { request } from "../../lib/axios/client";

export const listTemplates = (params) => {
  return request({
    url: "/visaassist/templates",
    method: "GET",
    params,
  });
};

export const createTemplate = (payload) => {
  return request({
    url: "/visaassist/templates",
    method: "POST",
    data: payload,
  });
};

export const deleteTemplate = (templateId) => {
  return request({
    url: `/visaassist/templates/${templateId}`,
    method: "DELETE",
  });
};
