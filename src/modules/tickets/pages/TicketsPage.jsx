import React from "react";
import { useToast } from "../../../app/providers/ToastProvider";
import Badge from "../../../shared/ui/Badge";
import Button from "../../../shared/ui/Button";
import DataTable from "../../../shared/ui/DataTable";
import FiltersBar from "../../../shared/ui/FiltersBar";
import Input from "../../../shared/ui/Input";
import { useReplyToTicketMutation, useTicketDetailQuery, useTicketsQuery, useUpdateTicketStatusMutation } from "../hooks";

const TICKET_STATUSES = ["open", "in_progress", "resolved", "closed"];
const TICKET_PRIORITIES = ["low", "medium", "high"];
const TICKET_CATEGORIES = [
  "document_issue",
  "status_query",
  "payment_issue",
  "profile_issue",
  "application_update_request",
  "general_support",
];

const formatLabel = (value = "") => value.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

const statusBadgeVariant = (status = "") => {
  if (status === "resolved") {
    return "success";
  }
  if (status === "closed") {
    return "danger";
  }
  return "default";
};

const priorityBadgeVariant = (priority = "") => {
  if (priority === "high") {
    return "danger";
  }
  if (priority === "medium") {
    return "default";
  }
  return "success";
};

const TicketsPage = () => {
  const toast = useToast();

  const [filters, setFilters] = React.useState({
    page: 1,
    limit: 10,
    search: "",
    status: "",
    priority: "",
    category: "",
  });

  const [selectedId, setSelectedId] = React.useState(null);
  const [statusDraft, setStatusDraft] = React.useState("open");
  const [priorityDraft, setPriorityDraft] = React.useState("medium");
  const [replyMessage, setReplyMessage] = React.useState("");

  const listQuery = useTicketsQuery(filters);
  const detailQuery = useTicketDetailQuery(selectedId, { enabled: Boolean(selectedId) });
  const statusMutation = useUpdateTicketStatusMutation();
  const replyMutation = useReplyToTicketMutation();

  const rows = listQuery.data?.items || [];
  const pagination = listQuery.data?.pagination || { page: 1, totalPages: 1 };

  React.useEffect(() => {
    if (!detailQuery.data) {
      return;
    }

    setStatusDraft(detailQuery.data.status || "open");
    setPriorityDraft(detailQuery.data.priority || "medium");
  }, [detailQuery.data]);

  const handleSelect = (row) => {
    setSelectedId(row._id);
    setReplyMessage("");
  };

  const handleStatusSave = async () => {
    if (!selectedId) {
      return;
    }

    try {
      await statusMutation.mutateAsync({
        id: selectedId,
        payload: {
          status: statusDraft,
          priority: priorityDraft,
        },
      });
      toast.success("Ticket updated");
    } catch (error) {
      toast.error(error.message || "Failed to update ticket");
    }
  };

  const handleReply = async () => {
    if (!selectedId || !replyMessage.trim()) {
      return;
    }

    try {
      await replyMutation.mutateAsync({
        id: selectedId,
        payload: {
          message: replyMessage.trim(),
        },
      });
      setReplyMessage("");
      toast.success("Reply sent");
    } catch (error) {
      toast.error(error.message || "Failed to send reply");
    }
  };

  const columns = [
    {
      key: "ticketNumber",
      label: "Ticket",
      render: (row) => (
        <div>
          <p className="font-medium text-slate-900">{row.ticketNumber || "-"}</p>
          <p className="mt-1 text-xs text-slate-500">{formatLabel(row.category)}</p>
        </div>
      ),
    },
    {
      key: "subject",
      label: "Subject",
      render: (row) => (
        <div>
          <p className="font-medium text-slate-900">{row.subject}</p>
          <p className="mt-1 text-xs text-slate-500">{row.userId?.email || "-"}</p>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <Badge variant={statusBadgeVariant(row.status)}>{formatLabel(row.status)}</Badge>,
    },
    {
      key: "priority",
      label: "Priority",
      render: (row) => <Badge variant={priorityBadgeVariant(row.priority)}>{formatLabel(row.priority)}</Badge>,
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <Button size="sm" variant="secondary" onClick={() => handleSelect(row)}>
          {selectedId === row._id ? "Selected" : "Manage"}
        </Button>
      ),
    },
  ];

  const selectedTicket = detailQuery.data;

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Support Tickets</h1>
        <p className="mt-1 text-sm text-slate-600">Manage support queue status, priority, and internal responses.</p>
      </div>

      <FiltersBar>
        <Input
          value={filters.search}
          onChange={(event) => setFilters((current) => ({ ...current, page: 1, search: event.target.value }))}
          placeholder="Search ticket number, subject"
        />

        <select
          value={filters.status}
          onChange={(event) => setFilters((current) => ({ ...current, page: 1, status: event.target.value }))}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="">All Status</option>
          {TICKET_STATUSES.map((status) => (
            <option key={status} value={status}>
              {formatLabel(status)}
            </option>
          ))}
        </select>

        <select
          value={filters.priority}
          onChange={(event) => setFilters((current) => ({ ...current, page: 1, priority: event.target.value }))}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="">All Priority</option>
          {TICKET_PRIORITIES.map((priority) => (
            <option key={priority} value={priority}>
              {formatLabel(priority)}
            </option>
          ))}
        </select>

        <select
          value={filters.category}
          onChange={(event) => setFilters((current) => ({ ...current, page: 1, category: event.target.value }))}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="">All Categories</option>
          {TICKET_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {formatLabel(category)}
            </option>
          ))}
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

      {selectedId ? (
        <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 md:p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Manage Ticket</h2>
              <p className="text-sm text-slate-600">{selectedTicket?.ticketNumber || "Loading..."}</p>
            </div>
            <Button type="button" variant="secondary" onClick={() => setSelectedId(null)}>
              Close
            </Button>
          </div>

          {detailQuery.isLoading ? <p className="text-sm text-slate-500">Loading ticket details...</p> : null}

          {selectedTicket ? (
            <>
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Status</label>
                  <select
                    value={statusDraft}
                    onChange={(event) => setStatusDraft(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                  >
                    {TICKET_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {formatLabel(status)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Priority</label>
                  <select
                    value={priorityDraft}
                    onChange={(event) => setPriorityDraft(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                  >
                    {TICKET_PRIORITIES.map((priority) => (
                      <option key={priority} value={priority}>
                        {formatLabel(priority)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Reply Message</label>
                <textarea
                  rows={4}
                  value={replyMessage}
                  onChange={(event) => setReplyMessage(event.target.value)}
                  placeholder="Write a response for the user"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Button type="button" onClick={handleStatusSave} disabled={statusMutation.isPending}>
                  Update Status
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleReply}
                  disabled={replyMutation.isPending || !replyMessage.trim()}
                >
                  Send Reply
                </Button>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
                <p className="font-medium text-slate-900">{selectedTicket.subject}</p>
                <p className="mt-1 whitespace-pre-wrap">{selectedTicket.description}</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-800">Conversation</h3>
                {(selectedTicket.replies || []).length === 0 ? (
                  <p className="text-sm text-slate-500">No replies yet.</p>
                ) : (
                  (selectedTicket.replies || []).map((reply) => (
                    <div key={reply._id} className="rounded-xl border border-slate-200 p-3 text-sm">
                      <p className="font-medium text-slate-900">{formatLabel(reply.senderType)} Reply</p>
                      <p className="mt-1 whitespace-pre-wrap text-slate-700">{reply.message}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {reply.createdAt ? new Date(reply.createdAt).toLocaleString() : "-"}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </>
          ) : null}
        </div>
      ) : null}
    </section>
  );
};

export default TicketsPage;
