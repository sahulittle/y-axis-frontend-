import React from "react";
import { Link } from "react-router-dom";
import { useToast } from "../../../app/providers/ToastProvider";
import Badge from "../../../shared/ui/Badge";
import Button from "../../../shared/ui/Button";
import DataTable from "../../../shared/ui/DataTable";
import FiltersBar from "../../../shared/ui/FiltersBar";
import Input from "../../../shared/ui/Input";
import { useCreateUserTicketMutation, useUserApplicationsQuery, useUserTicketsQuery } from "./hooks";

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

const statusVariant = (status = "") => {
  if (status === "resolved") {
    return "success";
  }
  if (status === "closed") {
    return "danger";
  }
  return "warning";
};

const priorityVariant = (priority = "") => {
  if (priority === "high") {
    return "danger";
  }
  if (priority === "low") {
    return "success";
  }
  return "warning";
};

const INITIAL_FORM = {
  applicationId: "",
  category: "general_support",
  priority: "medium",
  subject: "",
  description: "",
};

const UserTicketsPage = () => {
  const toast = useToast();

  const [filters, setFilters] = React.useState({
    page: 1,
    limit: 10,
    search: "",
    status: "",
    priority: "",
  });

  const [form, setForm] = React.useState(INITIAL_FORM);
  const [attachmentFiles, setAttachmentFiles] = React.useState([]);

  const ticketsQuery = useUserTicketsQuery(filters);
  const applicationsQuery = useUserApplicationsQuery({ page: 1, limit: 200 });
  const createTicketMutation = useCreateUserTicketMutation();

  const rows = ticketsQuery.data?.items || [];
  const pagination = ticketsQuery.data?.pagination || { page: 1, totalPages: 1 };
  const applicationOptions = applicationsQuery.data?.items || [];

  const handleCreateTicket = async (event) => {
    event.preventDefault();

    if (!form.subject.trim() || !form.description.trim()) {
      toast.error("Subject and description are required");
      return;
    }

    const payload = new FormData();
    payload.append("subject", form.subject.trim());
    payload.append("description", form.description.trim());
    payload.append("category", form.category);
    payload.append("priority", form.priority);

    if (form.applicationId) {
      payload.append("applicationId", form.applicationId);
    }

    attachmentFiles.forEach((file) => {
      payload.append("attachments", file);
    });

    try {
      await createTicketMutation.mutateAsync(payload);
      toast.success("Ticket created successfully");
      setForm(INITIAL_FORM);
      setAttachmentFiles([]);
    } catch (error) {
      toast.error(error.message || "Failed to create ticket");
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
          <p className="mt-1 text-xs text-slate-500">{row.applicationId?.applicationNumber || "No linked application"}</p>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <Badge variant={statusVariant(row.status)}>{formatLabel(row.status)}</Badge>,
    },
    {
      key: "priority",
      label: "Priority",
      render: (row) => <Badge variant={priorityVariant(row.priority)}>{formatLabel(row.priority)}</Badge>,
    },
    {
      key: "actions",
      label: "Details",
      render: (row) => (
        <Link
          to={`/user/tickets/${row._id}`}
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
        >
          View
        </Link>
      ),
    },
  ];

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Support Tickets</h2>
        <p className="mt-1 text-sm text-slate-600">Create new support requests and track ongoing conversations.</p>
      </div>

      <form className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 md:p-5" onSubmit={handleCreateTicket}>
        <h3 className="text-base font-semibold text-slate-900">Create Ticket</h3>

        <div className="grid gap-3 md:grid-cols-2">
          <select
            value={form.applicationId}
            onChange={(event) => setForm((current) => ({ ...current, applicationId: event.target.value }))}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="">Link to application (optional)</option>
            {applicationOptions.map((item) => (
              <option key={item._id} value={item._id}>
                {item.applicationNumber} - {item.countrySlug}/{item.visaTypeSlug}
              </option>
            ))}
          </select>

          <select
            value={form.category}
            onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          >
            {TICKET_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {formatLabel(category)}
              </option>
            ))}
          </select>

          <select
            value={form.priority}
            onChange={(event) => setForm((current) => ({ ...current, priority: event.target.value }))}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          >
            {TICKET_PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {formatLabel(priority)}
              </option>
            ))}
          </select>

          <Input
            placeholder="Subject"
            value={form.subject}
            onChange={(event) => setForm((current) => ({ ...current, subject: event.target.value }))}
          />

          <div className="md:col-span-2">
            <textarea
              rows={4}
              placeholder="Describe your issue"
              value={form.description}
              onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">Attachments (optional)</label>
            <input
              type="file"
              multiple
              onChange={(event) => setAttachmentFiles(Array.from(event.target.files || []))}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={createTicketMutation.isPending}>
            {createTicketMutation.isPending ? "Creating..." : "Create Ticket"}
          </Button>
        </div>
      </form>

      <FiltersBar>
        <Input
          value={filters.search}
          onChange={(event) => setFilters((current) => ({ ...current, page: 1, search: event.target.value }))}
          placeholder="Search ticket number or subject"
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
      </FiltersBar>

      <DataTable
        columns={columns}
        rows={rows}
        loading={ticketsQuery.isLoading}
        page={pagination.page || filters.page}
        totalPages={pagination.totalPages || 1}
        onPageChange={(page) => setFilters((current) => ({ ...current, page }))}
      />
    </section>
  );
};

export default UserTicketsPage;
