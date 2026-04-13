import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createVisaCategory,
  deleteVisaCategory,
  getVisaCategoryById,
  listVisaCategories,
  updateVisaCategory,
  updateVisaCategoryStatus,
} from "./api";
import { queryKeys } from "../../lib/query/queryKeys";

export const useVisaCategoriesQuery = (params) => {
  return useQuery({
    queryKey: queryKeys.visaCategories.list(params),
    queryFn: () => listVisaCategories(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useVisaCategoryDetailQuery = (id, options = {}) => {
  return useQuery({
    queryKey: queryKeys.visaCategories.detail(id),
    queryFn: () => getVisaCategoryById(id),
    enabled: Boolean(id) && (options.enabled ?? true),
  });
};

export const useCreateVisaCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => createVisaCategory(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.visaCategories.all }),
  });
};

export const useUpdateVisaCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => updateVisaCategory(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.visaCategories.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.visaCategories.detail(variables.id) });
    },
  });
};

export const useUpdateVisaCategoryStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => updateVisaCategoryStatus(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.visaCategories.all }),
  });
};

export const useDeleteVisaCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteVisaCategory(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.visaCategories.all }),
  });
};
