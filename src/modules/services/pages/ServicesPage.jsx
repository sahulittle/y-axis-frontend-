import React from "react";
import DataTable from "../../../shared/ui/DataTable";
import Button from "../../../shared/ui/Button";
import Badge from "../../../shared/ui/Badge";
import { useToast } from "../../../app/providers/ToastProvider";
import { useCreateServiceMutation, useDeleteServiceMutation, useServicesQuery } from "../hooks";

const ServicesPage = () => {
  const toast = useToast();
  const [params, setParams] = React.useState({ page: 1, limit: 10, sortBy: "displayOrder", sortOrder: "asc" });

  const query = useServicesQuery(params);
  const createMutation = useCreateServiceMutation();
  const deleteMutation = useDeleteServiceMutation();

  const rows = query.data?.items || [];
  const pagination = query.data?.pagination || { page: 1, totalPages: 1 };

  const createSampleService = async () => {
    try {
      await createMutation.mutateAsync({
        name: `Sample Service ${Date.now()}`,
        destinationCountry: "Canada",
        visaCategory: "Visitor",
        price: 1500,
        currency: "INR",
        isActive: true,
      });
      toast.success("Service created");
    } catch (error) {
      toast.error(error.message || "Failed to create service");
    }
  };

  const removeService = async (serviceId) => {
    try {
      await deleteMutation.mutateAsync(serviceId);
      toast.success("Service deleted");
    } catch (error) {
      toast.error(error.message || "Failed to delete service");
    }
  };

  const columns = [
    { key: "name", label: "Name", render: (row) => row.name || "-" },
    { key: "destinationCountry", label: "Destination", render: (row) => row.destinationCountry || "-" },
    { key: "visaCategory", label: "Visa Category", render: (row) => row.visaCategory || "-" },
    { key: "price", label: "Price", render: (row) => `${row.price ?? row.basePrice ?? 0} ${row.currency || ""}`.trim() },
    { key: "isActive", label: "Status", render: (row) => <Badge variant={row.isActive ? "success" : "danger"}>{row.isActive ? "Active" : "Inactive"}</Badge> },
    {
      key: "actions",
      label: "Actions",
      render: (row) => <Button size="sm" onClick={() => removeService(row._id)}>Delete</Button>,
    },
  ];

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Services</h1>
          <p className="mt-1 text-sm text-slate-600">Manage destination and visa-specific service offerings.</p>
        </div>
        <Button className="w-full sm:w-auto" onClick={createSampleService} disabled={createMutation.isPending}>Add Service</Button>
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

export default ServicesPage;
