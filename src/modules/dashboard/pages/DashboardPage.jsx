import React, { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useDashboardSummaryQuery } from "../hooks";
import StatsCard from "../../../shared/ui/StatsCard";
import Skeleton from "../../../shared/ui/Skeleton";

const KPIGrid = ({ summary }) => {
  const totalLeads = summary.leadCountsByStage.reduce((acc, item) => acc + item.count, 0);
  const activeCases = summary.caseCountsByStatus
    .filter((item) => item._id !== "closed")
    .reduce((acc, item) => acc + item.count, 0);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatsCard label="Total Leads" value={totalLeads} hint="Across all stages" />
      <StatsCard label="Active Cases" value={activeCases} hint="Excluding closed" />
      <StatsCard label="Pending Documents" value={summary.pendingDocumentCount} hint="Checklist pending items" />
      <StatsCard
        label="Revenue Paid"
        value={new Intl.NumberFormat("en-IN").format(summary.revenueSummary.totalPaid || 0)}
        hint="Total paid amount"
      />
    </div>
  );
};

const DashboardPage = () => {
  const summaryQuery = useDashboardSummaryQuery();

  const leadSourceData = useMemo(() => {
    return (summaryQuery.data?.leadCountsByStage || []).map((item) => ({
      name: item._id,
      value: item.count,
    }));
  }, [summaryQuery.data]);

  if (summaryQuery.isLoading) {
    return (
      <section className="space-y-4">
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-64 w-full" />
      </section>
    );
  }

  if (summaryQuery.error) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-800">
        {summaryQuery.error.message || "Failed to load dashboard summary"}
      </div>
    );
  }

  const summary = summaryQuery.data || {
    leadCountsByStage: [],
    caseCountsByStatus: [],
    revenueSummary: { totalPaid: 0 },
    pendingDocumentCount: 0,
    staffWorkload: [],
    upcomingAppointments: [],
  };

  return (
    <section className="space-y-5">
      <KPIGrid summary={summary} />

      <div className="grid gap-5 xl:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-slate-900">Cases by Status</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={summary.caseCountsByStatus}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#0f766e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-slate-900">Leads by Stage</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={leadSourceData} dataKey="value" nameKey="name" outerRadius={95} fill="#0891b2" label />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </article>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-slate-900">Staff Workload</h2>
          <div className="mt-4 space-y-3">
            {(summary.staffWorkload || []).slice(0, 8).map((item) => (
              <div key={item._id} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                <span className="text-sm text-slate-700">{item.staff?.[0]?.email || item._id}</span>
                <span className="text-sm font-semibold text-slate-900">{item.activeCaseCount} cases</span>
              </div>
            ))}
            {summary.staffWorkload?.length === 0 ? (
              <p className="text-sm text-slate-500">No workload data available.</p>
            ) : null}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-slate-900">Upcoming Appointments</h2>
          <div className="mt-4 space-y-3">
            {(summary.upcomingAppointments || []).slice(0, 8).map((item) => (
              <div key={item._id} className="rounded-xl border border-slate-200 px-3 py-2">
                <p className="text-sm font-medium text-slate-900">{item.appointmentType}</p>
                <p className="text-xs text-slate-500 mt-1">
                  {new Date(item.appointmentDate).toLocaleString()} at {item.center}
                </p>
              </div>
            ))}
            {summary.upcomingAppointments?.length === 0 ? (
              <p className="text-sm text-slate-500">No upcoming appointments.</p>
            ) : null}
          </div>
        </article>
      </div>
    </section>
  );
};

export default DashboardPage;
