import React from "react";
import { Link } from "react-router-dom";
import Badge from "../../../shared/ui/Badge";
import DataTable from "../../../shared/ui/DataTable";
import Button from "../../../shared/ui/Button";
import LeadsFiltersBar from "../components/LeadsFiltersBar";
import LeadStageSelect from "../components/LeadStageSelect";
import LeadAssignDrawer from "../components/LeadAssignDrawer";
import {
  useAssignLeadMutation,
  useAssignableStaffQuery,
  useLeadsQuery,
  useUpdateLeadStageMutation,
} from "../hooks";
import { useToast } from "../../../app/providers/ToastProvider";

const stageVariant = {
  new: "info",
  contacted: "warning",
  qualified: "success",
  converted: "success",
  lost: "danger",
};

const LeadsListPage = () => {
  const toast = useToast();
  const [filters, setFilters] = React.useState({
    page: 1,
    limit: 10,
    search: "",
    stage: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const [selectedLead, setSelectedLead] = React.useState(null);

  const leadsQuery = useLeadsQuery(filters);
  const staffQuery = useAssignableStaffQuery();
  const updateStageMutation = useUpdateLeadStageMutation();
  const assignLeadMutation = useAssignLeadMutation();

  const rows = leadsQuery.data?.items || [];
  const pagination = leadsQuery.data?.pagination || { page: 1, totalPages: 1 };

  const handleStageUpdate = async (leadId, stage) => {
    try {
      await updateStageMutation.mutateAsync({ leadId, payload: { stage } });
      toast.success("Lead stage updated");
    } catch (error) {
      toast.error(error.message || "Failed to update stage");
    }
  };

  const handleAssign = async (values) => {
    try {
      await assignLeadMutation.mutateAsync({
        leadId: selectedLead?._id,
        payload: values,
      });
      toast.success("Lead assigned");
    } catch (error) {
      toast.error(error.message || "Failed to assign lead");
      throw error;
    }
  };

  const columns = [
    {
      key: "fullName",
      label: "Lead",
      sortable: true,
      render: (row) => (
        <div>
          <p className="font-medium text-slate-900">{row.fullName}</p>
          <p className="text-xs text-slate-500 mt-1">{row.email}</p>
          <p className="text-xs text-slate-500">{row.phone}</p>
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
      key: "source",
      label: "Source",
      sortable: true,
      render: (row) => <span className="capitalize">{row.source || "-"}</span>,
    },
    {
      key: "stage",
      label: "Stage",
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-2">
          <Badge variant={stageVariant[row.stage] || "neutral"}>{row.stage}</Badge>
          <LeadStageSelect
            value={row.stage}
            onChange={(stage) => handleStageUpdate(row._id, stage)}
            disabled={updateStageMutation.isPending}
          />
        </div>
      ),
    },
    {
      key: "assignedTo",
      label: "Assigned",
      render: (row) => (
        <span className="text-xs text-slate-600">
          {row.assignedTo?.email || row.assignedTo?.firstName || "Unassigned"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" onClick={() => setSelectedLead(row)}>
            Assign
          </Button>
          <Button size="sm" type="button" onClick={() => handleStageUpdate(row._id, "converted")}>
            Convert
          </Button>
          <Link
            to={`/admin/leads/${row._id}`}
            state={{ lead: row }}
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
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Lead Management</h1>
          <p className="text-sm text-slate-600 mt-1">Track stages, assign staff, and convert qualified leads.</p>
        </div>
      </div>

      <LeadsFiltersBar filters={filters} setFilters={setFilters} />

      <DataTable
        columns={columns}
        rows={rows}
        loading={leadsQuery.isLoading}
        page={pagination.page || filters.page}
        totalPages={pagination.totalPages || 1}
        sortBy={filters.sortBy}
        sortOrder={filters.sortOrder}
        onPageChange={(nextPage) => setFilters((current) => ({ ...current, page: nextPage }))}
        onSortChange={(sortBy, sortOrder) => setFilters((current) => ({ ...current, sortBy, sortOrder, page: 1 }))}
      />

      <LeadAssignDrawer
        open={Boolean(selectedLead)}
        onClose={() => setSelectedLead(null)}
        lead={selectedLead}
        staffOptions={staffQuery.data || []}
        onAssign={handleAssign}
        loading={assignLeadMutation.isPending}
      />
    </section>
  );
};

export default LeadsListPage;
