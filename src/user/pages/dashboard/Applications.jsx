import React from "react";
import { Link } from "react-router-dom";
import Badge from "../../../shared/ui/Badge";
import DataTable from "../../../shared/ui/DataTable";
import FiltersBar from "../../../shared/ui/FiltersBar";
import Input from "../../../shared/ui/Input";
import { useUserApplicationsQuery } from "./hooks";

const APPLICATION_STATUSES = [
  "draft",
  "submitted",
  "under_review",
  "documents_requested",
  "documents_received",
  "in_process",
  "approved",
  "rejected",
  "on_hold",
  "completed",
  "cancelled",
];

const formatLabel = (value = "") => value.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

const statusVariant = (status = "") => {
  if (["approved", "completed"].includes(status)) {
    return "success";
  }
  if (["rejected", "cancelled"].includes(status)) {
    return "danger";
  }
  if (["under_review", "in_process", "documents_requested", "documents_received", "on_hold"].includes(status)) {
    return "warning";
  }
  return "neutral";
};

const UserApplicationsPage = () => {
  const [filters, setFilters] = React.useState({
    page: 1,
    limit: 10,
    search: "",
    status: "",
  });

  const applicationsQuery = useUserApplicationsQuery(filters);

  const rows = applicationsQuery.data?.items || [];
  const pagination = applicationsQuery.data?.pagination || { page: 1, totalPages: 1 };

  const columns = [
    {
      key: "applicationNumber",
      label: "Application",
      render: (row) => (
        <div>
          <p className="font-medium text-slate-900">{row.applicationNumber || "-"}</p>
          <p className="mt-1 text-xs text-slate-500">
            {(row.countryId?.name || row.countrySlug || "-")}/{row.visaTypeSlug || row.countryVisaTypeId?.title || "-"}
          </p>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <Badge variant={statusVariant(row.status)}>{formatLabel(row.status)}</Badge>,
    },
    {
      key: "appliedAt",
      label: "Submitted",
      render: (row) => (row.appliedAt ? new Date(row.appliedAt).toLocaleString() : "-"),
    },
    {
      key: "actions",
      label: "Details",
      render: (row) => (
        <Link
          to={`/user/applications/${row._id}`}
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
        >
          View
        </Link>
      ),
    },
  ];

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-slate-900">My Applications</h2>
        <p className="mt-1 text-sm text-slate-600">Track application statuses and open each record for full details.</p>
      </div>

      <FiltersBar>
        <Input
          value={filters.search}
          onChange={(event) => setFilters((current) => ({ ...current, page: 1, search: event.target.value }))}
          placeholder="Search application number"
        />

        <select
          value={filters.status}
          onChange={(event) => setFilters((current) => ({ ...current, page: 1, status: event.target.value }))}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="">All Status</option>
          {APPLICATION_STATUSES.map((status) => (
            <option key={status} value={status}>
              {formatLabel(status)}
            </option>
          ))}
        </select>
      </FiltersBar>

      <DataTable
        columns={columns}
        rows={rows}
        loading={applicationsQuery.isLoading}
        page={pagination.page || filters.page}
        totalPages={pagination.totalPages || 1}
        onPageChange={(page) => setFilters((current) => ({ ...current, page }))}
      />
    </section>
  );
};

export default UserApplicationsPage;
