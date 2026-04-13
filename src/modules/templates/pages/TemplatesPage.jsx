import React from "react";
import DataTable from "../../../shared/ui/DataTable";
import Button from "../../../shared/ui/Button";
import Badge from "../../../shared/ui/Badge";
import { useToast } from "../../../app/providers/ToastProvider";
import { useCreateTemplateMutation, useDeleteTemplateMutation, useTemplatesQuery } from "../hooks";

const TemplatesPage = () => {
  const toast = useToast();
  const [params, setParams] = React.useState({ page: 1, limit: 10, sortBy: "createdAt", sortOrder: "desc" });

  const query = useTemplatesQuery(params);
  const createMutation = useCreateTemplateMutation();
  const deleteMutation = useDeleteTemplateMutation();

  const rows = query.data?.items || [];
  const pagination = query.data?.pagination || { page: 1, totalPages: 1 };

  const addTemplate = async () => {
    try {
      await createMutation.mutateAsync({
        name: `Reminder ${Date.now()}`,
        type: "email",
        subject: "Document Reminder",
        body: "Hello {{name}}, your document is pending.",
      });
      toast.success("Template created");
    } catch (error) {
      toast.error(error.message || "Failed to create template");
    }
  };

  const removeTemplate = async (templateId) => {
    try {
      await deleteMutation.mutateAsync(templateId);
      toast.success("Template deleted");
    } catch (error) {
      toast.error(error.message || "Failed to delete template");
    }
  };

  const columns = [
    { key: "name", label: "Name", render: (row) => row.name || "-" },
    { key: "type", label: "Type", render: (row) => row.type || row.channel || "email" },
    { key: "subject", label: "Subject", render: (row) => row.subject || "-" },
    { key: "isActive", label: "Status", render: (row) => <Badge variant={row.isActive === false ? "danger" : "success"}>{row.isActive === false ? "Inactive" : "Active"}</Badge> },
    { key: "actions", label: "Actions", render: (row) => <Button size="sm" onClick={() => removeTemplate(row._id)}>Delete</Button> },
  ];

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Templates</h1>
          <p className="mt-1 text-sm text-slate-600">Manage reusable communication templates and placeholders.</p>
        </div>
        <Button className="w-full sm:w-auto" onClick={addTemplate} disabled={createMutation.isPending}>Add Template</Button>
      </div>

      <DataTable
        columns={columns}
        rows={rows}
        loading={query.isLoading}
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

export default TemplatesPage;
