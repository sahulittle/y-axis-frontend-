import React from "react";
import { useToast } from "../../../app/providers/ToastProvider";
import Badge from "../../../shared/ui/Badge";
import Button from "../../../shared/ui/Button";
import DataTable from "../../../shared/ui/DataTable";
import FiltersBar from "../../../shared/ui/FiltersBar";
import Input from "../../../shared/ui/Input";
import {
  useDeleteEnquiryMutation,
  useEnquiriesQuery,
  useEnquiryDetailQuery,
  useUpdateEnquiryNotesMutation,
  useUpdateEnquiryStatusMutation,
} from "../hooks";

const ENQUIRY_STATUSES = ["new", "contacted", "qualified", "converted", "closed", "spam"];
const ENQUIRY_TYPES = [
  "migration_consultation",
  "study_visa_consultation",
  "general_visa_help",
  "callback_request",
  "contact_form",
];

const formatLabel = (value = "") => value.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

const statusBadgeVariant = (status = "") => {
  if (status === "converted") {
    return "success";
  }
  if (["closed", "spam"].includes(status)) {
    return "danger";
  }
  return "default";
};

const EnquiriesPage = () => {
  const toast = useToast();

  const [filters, setFilters] = React.useState({
    page: 1,
    limit: 10,
    search: "",
    status: "",
    enquiryType: "",
  });

  const [selectedId, setSelectedId] = React.useState(null);
  const [statusDraft, setStatusDraft] = React.useState("new");
  const [adminNotesDraft, setAdminNotesDraft] = React.useState("");

  const listQuery = useEnquiriesQuery(filters);
  const detailQuery = useEnquiryDetailQuery(selectedId, { enabled: Boolean(selectedId) });
  const statusMutation = useUpdateEnquiryStatusMutation();
  const notesMutation = useUpdateEnquiryNotesMutation();
  const deleteMutation = useDeleteEnquiryMutation();

  const rows = listQuery.data?.items || [];
  const pagination = listQuery.data?.pagination || { page: 1, totalPages: 1 };

  React.useEffect(() => {
    if (!detailQuery.data) {
      return;
    }

    setStatusDraft(detailQuery.data.status || "new");
    setAdminNotesDraft(detailQuery.data.adminNotes || "");
  }, [detailQuery.data]);

  const handleSelect = (row) => {
    setSelectedId(row._id);
  };

  const handleStatusSave = async () => {
    if (!selectedId) {
      return;
    }

    try {
      await statusMutation.mutateAsync({ id: selectedId, payload: { status: statusDraft } });
      toast.success("Enquiry status updated");
    } catch (error) {
      toast.error(error.message || "Failed to update enquiry status");
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
      toast.success("Enquiry notes updated");
    } catch (error) {
      toast.error(error.message || "Failed to update enquiry notes");
    }
  };

  const handleDelete = async () => {
    if (!selectedId) {
      return;
    }

    if (!window.confirm("Delete this enquiry?")) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(selectedId);
      toast.success("Enquiry deleted");
      setSelectedId(null);
    } catch (error) {
      toast.error(error.message || "Failed to delete enquiry");
    }
  };

  const columns = [
    {
      key: "enquiryNumber",
      label: "Enquiry",
      render: (row) => (
        <div>
          <p className="font-medium text-slate-900">{row.enquiryNumber || "-"}</p>
          <p className="mt-1 text-xs text-slate-500">{formatLabel(row.enquiryType)}</p>
        </div>
      ),
    },
    {
      key: "contact",
      label: "Contact",
      render: (row) => (
        <div>
          <p className="font-medium text-slate-900">{row.name}</p>
          <p className="mt-1 text-xs text-slate-500">{row.email}</p>
          <p className="mt-1 text-xs text-slate-500">{row.phone || "-"}</p>
        </div>
      ),
    },
    {
      key: "interest",
      label: "Interest",
      render: (row) => (
        <div>
          <p>{row.countryOfInterest || "-"}</p>
          <p className="mt-1 text-xs text-slate-500">{row.visaInterestType || "-"}</p>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <Badge variant={statusBadgeVariant(row.status)}>{formatLabel(row.status)}</Badge>,
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

  const selectedEnquiry = detailQuery.data;

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Enquiries</h1>
        <p className="mt-1 text-sm text-slate-600">Track consultation and contact leads, and maintain qualification notes.</p>
      </div>

      <FiltersBar>
        <Input
          value={filters.search}
          onChange={(event) => setFilters((current) => ({ ...current, page: 1, search: event.target.value }))}
          placeholder="Search enquiry number, name, email"
        />

        <select
          value={filters.status}
          onChange={(event) => setFilters((current) => ({ ...current, page: 1, status: event.target.value }))}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="">All Status</option>
          {ENQUIRY_STATUSES.map((status) => (
            <option key={status} value={status}>
              {formatLabel(status)}
            </option>
          ))}
        </select>

        <select
          value={filters.enquiryType}
          onChange={(event) => setFilters((current) => ({ ...current, page: 1, enquiryType: event.target.value }))}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="">All Enquiry Types</option>
          {ENQUIRY_TYPES.map((type) => (
            <option key={type} value={type}>
              {formatLabel(type)}
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
              <h2 className="text-lg font-semibold text-slate-900">Manage Enquiry</h2>
              <p className="text-sm text-slate-600">{selectedEnquiry?.enquiryNumber || "Loading..."}</p>
            </div>
            <Button type="button" variant="secondary" onClick={() => setSelectedId(null)}>
              Close
            </Button>
          </div>

          {detailQuery.isLoading ? <p className="text-sm text-slate-500">Loading enquiry details...</p> : null}

          {selectedEnquiry ? (
            <>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Status</label>
                <select
                  value={statusDraft}
                  onChange={(event) => setStatusDraft(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                >
                  {ENQUIRY_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {formatLabel(status)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Admin Notes</label>
                <textarea
                  rows={5}
                  value={adminNotesDraft}
                  onChange={(event) => setAdminNotesDraft(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Button type="button" onClick={handleStatusSave} disabled={statusMutation.isPending}>
                  Update Status
                </Button>
                <Button type="button" variant="secondary" onClick={handleNotesSave} disabled={notesMutation.isPending}>
                  Save Notes
                </Button>
                <Button type="button" variant="danger" onClick={handleDelete} disabled={deleteMutation.isPending}>
                  Delete Enquiry
                </Button>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
                <p>Preferred Contact: {selectedEnquiry.preferredContactMethod || "-"}</p>
                <p>Page Source: {selectedEnquiry.pageSource || "-"}</p>
                <p className="mt-2 whitespace-pre-wrap">{selectedEnquiry.message || "No message provided."}</p>
              </div>
            </>
          ) : null}
        </div>
      ) : null}
    </section>
  );
};

export default EnquiriesPage;
