import React from "react";
import { NavLink } from "react-router-dom";
import { BookText, Briefcase, ClipboardList, Gauge, Globe, Users, X } from "lucide-react";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: Gauge },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/consultations", label: "Consultations", icon: ClipboardList },
  { to: "/admin/countries", label: "Countries", icon: Globe },
  { to: "/admin/jobs", label: "Jobs", icon: Briefcase },
  { to: "/admin/blog-posts", label: "Blog Posts", icon: BookText },
];

const AdminSidebar = ({ mobileOpen = false, onClose = () => {} }) => {
  const sidebarLinks = (
    <nav className="space-y-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-orange-500 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <Icon size={18} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );

  return (
    <>
      <aside className="hidden md:block md:w-72 bg-slate-900 text-slate-200 p-6 md:min-h-screen">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Y-Axis</p>
          <h2 className="text-2xl font-extrabold text-white mt-1">Admin Panel</h2>
        </div>
        {sidebarLinks}
      </aside>

      <div
        className={`fixed inset-0 z-40 md:hidden ${mobileOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          onClick={onClose}
          className={`absolute inset-0 bg-slate-950/50 transition-opacity ${mobileOpen ? "opacity-100" : "opacity-0"}`}
          aria-label="Close menu"
        />
        <aside
          className={`relative h-full w-[88%] max-w-xs bg-slate-900 p-4 text-slate-200 shadow-2xl transition-transform ${
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

          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Y-Axis</p>
            <h2 className="text-2xl font-extrabold text-white mt-1">Admin Panel</h2>
          </div>

          {sidebarLinks}
        </aside>
      </div>
    </>
  );
};

export default AdminSidebar;
