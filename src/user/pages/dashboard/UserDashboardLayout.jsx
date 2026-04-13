import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { readSession } from "../../../shared/auth/session";
import Navbar from "../../Navbar";

const navItems = [
  { label: "Overview", to: "/user/dashboard" },
  { label: "Applications", to: "/user/applications" },
  { label: "Support Tickets", to: "/user/tickets" },
  { label: "Documents", to: "/user/documents" },
  { label: "Appointments", to: "/user/appointments" },
  { label: "Profile", to: "/user/profile" },
];

const UserDashboardLayout = () => {
  const { user } = readSession();

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">User Dashboard</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">Welcome, {user?.firstName || "User"}</h1>
          <p className="mt-1 text-sm text-slate-600">
            Track visa applications, support tickets, documents, appointments, and your profile.
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-xl px-3 py-2 text-sm font-medium transition ${
                  isActive ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <main className="mt-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
