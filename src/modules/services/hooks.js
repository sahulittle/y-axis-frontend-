import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createService, deleteService, listServices } from "./api";
import { queryKeys } from "../../lib/query/queryKeys";

export const useServicesQuery = (params) => {
  return useQuery({
    queryKey: queryKeys.services.list(params),
    queryFn: () => listServices(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useCreateServiceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => createService(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.services.all }),
  });
};

export const useDeleteServiceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (serviceId) => deleteService(serviceId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.services.all }),
  });
};
