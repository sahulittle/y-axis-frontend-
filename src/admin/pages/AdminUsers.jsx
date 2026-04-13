import React, { useEffect, useState } from "react";
import { deleteAdminUser, listAdminUsers, updateAdminUser } from "../api/adminApi";

const roles = ["user", "admin", "adviser", "support"];

const AdminUsers = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadUsers = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await listAdminUsers({ search, limit: 50, page: 1 });
      setUsers(data.items || []);
    } catch (apiError) {
      setError(apiError.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
    // loadUsers is intentionally triggered once on mount; search refresh is manual.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRoleChange = async (userId, role) => {
    try {
      await updateAdminUser(userId, { role });
      loadUsers();
    } catch (apiError) {
      setError(apiError.message || "Failed to update role");
    }
  };

  const handleActiveToggle = async (userId, isActive) => {
    try {
      await updateAdminUser(userId, { isActive: !isActive });
      loadUsers();
    } catch (apiError) {
      setError(apiError.message || "Failed to update status");
    }
  };

  const handleDeleteUser = async (userId, email) => {
    if (!window.confirm(`Delete ${email}? This action cannot be undone.`)) {
      return;
    }

    try {
      await deleteAdminUser(userId);
      loadUsers();
    } catch (apiError) {
      setError(apiError.message || "Failed to delete user");
    }
  };

  return (
    <section className="rounded-2xl bg-white border border-slate-200 p-5 space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-slate-900">Users</h2>
        <div className="flex gap-2">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search users..."
            className="rounded-xl border border-slate-300 px-4 py-2"
          />
          <button
            type="button"
            onClick={loadUsers}
            className="rounded-xl bg-slate-900 text-white px-4 py-2"
          >
            Search
          </button>
        </div>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      {loading ? (
        <p className="text-slate-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-slate-200 text-slate-500">
                <th className="py-3 pr-3">Name</th>
                <th className="py-3 pr-3">Email</th>
                <th className="py-3 pr-3">Role</th>
                <th className="py-3 pr-3">Status</th>
                <th className="py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item) => (
                <tr key={item._id} className="border-b border-slate-100">
                  <td className="py-3 pr-3 font-medium text-slate-900">
                    {item.firstName} {item.lastName}
                  </td>
                  <td className="py-3 pr-3 text-slate-700">{item.email}</td>
                  <td className="py-3 pr-3">
                    <select
                      value={item.role}
                      onChange={(event) => handleRoleChange(item._id, event.target.value)}
                      className="rounded-lg border border-slate-300 px-2 py-1"
                    >
                      {roles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 pr-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${item.isActive ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleActiveToggle(item._id, item.isActive)}
                        className="rounded-lg border border-slate-300 px-3 py-1 hover:bg-slate-50"
                      >
                        Toggle
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteUser(item._id, item.email)}
                        className="rounded-lg border border-red-300 text-red-600 px-3 py-1 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
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

export default AdminUsers;
