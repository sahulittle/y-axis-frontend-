import React from "react";

const AdminTopbar = ({ user, onLogout }) => {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-4">
      <div>
        <p className="text-sm text-slate-500">Welcome back</p>
        <h1 className="text-xl font-bold text-slate-900">{user?.firstName || "Admin"}</h1>
      </div>

      <button
        type="button"
        onClick={onLogout}
        className="px-4 py-2 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-700 transition"
      >
        Logout
      </button>
    </header>
  );
};

export default AdminTopbar;
