import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteAppointment, listAppointments, updateAppointmentStatus } from "./api";
import { queryKeys } from "../../lib/query/queryKeys";

export const useAppointmentsQuery = (params) => {
  return useQuery({
    queryKey: queryKeys.appointments.list(params),
    queryFn: () => listAppointments(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useUpdateAppointmentStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ appointmentId, payload }) => updateAppointmentStatus(appointmentId, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.appointments.all }),
  });
};

export const useDeleteAppointmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (appointmentId) => deleteAppointment(appointmentId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.appointments.all }),
  });
};
