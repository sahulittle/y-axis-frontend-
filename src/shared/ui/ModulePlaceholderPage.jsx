import React from "react";

const ModulePlaceholderPage = ({ title, description }) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <h1 className="text-xl font-bold text-slate-900">{title}</h1>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </section>
  );
};

export default ModulePlaceholderPage;
