import React, { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { adminNavItems } from "../../app/config/routeMeta";
import { readSession } from "../auth/session";

const Sidebar = () => {
  const { user } = readSession();

  const visibleItems = useMemo(() => {
    return adminNavItems.filter((item) => item.roles.includes(user?.role));
  }, [user?.role]);

  return (
    <aside className="w-full xl:w-72 bg-slate-950 text-slate-100 xl:min-h-screen p-4 xl:p-6">
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
    </aside>
  );
};

export default Sidebar;
