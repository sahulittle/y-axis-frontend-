import { request } from "../../lib/axios/client";

export const listDocuments = (params) => {
  return request({
    url: "/visaassist/documents",
    method: "GET",
    params,
  });
};

export const reviewDocument = (documentId, payload) => {
  return request({
    url: `/visaassist/documents/${documentId}/review`,
    method: "PATCH",
    data: payload,
  });
};

export const deleteDocument = (documentId) => {
  return request({
    url: `/visaassist/documents/${documentId}`,
    method: "DELETE",
  });
};
