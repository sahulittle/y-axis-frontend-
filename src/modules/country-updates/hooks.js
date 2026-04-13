import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCountryUpdate, deleteCountryUpdate, listCountryUpdates } from "./api";
import { queryKeys } from "../../lib/query/queryKeys";

export const useCountryUpdatesQuery = (params) => {
  return useQuery({
    queryKey: queryKeys.countryUpdates.list(params),
    queryFn: () => listCountryUpdates(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useCreateCountryUpdateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => createCountryUpdate(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.countryUpdates.all }),
  });
};

export const useDeleteCountryUpdateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteCountryUpdate(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.countryUpdates.all }),
  });
};
