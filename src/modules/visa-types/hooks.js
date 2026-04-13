import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAdminVisaType,
  deleteAdminVisaType,
  getAdminVisaTypeById,
  listAdminVisaTypes,
  toggleAdminVisaTypeStatus,
  updateAdminVisaType,
} from "./api";
import { queryKeys } from "../../lib/query/queryKeys";

export const useAdminVisaTypesQuery = (params) => {
  return useQuery({
    queryKey: queryKeys.visaTypes.list(params),
    queryFn: () => listAdminVisaTypes(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useAdminVisaTypeDetailQuery = (id, options = {}) => {
  return useQuery({
    queryKey: queryKeys.visaTypes.detail(id),
    queryFn: () => getAdminVisaTypeById(id),
    enabled: Boolean(id) && (options.enabled ?? true),
  });
};

export const useCreateAdminVisaTypeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => createAdminVisaType(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.visaTypes.all }),
  });
};

export const useUpdateAdminVisaTypeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => updateAdminVisaType(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.visaTypes.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.visaTypes.detail(variables.id) });
    },
  });
};

export const useToggleAdminVisaTypeStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => toggleAdminVisaTypeStatus(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.visaTypes.all }),
  });
};

export const useDeleteAdminVisaTypeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteAdminVisaType(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.visaTypes.all }),
  });
};
