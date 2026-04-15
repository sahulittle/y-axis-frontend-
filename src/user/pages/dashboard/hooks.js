import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUserTicket,
  getUserAppointments,
  getUserApplicationById,
  getUserApplications,
  getUserDashboardSummary,
  getUserDocuments,
  getUserProfile,
  getUserTicketById,
  getUserTickets,
  replyUserTicket,
  uploadUserAvatar,
  uploadUserDocument,
  updateUserProfile,
} from "../../api/publicApi";
import { queryKeys } from "../../../lib/query/queryKeys";
import { readSession, writeSession } from "../../../shared/auth/session";

export const useUserProfileQuery = () => {
  return useQuery({
    queryKey: queryKeys.userPortal.profile,
    queryFn: getUserProfile,
  });
};

export const useUpdateUserProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => updateUserProfile(payload),
    onSuccess: (updatedUser) => {
      const session = readSession();
      if (updatedUser) {
        writeSession({
          token: session.token,
          refreshToken: session.refreshToken,
          user: {
            ...(session.user || {}),
            ...updatedUser,
          },
        });
      }

      queryClient.invalidateQueries({ queryKey: queryKeys.userPortal.profile });
    },
  });
};

export const useUploadUserAvatarMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => uploadUserAvatar(payload),
    onSuccess: (updatedUser) => {
      const session = readSession();
      if (updatedUser) {
        writeSession({
          token: session.token,
          refreshToken: session.refreshToken,
          user: {
            ...(session.user || {}),
            ...updatedUser,
          },
        });
      }

      queryClient.invalidateQueries({ queryKey: queryKeys.userPortal.profile });
    },
  });
};

export const useUserDashboardSummaryQuery = () => {
  return useQuery({
    queryKey: queryKeys.userPortal.dashboardSummary,
    queryFn: getUserDashboardSummary,
  });
};

export const useUserApplicationsQuery = (params) => {
  return useQuery({
    queryKey: queryKeys.userPortal.applications.list(params),
    queryFn: () => getUserApplications(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useUserApplicationDetailQuery = (id, options = {}) => {
  return useQuery({
    queryKey: queryKeys.userPortal.applications.detail(id),
    queryFn: () => getUserApplicationById(id),
    enabled: Boolean(id) && (options.enabled ?? true),
  });
};

export const useUserTicketsQuery = (params) => {
  return useQuery({
    queryKey: queryKeys.userPortal.tickets.list(params),
    queryFn: () => getUserTickets(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useUserTicketDetailQuery = (id, options = {}) => {
  return useQuery({
    queryKey: queryKeys.userPortal.tickets.detail(id),
    queryFn: () => getUserTicketById(id),
    enabled: Boolean(id) && (options.enabled ?? true),
  });
};

export const useUserDocumentsQuery = (params) => {
  return useQuery({
    queryKey: queryKeys.userPortal.documents.list(params),
    queryFn: () => getUserDocuments(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useUploadUserDocumentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => uploadUserDocument(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.userPortal.documents.all });
    },
  });
};

export const useUserAppointmentsQuery = (params) => {
  return useQuery({
    queryKey: queryKeys.userPortal.appointments.list(params),
    queryFn: () => getUserAppointments(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useCreateUserTicketMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => createUserTicket(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.userPortal.tickets.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.userPortal.dashboardSummary });
    },
  });
};

export const useReplyUserTicketMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => replyUserTicket(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.userPortal.tickets.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.userPortal.tickets.detail(variables.id) });
    },
  });
};
