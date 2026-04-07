import React from "react";
import { NavLink } from "react-router-dom";
import { BookText, Briefcase, ClipboardList, Gauge, Globe, Users } from "lucide-react";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: Gauge },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/consultations", label: "Consultations", icon: ClipboardList },
  { to: "/admin/countries", label: "Countries", icon: Globe },
  { to: "/admin/jobs", label: "Jobs", icon: Briefcase },
  { to: "/admin/blog-posts", label: "Blog Posts", icon: BookText },
];

const AdminSidebar = () => {
  return (
    <aside className="w-full md:w-72 bg-slate-900 text-slate-200 p-4 md:p-6 md:min-h-screen">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Y-Axis</p>
        <h2 className="text-2xl font-extrabold text-white mt-1">Admin Panel</h2>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
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
    </aside>
  );
};

export default AdminSidebar;
