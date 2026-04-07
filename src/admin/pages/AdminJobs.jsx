import React, { useEffect, useState } from "react";
import {
  createJob,
  deleteJob,
  listAdminCountries,
  listAdminJobs,
  updateJob,
} from "../api/adminApi";

const defaultForm = {
  title: "",
  company: "",
  country: "",
  location: "",
  employmentType: "full-time",
  experienceLevel: "entry",
  salaryMin: 0,
  salaryMax: 0,
  currency: "USD",
  description: "",
  requirements: "",
  isActive: true,
  isFeatured: false,
};

const AdminJobs = () => {
  const [items, setItems] = useState([]);
  const [countries, setCountries] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [editingId, setEditingId] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    setError("");

    try {
      const [jobsRes, countriesRes] = await Promise.all([
        listAdminJobs({ search, page: 1, limit: 50 }),
        listAdminCountries({ page: 1, limit: 200 }),
      ]);
      setItems(jobsRes.items || []);
      setCountries(countriesRes.items || []);
    } catch (apiError) {
      setError(apiError.message || "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const resetForm = () => {
    setForm(defaultForm);
    setEditingId("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const payload = {
      ...form,
      requirements: form.requirements
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    try {
      if (editingId) {
        await updateJob(editingId, payload);
      } else {
        await createJob(payload);
      }
      resetForm();
      loadData();
    } catch (apiError) {
      setError(apiError.message || "Failed to save job");
    }
  };

  const onEdit = (item) => {
    setEditingId(item._id);
    setForm({
      title: item.title || "",
      company: item.company || "",
      country: item.country?._id || item.country || "",
      location: item.location || "",
      employmentType: item.employmentType || "full-time",
      experienceLevel: item.experienceLevel || "entry",
      salaryMin: item.salaryMin || 0,
      salaryMax: item.salaryMax || 0,
      currency: item.currency || "USD",
      description: item.description || "",
      requirements: Array.isArray(item.requirements) ? item.requirements.join(", ") : "",
      isActive: Boolean(item.isActive),
      isFeatured: Boolean(item.isFeatured),
    });
  };

  const onDelete = async (jobId) => {
    if (!window.confirm("Delete this job?")) {
      return;
    }

    try {
      await deleteJob(jobId);
      loadData();
    } catch (apiError) {
      setError(apiError.message || "Delete failed");
    }
  };

  return (
    <section className="grid grid-cols-1 xl:grid-cols-3 gap-5">
      <div className="xl:col-span-1 rounded-2xl bg-white border border-slate-200 p-5">
        <h2 className="text-xl font-bold text-slate-900 mb-4">{editingId ? "Edit Job" : "Add Job"}</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            value={form.title}
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
            required
            placeholder="Job title"
            className="w-full rounded-xl border border-slate-300 px-4 py-2"
          />

          <input
            value={form.company}
            onChange={(event) => setForm((prev) => ({ ...prev, company: event.target.value }))}
            required
            placeholder="Company"
            className="w-full rounded-xl border border-slate-300 px-4 py-2"
          />

          <select
            value={form.country}
            onChange={(event) => setForm((prev) => ({ ...prev, country: event.target.value }))}
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-2"
          >
            <option value="">Select country</option>
            {countries.map((country) => (
              <option key={country._id} value={country._id}>
                {country.name}
              </option>
            ))}
          </select>

          <input
            value={form.location}
            onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))}
            placeholder="Location"
            className="w-full rounded-xl border border-slate-300 px-4 py-2"
          />

          <div className="grid grid-cols-2 gap-2">
            <select
              value={form.employmentType}
              onChange={(event) => setForm((prev) => ({ ...prev, employmentType: event.target.value }))}
              className="rounded-xl border border-slate-300 px-3 py-2"
            >
              <option value="full-time">full-time</option>
              <option value="part-time">part-time</option>
              <option value="contract">contract</option>
              <option value="internship">internship</option>
            </select>

            <select
              value={form.experienceLevel}
              onChange={(event) => setForm((prev) => ({ ...prev, experienceLevel: event.target.value }))}
              className="rounded-xl border border-slate-300 px-3 py-2"
            >
              <option value="entry">entry</option>
              <option value="mid">mid</option>
              <option value="senior">senior</option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              value={form.salaryMin}
              onChange={(event) => setForm((prev) => ({ ...prev, salaryMin: Number(event.target.value) }))}
              placeholder="Min"
              className="rounded-xl border border-slate-300 px-3 py-2"
            />
            <input
              type="number"
              value={form.salaryMax}
              onChange={(event) => setForm((prev) => ({ ...prev, salaryMax: Number(event.target.value) }))}
              placeholder="Max"
              className="rounded-xl border border-slate-300 px-3 py-2"
            />
            <input
              value={form.currency}
              onChange={(event) => setForm((prev) => ({ ...prev, currency: event.target.value }))}
              placeholder="Currency"
              className="rounded-xl border border-slate-300 px-3 py-2"
            />
          </div>

          <textarea
            value={form.description}
            onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
            required
            placeholder="Description"
            rows={3}
            className="w-full rounded-xl border border-slate-300 px-4 py-2"
          />

          <input
            value={form.requirements}
            onChange={(event) => setForm((prev) => ({ ...prev, requirements: event.target.value }))}
            placeholder="Requirements (comma separated)"
            className="w-full rounded-xl border border-slate-300 px-4 py-2"
          />

          <div className="flex items-center gap-4 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(event) => setForm((prev) => ({ ...prev, isActive: event.target.checked }))}
              />
              Active
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.isFeatured}
                onChange={(event) => setForm((prev) => ({ ...prev, isFeatured: event.target.checked }))}
              />
              Featured
            </label>
          </div>

          <div className="flex gap-2">
            <button type="submit" className="rounded-xl bg-orange-500 text-white px-4 py-2 font-medium">
              {editingId ? "Update" : "Create"}
            </button>
            {editingId ? (
              <button type="button" onClick={resetForm} className="rounded-xl border border-slate-300 px-4 py-2">
                Cancel
              </button>
            ) : null}
          </div>
        </form>
      </div>

      <div className="xl:col-span-2 rounded-2xl bg-white border border-slate-200 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <h3 className="text-lg font-bold text-slate-900">Jobs</h3>
          <div className="flex gap-2">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search jobs"
              className="rounded-xl border border-slate-300 px-4 py-2"
            />
            <button onClick={loadData} className="rounded-xl bg-slate-900 text-white px-4 py-2" type="button">
              Search
            </button>
          </div>
        </div>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {loading ? <p className="text-slate-500">Loading...</p> : null}

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-slate-500">
                <th className="py-3 pr-3">Title</th>
                <th className="py-3 pr-3">Company</th>
                <th className="py-3 pr-3">Country</th>
                <th className="py-3 pr-3">Type</th>
                <th className="py-3 pr-3">Active</th>
                <th className="py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-b border-slate-100">
                  <td className="py-3 pr-3 font-medium text-slate-900">{item.title}</td>
                  <td className="py-3 pr-3">{item.company}</td>
                  <td className="py-3 pr-3">{item.country?.name || "-"}</td>
                  <td className="py-3 pr-3">{item.employmentType}</td>
                  <td className="py-3 pr-3">{item.isActive ? "Yes" : "No"}</td>
                  <td className="py-3 flex gap-2">
                    <button onClick={() => onEdit(item)} className="rounded-lg border border-slate-300 px-3 py-1 hover:bg-slate-50">
                      Edit
                    </button>
                    <button onClick={() => onDelete(item._id)} className="rounded-lg border border-red-300 text-red-600 px-3 py-1 hover:bg-red-50">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminJobs;
