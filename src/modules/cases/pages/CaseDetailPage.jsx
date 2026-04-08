import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Badge from "../../../shared/ui/Badge";
import Skeleton from "../../../shared/ui/Skeleton";
import CaseStatusSelect from "../components/CaseStatusSelect";
import CaseNotesPanel from "../components/CaseNotesPanel";
import {
  useAddCaseNoteMutation,
  useCaseDetailQuery,
  useUpdateCaseStatusMutation,
} from "../hooks";
import { useToast } from "../../../app/providers/ToastProvider";

const statusVariant = {
  inquiry_received: "info",
  screening_pending: "warning",
  documents_pending: "warning",
  documents_received: "info",
  review_in_progress: "info",
  appointment_pending: "warning",
  ready_for_submission: "info",
  submitted: "success",
  additional_docs_requested: "warning",
  interview_scheduled: "info",
  decision_pending: "warning",
  approved: "success",
  refused: "danger",
  closed: "neutral",
};

const toLabel = (value) => String(value || "").replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

const CaseDetailPage = () => {
  const { caseId } = useParams();
  const location = useLocation();
  const toast = useToast();
  const initialCase = location.state?.caseRecord || null;

  const detailQuery = useCaseDetailQuery(caseId, initialCase);
  const statusMutation = useUpdateCaseStatusMutation();
  const noteMutation = useAddCaseNoteMutation();

  if (detailQuery.isLoading) {
    return <Skeleton className="h-64 w-full" />;
  }

  if (detailQuery.error) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-800">
        {detailQuery.error.message || "Failed to load case detail"}
      </div>
    );
  }

  const caseRecord = detailQuery.data;

  const updateStatus = async (nextStatus) => {
    try {
      await statusMutation.mutateAsync({ caseId: caseRecord._id, payload: { caseStatus: nextStatus } });
      toast.success("Case status updated");
    } catch (error) {
      toast.error(error.message || "Failed to update case status");
    }
  };

  const addNote = async (values) => {
    try {
      await noteMutation.mutateAsync({ caseId: caseRecord._id, payload: values });
      toast.success("Case note added");
    } catch (error) {
      toast.error(error.message || "Failed to add case note");
      throw error;
    }
  };

  return (
    <section className="space-y-5">
      <article className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Case Profile</p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">{caseRecord.caseId}</h1>
            <p className="mt-2 text-sm text-slate-600">
              {caseRecord.destinationCountry} - {caseRecord.visaCategory}
            </p>
            <p className="mt-1 text-sm text-slate-600">Applicant: {caseRecord.applicantId?.fullName || "-"}</p>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant={statusVariant[caseRecord.caseStatus] || "neutral"}>{toLabel(caseRecord.caseStatus)}</Badge>
            <CaseStatusSelect
              value={caseRecord.caseStatus}
              onChange={updateStatus}
              disabled={statusMutation.isPending}
            />
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Priority</p>
            <p className="mt-1 text-sm text-slate-800 capitalize">{caseRecord.priority || "-"}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Assigned Staff</p>
            <p className="mt-1 text-sm text-slate-800">
              {(caseRecord.assignedStaff || []).map((staff) => staff?.email).filter(Boolean).join(", ") || "Unassigned"}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Lead Link</p>
            <p className="mt-1 text-sm text-slate-800">{caseRecord.leadId?.fullName || "-"}</p>
          </div>
        </div>
      </article>

      <article className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Case Timeline</h2>
        <div className="mt-4 space-y-3">
          {(caseRecord.timeline || []).map((entry, index) => (
            <div key={`${entry.status}-${index}`} className="rounded-xl border border-slate-200 p-3">
              <p className="text-sm font-medium text-slate-900">{toLabel(entry.status)}</p>
              <p className="mt-1 text-sm text-slate-600">{entry.note || "Status update"}</p>
            </div>
          ))}
        </div>
      </article>

      <CaseNotesPanel caseRecord={caseRecord} onAddNote={addNote} loading={noteMutation.isPending} />
    </section>
  );
};

export default CaseDetailPage;
