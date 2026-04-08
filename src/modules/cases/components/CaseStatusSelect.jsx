import React from "react";

const statusOptions = [
  "inquiry_received",
  "screening_pending",
  "documents_pending",
  "documents_received",
  "review_in_progress",
  "appointment_pending",
  "ready_for_submission",
  "submitted",
  "additional_docs_requested",
  "interview_scheduled",
  "decision_pending",
  "approved",
  "refused",
  "closed",
];

const toLabel = (value) => value.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

const CaseStatusSelect = ({ value, onChange, disabled = false }) => {
  return (
    <select
      className="rounded-lg border border-slate-300 px-2 py-1 text-xs"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      disabled={disabled}
    >
      {statusOptions.map((status) => (
        <option key={status} value={status}>
          {toLabel(status)}
        </option>
      ))}
    </select>
  );
};

export default CaseStatusSelect;
