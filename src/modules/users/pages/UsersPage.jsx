import React from "react";
import { useToast } from "../../../app/providers/ToastProvider";
import DataTable from "../../../shared/ui/DataTable";
import Button from "../../../shared/ui/Button";
import Badge from "../../../shared/ui/Badge";
import Input from "../../../shared/ui/Input";
import FiltersBar from "../../../shared/ui/FiltersBar";
import StatsCard from "../../../shared/ui/StatsCard";
import { readSession } from "../../../shared/auth/session";
import { useDeleteUserMutation, useUpdateUserMutation, useUsersQuery } from "../hooks";

const USER_ROLES = [
  "customer",
  "user",
  "admin",
  "adviser",
  "support",
  "super_admin",
  "documentation_executive",
  "support_executive",
  "destination_specialist",
];

const UsersPage = () => {
  const toast = useToast();
  const { user: currentUser } = readSession();

  const [filters, setFilters] = React.useState({
    page: 1,
    limit: 10,
    search: "",
    role: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const [draftSearch, setDraftSearch] = React.useState("");
  const [draftRole, setDraftRole] = React.useState("");

  const query = useUsersQuery(filters);
  const updateMutation = useUpdateUserMutation();
  const deleteMutation = useDeleteUserMutation();

  const rows = React.useMemo(() => query.data?.items || [], [query.data?.items]);
  const pagination = query.data?.pagination || { page: 1, totalPages: 1, total: 0 };

  const counts = React.useMemo(() => {
    const active = rows.filter((item) => item.isActive).length;
    const inactive = rows.length - active;
    return { active, inactive };
  }, [rows]);

  const applyFilters = () => {
    setFilters((current) => ({
      ...current,
      page: 1,
      search: draftSearch.trim(),
      role: draftRole,
    }));
  };

  const resetFilters = () => {
    setDraftSearch("");
    setDraftRole("");
    setFilters((current) => ({
      ...current,
      page: 1,
      search: "",
      role: "",
    }));
  };

  const handleRoleChange = async (targetUser, role) => {
    try {
      await updateMutation.mutateAsync({ userId: targetUser._id, payload: { role } });
      toast.success("User role updated");
    } catch (error) {
      toast.error(error.message || "Failed to update user role");
    }
  };

  const handleActiveToggle = async (targetUser) => {
    try {
      await updateMutation.mutateAsync({
        userId: targetUser._id,
        payload: { isActive: !targetUser.isActive },
      });
      toast.success(targetUser.isActive ? "User deactivated" : "User activated");
    } catch (error) {
      toast.error(error.message || "Failed to update user status");
    }
  };

  const handleDeleteUser = async (targetUser) => {
    if (!window.confirm(`Delete ${targetUser.email}? This action cannot be undone.`)) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(targetUser._id);
      toast.success("User deleted");
    } catch (error) {
      toast.error(error.message || "Failed to delete user");
    }
  };

  const columns = [
    {
      key: "fullName",
      label: "User",
      sortable: true,
      render: (row) => (
        <div>
          <p className="font-medium text-slate-900">{row.fullName || `${row.firstName || ""} ${row.lastName || ""}`.trim() || "-"}</p>
          <p className="text-xs text-slate-500 mt-1">Joined {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-"}</p>
        </div>
      ),
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
      render: (row) => <span className="text-slate-700">{row.email}</span>,
    },
    {
      key: "role",
      label: "Role",
      sortable: true,
      render: (row) => (
        <select
          value={row.role}
          onChange={(event) => handleRoleChange(row, event.target.value)}
          disabled={updateMutation.isPending || row._id === currentUser?._id}
          className="rounded-lg border border-slate-300 px-2 py-1 text-sm disabled:bg-slate-100"
        >
          {USER_ROLES.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      ),
    },
    {
      key: "isActive",
      label: "Status",
      sortable: true,
      render: (row) => (
        <Badge variant={row.isActive ? "success" : "danger"}>{row.isActive ? "Active" : "Inactive"}</Badge>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => {
        const isSelf = row._id === currentUser?._id;
        return (
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              disabled={updateMutation.isPending || isSelf}
              onClick={() => handleActiveToggle(row)}
            >
              {row.isActive ? "Deactivate" : "Activate"}
            </Button>
            <Button
              size="sm"
              variant="danger"
              disabled={deleteMutation.isPending || isSelf}
              onClick={() => handleDeleteUser(row)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
        <p className="mt-1 text-sm text-slate-600">View all registered users, control roles and status, and remove accounts.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <StatsCard label="Total Users" value={pagination.total || 0} hint="Across current filters" />
        <StatsCard label="Active In View" value={counts.active} hint="Current page" />
        <StatsCard label="Inactive In View" value={counts.inactive} hint="Current page" />
      </div>

      <FiltersBar>
        <div className="md:col-span-2">
          <label htmlFor="users-search" className="mb-1 block text-xs uppercase tracking-[0.12em] text-slate-500">
            Search
          </label>
          <Input
            id="users-search"
            value={draftSearch}
            onChange={(event) => setDraftSearch(event.target.value)}
            placeholder="Name or email"
          />
        </div>

        <div>
          <label htmlFor="users-role" className="mb-1 block text-xs uppercase tracking-[0.12em] text-slate-500">
            Role
          </label>
          <select
            id="users-role"
            value={draftRole}
            onChange={(event) => setDraftRole(event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="">All roles</option>
            {USER_ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end gap-2">
          <Button type="button" variant="secondary" className="w-full" onClick={resetFilters}>
            Reset
          </Button>
          <Button type="button" className="w-full" onClick={applyFilters}>
            Apply
          </Button>
        </div>
      </FiltersBar>

      <DataTable
        columns={columns}
        rows={rows}
        loading={query.isLoading}
        page={pagination.page || filters.page}
        totalPages={pagination.totalPages || 1}
        sortBy={filters.sortBy}
        sortOrder={filters.sortOrder}
        onPageChange={(page) => setFilters((current) => ({ ...current, page }))}
        onSortChange={(sortBy, sortOrder) => setFilters((current) => ({ ...current, page: 1, sortBy, sortOrder }))}
      />
    </section>
  );
};

export default UsersPage;
