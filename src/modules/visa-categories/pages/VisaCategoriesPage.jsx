import React from "react";
import { useToast } from "../../../app/providers/ToastProvider";
import Badge from "../../../shared/ui/Badge";
import Button from "../../../shared/ui/Button";
import DataTable from "../../../shared/ui/DataTable";
import FiltersBar from "../../../shared/ui/FiltersBar";
import Input from "../../../shared/ui/Input";
import {
  useCreateVisaCategoryMutation,
  useDeleteVisaCategoryMutation,
  useUpdateVisaCategoryMutation,
  useUpdateVisaCategoryStatusMutation,
  useVisaCategoriesQuery,
} from "../hooks";

const EMPTY_FORM = {
  name: "",
  slug: "",
  description: "",
  iconKey: "plane",
  isActive: true,
  sortOrder: 0,
};

const toSlug = (value = "") =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

const VisaCategoriesPage = () => {
  const toast = useToast();

  const [filters, setFilters] = React.useState({
    page: 1,
    limit: 10,
    search: "",
    isActive: "",
  });

  const [form, setForm] = React.useState(EMPTY_FORM);
  const [editingId, setEditingId] = React.useState(null);

  const listQuery = useVisaCategoriesQuery(filters);
  const createMutation = useCreateVisaCategoryMutation();
  const updateMutation = useUpdateVisaCategoryMutation();
  const statusMutation = useUpdateVisaCategoryStatusMutation();
  const deleteMutation = useDeleteVisaCategoryMutation();

  const rows = listQuery.data?.items || [];
  const pagination = listQuery.data?.pagination || { page: 1, totalPages: 1 };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  const handleEdit = (row) => {
    setEditingId(row._id);
    setForm({
      name: row.name || "",
      slug: row.slug || "",
      description: row.description || "",
      iconKey: row.iconKey || "plane",
      isActive: row.isActive !== false,
      sortOrder: Number(row.sortOrder) || 0,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      toast.error("Visa category name is required");
      return;
    }

    const payload = {
      name: form.name.trim(),
      slug: toSlug(form.slug || form.name),
      description: form.description.trim(),
      iconKey: toSlug(form.iconKey),
      isActive: Boolean(form.isActive),
      sortOrder: Number(form.sortOrder) || 0,
    };

    try {
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, payload });
        toast.success("Visa category updated");
      } else {
        await createMutation.mutateAsync(payload);
        toast.success("Visa category created");
      }

      resetForm();
    } catch (error) {
      toast.error(error.message || "Failed to save visa category");
    }
  };

  const handleToggleStatus = async (row) => {
    try {
      await statusMutation.mutateAsync({ id: row._id, payload: { isActive: !row.isActive } });
      toast.success(row.isActive ? "Visa category deactivated" : "Visa category activated");
    } catch (error) {
      toast.error(error.message || "Failed to update status");
    }
  };

  const handleDelete = async (row) => {
    if (!window.confirm(`Delete ${row.name}?`)) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(row._id);
      toast.success("Visa category deleted");
      if (editingId === row._id) {
        resetForm();
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete visa category");
    }
  };

  const columns = [
    {
      key: "name",
      label: "Name",
      render: (row) => (
        <div>
          <p className="font-medium text-slate-900">{row.name}</p>
          <p className="mt-1 text-xs text-slate-500">{row.slug}</p>
        </div>
      ),
    },
    {
      key: "iconKey",
      label: "Icon Key",
      render: (row) => row.iconKey || "-",
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <Badge variant={row.isActive ? "success" : "danger"}>{row.isActive ? "Active" : "Inactive"}</Badge>,
    },
    {
      key: "sortOrder",
      label: "Sort",
      render: (row) => row.sortOrder || 0,
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="secondary" onClick={() => handleEdit(row)}>Edit</Button>
          <Button size="sm" variant="secondary" onClick={() => handleToggleStatus(row)}>
            {row.isActive ? "Disable" : "Enable"}
          </Button>
          <Button size="sm" variant="danger" onClick={() => handleDelete(row)}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Visa Categories</h1>
        <p className="mt-1 text-sm text-slate-600">Manage reusable visa category master data.</p>
      </div>

      <FiltersBar>
        <Input
          value={filters.search}
          onChange={(event) => setFilters((current) => ({ ...current, page: 1, search: event.target.value }))}
          placeholder="Search name or slug"
        />

        <select
          value={filters.isActive}
          onChange={(event) => setFilters((current) => ({ ...current, page: 1, isActive: event.target.value }))}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="">All Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </FiltersBar>

      <DataTable
        columns={columns}
        rows={rows}
        loading={listQuery.isLoading}
        page={pagination.page || filters.page}
        totalPages={pagination.totalPages || 1}
        onPageChange={(page) => setFilters((current) => ({ ...current, page }))}
      />

      <form className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 md:p-5" onSubmit={handleSubmit}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">{editingId ? "Edit Visa Category" : "Create Visa Category"}</h2>
          {editingId ? (
            <Button type="button" variant="secondary" onClick={resetForm}>
              Cancel Edit
            </Button>
          ) : null}
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <Input placeholder="Name" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} />
          <Input placeholder="Slug" value={form.slug} onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))} />
          <Input
            placeholder="Icon Key"
            value={form.iconKey}
            onChange={(event) => setForm((current) => ({ ...current, iconKey: event.target.value }))}
          />
          <Input
            type="number"
            placeholder="Sort Order"
            value={form.sortOrder}
            onChange={(event) => setForm((current) => ({ ...current, sortOrder: event.target.value }))}
          />
          <div className="md:col-span-2">
            <textarea
              rows={3}
              placeholder="Description"
              value={form.description}
              onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <label className="inline-flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(event) => setForm((current) => ({ ...current, isActive: event.target.checked }))}
            />
            Active
          </label>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
            {editingId ? "Update Visa Category" : "Create Visa Category"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default VisaCategoriesPage;
