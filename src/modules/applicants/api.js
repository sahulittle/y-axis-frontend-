import { request } from "../../lib/axios/client";

export const listApplicants = (params) => {
  return request({
    url: "/visaassist/applicants",
    method: "GET",
    params,
  });
};

export const getApplicantById = (applicantId) => {
  return request({
    url: `/visaassist/applicants/${applicantId}`,
    method: "GET",
  });
};
