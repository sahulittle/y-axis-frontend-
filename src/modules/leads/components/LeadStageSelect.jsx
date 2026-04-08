import React from "react";

const STAGES = ["new", "contacted", "qualified", "converted", "lost"];

const LeadStageSelect = ({ value, onChange, disabled }) => {
  return (
    <select
      value={value || "new"}
      onChange={(event) => onChange(event.target.value)}
      disabled={disabled}
      className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-700"
    >
      {STAGES.map((stage) => (
        <option key={stage} value={stage}>
          {stage}
        </option>
      ))}
    </select>
  );
};

export default LeadStageSelect;
