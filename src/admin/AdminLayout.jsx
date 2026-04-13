import React from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";
import AdminTopbar from "./components/AdminTopbar";
import { logoutUser } from "../shared/api/auth";
import { getStoredSession } from "../shared/api/http";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, user } = getStoredSession();
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);

  React.useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname]);

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = async () => {
    await logoutUser();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-100 md:flex">
      <AdminSidebar mobileOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />

      <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 space-y-5">
        <AdminTopbar user={user} onLogout={handleLogout} onOpenSidebar={() => setMobileSidebarOpen(true)} />
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
