import React from "react";
import DataTable from "../../../shared/ui/DataTable";
import Button from "../../../shared/ui/Button";
import Badge from "../../../shared/ui/Badge";
import { useToast } from "../../../app/providers/ToastProvider";
import { useCreateManualPaymentMutation, usePaymentsQuery, useUpdatePaymentStatusMutation } from "../hooks";

const statusVariant = {
  pending: "warning",
  paid: "success",
  failed: "danger",
  refunded: "danger",
  partially_refunded: "warning",
  partial: "warning",
};

const PaymentsPage = () => {
  const toast = useToast();
  const [params, setParams] = React.useState({ page: 1, limit: 10, sortBy: "createdAt", sortOrder: "desc" });

  const query = usePaymentsQuery(params);
  const createMutation = useCreateManualPaymentMutation();
  const statusMutation = useUpdatePaymentStatusMutation();

  const rows = query.data?.items || [];
  const pagination = query.data?.pagination || { page: 1, totalPages: 1 };

  const addManualPayment = async () => {
    const amount = Number(window.prompt("Enter payment amount", "1000"));
    if (!amount || Number.isNaN(amount)) {
      return;
    }

    try {
      await createMutation.mutateAsync({ amount, currency: "INR", status: "paid", method: "manual" });
      toast.success("Manual payment added");
    } catch (error) {
      toast.error(error.message || "Failed to create payment");
    }
  };

  const setStatus = async (paymentId, status) => {
    try {
      await statusMutation.mutateAsync({ paymentId, payload: { status } });
      toast.success("Payment status updated");
    } catch (error) {
      toast.error(error.message || "Failed to update payment status");
    }
  };

  const columns = [
    { key: "invoice", label: "Invoice", render: (row) => row.invoiceNumber || row.invoiceId?.invoiceNumber || "-" },
    { key: "amount", label: "Amount", render: (row) => `${row.amount || 0} ${row.currency || ""}`.trim() },
    { key: "provider", label: "Provider", render: (row) => row.provider || row.method || "manual" },
    {
      key: "status",
      label: "Status",
      render: (row) => <Badge variant={statusVariant[row.status] || "neutral"}>{row.status || "pending"}</Badge>,
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" onClick={() => setStatus(row._id, "paid")}>Mark Paid</Button>
          <Button size="sm" variant="secondary" onClick={() => setStatus(row._id, "failed")}>Mark Failed</Button>
        </div>
      ),
    },
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Payments</h1>
          <p className="mt-1 text-sm text-slate-600">Manage payment states, manual entries, and invoice-linked records.</p>
        </div>
        <Button onClick={addManualPayment} disabled={createMutation.isPending}>Add Manual Payment</Button>
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

export default PaymentsPage;
