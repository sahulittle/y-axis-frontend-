import React from "react";
import DataTable from "../../../shared/ui/DataTable";
import Button from "../../../shared/ui/Button";
import Badge from "../../../shared/ui/Badge";
import { useToast } from "../../../app/providers/ToastProvider";
import { useDeleteDocumentMutation, useDocumentsQuery, useReviewDocumentMutation } from "../hooks";

const statusVariant = {
  pending: "warning",
  approved: "success",
  rejected: "danger",
  needs_resubmission: "warning",
};

const DocumentsPage = () => {
  const toast = useToast();
  const [params, setParams] = React.useState({ page: 1, limit: 10, sortBy: "createdAt", sortOrder: "desc" });

  const documentsQuery = useDocumentsQuery(params);
  const reviewMutation = useReviewDocumentMutation();
  const deleteMutation = useDeleteDocumentMutation();

  const rows = documentsQuery.data?.items || [];
  const pagination = documentsQuery.data?.pagination || { page: 1, totalPages: 1 };

  const onReview = async (documentId, verificationStatus) => {
    try {
      await reviewMutation.mutateAsync({ documentId, payload: { verificationStatus } });
      toast.success("Document status updated");
    } catch (error) {
      toast.error(error.message || "Failed to update document status");
    }
  };

  const onDelete = async (documentId) => {
    try {
      await deleteMutation.mutateAsync(documentId);
      toast.success("Document removed");
    } catch (error) {
      toast.error(error.message || "Failed to remove document");
    }
  };

  const columns = [
    { key: "documentName", label: "Document", render: (row) => row.title || row.documentName || "Untitled" },
    { key: "category", label: "Category", render: (row) => row.category || row.documentType || "other" },
    {
      key: "verificationStatus",
      label: "Status",
      render: (row) => <Badge variant={statusVariant[row.verificationStatus] || "neutral"}>{row.verificationStatus || "pending"}</Badge>,
    },
    { key: "caseId", label: "Case", render: (row) => row.caseId?.caseId || row.caseId?._id || "-" },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" onClick={() => onReview(row._id, "approved")}>Approve</Button>
          <Button size="sm" variant="secondary" onClick={() => onReview(row._id, "rejected")}>Reject</Button>
          <Button size="sm" onClick={() => onDelete(row._id)}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Document Management</h1>
        <p className="mt-1 text-sm text-slate-600">Review, approve, reject, and archive case documents.</p>
      </div>

      <DataTable
        columns={columns}
        rows={rows}
        loading={documentsQuery.isLoading}
        page={pagination.page || params.page}
        totalPages={pagination.totalPages || 1}
        sortBy={params.sortBy}
        sortOrder={params.sortOrder}
        onPageChange={(page) => setParams((current) => ({ ...current, page }))}
        onSortChange={(sortBy, sortOrder) => setParams((current) => ({ ...current, page: 1, sortBy, sortOrder }))}
      />
    </section>
  );
};

export default DocumentsPage;
