import React from "react";
import DataTable from "../../../shared/ui/DataTable";
import Button from "../../../shared/ui/Button";
import Badge from "../../../shared/ui/Badge";
import { useToast } from "../../../app/providers/ToastProvider";
import { useChecklistsQuery, useCreateChecklistMutation, useDeleteChecklistMutation } from "../hooks";

const ChecklistsPage = () => {
  const toast = useToast();
  const [params, setParams] = React.useState({ page: 1, limit: 10, sortBy: "createdAt", sortOrder: "desc" });

  const query = useChecklistsQuery(params);
  const createMutation = useCreateChecklistMutation();
  const deleteMutation = useDeleteChecklistMutation();

  const rows = query.data?.items || [];
  const pagination = query.data?.pagination || { page: 1, totalPages: 1 };

  const createSample = async () => {
    try {
      await createMutation.mutateAsync({
        name: `Checklist ${Date.now()}`,
        destinationCountry: "Canada",
        visaCategory: "Study",
        items: [{ label: "Passport", required: true, sortOrder: 1 }],
        isActive: true,
      });
      toast.success("Checklist created");
    } catch (error) {
      toast.error(error.message || "Failed to create checklist");
    }
  };

  const remove = async (checklistId) => {
    try {
      await deleteMutation.mutateAsync(checklistId);
      toast.success("Checklist deleted");
    } catch (error) {
      toast.error(error.message || "Failed to delete checklist");
    }
  };

  const columns = [
    { key: "name", label: "Name", render: (row) => row.name || "-" },
    { key: "destinationCountry", label: "Destination", render: (row) => row.destinationCountry || "-" },
    { key: "visaCategory", label: "Visa Category", render: (row) => row.visaCategory || "-" },
    { key: "items", label: "Items", render: (row) => row.items?.length || 0 },
    { key: "isActive", label: "Status", render: (row) => <Badge variant={row.isActive === false ? "danger" : "success"}>{row.isActive === false ? "Inactive" : "Active"}</Badge> },
    { key: "actions", label: "Actions", render: (row) => <Button size="sm" onClick={() => remove(row._id)}>Delete</Button> },
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Checklists</h1>
          <p className="mt-1 text-sm text-slate-600">Manage visa process checklist templates.</p>
        </div>
        <Button onClick={createSample} disabled={createMutation.isPending}>Add Checklist</Button>
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

export default ChecklistsPage;
