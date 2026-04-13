import React, { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import { adminNavItems } from "../../app/config/routeMeta";
import { readSession } from "../auth/session";

const Sidebar = ({ mobileOpen = false, onClose = () => {} }) => {
  const { user } = readSession();

  const visibleItems = useMemo(() => {
    return adminNavItems.filter((item) => item.roles.includes(user?.role));
  }, [user?.role]);

  const sidebarContent = (
    <>
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.22em] text-teal-300/80">Visaassist.org</p>
        <h1 className="mt-2 text-2xl font-extrabold">Ops Admin</h1>
        <p className="mt-2 text-xs text-slate-400">Role: {user?.role || "staff"}</p>
      </div>

      <nav className="space-y-1.5">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                  isActive
                    ? "bg-teal-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-slate-100"
                }`
              }
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );

  return (
    <>
      <aside className="hidden xl:block xl:min-h-screen xl:w-72 bg-slate-950 p-6 text-slate-100">
        {sidebarContent}
      </aside>

      <div
        className={`fixed inset-0 z-40 xl:hidden ${mobileOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          onClick={onClose}
          className={`absolute inset-0 bg-slate-950/50 transition-opacity ${mobileOpen ? "opacity-100" : "opacity-0"}`}
          aria-label="Close menu"
        />

        <aside
          className={`relative h-full w-[88%] max-w-xs overflow-y-auto bg-slate-950 p-4 text-slate-100 shadow-2xl transition-transform ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-4 flex items-center justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-700 p-2 text-slate-300 hover:bg-slate-800 hover:text-white"
              aria-label="Close sidebar"
            >
              <X size={16} />
            </button>
          </div>
          {sidebarContent}
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
