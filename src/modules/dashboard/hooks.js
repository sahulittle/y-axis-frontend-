import { useQuery } from "@tanstack/react-query";
import { getDashboardSummary } from "./api";
import { queryKeys } from "../../lib/query/queryKeys";

export const useDashboardSummaryQuery = () => {
  return useQuery({
    queryKey: queryKeys.dashboard.summary,
    queryFn: getDashboardSummary,
    staleTime: 45_000,
  });
};
