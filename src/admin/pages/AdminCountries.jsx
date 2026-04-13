import React, { useEffect, useState } from "react";
import {
  createCountry,
  deleteCountry,
  listAdminCountries,
  updateCountry,
} from "../api/adminApi";

const defaultForm = {
  name: "",
  code: "",
  region: "",
  ranking: 0,
  description: "",
  isFeatured: false,
};

const AdminCountries = () => {
  const [form, setForm] = useState(defaultForm);
  const [editingId, setEditingId] = useState("");
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadCountries = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await listAdminCountries({ search, limit: 50, page: 1 });
      setItems(data.items || []);
    } catch (apiError) {
      setError(apiError.message || "Failed to load countries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCountries();
    // loadCountries is intentionally triggered once on mount; search refresh is manual.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetForm = () => {
    setForm(defaultForm);
    setEditingId("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      if (editingId) {
        await updateCountry(editingId, form);
      } else {
        await createCountry(form);
      }
      resetForm();
      loadCountries();
    } catch (apiError) {
      setError(apiError.message || "Failed to save country");
    }
  };

  const onEdit = (country) => {
    setEditingId(country._id);
    setForm({
      name: country.name || "",
      code: country.code || "",
      region: country.region || "",
      ranking: country.ranking || 0,
      description: country.description || "",
      isFeatured: Boolean(country.isFeatured),
    });
  };

  const onDelete = async (countryId) => {
    if (!window.confirm("Delete this country?")) {
      return;
    }

    try {
      await deleteCountry(countryId);
      loadCountries();
    } catch (apiError) {
      setError(apiError.message || "Delete failed");
    }
  };

  return (
    <section className="grid grid-cols-1 xl:grid-cols-3 gap-5">
      <div className="xl:col-span-1 rounded-2xl bg-white border border-slate-200 p-5">
        <h2 className="text-xl font-bold text-slate-900 mb-4">{editingId ? "Edit Country" : "Add Country"}</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            required
            placeholder="Name"
            className="w-full rounded-xl border border-slate-300 px-4 py-2"
          />

          <input
            value={form.code}
            onChange={(event) => setForm((prev) => ({ ...prev, code: event.target.value }))}
            required
            placeholder="Code (e.g. CA)"
            className="w-full rounded-xl border border-slate-300 px-4 py-2"
          />

          <input
            value={form.region}
            onChange={(event) => setForm((prev) => ({ ...prev, region: event.target.value }))}
            placeholder="Region"
            className="w-full rounded-xl border border-slate-300 px-4 py-2"
          />

          <input
            type="number"
            value={form.ranking}
            onChange={(event) => setForm((prev) => ({ ...prev, ranking: Number(event.target.value) }))}
            placeholder="Ranking"
            className="w-full rounded-xl border border-slate-300 px-4 py-2"
          />

          <textarea
            value={form.description}
            onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
            placeholder="Description"
            rows={3}
            className="w-full rounded-xl border border-slate-300 px-4 py-2"
          />

          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(event) => setForm((prev) => ({ ...prev, isFeatured: event.target.checked }))}
            />
            Featured
          </label>

          <div className="flex gap-2">
            <button className="rounded-xl bg-orange-500 text-white px-4 py-2 font-medium" type="submit">
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
          <h3 className="text-lg font-bold text-slate-900">Countries</h3>
          <div className="flex gap-2">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search"
              className="rounded-xl border border-slate-300 px-4 py-2"
            />
            <button type="button" onClick={loadCountries} className="rounded-xl bg-slate-900 text-white px-4 py-2">
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
                <th className="py-3 pr-3">Name</th>
                <th className="py-3 pr-3">Code</th>
                <th className="py-3 pr-3">Region</th>
                <th className="py-3 pr-3">Rank</th>
                <th className="py-3 pr-3">Featured</th>
                <th className="py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-b border-slate-100">
                  <td className="py-3 pr-3 font-medium text-slate-900">{item.name}</td>
                  <td className="py-3 pr-3">{item.code}</td>
                  <td className="py-3 pr-3">{item.region}</td>
                  <td className="py-3 pr-3">{item.ranking}</td>
                  <td className="py-3 pr-3">{item.isFeatured ? "Yes" : "No"}</td>
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

export default AdminCountries;
