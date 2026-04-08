import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Breadcrumbs from "./Breadcrumbs";

const AdminShell = () => {
  return (
    <div className="min-h-screen bg-slate-100 xl:flex">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6 xl:p-8 space-y-4">
        <Topbar />
        <Breadcrumbs />
        <Outlet />
      </main>
    </div>
  );
};

export default AdminShell;
