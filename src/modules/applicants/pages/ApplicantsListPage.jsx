import React from "react";
import { Link } from "react-router-dom";
import DataTable from "../../../shared/ui/DataTable";
import Badge from "../../../shared/ui/Badge";
import ApplicantsFiltersBar from "../components/ApplicantsFiltersBar";
import { useApplicantsQuery } from "../hooks";

const consentVariant = {
  true: "success",
  false: "warning",
};

const ApplicantsListPage = () => {
  const [filters, setFilters] = React.useState({
    page: 1,
    limit: 10,
    search: "",
    nationality: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const applicantsQuery = useApplicantsQuery(filters);
  const rows = applicantsQuery.data?.items || [];
  const pagination = applicantsQuery.data?.pagination || { page: 1, totalPages: 1 };

  const columns = [
    {
      key: "fullName",
      label: "Applicant",
      sortable: true,
      render: (row) => (
        <div>
          <p className="font-medium text-slate-900">{row.fullName}</p>
          <p className="mt-1 text-xs text-slate-500">{row.email}</p>
          <p className="text-xs text-slate-500">{row.phone}</p>
        </div>
      ),
    },
    {
      key: "nationality",
      label: "Nationality",
      sortable: true,
      render: (row) => <span>{row.nationality || "-"}</span>,
    },
    {
      key: "passport",
      label: "Passport",
      render: (row) => <span>{row.passport?.passportNumber || "-"}</span>,
    },
    {
      key: "consents",
      label: "Consents",
      render: (row) => (
        <div className="flex flex-wrap gap-1.5">
          <Badge variant={consentVariant[String(Boolean(row.consentAccepted))]}>
            Consent {row.consentAccepted ? "Yes" : "No"}
          </Badge>
          <Badge variant={consentVariant[String(Boolean(row.disclaimerAccepted))]}>
            Disclaimer {row.disclaimerAccepted ? "Yes" : "No"}
          </Badge>
        </div>
      ),
    },
    {
      key: "lead",
      label: "Lead Link",
      render: (row) => (
        <span className="text-xs text-slate-600">
          {row.leadId ? row.leadId : "Direct applicant"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <Link
          to={`/admin/applicants/${row._id}`}
          state={{ applicant: row }}
          className="text-xs font-semibold text-teal-700 hover:text-teal-800"
        >
          View profile
        </Link>
      ),
    },
  ];

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Applicant Management</h1>
        <p className="mt-1 text-sm text-slate-600">View applicant profiles, identity records, and consent status.</p>
      </div>

      <ApplicantsFiltersBar filters={filters} setFilters={setFilters} />

      <DataTable
        columns={columns}
        rows={rows}
        loading={applicantsQuery.isLoading}
        page={pagination.page || filters.page}
        totalPages={pagination.totalPages || 1}
        sortBy={filters.sortBy}
        sortOrder={filters.sortOrder}
        onPageChange={(nextPage) => setFilters((current) => ({ ...current, page: nextPage }))}
        onSortChange={(sortBy, sortOrder) => setFilters((current) => ({ ...current, sortBy, sortOrder, page: 1 }))}
      />
    </section>
  );
};

export default ApplicantsListPage;
