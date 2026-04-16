import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../../app/providers/ToastProvider";
import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";
import ArrayRepeater from "../components/ArrayRepeater";
import {
  useAdminVisaTypeDetailQuery,
  useCreateAdminVisaTypeMutation,
  useDeleteAdminVisaTypeMutation,
  useUpdateAdminVisaTypeMutation,
} from "../hooks";
import { useCountriesQuery } from "../../countries/hooks";
import { useVisaCategoriesQuery } from "../../visa-categories/hooks";

const ICON_OPTIONS = [
  "graduation-cap",
  "users",
  "briefcase",
  "plane",
  "file-text",
  "shield-check",
  "clock-3",
  "badge-check",
  "sparkles",
  "folder-check",
  "messages-square",
];

const toSlug = (value = "") =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

const trim = (value) => String(value || "").trim();

const normalizeStringArray = (input) => {
  if (!Array.isArray(input)) {
    return [];
  }
  return input.map((item) => trim(item)).filter(Boolean);
};

const normalizeStructuredTextArray = (input, keyHints = []) => {
  if (!Array.isArray(input)) {
    return [];
  }

  return input
    .map((item) => {
      if (typeof item === "string") {
        return trim(item);
      }

      if (!item || typeof item !== "object") {
        return "";
      }

      for (const key of keyHints) {
        const value = trim(item[key]);
        if (value) {
          return value;
        }
      }

      return "";
    })
    .filter(Boolean);
};

const initialForm = {
  countryId: "",
  visaCategoryId: "",
  countryName: "",
  countrySlug: "",
  visaTypeName: "",
  visaTypeSlug: "",
  title: "",
  badge: "",
  subtitle: "",
  heroImage: "",
  iconKey: "plane",
  serviceHighlights: [],
  eligibility: [],
  requiredDocs: [],
  process: [],
  timeline: [],
  faqs: [],
  ctaTitle: "",
  ctaText: "",
  seoTitle: "",
  seoDescription: "",
  metaKeywords: [],
  isActive: true,
  isFeatured: false,
  sortOrder: 0,
};

const mapApiToForm = (data) => ({
  countryId: data.countryId || data.country?._id || "",
  visaCategoryId: data.visaCategoryId || data.visaCategory?._id || "",
  countryName: data.countryName || "",
  countrySlug: data.countrySlug || "",
  visaTypeName: data.visaTypeName || "",
  visaTypeSlug: data.visaTypeSlug || "",
  title: data.title || "",
  badge: data.badge || "",
  subtitle: data.subtitle || "",
  heroImage: data.heroImage || "",
  iconKey: data.iconKey || "plane",
  serviceHighlights: Array.isArray(data.serviceHighlights) ? data.serviceHighlights : [],
  eligibility: normalizeStringArray(data.eligibility),
  requiredDocs: normalizeStructuredTextArray(data.requiredDocs, ["name", "title", "label"]),
  process: normalizeStructuredTextArray(data.process, ["title", "label", "name"]),
  timeline: normalizeStructuredTextArray(data.timeline, ["label", "title", "name"]),
  faqs: Array.isArray(data.faqs) ? data.faqs : [],
  ctaTitle: data.ctaTitle || "",
  ctaText: data.ctaText || "",
  seoTitle: data.seoTitle || "",
  seoDescription: data.seoDescription || "",
  metaKeywords: Array.isArray(data.metaKeywords) ? data.metaKeywords : [],
  isActive: data.isActive !== false,
  isFeatured: Boolean(data.isFeatured),
  sortOrder: Number(data.sortOrder) || 0,
});

const buildPayload = (form) => ({
  countryId: trim(form.countryId) || undefined,
  visaCategoryId: trim(form.visaCategoryId) || undefined,
  countryName: trim(form.countryName),
  countrySlug: toSlug(form.countrySlug || form.countryName),
  visaTypeName: trim(form.visaTypeName),
  visaTypeSlug: toSlug(form.visaTypeSlug || form.visaTypeName),
  title: trim(form.title),
  badge: trim(form.badge),
  subtitle: trim(form.subtitle),
  heroImage: trim(form.heroImage),
  iconKey: trim(form.iconKey).toLowerCase(),
  serviceHighlights: (form.serviceHighlights || [])
    .map((item) => ({
      title: trim(item.title),
      description: trim(item.description),
      iconKey: trim(item.iconKey).toLowerCase(),
    }))
    .filter((item) => item.title || item.description),
  eligibility: normalizeStringArray(form.eligibility),
  requiredDocs: normalizeStringArray(form.requiredDocs),
  process: normalizeStringArray(form.process),
  timeline: normalizeStringArray(form.timeline),
  faqs: (form.faqs || [])
    .map((item) => ({ question: trim(item.question), answer: trim(item.answer) }))
    .filter((item) => item.question || item.answer),
  ctaTitle: trim(form.ctaTitle),
  ctaText: trim(form.ctaText),
  seoTitle: trim(form.seoTitle),
  seoDescription: trim(form.seoDescription),
  metaKeywords: normalizeStringArray(form.metaKeywords).map((item) => item.toLowerCase()),
  isActive: Boolean(form.isActive),
  isFeatured: Boolean(form.isFeatured),
  sortOrder: Number(form.sortOrder) || 0,
});

