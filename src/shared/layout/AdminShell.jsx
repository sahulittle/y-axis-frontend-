import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Breadcrumbs from "./Breadcrumbs";

const AdminShell = () => {
  const location = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);

  React.useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-100 xl:flex">
      <Sidebar mobileOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />
      <main className="flex-1 space-y-4 p-3 sm:p-4 md:p-6 xl:p-8">
        <Topbar onOpenSidebar={() => setMobileSidebarOpen(true)} />
        <Breadcrumbs />
        <Outlet />
      </main>
    </div>
  );
};

export default AdminShell;
