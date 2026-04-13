import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTemplate, deleteTemplate, listTemplates } from "./api";
import { queryKeys } from "../../lib/query/queryKeys";

export const useTemplatesQuery = (params) => {
  return useQuery({
    queryKey: queryKeys.templates.list(params),
    queryFn: () => listTemplates(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useCreateTemplateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => createTemplate(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.templates.all }),
  });
};

export const useDeleteTemplateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (templateId) => deleteTemplate(templateId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.templates.all }),
  });
};