const validateForm = (payload) => {
  const errors = {};

  if (!payload.countryId) {
    errors.countryId = "Country selection is required";
  }

  if (!payload.visaCategoryId) {
    errors.visaCategoryId = "Visa category selection is required";
  }

  if (!payload.countrySlug) {
    errors.countrySlug = "Country slug is required";
  }

  if (!payload.visaTypeName) {
    errors.visaTypeName = "Visa type name is required";
  }

  if (!payload.visaTypeSlug) {
    errors.visaTypeSlug = "Visa type slug is required";
  }

  if (!payload.title) {
    errors.title = "Title is required";
  }

  if (payload.heroImage && !/^(https?:\/\/|\/)/i.test(payload.heroImage)) {
    errors.heroImage = "Hero image must be a valid URL or path";
  }

  const invalidFaq = payload.faqs.find((item) => !item.question || !item.answer);
  if (invalidFaq) {
    errors.faqs = "Each FAQ item requires both question and answer";
  }

  const invalidHighlight = payload.serviceHighlights.find((item) => !item.title || !item.description);
  if (invalidHighlight) {
    errors.serviceHighlights = "Each service highlight requires both title and description";
  }

  return errors;
};

const VisaTypeFormPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { visaTypeId } = useParams();
  const isEdit = Boolean(visaTypeId);

  const [form, setForm] = React.useState(initialForm);
  const [errors, setErrors] = React.useState({});

  const detailQuery = useAdminVisaTypeDetailQuery(visaTypeId, { enabled: isEdit });
  const createMutation = useCreateAdminVisaTypeMutation();
  const updateMutation = useUpdateAdminVisaTypeMutation();
  const deleteMutation = useDeleteAdminVisaTypeMutation();
  const countriesQuery = useCountriesQuery({ page: 1, limit: 300, isActive: true });
  const visaCategoriesQuery = useVisaCategoriesQuery({ page: 1, limit: 300, isActive: true });

  const countries = countriesQuery.data?.items || [];
  const visaCategories = visaCategoriesQuery.data?.items || [];

  React.useEffect(() => {
    if (detailQuery.data && isEdit) {
      setForm(mapApiToForm(detailQuery.data));
    }
  }, [detailQuery.data, isEdit]);

  const setField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleCountrySelection = (countryId) => {
    const selected = countries.find((item) => item._id === countryId);
    setForm((current) => ({
      ...current,
      countryId,
      countryName: selected?.name || current.countryName,
      countrySlug: selected?.slug || current.countrySlug,
    }));
  };

  const handleVisaCategorySelection = (visaCategoryId) => {
    const selected = visaCategories.find((item) => item._id === visaCategoryId);
    setForm((current) => ({
      ...current,
      visaCategoryId,
      visaTypeName: selected?.name || current.visaTypeName,
      visaTypeSlug: selected?.slug || current.visaTypeSlug,
      iconKey: selected?.iconKey || current.iconKey,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = buildPayload(form);
    const nextErrors = validateForm(payload);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      toast.error("Please fix highlighted fields before saving");
      return;
    }

    try {
      if (isEdit) {
        await updateMutation.mutateAsync({ id: visaTypeId, payload });
        toast.success("Visa type updated");
      } else {
        await createMutation.mutateAsync(payload);
        toast.success("Visa type created");
      }

      navigate("/admin/visa-types");
    } catch (error) {
      toast.error(error.message || "Failed to save visa type");
    }
  };

  const handleDelete = async () => {
    if (!isEdit) {
      return;
    }

    if (!window.confirm("Delete this visa type? This action cannot be undone.")) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(visaTypeId);
      toast.success("Visa type deleted");
      navigate("/admin/visa-types");
    } catch (error) {
      toast.error(error.message || "Failed to delete visa type");
    }
  };

  if (isEdit && detailQuery.isLoading) {
    return <div className="rounded-2xl border border-slate-200 bg-white p-6">Loading visa type...</div>;
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{isEdit ? "Edit Visa Type" : "Create Visa Type"}</h1>
          <p className="mt-1 text-sm text-slate-600">
            Manage frontend visa page content with admin-controlled publishing.
          </p>
        </div>

        <div className="flex w-full gap-2 sm:w-auto">
          <Button type="button" variant="secondary" className="w-full sm:w-auto" onClick={() => navigate("/admin/visa-types")}>
            Back
          </Button>
          {isEdit ? (
            <Button type="button" variant="danger" className="w-full sm:w-auto" onClick={handleDelete}>
              Delete
            </Button>
          ) : null}
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5">
          <h2 className="text-lg font-semibold text-slate-900">Basic Info</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Country</label>
              <select
                value={form.countryId}
                onChange={(event) => handleCountrySelection(event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country._id} value={country._id}>
                    {country.name}
                  </option>
                ))}
              </select>
              {errors.countryId ? <p className="mt-1 text-xs text-rose-600">{errors.countryId}</p> : null}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Visa Category</label>
              <select
                value={form.visaCategoryId}
                onChange={(event) => handleVisaCategorySelection(event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              >
                <option value="">Select Visa Category</option>
                {visaCategories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.visaCategoryId ? <p className="mt-1 text-xs text-rose-600">{errors.visaCategoryId}</p> : null}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Country Name</label>
              <Input value={form.countryName} onChange={(event) => setField("countryName", event.target.value)} />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Visa Type Name</label>
              <Input value={form.visaTypeName} onChange={(event) => setField("visaTypeName", event.target.value)} />
              {errors.visaTypeName ? <p className="mt-1 text-xs text-rose-600">{errors.visaTypeName}</p> : null}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Country Slug</label>
              <Input value={form.countrySlug} onChange={(event) => setField("countrySlug", event.target.value)} />
              {errors.countrySlug ? <p className="mt-1 text-xs text-rose-600">{errors.countrySlug}</p> : null}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Visa Type Slug</label>
              <Input value={form.visaTypeSlug} onChange={(event) => setField("visaTypeSlug", event.target.value)} />
              {errors.visaTypeSlug ? <p className="mt-1 text-xs text-rose-600">{errors.visaTypeSlug}</p> : null}
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">Title</label>
              <Input value={form.title} onChange={(event) => setField("title", event.target.value)} />
              {errors.title ? <p className="mt-1 text-xs text-rose-600">{errors.title}</p> : null}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Badge</label>
              <Input value={form.badge} onChange={(event) => setField("badge", event.target.value)} />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Icon Key</label>
              <select
                value={form.iconKey}
                onChange={(event) => setField("iconKey", event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              >
                {ICON_OPTIONS.map((iconKey) => (
                  <option key={iconKey} value={iconKey}>
                    {iconKey}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">Subtitle</label>
              <textarea
                rows={3}
                value={form.subtitle}
                onChange={(event) => setField("subtitle", event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">Hero Image URL/Path</label>
              <Input value={form.heroImage} onChange={(event) => setField("heroImage", event.target.value)} />
              {errors.heroImage ? <p className="mt-1 text-xs text-rose-600">{errors.heroImage}</p> : null}
            </div>
          </div>

          <div className="mt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setField("countrySlug", toSlug(form.countrySlug || form.countryName));
                setField("visaTypeSlug", toSlug(form.visaTypeSlug || form.visaTypeName));
              }}
            >
              Auto Generate Slugs
            </Button>
          </div>
        </div>

        <ArrayRepeater
          label="Service Highlights"
          description="Cards shown in the service support section."
          items={form.serviceHighlights}
          createItem={() => ({ title: "", description: "", iconKey: "plane" })}
          onChange={(items) => setField("serviceHighlights", items)}
          addLabel="Add Highlight"
          renderItem={(item, _index, onItemChange) => (
            <div className="grid gap-2 md:grid-cols-3">
              <Input
                placeholder="Title"
                value={item.title || ""}
                onChange={(event) => onItemChange({ ...item, title: event.target.value })}
              />
              <Input
                placeholder="Description"
                value={item.description || ""}
                onChange={(event) => onItemChange({ ...item, description: event.target.value })}
              />
              <select
                value={item.iconKey || "plane"}
                onChange={(event) => onItemChange({ ...item, iconKey: event.target.value })}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              >
                {ICON_OPTIONS.map((iconKey) => (
                  <option key={iconKey} value={iconKey}>
                    {iconKey}
                  </option>
                ))}
              </select>
            </div>
          )}
        />
        {errors.serviceHighlights ? <p className="text-xs text-rose-600">{errors.serviceHighlights}</p> : null}

        <ArrayRepeater
          label="Eligibility"
          items={form.eligibility}
          createItem={() => ""}
          onChange={(items) => setField("eligibility", items)}
          addLabel="Add Eligibility"
          renderItem={(item, index, onItemChange) => (
            <Input placeholder={`Eligibility ${index + 1}`} value={item || ""} onChange={(event) => onItemChange(event.target.value)} />
          )}
        />

        <ArrayRepeater
          label="Required Documents"
          items={form.requiredDocs}
          createItem={() => ""}
          onChange={(items) => setField("requiredDocs", items)}
          addLabel="Add Document"
          renderItem={(item, index, onItemChange) => (
            <Input placeholder={`Document ${index + 1}`} value={item || ""} onChange={(event) => onItemChange(event.target.value)} />
          )}
        />

        <ArrayRepeater
          label="Process"
          items={form.process}
          createItem={() => ""}
          onChange={(items) => setField("process", items)}
          addLabel="Add Process Step"
          renderItem={(item, index, onItemChange) => (
            <Input placeholder={`Process Step ${index + 1}`} value={item || ""} onChange={(event) => onItemChange(event.target.value)} />
          )}
        />

        <ArrayRepeater
          label="Timeline"
          items={form.timeline}
          createItem={() => ""}
          onChange={(items) => setField("timeline", items)}
          addLabel="Add Timeline Step"
          renderItem={(item, index, onItemChange) => (
            <Input placeholder={`Timeline Step ${index + 1}`} value={item || ""} onChange={(event) => onItemChange(event.target.value)} />
          )}
        />

        <ArrayRepeater
          label="FAQs"
          items={form.faqs}
          createItem={() => ({ question: "", answer: "" })}
          onChange={(items) => setField("faqs", items)}
          addLabel="Add FAQ"
          renderItem={(item, _index, onItemChange) => (
            <div className="grid gap-2">
              <Input
                placeholder="Question"
                value={item.question || ""}
                onChange={(event) => onItemChange({ ...item, question: event.target.value })}
              />
              <textarea
                rows={3}
                placeholder="Answer"
                value={item.answer || ""}
                onChange={(event) => onItemChange({ ...item, answer: event.target.value })}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
          )}
        />
        {errors.faqs ? <p className="text-xs text-rose-600">{errors.faqs}</p> : null}

        <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5 space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">CTA</h2>
          <Input
            placeholder="CTA Title"
            value={form.ctaTitle}
            onChange={(event) => setField("ctaTitle", event.target.value)}
          />
          <textarea
            rows={3}
            placeholder="CTA Text"
            value={form.ctaText}
            onChange={(event) => setField("ctaText", event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5 space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">SEO</h2>
          <Input
            placeholder="SEO Title"
            value={form.seoTitle}
            onChange={(event) => setField("seoTitle", event.target.value)}
          />
          <textarea
            rows={3}
            placeholder="SEO Description"
            value={form.seoDescription}
            onChange={(event) => setField("seoDescription", event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          />

          <ArrayRepeater
            label="Meta Keywords"
            items={form.metaKeywords}
            createItem={() => ""}
            onChange={(items) => setField("metaKeywords", items)}
            addLabel="Add Keyword"
            renderItem={(item, index, onItemChange) => (
              <Input placeholder={`Keyword ${index + 1}`} value={item || ""} onChange={(event) => onItemChange(event.target.value)} />
            )}
          />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5">
          <h2 className="text-lg font-semibold text-slate-900">Publishing</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700">
              <input type="checkbox" checked={form.isActive} onChange={(event) => setField("isActive", event.target.checked)} />
              Active
            </label>

            <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700">
              <input type="checkbox" checked={form.isFeatured} onChange={(event) => setField("isFeatured", event.target.checked)} />
              Featured
            </label>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Sort Order</label>
              <Input
                type="number"
                value={form.sortOrder}
                onChange={(event) => setField("sortOrder", event.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button type="button" variant="secondary" onClick={() => navigate("/admin/visa-types")}>Cancel</Button>
          <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
            {isEdit ? "Update Visa Type" : "Create Visa Type"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default VisaTypeFormPage;
