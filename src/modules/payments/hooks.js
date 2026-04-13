import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createManualPayment, listPayments, updatePaymentStatus } from "./api";
import { queryKeys } from "../../lib/query/queryKeys";

export const usePaymentsQuery = (params) => {
  return useQuery({
    queryKey: queryKeys.payments.list(params),
    queryFn: () => listPayments(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useCreateManualPaymentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => createManualPayment(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.payments.all }),
  });
};

export const useUpdatePaymentStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ paymentId, payload }) => updatePaymentStatus(paymentId, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.payments.all }),
  });
};
