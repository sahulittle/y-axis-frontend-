import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteDocument, listDocuments, reviewDocument } from "./api";
import { queryKeys } from "../../lib/query/queryKeys";

export const useDocumentsQuery = (params) => {
  return useQuery({
    queryKey: queryKeys.documents.list(params),
    queryFn: () => listDocuments(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useReviewDocumentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ documentId, payload }) => reviewDocument(documentId, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.documents.all }),
  });
};

export const useDeleteDocumentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (documentId) => deleteDocument(documentId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.documents.all }),
  });
};
