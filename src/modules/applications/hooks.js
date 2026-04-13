import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  archiveApplication,
  getApplicationById,
  listApplications,
  updateApplicationNotes,
  updateApplicationStatus,
} from "./api";
import { queryKeys } from "../../lib/query/queryKeys";

export const useApplicationsQuery = (params) => {
  return useQuery({
    queryKey: queryKeys.applications.list(params),
    queryFn: () => listApplications(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useApplicationDetailQuery = (id, options = {}) => {
  return useQuery({
    queryKey: queryKeys.applications.detail(id),
    queryFn: () => getApplicationById(id),
    enabled: Boolean(id) && (options.enabled ?? true),
  });
};

export const useUpdateApplicationStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => updateApplicationStatus(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.applications.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.applications.detail(variables.id) });
    },
  });
};

export const useUpdateApplicationNotesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => updateApplicationNotes(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.applications.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.applications.detail(variables.id) });
    },
  });
};

export const useArchiveApplicationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => archiveApplication(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.applications.all }),
  });
};
