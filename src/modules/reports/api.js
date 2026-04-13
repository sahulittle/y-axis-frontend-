import { request } from "../../lib/axios/client";

export const getRevenueReport = () => {
  return request({ url: "/visaassist/reports/revenue", method: "GET" });
};

export const getConversionReport = () => {
  return request({ url: "/visaassist/reports/conversion", method: "GET" });
};

export const getStaffPerformanceReport = () => {
  return request({ url: "/visaassist/reports/staff-performance", method: "GET" });
};

export const getApplicationsReport = () => {
  return request({ url: "/visaassist/reports/applications", method: "GET" });
};
