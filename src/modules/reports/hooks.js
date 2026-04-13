import { useQuery } from "@tanstack/react-query";
import { getApplicationsReport, getConversionReport, getRevenueReport, getStaffPerformanceReport } from "./api";
import { queryKeys } from "../../lib/query/queryKeys";

export const useRevenueReportQuery = () => {
  return useQuery({
    queryKey: queryKeys.reports.revenue,
    queryFn: getRevenueReport,
  });
};

export const useConversionReportQuery = () => {
  return useQuery({
    queryKey: queryKeys.reports.conversion,
    queryFn: getConversionReport,
  });
};

export const useStaffPerformanceReportQuery = () => {
  return useQuery({
    queryKey: queryKeys.reports.staffPerformance,
    queryFn: getStaffPerformanceReport,
  });
};

export const useApplicationsReportQuery = () => {
  return useQuery({
    queryKey: queryKeys.reports.applications,
    queryFn: getApplicationsReport,
  });
};
