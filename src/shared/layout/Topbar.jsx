import React from "react";
import { Bell, Menu, Search, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { readSession } from "../auth/session";
import { logout } from "../../modules/auth/api";

const Topbar = ({ onOpenSidebar = () => {} }) => {
  const navigate = useNavigate();
  const { user } = readSession();

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <header className="rounded-2xl border border-slate-200 bg-white px-4 py-3 md:px-5 md:py-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2 xl:hidden">
          <button
            type="button"
            onClick={onOpenSidebar}
            className="rounded-xl border border-slate-300 p-2 hover:bg-slate-100"
            aria-label="Open sidebar"
          >
            <Menu size={18} className="text-slate-700" />
          </button>

          <div className="rounded-xl border border-slate-300 px-3 py-2 text-xs text-slate-600">
            {user?.firstName || "Staff"}
          </div>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex w-full items-center gap-3 rounded-xl border border-slate-300 px-3 py-2 md:max-w-[420px]">
            <Search size={16} className="text-slate-500" />
            <input
              placeholder="Search leads, cases, applicants"
              className="w-full border-none bg-transparent text-sm text-slate-700 outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:justify-end">
          <button
            type="button"
            className="relative rounded-xl border border-slate-300 p-2 hover:bg-slate-100"
            aria-label="Notifications"
          >
            <Bell size={16} className="text-slate-700" />
            <span className="absolute -right-1 -top-1 inline-grid h-4 min-w-4 place-items-center rounded-full bg-rose-600 px-1 text-[10px] text-white">
              3
            </span>
          </button>

          <div className="hidden rounded-xl border border-slate-300 px-3 py-2 text-xs text-slate-600 xl:block">
            <span className="inline-flex items-center gap-2">
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt="Admin avatar" className="h-5 w-5 rounded-full object-cover" />
              ) : (
                <User size={14} />
              )}
              {user?.firstName || "Staff"}
            </span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-medium text-white hover:bg-slate-700"
          >
            Logout
          </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
