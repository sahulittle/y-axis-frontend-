import React from "react";
import { useToast } from "../../../app/providers/ToastProvider";
import Badge from "../../../shared/ui/Badge";
import Button from "../../../shared/ui/Button";
import DataTable from "../../../shared/ui/DataTable";
import FiltersBar from "../../../shared/ui/FiltersBar";
import Input from "../../../shared/ui/Input";
import {
  useApplicationDetailQuery,
  useApplicationsQuery,
  useArchiveApplicationMutation,
  useUpdateApplicationNotesMutation,
  useUpdateApplicationStatusMutation,
} from "../hooks";

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

const formatStatusLabel = (value = "") => value.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

const statusBadgeVariant = (status = "") => {
  if (["approved", "completed"].includes(status)) {
    return "success";
  }
  if (["rejected", "cancelled"].includes(status)) {
    return "danger";
  }
  return "default";
};

const ApplicationsPage = () => {
  const toast = useToast();

  const [filters, setFilters] = React.useState({
    page: 1,
    limit: 10,
    search: "",
    status: "",
  });

  const [selectedId, setSelectedId] = React.useState(null);
  const [statusDraft, setStatusDraft] = React.useState("submitted");
  const [statusNote, setStatusNote] = React.useState("");
  const [adminNotesDraft, setAdminNotesDraft] = React.useState("");

  const listQuery = useApplicationsQuery(filters);
  const detailQuery = useApplicationDetailQuery(selectedId, { enabled: Boolean(selectedId) });
  const statusMutation = useUpdateApplicationStatusMutation();
  const notesMutation = useUpdateApplicationNotesMutation();
  const archiveMutation = useArchiveApplicationMutation();

  const rows = listQuery.data?.items || [];
  const pagination = listQuery.data?.pagination || { page: 1, totalPages: 1 };

  React.useEffect(() => {
    if (!detailQuery.data) {
      return;
    }

    setStatusDraft(detailQuery.data.status || "submitted");
    setAdminNotesDraft(detailQuery.data.adminNotes || "");
  }, [detailQuery.data]);

  const handleSelect = (row) => {
    setSelectedId(row._id);
    setStatusNote("");
  };

  const handleStatusUpdate = async () => {
    if (!selectedId) {
      return;
    }

    try {
      await statusMutation.mutateAsync({
        id: selectedId,
        payload: {
          status: statusDraft,
          note: statusNote.trim(),
          adminNotes: adminNotesDraft.trim(),
        },
      });
      setStatusNote("");
      toast.success("Application status updated");
    } catch (error) {
      toast.error(error.message || "Failed to update application status");
    }
  };

  const handleNotesSave = async () => {
    if (!selectedId) {
      return;
    }

    try {
      await notesMutation.mutateAsync({
        id: selectedId,
        payload: { adminNotes: adminNotesDraft.trim() },
      });
      toast.success("Application notes updated");
    } catch (error) {
      toast.error(error.message || "Failed to update notes");
    }
  };

  const handleArchive = async () => {
    if (!selectedId) {
      return;
    }

    if (!window.confirm("Archive this application?")) {
      return;
    }

    try {
      await archiveMutation.mutateAsync(selectedId);
      toast.success("Application archived");
      setSelectedId(null);
    } catch (error) {
      toast.error(error.message || "Failed to archive application");
    }
  };

  const columns = [
    {
      key: "applicationNumber",
      label: "Application",
      render: (row) => (
        <div>
          <p className="font-medium text-slate-900">{row.applicationNumber || "-"}</p>
          <p className="mt-1 text-xs text-slate-500">{row.countrySlug}/{row.visaTypeSlug}</p>
        </div>
      ),
    },
    {
      key: "applicant",
      label: "Applicant",
      render: (row) => (
        <div>
          <p className="font-medium text-slate-900">
            {row.applicantDetails?.firstName || ""} {row.applicantDetails?.lastName || ""}
          </p>
          <p className="mt-1 text-xs text-slate-500">{row.applicantDetails?.email || row.userId?.email || "-"}</p>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <Badge variant={statusBadgeVariant(row.status)}>{formatStatusLabel(row.status)}</Badge>,
    },
    {
      key: "appliedAt",
      label: "Submitted",
      render: (row) => (row.appliedAt ? new Date(row.appliedAt).toLocaleString() : "-"),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <Button size="sm" variant="secondary" onClick={() => handleSelect(row)}>
          {selectedId === row._id ? "Selected" : "Manage"}
        </Button>
      ),
    },
  ];

  const selectedApplication = detailQuery.data;

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Applications</h1>
        <p className="mt-1 text-sm text-slate-600">Review submitted applications, update workflow status, and maintain notes.</p>
      </div>

      <FiltersBar>
        <Input
          value={filters.search}
          onChange={(event) => setFilters((current) => ({ ...current, page: 1, search: event.target.value }))}
          placeholder="Search application number, name, email"
        />

        <select
          value={filters.status}
          onChange={(event) => setFilters((current) => ({ ...current, page: 1, status: event.target.value }))}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="">All Status</option>
          {APPLICATION_STATUSES.map((status) => (
            <option key={status} value={status}>
              {formatStatusLabel(status)}
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

      {selectedId ? (
        <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 md:p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Manage Application</h2>
              <p className="text-sm text-slate-600">
                {selectedApplication?.applicationNumber || "Loading..."}
              </p>
            </div>
            <Button type="button" variant="secondary" onClick={() => setSelectedId(null)}>
              Close
            </Button>
          </div>

          {detailQuery.isLoading ? <p className="text-sm text-slate-500">Loading application details...</p> : null}

          {selectedApplication ? (
            <>
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Status</label>
                  <select
                    value={statusDraft}
                    onChange={(event) => setStatusDraft(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                  >
                    {APPLICATION_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {formatStatusLabel(status)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Status Note</label>
                  <Input
                    value={statusNote}
                    onChange={(event) => setStatusNote(event.target.value)}
                    placeholder="Optional note for status history"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Admin Notes</label>
                <textarea
                  rows={4}
                  value={adminNotesDraft}
                  onChange={(event) => setAdminNotesDraft(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  onClick={handleStatusUpdate}
                  disabled={statusMutation.isPending}
                >
                  Update Status
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleNotesSave}
                  disabled={notesMutation.isPending}
                >
                  Save Notes
                </Button>
                <Button
                  type="button"
                  variant="danger"
                  onClick={handleArchive}
                  disabled={archiveMutation.isPending}
                >
                  Archive Application
                </Button>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
                <p>
                  Applicant: {selectedApplication.applicantDetails?.firstName || ""} {selectedApplication.applicantDetails?.lastName || ""}
                </p>
                <p>Email: {selectedApplication.applicantDetails?.email || selectedApplication.userId?.email || "-"}</p>
                <p>Phone: {selectedApplication.applicantDetails?.phone || selectedApplication.userId?.phone || "-"}</p>
              </div>
            </>
          ) : null}
        </div>
      ) : null}
    </section>
  );
};

export default ApplicationsPage;
