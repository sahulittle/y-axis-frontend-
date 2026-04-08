import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addLeadNote, assignLead, getLeadById, listAssignableStaff, listLeads, updateLeadStage } from "./api";
import { queryKeys } from "../../lib/query/queryKeys";

export const useLeadsQuery = (params) => {
  return useQuery({
    queryKey: queryKeys.leads.list(params),
    queryFn: () => listLeads(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useLeadDetailQuery = (leadId, initialLead = null) => {
  return useQuery({
    queryKey: queryKeys.leads.detail(leadId),
    queryFn: () => getLeadById(leadId),
    initialData: initialLead,
    enabled: Boolean(leadId),
  });
};

export const useAssignableStaffQuery = () => {
  return useQuery({
    queryKey: queryKeys.staff.assignable,
    queryFn: listAssignableStaff,
    staleTime: 5 * 60_000,
  });
};

const invalidateLeadCaches = (queryClient, leadId) => {
  queryClient.invalidateQueries({ queryKey: queryKeys.leads.all });
  queryClient.invalidateQueries({ queryKey: queryKeys.leads.detail(leadId) });
};

export const useUpdateLeadStageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ leadId, payload }) => updateLeadStage(leadId, payload),
    onSuccess: (_data, variables) => invalidateLeadCaches(queryClient, variables.leadId),
  });
};

export const useAssignLeadMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ leadId, payload }) => assignLead(leadId, payload),
    onSuccess: (_data, variables) => invalidateLeadCaches(queryClient, variables.leadId),
  });
};

export const useAddLeadNoteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ leadId, payload }) => addLeadNote(leadId, payload),
    onSuccess: (_data, variables) => invalidateLeadCaches(queryClient, variables.leadId),
  });
};
