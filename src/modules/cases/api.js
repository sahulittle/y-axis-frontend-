import { request } from "../../lib/axios/client";

export const listCases = (params) => {
  return request({
    url: "/visaassist/cases",
    method: "GET",
    params,
  });
};

export const getCaseById = (caseId) => {
  return request({
    url: `/visaassist/cases/${caseId}`,
    method: "GET",
  });
};

export const updateCaseStatus = (caseId, payload) => {
  return request({
    url: `/visaassist/cases/${caseId}/status`,
    method: "PATCH",
    data: payload,
  });
};

export const assignCaseStaff = (caseId, payload) => {
  return request({
    url: `/visaassist/cases/${caseId}/assign`,
    method: "PATCH",
    data: payload,
  });
};

export const addCaseNote = (caseId, payload) => {
  return request({
    url: `/visaassist/cases/${caseId}/notes`,
    method: "POST",
    data: payload,
  });
};

export const listAssignableStaff = async () => {
  const data = await request({
    url: "/visaassist/staff",
    method: "GET",
    params: { page: 1, limit: 100 },
  });

  return data?.items || [];
};
