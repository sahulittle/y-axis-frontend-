import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTicketById, listTickets, replyToTicket, updateTicketStatus } from "./api";
import { queryKeys } from "../../lib/query/queryKeys";

export const useTicketsQuery = (params) => {
  return useQuery({
    queryKey: queryKeys.tickets.list(params),
    queryFn: () => listTickets(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useTicketDetailQuery = (id, options = {}) => {
  return useQuery({
    queryKey: queryKeys.tickets.detail(id),
    queryFn: () => getTicketById(id),
    enabled: Boolean(id) && (options.enabled ?? true),
  });
};

export const useUpdateTicketStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => updateTicketStatus(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tickets.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.tickets.detail(variables.id) });
    },
  });
};

export const useReplyToTicketMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => replyToTicket(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tickets.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.tickets.detail(variables.id) });
    },
  });
};
