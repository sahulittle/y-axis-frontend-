import React from "react";

const AppErrorFallback = ({ error }) => {
  return (
    <div className="min-h-screen grid place-items-center px-4 bg-slate-100">
      <div className="max-w-lg rounded-2xl border border-rose-200 bg-white p-8 shadow-sm">
        <p className="text-xs uppercase tracking-[0.14em] text-rose-600">Application Error</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">Something went wrong</h1>
        <p className="mt-3 text-sm text-slate-600">
          An unexpected error interrupted the admin panel. Reload the page and try again.
        </p>
        <pre className="mt-4 rounded-lg bg-slate-900 text-slate-100 p-3 text-xs overflow-x-auto">
          {error?.message || "Unknown error"}
        </pre>
      </div>
    </div>
  );
};

export default AppErrorFallback;
