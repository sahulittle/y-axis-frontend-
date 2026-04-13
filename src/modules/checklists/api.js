import { request } from "../../lib/axios/client";

export const listChecklists = (params) => {
  return request({
    url: "/visaassist/checklists",
    method: "GET",
    params,
  });
};

export const createChecklist = (payload) => {
  return request({
    url: "/visaassist/checklists",
    method: "POST",
    data: payload,
  });
};

export const deleteChecklist = (checklistId) => {
  return request({
    url: `/visaassist/checklists/${checklistId}`,
    method: "DELETE",
  });
};
