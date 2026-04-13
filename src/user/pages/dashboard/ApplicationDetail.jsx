import React from "react";
import { Link, useParams } from "react-router-dom";
import Badge from "../../../shared/ui/Badge";
import { useUserApplicationDetailQuery } from "./hooks";

const formatLabel = (value = "") => value.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

const statusVariant = (status = "") => {
  if (["approved", "completed"].includes(status)) {
    return "success";
  }
  if (["rejected", "cancelled"].includes(status)) {
    return "danger";
  }
  if (["under_review", "in_process", "documents_requested", "documents_received", "on_hold"].includes(status)) {
    return "warning";
  }
  return "neutral";
};

const UserApplicationDetailPage = () => {
  const { id } = useParams();
  const detailQuery = useUserApplicationDetailQuery(id, { enabled: Boolean(id) });

  if (detailQuery.isLoading) {
    return <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">Loading application...</div>;
  }

  if (detailQuery.error) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
        {detailQuery.error.message || "Failed to load application"}
      </div>
    );
  }

  const application = detailQuery.data;
  const applicant = application?.applicantDetails || {};
  const submittedDocs = Array.isArray(application?.submittedDocs) ? application.submittedDocs : [];
  const statusHistory = Array.isArray(application?.statusHistory) ? application.statusHistory : [];

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Application Details</h2>
          <p className="mt-1 text-sm text-slate-600">{application?.applicationNumber || "-"}</p>
        </div>
        <Link
          to="/user/applications"
          className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Back to Applications
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Overview</h3>
          <div className="mt-3 space-y-2 text-sm text-slate-700">
            <p>
              Status: <Badge variant={statusVariant(application?.status)}>{formatLabel(application?.status)}</Badge>
            </p>
            <p>Country: {application?.countryId?.name || application?.countrySlug || "-"}</p>
            <p>Visa Type: {application?.countryVisaTypeId?.title || application?.visaTypeSlug || "-"}</p>
            <p>Submitted: {application?.appliedAt ? new Date(application.appliedAt).toLocaleString() : "-"}</p>
            <p>Payment Status: {formatLabel(application?.paymentStatus || "not_required")}</p>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Applicant Details</h3>
          <div className="mt-3 space-y-2 text-sm text-slate-700">
            <p>Name: {applicant.firstName || ""} {applicant.lastName || ""}</p>
            <p>Email: {applicant.email || "-"}</p>
            <p>Phone: {applicant.phone || "-"}</p>
            <p>Nationality: {applicant.nationality || "-"}</p>
            <p>Passport: {applicant.passportNumber || "-"}</p>
          </div>
        </article>
      </div>

      <article className="rounded-2xl border border-slate-200 bg-white p-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Status Timeline</h3>
        <div className="mt-3 space-y-2">
          {statusHistory.length === 0 ? (
            <p className="text-sm text-slate-500">No status history available.</p>
          ) : (
            statusHistory
              .slice()
              .reverse()
              .map((historyItem, index) => (
                <div key={`${historyItem.status}-${historyItem.updatedAt}-${index}`} className="rounded-xl border border-slate-200 p-3">
                  <p className="text-sm font-semibold text-slate-900">{formatLabel(historyItem.status)}</p>
                  <p className="mt-1 text-xs text-slate-500">{historyItem.updatedAt ? new Date(historyItem.updatedAt).toLocaleString() : "-"}</p>
                  {historyItem.note ? <p className="mt-1 text-sm text-slate-700">{historyItem.note}</p> : null}
                </div>
              ))
          )}
        </div>
      </article>

      <article className="rounded-2xl border border-slate-200 bg-white p-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Submitted Documents</h3>
        <div className="mt-3 space-y-2">
          {submittedDocs.length === 0 ? (
            <p className="text-sm text-slate-500">No documents uploaded.</p>
          ) : (
            submittedDocs.map((doc) => (
              <a
                key={doc._id || doc.publicId || doc.fileUrl}
                href={doc.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="block rounded-xl border border-slate-200 p-3 hover:bg-slate-50"
              >
                <p className="text-sm font-medium text-slate-900">{doc.docName || doc.originalName || "Document"}</p>
                <p className="mt-1 text-xs text-slate-500">{doc.originalName || doc.mimeType || "File"}</p>
                <p className="mt-1 text-xs text-slate-500">Verification: {formatLabel(doc.verificationStatus || "pending")}</p>
              </a>
            ))
          )}
        </div>
      </article>

      {application?.adminNotes ? (
        <article className="rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Admin Notes</h3>
          <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">{application.adminNotes}</p>
        </article>
      ) : null}
    </section>
  );
};

export default UserApplicationDetailPage;
