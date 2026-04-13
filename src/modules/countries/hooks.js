import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCountry,
  deleteCountry,
  getCountryById,
  listCountries,
  updateCountry,
  updateCountryStatus,
} from "./api";
import { queryKeys } from "../../lib/query/queryKeys";

export const useCountriesQuery = (params) => {
  return useQuery({
    queryKey: queryKeys.countries.list(params),
    queryFn: () => listCountries(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useCountryDetailQuery = (id, options = {}) => {
  return useQuery({
    queryKey: queryKeys.countries.detail(id),
    queryFn: () => getCountryById(id),
    enabled: Boolean(id) && (options.enabled ?? true),
  });
};

export const useCreateCountryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => createCountry(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.countries.all }),
  });
};

export const useUpdateCountryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => updateCountry(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.countries.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.countries.detail(variables.id) });
    },
  });
};

export const useUpdateCountryStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => updateCountryStatus(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.countries.all }),
  });
};

export const useDeleteCountryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteCountry(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.countries.all }),
  });
};
