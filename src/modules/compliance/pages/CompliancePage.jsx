import React from "react";
import DataTable from "../../../shared/ui/DataTable";
import StatsCard from "../../../shared/ui/StatsCard";
import { useComplianceLogsQuery, useComplianceSummaryQuery } from "../hooks";

const CompliancePage = () => {
  const [params, setParams] = React.useState({ page: 1, limit: 10, sortBy: "createdAt", sortOrder: "desc" });

  const logsQuery = useComplianceLogsQuery(params);
  const summaryQuery = useComplianceSummaryQuery();

  const logs = logsQuery.data?.items || [];
  const pagination = logsQuery.data?.pagination || { page: 1, totalPages: 1 };
  const summary = summaryQuery.data || { totalLogs: 0, sensitiveLogs: 0, byAction: [] };

  const columns = [
    { key: "actionType", label: "Action", render: (row) => row.actionType || "-" },
    { key: "entityType", label: "Entity", render: (row) => row.entityType || "-" },
    { key: "message", label: "Message", render: (row) => row.message || "-" },
    { key: "createdAt", label: "Time", render: (row) => (row.createdAt ? new Date(row.createdAt).toLocaleString() : "-") },
  ];

  return (
    <section className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Compliance</h1>
        <p className="mt-1 text-sm text-slate-600">Review audit logs and governance summary metrics.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <StatsCard label="Total Logs" value={summary.totalLogs || 0} hint="All audit records" />
        <StatsCard label="Sensitive Logs" value={summary.sensitiveLogs || 0} hint="Sensitive activity count" />
        <StatsCard label="Action Types" value={(summary.byAction || []).length} hint="Distinct action groups" />
      </div>

      <DataTable
        columns={columns}
        rows={logs}
        loading={logsQuery.isLoading}
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

export default CompliancePage;
