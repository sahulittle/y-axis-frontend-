import { useQuery } from "@tanstack/react-query";
import { getComplianceSummary, listComplianceLogs } from "./api";
import { queryKeys } from "../../lib/query/queryKeys";

export const useComplianceLogsQuery = (params) => {
  return useQuery({
    queryKey: queryKeys.compliance.logs(params),
    queryFn: () => listComplianceLogs(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useComplianceSummaryQuery = () => {
  return useQuery({
    queryKey: queryKeys.compliance.summary,
    queryFn: getComplianceSummary,
  });
};
