import React from "react";
import { useToast } from "../../../app/providers/ToastProvider";
import Badge from "../../../shared/ui/Badge";
import Button from "../../../shared/ui/Button";
import DataTable from "../../../shared/ui/DataTable";
import FiltersBar from "../../../shared/ui/FiltersBar";
import Input from "../../../shared/ui/Input";
import {
  useUploadUserDocumentMutation,
  useUserApplicationsQuery,
  useUserDocumentsQuery,
} from "./hooks";

const statusVariant = {
  pending: "warning",
  approved: "success",
  rejected: "danger",
  needs_resubmission: "warning",
};

const INITIAL_FORM = {
  caseId: "",
  applicantId: "",
  documentType: "passport_copy",
  checklistItemId: "",
  accessLevel: "customer_visible",
};

const getEntityId = (value) => {
  if (!value) {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  return value._id || value.id || "";
};

const getCaseLabel = (value) => {
  if (!value) {
    return "-";
  }

  if (typeof value === "string") {
    return value;
  }

  return value.caseId || value.applicationNumber || value._id || "-";
};

const getApplicantLabel = (value) => {
  if (!value) {
    return "-";
  }

  if (typeof value === "string") {
    return value;
  }

  const fullName = [value.firstName, value.lastName].filter(Boolean).join(" ").trim();
  return fullName || value.fullName || value.email || value._id || "-";
};

const formatDate = (value) => {
  if (!value) {
    return "-";
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? "-" : parsed.toLocaleString();
};

const UserDocumentsPage = () => {
  const toast = useToast();
  const fileInputRef = React.useRef(null);

  const [params, setParams] = React.useState({
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const [uploadForm, setUploadForm] = React.useState(INITIAL_FORM);
  const [selectedPair, setSelectedPair] = React.useState("");
  const [file, setFile] = React.useState(null);

  const documentsQuery = useUserDocumentsQuery(params);
  const applicationsQuery = useUserApplicationsQuery({ page: 1, limit: 200 });
  const uploadMutation = useUploadUserDocumentMutation();

  const rows = React.useMemo(() => documentsQuery.data?.items || [], [documentsQuery.data?.items]);
  const pagination = documentsQuery.data?.pagination || { page: 1, totalPages: 1 };
  const applicationRows = React.useMemo(
    () => applicationsQuery.data?.items || [],
    [applicationsQuery.data?.items]
  );

  const caseApplicantOptions = React.useMemo(() => {
    const collected = new Map();

    const pushOption = (caseRef, applicantRef, extraLabel = "") => {
      const caseId = getEntityId(caseRef);
      const applicantId = getEntityId(applicantRef);

      if (!caseId || !applicantId) {
        return;
      }

      const key = `${caseId}:${applicantId}`;
      if (collected.has(key)) {
        return;
      }

      const caseLabel = getCaseLabel(caseRef);
      const applicantLabel = getApplicantLabel(applicantRef);
      const labelSuffix = extraLabel ? ` (${extraLabel})` : "";

      collected.set(key, {
        key,
        caseId,
        applicantId,
        label: `${caseLabel} - ${applicantLabel}${labelSuffix}`,
      });
    };

    applicationRows.forEach((item) => {
      pushOption(item.caseId, item.applicantId, item.applicationNumber || "Application");
    });

    rows.forEach((item) => {
      pushOption(item.caseId, item.applicantId, "From document history");
    });

    return Array.from(collected.values());
  }, [applicationRows, rows]);

  const handlePairChange = (event) => {
    const selectedKey = event.target.value;
    setSelectedPair(selectedKey);

    if (!selectedKey) {
      return;
    }

    const selected = caseApplicantOptions.find((item) => item.key === selectedKey);
    if (!selected) {
      return;
    }

    setUploadForm((current) => ({
      ...current,
      caseId: selected.caseId,
      applicantId: selected.applicantId,
    }));
  };

  const handleUploadSubmit = async (event) => {
    event.preventDefault();

    if (!uploadForm.caseId.trim() || !uploadForm.applicantId.trim() || !uploadForm.documentType.trim()) {
      toast.error("Case ID, applicant ID, and document type are required");
      return;
    }

    if (!file) {
      toast.error("Please choose a file to upload");
      return;
    }

    const payload = new FormData();
    payload.append("caseId", uploadForm.caseId.trim());
    payload.append("applicantId", uploadForm.applicantId.trim());
    payload.append("documentType", uploadForm.documentType.trim());
    payload.append("accessLevel", uploadForm.accessLevel);

    if (uploadForm.checklistItemId.trim()) {
      payload.append("checklistItemId", uploadForm.checklistItemId.trim());
    }

    payload.append("file", file);

    try {
      await uploadMutation.mutateAsync(payload);
      toast.success("Document uploaded successfully");
      setUploadForm(INITIAL_FORM);
      setSelectedPair("");
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast.error(error.message || "Failed to upload document");
    }
  };

  const columns = [
    {
      key: "documentName",
      label: "Document",
      render: (row) => (
        <div>
          <p className="font-medium text-slate-900">{row.title || row.documentName || row.documentType || "Untitled"}</p>
          <p className="mt-1 text-xs text-slate-500">{row.documentType || row.category || "other"}</p>
        </div>
      ),
    },
    {
      key: "verificationStatus",
      label: "Status",
      render: (row) => (
        <Badge variant={statusVariant[row.verificationStatus] || "neutral"}>{row.verificationStatus || "pending"}</Badge>
      ),
    },
    {
      key: "caseId",
      label: "Case",
      render: (row) => getCaseLabel(row.caseId),
    },
    {
      key: "applicantId",
      label: "Applicant",
      render: (row) => getApplicantLabel(row.applicantId),
    },
    {
      key: "createdAt",
      label: "Uploaded",
      render: (row) => formatDate(row.createdAt),
    },
    {
      key: "fileUrl",
      label: "File",
      render: (row) =>
        row.fileUrl ? (
          <a
            href={row.fileUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Open
          </a>
        ) : (
          "-"
        ),
    },
  ];

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-slate-900">My Documents</h2>
        <p className="mt-1 text-sm text-slate-600">Upload required files and track each document verification status.</p>
      </div>

      <form className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 md:p-5" onSubmit={handleUploadSubmit}>
        <h3 className="text-base font-semibold text-slate-900">Upload Document</h3>

        <div className="grid gap-3 md:grid-cols-2">
          <select
            value={selectedPair}
            onChange={handlePairChange}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm md:col-span-2"
          >
            <option value="">Choose linked case/applicant (optional)</option>
            {caseApplicantOptions.map((item) => (
              <option key={item.key} value={item.key}>
                {item.label}
              </option>
            ))}
          </select>

          <Input
            placeholder="Case ID"
            value={uploadForm.caseId}
            onChange={(event) => setUploadForm((current) => ({ ...current, caseId: event.target.value }))}
          />

          <Input
            placeholder="Applicant ID"
            value={uploadForm.applicantId}
            onChange={(event) => setUploadForm((current) => ({ ...current, applicantId: event.target.value }))}
          />

          <Input
            placeholder="Document type (example: passport_copy)"
            value={uploadForm.documentType}
            onChange={(event) => setUploadForm((current) => ({ ...current, documentType: event.target.value }))}
          />

          <Input
            placeholder="Checklist item ID (optional)"
            value={uploadForm.checklistItemId}
            onChange={(event) => setUploadForm((current) => ({ ...current, checklistItemId: event.target.value }))}
          />

          <select
            value={uploadForm.accessLevel}
            onChange={(event) => setUploadForm((current) => ({ ...current, accessLevel: event.target.value }))}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="customer_visible">Customer Visible</option>
            <option value="internal">Internal</option>
          </select>

          <input
            ref={fileInputRef}
            type="file"
            onChange={(event) => setFile(event.target.files?.[0] || null)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={uploadMutation.isPending}>
            {uploadMutation.isPending ? "Uploading..." : "Upload Document"}
          </Button>
        </div>
      </form>

      <FiltersBar>
        <select
          value={String(params.limit)}
          onChange={(event) =>
            setParams((current) => ({ ...current, page: 1, limit: Number(event.target.value) || 10 }))
          }
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
          <option value="50">50 per page</option>
        </select>

        <select
          value={params.sortBy}
          onChange={(event) =>
            setParams((current) => ({ ...current, page: 1, sortBy: event.target.value }))
          }
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="createdAt">Sort by created date</option>
          <option value="updatedAt">Sort by updated date</option>
        </select>

        <select
          value={params.sortOrder}
          onChange={(event) =>
            setParams((current) => ({ ...current, page: 1, sortOrder: event.target.value }))
          }
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="desc">Newest first</option>
          <option value="asc">Oldest first</option>
        </select>

        <div className="flex items-center rounded-xl border border-dashed border-slate-300 px-3 py-2 text-xs text-slate-500">
          Documents are shown only for your linked applicants/cases.
        </div>
      </FiltersBar>

      <DataTable
        columns={columns}
        rows={rows}
        loading={documentsQuery.isLoading}
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

export default UserDocumentsPage;
