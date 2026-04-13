import React from "react";
import StatsCard from "../../../shared/ui/StatsCard";
import { useApplicationsReportQuery, useConversionReportQuery, useRevenueReportQuery, useStaffPerformanceReportQuery } from "../hooks";

const ReportsPage = () => {
  const revenueQuery = useRevenueReportQuery();
  const conversionQuery = useConversionReportQuery();
  const staffQuery = useStaffPerformanceReportQuery();
  const applicationsQuery = useApplicationsReportQuery();

  const revenueSummary = revenueQuery.data?.summary || { totalPaid: 0, totalBilled: 0 };
  const conversion = conversionQuery.data || { totalLeads: 0, convertedLeads: 0, conversionRate: 0 };
  const staffItems = staffQuery.data?.items || [];
  const applicationItems = applicationsQuery.data?.items || [];

  return (
    <section className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
        <p className="mt-1 text-sm text-slate-600">Operational revenue, conversion, application, and staff performance metrics.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard label="Total Paid" value={revenueSummary.totalPaid || 0} hint="Revenue report" />
        <StatsCard label="Total Billed" value={revenueSummary.totalBilled || 0} hint="Invoice totals" />
        <StatsCard label="Converted Leads" value={conversion.convertedLeads || 0} hint={`Rate ${conversion.conversionRate || 0}%`} />
        <StatsCard label="Total Leads" value={conversion.totalLeads || 0} hint="Conversion base" />
      </div>

      <article className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">Staff Performance</h2>
        <div className="mt-4 space-y-2">
          {staffItems.length === 0 ? <p className="text-sm text-slate-500">No staff metrics available.</p> : null}
          {staffItems.map((item) => (
            <div key={item._id} className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700">
              {(item.staff?.[0]?.email || item._id) + ` | Active ${item.activeCases || 0} | Closed ${item.closedCases || 0}`}
            </div>
          ))}
        </div>
      </article>

      <article className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">Applications by Status</h2>
        <div className="mt-4 space-y-2">
          {applicationItems.length === 0 ? <p className="text-sm text-slate-500">No application status data available.</p> : null}
          {applicationItems.map((item) => (
            <div key={item._id} className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700">
              {`${item._id}: ${item.count}`}
            </div>
          ))}
        </div>
      </article>
    </section>
  );
};

export default ReportsPage;
