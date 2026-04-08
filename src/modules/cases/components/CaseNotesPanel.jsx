import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";

const CaseNotesPanel = ({ caseRecord, onAddNote, loading }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      message: "",
      visibility: "internal",
    },
  });

  const submit = handleSubmit(async (values) => {
    await onAddNote(values);
    reset();
  });

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-slate-900">Case Notes</h2>

      <form className="mt-4 space-y-3" onSubmit={submit}>
        <Input placeholder="Write an internal or customer note" {...register("message", { required: true })} />
        <select className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" {...register("visibility")}>
          <option value="internal">Internal</option>
          <option value="customer">Customer</option>
        </select>
        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Add note"}
          </Button>
        </div>
      </form>

      <div className="mt-4 space-y-2">
        {(caseRecord.internalNotes || []).map((note, index) => (
          <div key={`internal-${index}`} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-sm text-slate-800">{note.message}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.1em] text-slate-500">Internal</p>
          </div>
        ))}
        {(caseRecord.customerNotes || []).map((note, index) => (
          <div key={`customer-${index}`} className="rounded-xl border border-cyan-200 bg-cyan-50 p-3">
            <p className="text-sm text-slate-800">{note.message}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.1em] text-cyan-700">Customer</p>
          </div>
        ))}
      </div>
    </article>
  );
};

export default CaseNotesPanel;
