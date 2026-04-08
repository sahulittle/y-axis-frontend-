import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Badge from "../../../shared/ui/Badge";
import Skeleton from "../../../shared/ui/Skeleton";
import { useApplicantDetailQuery } from "../hooks";

const yesNoBadge = (value) => (value ? "success" : "warning");

const ApplicantDetailPage = () => {
  const { applicantId } = useParams();
  const location = useLocation();
  const initialApplicant = location.state?.applicant || null;
  const applicantQuery = useApplicantDetailQuery(applicantId, initialApplicant);

  if (applicantQuery.isLoading) {
    return <Skeleton className="h-64 w-full" />;
  }

  if (applicantQuery.error) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-800">
        {applicantQuery.error.message || "Failed to load applicant profile"}
      </div>
    );
  }

  const applicant = applicantQuery.data;

  return (
    <section className="space-y-5">
      <article className="rounded-2xl border border-slate-200 bg-white p-6">
        <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Applicant Profile</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">{applicant.fullName}</h1>
        <p className="mt-2 text-sm text-slate-600">{applicant.email} | {applicant.phone}</p>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Nationality</p>
            <p className="mt-1 text-sm text-slate-800">{applicant.nationality || "-"}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Passport Number</p>
            <p className="mt-1 text-sm text-slate-800">{applicant.passport?.passportNumber || "-"}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Occupation</p>
            <p className="mt-1 text-sm text-slate-800">{applicant.basicProfile?.occupation || "-"}</p>
          </div>
        </div>
      </article>

      <article className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Compliance and Declarations</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant={yesNoBadge(applicant.consentAccepted)}>
            Consent {applicant.consentAccepted ? "Accepted" : "Pending"}
          </Badge>
          <Badge variant={yesNoBadge(applicant.disclaimerAccepted)}>
            Disclaimer {applicant.disclaimerAccepted ? "Accepted" : "Pending"}
          </Badge>
          <Badge variant={yesNoBadge(applicant.refundPolicyAccepted)}>
            Refund Policy {applicant.refundPolicyAccepted ? "Accepted" : "Pending"}
          </Badge>
        </div>
      </article>

      <article className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Travel Background</h2>
        <div className="mt-3 space-y-2 text-sm text-slate-700">
          <p>
            Prior refusal: {applicant.travelProfile?.priorRefusal ? "Yes" : "No"}
          </p>
          <p>
            Previous countries: {(applicant.travelProfile?.previousTravelCountries || []).join(", ") || "-"}
          </p>
          <p>
            Refusal details: {applicant.travelProfile?.refusalDetails || "-"}
          </p>
        </div>
      </article>
    </section>
  );
};

export default ApplicantDetailPage;
