import React from "react";
import DataTable from "../../../shared/ui/DataTable";
import Button from "../../../shared/ui/Button";
import Badge from "../../../shared/ui/Badge";
import { useToast } from "../../../app/providers/ToastProvider";
import { useCountryUpdatesQuery, useCreateCountryUpdateMutation, useDeleteCountryUpdateMutation } from "../hooks";

const statusVariant = {
  draft: "warning",
  published: "success",
  archived: "neutral",
};

const CountryUpdatesPage = () => {
  const toast = useToast();
  const [params, setParams] = React.useState({ page: 1, limit: 10, sortBy: "effectiveDate", sortOrder: "desc" });

  const query = useCountryUpdatesQuery(params);
  const createMutation = useCreateCountryUpdateMutation();
  const deleteMutation = useDeleteCountryUpdateMutation();

  const rows = query.data?.items || [];
  const pagination = query.data?.pagination || { page: 1, totalPages: 1 };

  const addUpdate = async () => {
    try {
      await createMutation.mutateAsync({
        destinationCountry: "Canada",
        title: `Policy Update ${Date.now()}`,
        advisory: "Updated document requirements.",
        effectiveDate: new Date().toISOString(),
      });
      toast.success("Country update created");
    } catch (error) {
      toast.error(error.message || "Failed to create country update");
    }
  };

  const removeUpdate = async (id) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Country update deleted");
    } catch (error) {
      toast.error(error.message || "Failed to delete country update");
    }
  };

  const columns = [
    { key: "destinationCountry", label: "Country", render: (row) => row.destinationCountry || "-" },
    { key: "title", label: "Title", render: (row) => row.title || "-" },
    { key: "effectiveDate", label: "Effective Date", render: (row) => (row.effectiveDate ? new Date(row.effectiveDate).toLocaleDateString() : "-") },
    { key: "status", label: "Status", render: (row) => <Badge variant={statusVariant[row.status] || "neutral"}>{row.status || "published"}</Badge> },
    { key: "actions", label: "Actions", render: (row) => <Button size="sm" onClick={() => removeUpdate(row._id)}>Delete</Button> },
  ];

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Country Updates</h1>
          <p className="mt-1 text-sm text-slate-600">Publish destination-specific process and policy updates.</p>
        </div>
        <Button className="w-full sm:w-auto" onClick={addUpdate} disabled={createMutation.isPending}>Add Update</Button>
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

export default CountryUpdatesPage;
