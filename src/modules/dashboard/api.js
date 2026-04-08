import { request } from "../../lib/axios/client";

export const getDashboardSummary = () => {
  return request({
    url: "/visaassist/reports/dashboard",
    method: "GET",
  });
};
