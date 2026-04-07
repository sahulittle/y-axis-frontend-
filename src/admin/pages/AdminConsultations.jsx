import React, { useEffect, useState } from "react";
import { listAdminConsultations, updateConsultationStatus } from "../api/adminApi";

const statusOptions = ["pending", "in-progress", "approved", "rejected"];

const AdminConsultations = () => {
  const [consultations, setConsultations] = useState([]);
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadConsultations = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await listAdminConsultations({
        status,
        type,
        search,
        page: 1,
        limit: 50,
      });
      setConsultations(data.items || []);
    } catch (apiError) {
      setError(apiError.message || "Failed to load consultations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConsultations();
  }, []);

  const handleStatusUpdate = async (consultationId, nextStatus) => {
    try {
      await updateConsultationStatus(consultationId, { status: nextStatus });
      loadConsultations();
    } catch (apiError) {
      setError(apiError.message || "Failed to update consultation");
    }
  };

  return (
    <section className="rounded-2xl bg-white border border-slate-200 p-5 space-y-4">
      <h2 className="text-xl font-bold text-slate-900">Consultations</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search name/email"
          className="rounded-xl border border-slate-300 px-4 py-2"
        />

        <select value={type} onChange={(event) => setType(event.target.value)} className="rounded-xl border border-slate-300 px-4 py-2">
          <option value="">All Types</option>
          <option value="migrate">Migrate</option>
          <option value="study">Study</option>
          <option value="work">Work</option>
        </select>

        <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-xl border border-slate-300 px-4 py-2">
          <option value="">All Status</option>
          {statusOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <button type="button" onClick={loadConsultations} className="rounded-xl bg-slate-900 text-white px-4 py-2">
          Apply Filters
        </button>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      {loading ? (
        <p className="text-slate-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-slate-500">
                <th className="py-3 pr-3">Name</th>
                <th className="py-3 pr-3">Email</th>
                <th className="py-3 pr-3">Type</th>
                <th className="py-3 pr-3">Country</th>
                <th className="py-3 pr-3">Status</th>
                <th className="py-3">Update</th>
              </tr>
            </thead>
            <tbody>
              {consultations.map((item) => (
                <tr key={item._id} className="border-b border-slate-100">
                  <td className="py-3 pr-3 font-medium text-slate-900">{item.fullName}</td>
                  <td className="py-3 pr-3 text-slate-700">{item.email}</td>
                  <td className="py-3 pr-3 capitalize">{item.type}</td>
                  <td className="py-3 pr-3">{item.countryOfInterest}</td>
                  <td className="py-3 pr-3">
                    <span className="px-2 py-1 rounded-full text-xs bg-slate-100 text-slate-700">{item.status}</span>
                  </td>
                  <td className="py-3">
                    <select
                      value={item.status}
                      onChange={(event) => handleStatusUpdate(item._id, event.target.value)}
                      className="rounded-lg border border-slate-300 px-2 py-1"
                    >
                      {statusOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default AdminConsultations;
