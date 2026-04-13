import React from "react";
import { Menu } from "lucide-react";

const AdminTopbar = ({ user, onLogout, onOpenSidebar = () => {} }) => {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-4">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="md:hidden rounded-xl border border-slate-300 p-2 hover:bg-slate-100"
          aria-label="Open sidebar"
        >
          <Menu size={18} className="text-slate-700" />
        </button>

        <div>
        <p className="text-sm text-slate-500">Welcome back</p>
        <h1 className="text-xl font-bold text-slate-900">{user?.firstName || "Admin"}</h1>
        </div>
      </div>

      <button
        type="button"
        onClick={onLogout}
        className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-700 transition"
      >
        Logout
      </button>
    </header>
  );
};

export default AdminTopbar;
