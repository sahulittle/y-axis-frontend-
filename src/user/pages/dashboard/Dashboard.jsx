import React from "react";
import { Link } from "react-router-dom";
import Badge from "../../../shared/ui/Badge";
import Button from "../../../shared/ui/Button";
import StatsCard from "../../../shared/ui/StatsCard";
import { useUserApplicationsQuery, useUserDashboardSummaryQuery, useUserTicketsQuery } from "./hooks";

const formatLabel = (value = "") => value.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

const statusVariant = (status = "") => {
  if (["approved", "completed", "resolved"].includes(status)) {
    return "success";
  }
  if (["rejected", "cancelled", "closed"].includes(status)) {
    return "danger";
  }
  if (["under_review", "in_process", "documents_requested", "documents_received", "open", "in_progress"].includes(status)) {
    return "warning";
  }
  return "neutral";
};

const Dashboard = () => {
  const summaryQuery = useUserDashboardSummaryQuery();
  const applicationsQuery = useUserApplicationsQuery({ page: 1, limit: 5 });
  const ticketsQuery = useUserTicketsQuery({ page: 1, limit: 5 });

  if (summaryQuery.isLoading) {
    return <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">Loading dashboard...</div>;
  }

  if (summaryQuery.error) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
        {summaryQuery.error.message || "Failed to load dashboard"}
      </div>
    );
  }

  const summary = summaryQuery.data || {
    totalApplications: 0,
    activeApplications: 0,
    completedApplications: 0,
    openSupportTickets: 0,
  };

  const recentApplications = applicationsQuery.data?.items || [];
  const recentTickets = ticketsQuery.data?.items || [];

  return (
    <section className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard label="Total Applications" value={summary.totalApplications || 0} hint="All time" />
        <StatsCard label="Active Applications" value={summary.activeApplications || 0} hint="In progress" />
        <StatsCard label="Completed" value={summary.completedApplications || 0} hint="Approved or completed" />
        <StatsCard label="Open Tickets" value={summary.openSupportTickets || 0} hint="Open and in progress" />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900">Recent Applications</h3>
            <Link to="/user/applications" className="text-sm font-medium text-teal-700 hover:text-teal-800">
              View all
            </Link>
          </div>

          <div className="mt-3 space-y-2">
            {recentApplications.length === 0 ? (
              <p className="text-sm text-slate-500">No applications found.</p>
            ) : (
              recentApplications.map((item) => (
                <div key={item._id} className="rounded-xl border border-slate-200 p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-900">{item.applicationNumber || "-"}</p>
                    <Badge variant={statusVariant(item.status)}>{formatLabel(item.status)}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {(item.countryId?.name || item.countrySlug || "-")}/{item.visaTypeSlug || item.countryVisaTypeId?.title || "-"}
                  </p>
                  <div className="mt-2">
                    <Link to={`/user/applications/${item._id}`} className="text-xs font-medium text-teal-700 hover:text-teal-800">
                      Open details
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900">Recent Support Tickets</h3>
            <Link to="/user/tickets" className="text-sm font-medium text-teal-700 hover:text-teal-800">
              View all
            </Link>
          </div>

          <div className="mt-3 space-y-2">
            {recentTickets.length === 0 ? (
              <p className="text-sm text-slate-500">No tickets found.</p>
            ) : (
              recentTickets.map((item) => (
                <div key={item._id} className="rounded-xl border border-slate-200 p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-900">{item.ticketNumber || "-"}</p>
                    <Badge variant={statusVariant(item.status)}>{formatLabel(item.status)}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-slate-700">{item.subject}</p>
                  <div className="mt-2">
                    <Link to={`/user/tickets/${item._id}`} className="text-xs font-medium text-teal-700 hover:text-teal-800">
                      Open conversation
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </article>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link to="/user/applications">
          <Button variant="secondary">Go to Applications</Button>
        </Link>
        <Link to="/user/tickets">
          <Button variant="secondary">Go to Tickets</Button>
        </Link>
        <Link to="/user/documents">
          <Button variant="secondary">Go to Documents</Button>
        </Link>
        <Link to="/user/appointments">
          <Button variant="secondary">Go to Appointments</Button>
        </Link>
        <Link to="/user/profile">
          <Button variant="secondary">Edit Profile</Button>
        </Link>
      </div>
    </section>
  );
};

export default Dashboard;