import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadNoteSchema } from "../schemas";
import Button from "../../../shared/ui/Button";

const LeadNotesPanel = ({ lead, onAddNote, loading }) => {
  const form = useForm({
    resolver: zodResolver(leadNoteSchema),
    defaultValues: { note: "" },
  });

  const submit = form.handleSubmit(async (values) => {
    await onAddNote(values);
    form.reset({ note: "" });
  });

  const noteItems = lead?.noteHistory || [];
  const activityItems = lead?.activityHistory || [];

  return (
    <section className="grid gap-5 xl:grid-cols-2">
      <article className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">Add Internal Note</h2>
        <form onSubmit={submit} className="mt-4 space-y-3">
          <textarea
            rows={4}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            placeholder="Write note for operations team"
            {...form.register("note")}
          />
          {form.formState.errors.note ? (
            <p className="text-xs text-rose-600">{form.formState.errors.note.message}</p>
          ) : null}
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Add Note"}
          </Button>
        </form>
      </article>

      <article className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">Notes & Activity Timeline</h2>
        <div className="mt-4 max-h-[360px] space-y-3 overflow-y-auto pr-1">
          {noteItems.map((item, index) => (
            <div key={`note-${index}`} className="rounded-xl bg-slate-50 px-3 py-2">
              <p className="text-sm text-slate-800">{item.note}</p>
              <p className="mt-1 text-xs text-slate-500">{new Date(item.createdAt || Date.now()).toLocaleString()}</p>
            </div>
          ))}
          {activityItems.map((item, index) => (
            <div key={`activity-${index}`} className="rounded-xl border border-slate-200 px-3 py-2">
              <p className="text-sm text-slate-800">{item.message}</p>
              <p className="mt-1 text-xs text-slate-500">{new Date(item.createdAt || Date.now()).toLocaleString()}</p>
            </div>
          ))}
          {noteItems.length === 0 && activityItems.length === 0 ? (
            <p className="text-sm text-slate-500">No timeline entries yet.</p>
          ) : null}
        </div>
      </article>
    </section>
  );
};

export default LeadNotesPanel;
