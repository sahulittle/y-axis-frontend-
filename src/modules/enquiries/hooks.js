import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteEnquiry,
  getEnquiryById,
  listEnquiries,
  updateEnquiryNotes,
  updateEnquiryStatus,
} from "./api";
import { queryKeys } from "../../lib/query/queryKeys";

export const useEnquiriesQuery = (params) => {
  return useQuery({
    queryKey: queryKeys.enquiries.list(params),
    queryFn: () => listEnquiries(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useEnquiryDetailQuery = (id, options = {}) => {
  return useQuery({
    queryKey: queryKeys.enquiries.detail(id),
    queryFn: () => getEnquiryById(id),
    enabled: Boolean(id) && (options.enabled ?? true),
  });
};

export const useUpdateEnquiryStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => updateEnquiryStatus(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.enquiries.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.enquiries.detail(variables.id) });
    },
  });
};

export const useUpdateEnquiryNotesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => updateEnquiryNotes(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.enquiries.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.enquiries.detail(variables.id) });
    },
  });
};

export const useDeleteEnquiryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteEnquiry(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.enquiries.all }),
  });
};
