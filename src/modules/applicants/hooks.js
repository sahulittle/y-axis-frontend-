import { useQuery } from "@tanstack/react-query";
import { getApplicantById, listApplicants } from "./api";
import { queryKeys } from "../../lib/query/queryKeys";

export const useApplicantsQuery = (params) => {
  return useQuery({
    queryKey: queryKeys.applicants.list(params),
    queryFn: () => listApplicants(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useApplicantDetailQuery = (applicantId, initialApplicant = null) => {
  return useQuery({
    queryKey: queryKeys.applicants.detail(applicantId),
    queryFn: () => getApplicantById(applicantId),
    initialData: initialApplicant,
    enabled: Boolean(applicantId),
  });
};
