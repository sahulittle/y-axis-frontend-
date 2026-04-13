import React from "react";
import Badge from "../../../shared/ui/Badge";
import DataTable from "../../../shared/ui/DataTable";
import FiltersBar from "../../../shared/ui/FiltersBar";
import { useUserAppointmentsQuery } from "./hooks";

const statusVariant = {
  pending: "warning",
  scheduled: "info",
  confirmed: "info",
  rescheduled: "warning",
  completed: "success",
  cancelled: "danger",
  missed: "danger",
};

const formatLabel = (value = "") => value.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

const formatDate = (value) => {
  if (!value) {
    return "-";
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? "-" : parsed.toLocaleString();
};

const getCaseLabel = (value) => {
  if (!value) {
    return "-";
  }

  if (typeof value === "string") {
    return value;
  }

  return value.caseId || value.applicationNumber || value._id || "-";
};

const getApplicantLabel = (value) => {
  if (!value) {
    return "-";
  }

  if (typeof value === "string") {
    return value;
  }

  const fullName = [value.firstName, value.lastName].filter(Boolean).join(" ").trim();
  return fullName || value.fullName || value.email || value._id || "-";
};

const UserAppointmentsPage = () => {
  const [params, setParams] = React.useState({
    page: 1,
    limit: 10,
    sortBy: "appointmentDate",
    sortOrder: "asc",
  });

  const appointmentsQuery = useUserAppointmentsQuery(params);

  const rows = appointmentsQuery.data?.items || [];
  const pagination = appointmentsQuery.data?.pagination || { page: 1, totalPages: 1 };

  const columns = [
    {
      key: "appointmentType",
      label: "Type",
      render: (row) => formatLabel(row.appointmentType || "consultation"),
    },
    {
      key: "appointmentDate",
      label: "Date & Time",
      render: (row) => (
        <div>
          <p className="font-medium text-slate-900">{formatDate(row.appointmentDate)}</p>
          <p className="mt-1 text-xs text-slate-500">{row.appointmentTime || row.timezone || "-"}</p>
        </div>
      ),
    },
    {
      key: "center",
      label: "Center",
      render: (row) => (
        <div>
          <p className="font-medium text-slate-900">{row.center || "-"}</p>
          <p className="mt-1 text-xs text-slate-500">{formatLabel(row.meetingMode || "offline")}</p>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => {
        const status = row.status || row.bookingStatus || "pending";
        return <Badge variant={statusVariant[status] || "neutral"}>{formatLabel(status)}</Badge>;
      },
    },
    {
      key: "caseId",
      label: "Case",
      render: (row) => getCaseLabel(row.caseId),
    },
    {
      key: "applicantId",
      label: "Applicant",
      render: (row) => getApplicantLabel(row.applicantId),
    },
  ];

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-slate-900">My Appointments</h2>
        <p className="mt-1 text-sm text-slate-600">View upcoming and historical appointments for your visa process.</p>
      </div>

      <FiltersBar>
        <select
          value={String(params.limit)}
          onChange={(event) =>
            setParams((current) => ({ ...current, page: 1, limit: Number(event.target.value) || 10 }))
          }
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
          <option value="50">50 per page</option>
        </select>

        <select
          value={params.sortBy}
          onChange={(event) =>
            setParams((current) => ({ ...current, page: 1, sortBy: event.target.value }))
          }
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="appointmentDate">Sort by appointment date</option>
          <option value="createdAt">Sort by created date</option>
          <option value="updatedAt">Sort by updated date</option>
        </select>

        <select
          value={params.sortOrder}
          onChange={(event) =>
            setParams((current) => ({ ...current, page: 1, sortOrder: event.target.value }))
          }
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="asc">Earliest first</option>
          <option value="desc">Latest first</option>
        </select>

        <div className="flex items-center rounded-xl border border-dashed border-slate-300 px-3 py-2 text-xs text-slate-500">
          Status and date are synced from your assigned case workflow.
        </div>
      </FiltersBar>

      <DataTable
        columns={columns}
        rows={rows}
        loading={appointmentsQuery.isLoading}
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

export default UserAppointmentsPage;
