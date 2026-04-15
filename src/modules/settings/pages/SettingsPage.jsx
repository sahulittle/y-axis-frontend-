import React from "react";
import DataTable from "../../../shared/ui/DataTable";
import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";
import { useToast } from "../../../app/providers/ToastProvider";
import { usePatchSettingsMutation, useSettingsQuery, useUploadSiteAssetMutation } from "../hooks";

const DEFAULT_SITE_FORM = {
  siteName: "Visaassist",
  siteTagline: "Global Services",
  siteLogoUrl: "",
  supportPhone: "+91 12345 67890",
  whatsappNumber: "911234567890",
  homeBannerTitle: "What can we do for you today?",
  homeBannerSubtitle:
    "Choose your goal and let us guide you with the right solution, expert support, and the best next steps for your journey.",
  homeBannerImageUrl:
    "https://media.istockphoto.com/id/1197578214/photo/beautiful-young-woman.jpg?s=612x612&w=0&k=20&c=XdV1GLQalvNSXKsBv4C0vRDjPfiBOArH6BC_iCFtchg=",
};

const SETTINGS_KEY_MAP = {
  siteName: "site.name",
  siteTagline: "site.tagline",
  siteLogoUrl: "site.logoUrl",
  supportPhone: "site.supportPhone",
  whatsappNumber: "site.whatsappNumber",
  homeBannerTitle: "site.homeBannerTitle",
  homeBannerSubtitle: "site.homeBannerSubtitle",
  homeBannerImageUrl: "site.homeBannerImageUrl",
};

const SettingsPage = () => {
  const toast = useToast();
  const [params, setParams] = React.useState({ page: 1, limit: 50, sortBy: "key", sortOrder: "asc" });
  const [siteForm, setSiteForm] = React.useState(DEFAULT_SITE_FORM);

  const query = useSettingsQuery(params);
  const patchMutation = usePatchSettingsMutation();
  const uploadMutation = useUploadSiteAssetMutation();

  const rows = query.data?.items || [];
  const pagination = query.data?.pagination || { page: 1, totalPages: 1 };

  React.useEffect(() => {
    if (!Array.isArray(rows) || rows.length === 0) {
      return;
    }

    const byKey = new Map(rows.map((item) => [item.key, item.value]));

    setSiteForm({
      siteName: String(byKey.get(SETTINGS_KEY_MAP.siteName) || DEFAULT_SITE_FORM.siteName),
      siteTagline: String(byKey.get(SETTINGS_KEY_MAP.siteTagline) || DEFAULT_SITE_FORM.siteTagline),
      siteLogoUrl: String(byKey.get(SETTINGS_KEY_MAP.siteLogoUrl) || DEFAULT_SITE_FORM.siteLogoUrl),
      supportPhone: String(byKey.get(SETTINGS_KEY_MAP.supportPhone) || DEFAULT_SITE_FORM.supportPhone),
      whatsappNumber: String(byKey.get(SETTINGS_KEY_MAP.whatsappNumber) || DEFAULT_SITE_FORM.whatsappNumber),
      homeBannerTitle: String(byKey.get(SETTINGS_KEY_MAP.homeBannerTitle) || DEFAULT_SITE_FORM.homeBannerTitle),
      homeBannerSubtitle: String(
        byKey.get(SETTINGS_KEY_MAP.homeBannerSubtitle) || DEFAULT_SITE_FORM.homeBannerSubtitle
      ),
      homeBannerImageUrl: String(
        byKey.get(SETTINGS_KEY_MAP.homeBannerImageUrl) || DEFAULT_SITE_FORM.homeBannerImageUrl
      ),
    });
  }, [rows]);

  const handleFieldChange = (field) => (event) => {
    setSiteForm((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleImageUpload = async (field, event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploaded = await uploadMutation.mutateAsync(formData);
      setSiteForm((current) => ({
        ...current,
        [field]: uploaded.fileUrl || current[field],
      }));
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error(error.message || "Failed to upload image");
    } finally {
      event.target.value = "";
    }
  };

  const saveSiteSettings = async () => {
    const payload = {
      settings: Object.entries(SETTINGS_KEY_MAP).map(([field, key]) => ({
        key,
        value: siteForm[field],
        group: "site",
      })),
    };

    try {
      await patchMutation.mutateAsync(payload);
      toast.success("Site settings updated");
    } catch (error) {
      toast.error(error.message || "Failed to update site settings");
    }
  };

  const columns = [
    { key: "key", label: "Key", render: (row) => row.key || "-" },
    { key: "group", label: "Group", render: (row) => row.group || "general" },
    {
      key: "value",
      label: "Value",
      render: (row) =>
        typeof row.value === "object" ? JSON.stringify(row.value) : String(row.value ?? ""),
    },
  ];

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Site Settings</h1>
        <p className="mt-1 text-sm text-slate-600">
          Manage homepage banner and branding details used on the public website.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
          <h2 className="text-base font-semibold text-slate-900">Brand Identity</h2>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Site Name</label>
            <Input value={siteForm.siteName} onChange={handleFieldChange("siteName")} placeholder="Visaassist" />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Tagline</label>
            <Input
              value={siteForm.siteTagline}
              onChange={handleFieldChange("siteTagline")}
              placeholder="Global Services"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Support Phone</label>
            <Input
              value={siteForm.supportPhone}
              onChange={handleFieldChange("supportPhone")}
              placeholder="+91 12345 67890"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">WhatsApp Number</label>
            <Input
              value={siteForm.whatsappNumber}
              onChange={handleFieldChange("whatsappNumber")}
              placeholder="911234567890"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Site Logo URL</label>
            <Input
              value={siteForm.siteLogoUrl}
              onChange={handleFieldChange("siteLogoUrl")}
              placeholder="https://..."
            />
            <div className="mt-2 flex items-center gap-2">
              <input type="file" accept="image/*" onChange={(event) => handleImageUpload("siteLogoUrl", event)} />
            </div>
            {siteForm.siteLogoUrl ? (
              <img
                src={siteForm.siteLogoUrl}
                alt="Site logo preview"
                className="mt-3 h-14 w-14 rounded-xl border border-slate-200 object-cover"
              />
            ) : null}
          </div>
        </article>

        <article className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
          <h2 className="text-base font-semibold text-slate-900">Homepage Banner</h2>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Banner Title</label>
            <Input
              value={siteForm.homeBannerTitle}
              onChange={handleFieldChange("homeBannerTitle")}
              placeholder="What can we do for you today?"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Banner Subtitle</label>
            <textarea
              rows={4}
              value={siteForm.homeBannerSubtitle}
              onChange={handleFieldChange("homeBannerSubtitle")}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Banner Image URL</label>
            <Input
              value={siteForm.homeBannerImageUrl}
              onChange={handleFieldChange("homeBannerImageUrl")}
              placeholder="https://..."
            />
            <div className="mt-2 flex items-center gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handleImageUpload("homeBannerImageUrl", event)}
              />
            </div>
            {siteForm.homeBannerImageUrl ? (
              <img
                src={siteForm.homeBannerImageUrl}
                alt="Home banner preview"
                className="mt-3 h-28 w-full rounded-xl border border-slate-200 object-cover"
              />
            ) : null}
          </div>
        </article>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={saveSiteSettings} disabled={patchMutation.isPending || uploadMutation.isPending}>
          Save Site Settings
        </Button>
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
