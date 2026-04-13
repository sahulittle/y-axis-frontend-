import React from "react";
import DataTable from "../../../shared/ui/DataTable";
import Button from "../../../shared/ui/Button";
import Badge from "../../../shared/ui/Badge";
import { useToast } from "../../../app/providers/ToastProvider";
import { useAppointmentsQuery, useDeleteAppointmentMutation, useUpdateAppointmentStatusMutation } from "../hooks";

const statusVariant = {
  pending: "warning",
  scheduled: "info",
  confirmed: "info",
  rescheduled: "warning",
  completed: "success",
  cancelled: "danger",
  missed: "danger",
};

const AppointmentsPage = () => {
  const toast = useToast();
  const [params, setParams] = React.useState({ page: 1, limit: 10, sortBy: "appointmentDate", sortOrder: "asc" });

  const query = useAppointmentsQuery(params);
  const statusMutation = useUpdateAppointmentStatusMutation();
  const deleteMutation = useDeleteAppointmentMutation();

  const rows = query.data?.items || [];
  const pagination = query.data?.pagination || { page: 1, totalPages: 1 };

  const setStatus = async (appointmentId, status) => {
    try {
      await statusMutation.mutateAsync({ appointmentId, payload: { status } });
      toast.success("Appointment status updated");
    } catch (error) {
      toast.error(error.message || "Failed to update appointment");
    }
  };

  const removeAppointment = async (appointmentId) => {
    try {
      await deleteMutation.mutateAsync(appointmentId);
      toast.success("Appointment deleted");
    } catch (error) {
      toast.error(error.message || "Failed to delete appointment");
    }
  };

  const columns = [
    { key: "appointmentType", label: "Type", render: (row) => row.appointmentType || "-" },
    {
      key: "appointmentDate",
      label: "Date",
      render: (row) => (row.appointmentDate ? new Date(row.appointmentDate).toLocaleString() : "-"),
    },
    { key: "center", label: "Center", render: (row) => row.center || "-" },
    {
      key: "status",
      label: "Status",
      render: (row) => <Badge variant={statusVariant[row.status || row.bookingStatus] || "neutral"}>{row.status || row.bookingStatus || "pending"}</Badge>,
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" onClick={() => setStatus(row._id, "completed")}>Complete</Button>
          <Button size="sm" variant="secondary" onClick={() => setStatus(row._id, "cancelled")}>Cancel</Button>
          <Button size="sm" onClick={() => removeAppointment(row._id)}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Appointments</h1>
        <p className="mt-1 text-sm text-slate-600">Track consultation, biometrics, and interview schedules.</p>
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

export default AppointmentsPage;
