import React from "react";
import { Link } from "react-router-dom";
import Badge from "../../../shared/ui/Badge";
import Button from "../../../shared/ui/Button";
import DataTable from "../../../shared/ui/DataTable";
import CasesFiltersBar from "../components/CasesFiltersBar";
import CaseStatusSelect from "../components/CaseStatusSelect";
import CaseAssignDrawer from "../components/CaseAssignDrawer";
import {
  useAssignableStaffQuery,
  useAssignCaseStaffMutation,
  useCasesQuery,
  useUpdateCaseStatusMutation,
} from "../hooks";
import { useToast } from "../../../app/providers/ToastProvider";

const statusVariant = {
  inquiry_received: "info",
  screening_pending: "warning",
  documents_pending: "warning",
  documents_received: "info",
  review_in_progress: "info",
  appointment_pending: "warning",
  ready_for_submission: "info",
  submitted: "success",
  additional_docs_requested: "warning",
  interview_scheduled: "info",
  decision_pending: "warning",
  approved: "success",
  refused: "danger",
  closed: "neutral",
};

const priorityVariant = {
  low: "neutral",
  medium: "info",
  high: "warning",
  critical: "danger",
};

const toLabel = (value) => String(value || "").replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

const CasesListPage = () => {
  const toast = useToast();
  const [filters, setFilters] = React.useState({
    page: 1,
    limit: 10,
    search: "",
    caseStatus: "",
    priority: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const [selectedCase, setSelectedCase] = React.useState(null);

  const casesQuery = useCasesQuery(filters);
  const staffQuery = useAssignableStaffQuery();
  const statusMutation = useUpdateCaseStatusMutation();
  const assignMutation = useAssignCaseStaffMutation();

  const rows = casesQuery.data?.items || [];
  const pagination = casesQuery.data?.pagination || { page: 1, totalPages: 1 };

  const updateStatus = async (caseId, caseStatus) => {
    try {
      await statusMutation.mutateAsync({ caseId, payload: { caseStatus } });
      toast.success("Case status updated");
    } catch (error) {
      toast.error(error.message || "Failed to update case status");
    }
  };

  const handleAssign = async (values) => {
    try {
      await assignMutation.mutateAsync({
        caseId: selectedCase?._id,
        payload: values,
      });
      toast.success("Case assignment updated");
    } catch (error) {
      toast.error(error.message || "Failed to assign case");
      throw error;
    }
  };

  const columns = [
    {
      key: "caseId",
      label: "Case",
      sortable: true,
      render: (row) => (
        <div>
          <p className="font-medium text-slate-900">{row.caseId}</p>
          <p className="mt-1 text-xs text-slate-500">Applicant: {row.applicantId?.fullName || "-"}</p>
        </div>
      ),
    },
    {
      key: "destinationCountry",
      label: "Destination",
      sortable: true,
      render: (row) => (
        <div>
          <p className="text-slate-800">{row.destinationCountry}</p>
          <p className="text-xs text-slate-500">{row.visaCategory}</p>
        </div>
      ),
    },
    {
      key: "caseStatus",
      label: "Status",
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-2">
          <Badge variant={statusVariant[row.caseStatus] || "neutral"}>{toLabel(row.caseStatus)}</Badge>
          <CaseStatusSelect
            value={row.caseStatus}
            onChange={(nextStatus) => updateStatus(row._id, nextStatus)}
            disabled={statusMutation.isPending}
          />
        </div>
      ),
    },
    {
      key: "priority",
      label: "Priority",
      sortable: true,
      render: (row) => <Badge variant={priorityVariant[row.priority] || "neutral"}>{toLabel(row.priority)}</Badge>,
    },
    {
      key: "assignedStaff",
      label: "Assigned",
      render: (row) => (
        <span className="text-xs text-slate-600">
          {(row.assignedStaff || []).map((staff) => staff?.email).filter(Boolean).join(", ") || "Unassigned"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" onClick={() => setSelectedCase(row)}>
            Assign
          </Button>
          <Link
            to={`/admin/cases/${row._id}`}
            state={{ caseRecord: row }}
            className="text-xs font-semibold text-teal-700 hover:text-teal-800"
          >
            Details
          </Link>
        </div>
      ),
    },
  ];

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Case Management</h1>
        <p className="mt-1 text-sm text-slate-600">Manage assignment, status progression, and operational notes.</p>
      </div>

      <CasesFiltersBar filters={filters} setFilters={setFilters} />

      <DataTable
        columns={columns}
        rows={rows}
        loading={casesQuery.isLoading}
        page={pagination.page || filters.page}
        totalPages={pagination.totalPages || 1}
        sortBy={filters.sortBy}
        sortOrder={filters.sortOrder}
        onPageChange={(nextPage) => setFilters((current) => ({ ...current, page: nextPage }))}
        onSortChange={(sortBy, sortOrder) => setFilters((current) => ({ ...current, sortBy, sortOrder, page: 1 }))}
      />

      <CaseAssignDrawer
        open={Boolean(selectedCase)}
        onClose={() => setSelectedCase(null)}
        caseRecord={selectedCase}
        staffOptions={staffQuery.data || []}
        onAssign={handleAssign}
        loading={assignMutation.isPending}
      />
    </section>
  );
};

export default CasesListPage;
