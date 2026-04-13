import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createChecklist, deleteChecklist, listChecklists } from "./api";
import { queryKeys } from "../../lib/query/queryKeys";

export const useChecklistsQuery = (params) => {
  return useQuery({
    queryKey: queryKeys.checklists.list(params),
    queryFn: () => listChecklists(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useCreateChecklistMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => createChecklist(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.checklists.all }),
  });
};

export const useDeleteChecklistMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (checklistId) => deleteChecklist(checklistId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.checklists.all }),
  });
};
