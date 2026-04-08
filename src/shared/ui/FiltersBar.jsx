import React from "react";

const FiltersBar = ({ children }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5">
      <div className="grid gap-3 md:grid-cols-4">{children}</div>
    </div>
  );
};

export default FiltersBar;
