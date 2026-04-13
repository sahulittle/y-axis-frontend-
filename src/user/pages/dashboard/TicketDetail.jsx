import React from "react";
import { Link, useParams } from "react-router-dom";
import { useToast } from "../../../app/providers/ToastProvider";
import Badge from "../../../shared/ui/Badge";
import Button from "../../../shared/ui/Button";
import { useReplyUserTicketMutation, useUserTicketDetailQuery } from "./hooks";

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

const UserTicketDetailPage = () => {
  const { id } = useParams();
  const toast = useToast();

  const [message, setMessage] = React.useState("");
  const [files, setFiles] = React.useState([]);

  const detailQuery = useUserTicketDetailQuery(id, { enabled: Boolean(id) });
  const replyMutation = useReplyUserTicketMutation();

  const ticket = detailQuery.data;
  const replies = Array.isArray(ticket?.replies) ? ticket.replies : [];

  const handleReplySubmit = async (event) => {
    event.preventDefault();

    if (!message.trim()) {
      toast.error("Reply message is required");
      return;
    }

    const payload = new FormData();
    payload.append("message", message.trim());

    files.forEach((file) => {
      payload.append("attachments", file);
    });

    try {
      await replyMutation.mutateAsync({ id, payload });
      setMessage("");
      setFiles([]);
      toast.success("Reply sent successfully");
    } catch (error) {
      toast.error(error.message || "Failed to send reply");
    }
  };

  if (detailQuery.isLoading) {
    return <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">Loading ticket...</div>;
  }

  if (detailQuery.error) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
        {detailQuery.error.message || "Failed to load ticket"}
      </div>
    );
  }

  const isClosed = ticket?.status === "closed";

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Ticket Details</h2>
          <p className="mt-1 text-sm text-slate-600">{ticket?.ticketNumber || "-"}</p>
        </div>
        <Link
          to="/user/tickets"
          className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Back to Tickets
        </Link>
      </div>

      <article className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={statusVariant(ticket?.status)}>{formatLabel(ticket?.status)}</Badge>
          <Badge variant="info">Priority: {formatLabel(ticket?.priority || "medium")}</Badge>
          <Badge variant="neutral">Category: {formatLabel(ticket?.category || "general_support")}</Badge>
        </div>
        <h3 className="mt-3 text-lg font-semibold text-slate-900">{ticket?.subject}</h3>
        <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">{ticket?.description}</p>
        {ticket?.applicationId?.applicationNumber ? (
          <p className="mt-2 text-xs text-slate-500">
            Linked Application: {ticket.applicationId.applicationNumber} ({formatLabel(ticket.applicationId.status || "-")})
          </p>
        ) : null}
      </article>

      <article className="rounded-2xl border border-slate-200 bg-white p-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Conversation</h3>
        <div className="mt-3 space-y-2">
          {replies.length === 0 ? (
            <p className="text-sm text-slate-500">No replies yet.</p>
          ) : (
            replies.map((reply) => (
              <div
                key={reply._id}
                className={`rounded-xl border p-3 ${reply.senderType === "user" ? "border-teal-200 bg-teal-50" : "border-slate-200 bg-slate-50"}`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-600">{formatLabel(reply.senderType)} Reply</p>
                <p className="mt-1 whitespace-pre-wrap text-sm text-slate-800">{reply.message}</p>
                <p className="mt-1 text-xs text-slate-500">{reply.createdAt ? new Date(reply.createdAt).toLocaleString() : "-"}</p>
                {Array.isArray(reply.attachments) && reply.attachments.length > 0 ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {reply.attachments.map((attachment, index) => (
                      <a
                        key={`${attachment.fileUrl}-${index}`}
                        href={attachment.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg border border-slate-300 px-2 py-1 text-xs text-slate-700 hover:bg-white"
                      >
                        {attachment.originalName || `Attachment ${index + 1}`}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            ))
          )}
        </div>
      </article>

      <form className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4" onSubmit={handleReplySubmit}>
        <h3 className="text-base font-semibold text-slate-900">Send Reply</h3>

        <textarea
          rows={4}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={isClosed ? "Ticket is closed" : "Write your message"}
          disabled={isClosed}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
        />

        <input
          type="file"
          multiple
          disabled={isClosed}
          onChange={(event) => setFiles(Array.from(event.target.files || []))}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={isClosed || replyMutation.isPending}>
            {replyMutation.isPending ? "Sending..." : "Send Reply"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default UserTicketDetailPage;
