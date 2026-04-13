import { request } from "../../lib/axios/client";

export const listComplianceLogs = (params) => {
  return request({
    url: "/visaassist/compliance/logs",
    method: "GET",
    params,
  });
};

export const getComplianceSummary = () => {
  return request({
    url: "/visaassist/compliance/summary",
    method: "GET",
  });
};
