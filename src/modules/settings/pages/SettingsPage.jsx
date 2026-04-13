import React from "react";
import DataTable from "../../../shared/ui/DataTable";
import Button from "../../../shared/ui/Button";
import { useToast } from "../../../app/providers/ToastProvider";
import { usePatchSettingsMutation, useSettingsQuery } from "../hooks";

const SettingsPage = () => {
  const toast = useToast();
  const [params, setParams] = React.useState({ page: 1, limit: 20, sortBy: "key", sortOrder: "asc" });

  const query = useSettingsQuery(params);
  const patchMutation = usePatchSettingsMutation();

  const rows = query.data?.items || [];
  const pagination = query.data?.pagination || { page: 1, totalPages: 1 };

  const updateSetting = async () => {
    try {
      await patchMutation.mutateAsync({
        settings: [
          {
            key: "system.defaultCurrency",
            value: "INR",
            group: "system",
          },
        ],
      });
      toast.success("Settings updated");
    } catch (error) {
      toast.error(error.message || "Failed to update settings");
    }
  };

  const columns = [
    { key: "key", label: "Key", render: (row) => row.key || "-" },
    { key: "group", label: "Group", render: (row) => row.group || "general" },
    { key: "value", label: "Value", render: (row) => (typeof row.value === "object" ? JSON.stringify(row.value) : String(row.value ?? "")) },
  ];

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="mt-1 text-sm text-slate-600">Manage configurable values across operational modules.</p>
        </div>
        <Button className="w-full sm:w-auto" onClick={updateSetting} disabled={patchMutation.isPending}>Update Default Currency</Button>
      </div>

      <DataTable
        columns={columns}
        rows={rows}
        loading={query.isLoading}
        page={pagination.page || params.page}
        totalPages={pagination.totalPages || 1}
        sortBy={params.sortBy}
        sortOrder={params.sortOrder}
        onPageChange={(page) => setParams((current) => ({ ...current, page }))}
        onSortChange={(sortBy, sortOrder) => setParams((current) => ({ ...current, page: 1, sortBy, sortOrder }))}
      />
    </section>
  );
};

export default SettingsPage;
