import React, { useEffect, useState } from "react";
import { getAdminStats } from "../api/adminApi";

const StatCard = ({ title, value }) => (
  <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
    <p className="text-sm text-slate-500">{title}</p>
    <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getAdminStats();
      setStats(data);
    } catch (apiError) {
      setError(apiError.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (loading) {
    return <div className="rounded-2xl bg-white p-6 border border-slate-200">Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-red-50 p-6 border border-red-200 text-red-700">
        {error}
      </div>
    );
  }

  return (
    <section className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        <StatCard title="Users" value={stats?.users || 0} />
        <StatCard title="Consultations" value={stats?.consultations || 0} />
        <StatCard title="Countries" value={stats?.countries || 0} />
        <StatCard title="Jobs" value={stats?.jobs || 0} />
        <StatCard title="Blog Posts" value={stats?.blogPosts || 0} />
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-900">System Overview</h2>
        <p className="text-slate-600 mt-2">
          This panel is connected to backend admin endpoints for live fetch and update operations.
        </p>
      </div>
    </section>
  );
};

export default AdminDashboard;
