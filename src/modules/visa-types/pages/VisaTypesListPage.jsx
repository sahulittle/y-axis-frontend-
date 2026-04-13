import React from "react";
import { Link } from "react-router-dom";
import { useToast } from "../../../app/providers/ToastProvider";
import Badge from "../../../shared/ui/Badge";
import Button from "../../../shared/ui/Button";
import DataTable from "../../../shared/ui/DataTable";
import FiltersBar from "../../../shared/ui/FiltersBar";
import Input from "../../../shared/ui/Input";
import {
  useAdminVisaTypesQuery,
  useDeleteAdminVisaTypeMutation,
  useToggleAdminVisaTypeStatusMutation,
} from "../hooks";

const STATUS_OPTIONS = [
  { value: "", label: "All Status" },
  { value: "true", label: "Active" },
  { value: "false", label: "Inactive" },
];

const SORT_OPTIONS = [
  { value: "updatedAt:desc", label: "Recently Updated" },
  { value: "updatedAt:asc", label: "Oldest Updated" },
  { value: "sortOrder:asc", label: "Sort Order (Low to High)" },
  { value: "sortOrder:desc", label: "Sort Order (High to Low)" },
];

const VisaTypesListPage = () => {
  const toast = useToast();
  const [filters, setFilters] = React.useState({
    page: 1,
    limit: 10,
    search: "",
    isActive: "",
    countrySlug: "",
    sort: "updatedAt:desc",
  });

  const listQuery = useAdminVisaTypesQuery(filters);
  const toggleMutation = useToggleAdminVisaTypeStatusMutation();
  const deleteMutation = useDeleteAdminVisaTypeMutation();

  const rows = listQuery.data?.items || [];
  const pagination = listQuery.data?.pagination || { page: 1, totalPages: 1 };

  const handleToggle = async (row) => {
    try {
      await toggleMutation.mutateAsync({ id: row._id, payload: { isActive: !row.isActive } });
      toast.success(`Visa type ${row.isActive ? "deactivated" : "activated"}`);
    } catch (error) {
      toast.error(error.message || "Failed to toggle visa type status");
    }
  };

  const handleDelete = async (row) => {
    if (!window.confirm(`Delete ${row.countrySlug}/${row.visaTypeSlug}? This cannot be undone.`)) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(row._id);
      toast.success("Visa type deleted");
    } catch (error) {
      toast.error(error.message || "Failed to delete visa type");
    }
  };

  const columns = [
    {
      key: "country",
      label: "Country",
      render: (row) => (
        <div>
          <p className="font-medium text-slate-900">{row.countryName}</p>
          <p className="text-xs text-slate-500 mt-1">{row.countrySlug}</p>
        </div>
      ),
    },
    {
      key: "visaType",
      label: "Visa Type",
      render: (row) => (
        <div>
          <p className="font-medium text-slate-900">{row.visaTypeName}</p>
          <p className="text-xs text-slate-500 mt-1">{row.visaTypeSlug}</p>
        </div>
      ),
    },
    {
      key: "title",
      label: "Title",
      render: (row) => <span>{row.title}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <Badge variant={row.isActive ? "success" : "danger"}>{row.isActive ? "Active" : "Inactive"}</Badge>,
    },
    {
      key: "sortOrder",
      label: "Sort Order",
      render: (row) => <span>{row.sortOrder ?? 0}</span>,
    },
    {
      key: "updatedAt",
      label: "Updated",
      render: (row) => <span>{row.updatedAt ? new Date(row.updatedAt).toLocaleString() : "-"}</span>,
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to={`/admin/visa-types/${row._id}/edit`}
            className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            View/Edit
          </Link>
          <Button size="sm" variant="secondary" onClick={() => handleToggle(row)}>
            {row.isActive ? "Disable" : "Enable"}
          </Button>
          <Button size="sm" variant="danger" onClick={() => handleDelete(row)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Visa Type Content</h1>
          <p className="mt-1 text-sm text-slate-600">
            Manage country + visa-type page content, publishing status, and ordering.
          </p>
        </div>

        <Link to="/admin/visa-types/new" className="w-full sm:w-auto">
          <Button className="w-full">Create Visa Type</Button>
        </Link>
      </div>

      <FiltersBar>
        <Input
          value={filters.search}
          onChange={(event) => setFilters((current) => ({ ...current, page: 1, search: event.target.value }))}
          placeholder="Search country, visa type, title"
        />

        <Input
          value={filters.countrySlug}
          onChange={(event) => setFilters((current) => ({ ...current, page: 1, countrySlug: event.target.value }))}
          placeholder="Filter by country slug"
        />

        <select
          value={filters.isActive}
          onChange={(event) => setFilters((current) => ({ ...current, page: 1, isActive: event.target.value }))}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          value={filters.sort}
          onChange={(event) => setFilters((current) => ({ ...current, page: 1, sort: event.target.value }))}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </FiltersBar>

      <DataTable
        columns={columns}
        rows={rows}
        loading={listQuery.isLoading}
        page={pagination.page || filters.page}
        totalPages={pagination.totalPages || 1}
        onPageChange={(page) => setFilters((current) => ({ ...current, page }))}
      />
    </section>
  );
};

export default VisaTypesListPage;
