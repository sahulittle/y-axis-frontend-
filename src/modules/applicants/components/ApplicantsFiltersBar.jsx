import React from "react";
import FiltersBar from "../../../shared/ui/FiltersBar";
import Input from "../../../shared/ui/Input";

const ApplicantsFiltersBar = ({ filters, setFilters }) => {
  return (
    <FiltersBar>
      <Input
        value={filters.search}
        onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value, page: 1 }))}
        placeholder="Search name, email, phone, passport"
      />
      <Input
        value={filters.nationality}
        onChange={(event) => setFilters((current) => ({ ...current, nationality: event.target.value, page: 1 }))}
        placeholder="Filter by nationality"
      />
      <select
        value={filters.sortBy}
        onChange={(event) => setFilters((current) => ({ ...current, sortBy: event.target.value, page: 1 }))}
        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
      >
        <option value="createdAt">Sort by Created Date</option>
        <option value="fullName">Sort by Name</option>
        <option value="nationality">Sort by Nationality</option>
      </select>
      <select
        value={filters.sortOrder}
        onChange={(event) => setFilters((current) => ({ ...current, sortOrder: event.target.value, page: 1 }))}
        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
      >
        <option value="desc">Newest First</option>
        <option value="asc">Oldest First</option>
      </select>
    </FiltersBar>
  );
};

export default ApplicantsFiltersBar;
