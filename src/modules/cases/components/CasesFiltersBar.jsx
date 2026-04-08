import React from "react";
import FiltersBar from "../../../shared/ui/FiltersBar";
import Input from "../../../shared/ui/Input";

const CasesFiltersBar = ({ filters, setFilters }) => {
  return (
    <FiltersBar>
      <Input
        value={filters.search}
        onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value, page: 1 }))}
        placeholder="Search case id, country, visa"
      />
      <select
        value={filters.caseStatus}
        onChange={(event) => setFilters((current) => ({ ...current, caseStatus: event.target.value, page: 1 }))}
        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
      >
        <option value="">All Statuses</option>
        <option value="inquiry_received">Inquiry Received</option>
        <option value="screening_pending">Screening Pending</option>
        <option value="documents_pending">Documents Pending</option>
        <option value="review_in_progress">Review in Progress</option>
        <option value="appointment_pending">Appointment Pending</option>
        <option value="submitted">Submitted</option>
        <option value="approved">Approved</option>
        <option value="refused">Refused</option>
        <option value="closed">Closed</option>
      </select>
      <select
        value={filters.priority}
        onChange={(event) => setFilters((current) => ({ ...current, priority: event.target.value, page: 1 }))}
        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
      >
        <option value="">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="critical">Critical</option>
      </select>
      <select
        value={filters.sortBy}
        onChange={(event) => setFilters((current) => ({ ...current, sortBy: event.target.value, page: 1 }))}
        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
      >
        <option value="createdAt">Sort by Created Date</option>
        <option value="caseId">Sort by Case ID</option>
        <option value="caseStatus">Sort by Status</option>
      </select>
    </FiltersBar>
  );
};

export default CasesFiltersBar;
