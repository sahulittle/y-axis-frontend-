import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Badge from "../../../shared/ui/Badge";
import Skeleton from "../../../shared/ui/Skeleton";
import LeadStageSelect from "../components/LeadStageSelect";
import LeadNotesPanel from "../components/LeadNotesPanel";
import {
  useAddLeadNoteMutation,
  useLeadDetailQuery,
  useUpdateLeadStageMutation,
} from "../hooks";
import { useToast } from "../../../app/providers/ToastProvider";

const stageVariant = {
  new: "info",
  contacted: "warning",
  qualified: "success",
  converted: "success",
  lost: "danger",
};

const LeadDetailPage = () => {
  const { leadId } = useParams();
  const location = useLocation();
  const toast = useToast();
  const initialLead = location.state?.lead || null;
  const detailQuery = useLeadDetailQuery(leadId, initialLead);
  const stageMutation = useUpdateLeadStageMutation();
  const noteMutation = useAddLeadNoteMutation();

  if (detailQuery.isLoading) {
    return <Skeleton className="h-64 w-full" />;
  }

  if (detailQuery.error) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-800">
        {detailQuery.error.message || "Failed to load lead detail"}
      </div>
    );
  }

  const lead = detailQuery.data;

  const updateStage = async (stage) => {
    try {
      await stageMutation.mutateAsync({ leadId: lead._id, payload: { stage } });
      toast.success("Lead stage updated");
    } catch (error) {
      toast.error(error.message || "Stage update failed");
    }
  };

  const addNote = async (values) => {
    try {
      await noteMutation.mutateAsync({ leadId: lead._id, payload: values });
      toast.success("Note added");
    } catch (error) {
      toast.error(error.message || "Failed to add note");
      throw error;
    }
  };

  return (
    <section className="space-y-5">
      <article className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Lead Profile</p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">{lead.fullName}</h1>
            <p className="mt-2 text-sm text-slate-600">{lead.email} | {lead.phone}</p>
            <p className="mt-1 text-sm text-slate-600">
              {lead.destinationCountry} - {lead.visaCategory}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant={stageVariant[lead.stage] || "neutral"}>{lead.stage}</Badge>
            <LeadStageSelect value={lead.stage} onChange={updateStage} disabled={stageMutation.isPending} />
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Source</p>
            <p className="mt-1 text-sm text-slate-800 capitalize">{lead.source || "-"}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Nationality</p>
            <p className="mt-1 text-sm text-slate-800">{lead.nationality || "-"}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Assigned</p>
            <p className="mt-1 text-sm text-slate-800">{lead.assignedTo?.email || "Unassigned"}</p>
          </div>
        </div>
      </article>

      <LeadNotesPanel lead={lead} onAddNote={addNote} loading={noteMutation.isPending} />
    </section>
  );
};

export default LeadDetailPage;
