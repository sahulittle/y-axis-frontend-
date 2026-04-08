import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addCaseNote,
  assignCaseStaff,
  getCaseById,
  listAssignableStaff,
  listCases,
  updateCaseStatus,
} from "./api";
import { queryKeys } from "../../lib/query/queryKeys";

export const useCasesQuery = (params) => {
  return useQuery({
    queryKey: queryKeys.cases.list(params),
    queryFn: () => listCases(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useCaseDetailQuery = (caseId, initialCase = null) => {
  return useQuery({
    queryKey: queryKeys.cases.detail(caseId),
    queryFn: () => getCaseById(caseId),
    initialData: initialCase,
    enabled: Boolean(caseId),
  });
};

export const useAssignableStaffQuery = () => {
  return useQuery({
    queryKey: queryKeys.staff.assignable,
    queryFn: listAssignableStaff,
    staleTime: 5 * 60_000,
  });
};

const invalidateCaseCaches = (queryClient, caseId) => {
  queryClient.invalidateQueries({ queryKey: queryKeys.cases.all });
  queryClient.invalidateQueries({ queryKey: queryKeys.cases.detail(caseId) });
};

export const useUpdateCaseStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ caseId, payload }) => updateCaseStatus(caseId, payload),
    onSuccess: (_data, variables) => invalidateCaseCaches(queryClient, variables.caseId),
  });
};

export const useAssignCaseStaffMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ caseId, payload }) => assignCaseStaff(caseId, payload),
    onSuccess: (_data, variables) => invalidateCaseCaches(queryClient, variables.caseId),
  });
};

export const useAddCaseNoteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ caseId, payload }) => addCaseNote(caseId, payload),
    onSuccess: (_data, variables) => invalidateCaseCaches(queryClient, variables.caseId),
  });
};
