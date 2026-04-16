import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../../app/providers/ToastProvider";
import { getVisaApplicationConfig, submitVisaApplication } from "../../api/publicApi";
import { readSession } from "../../../shared/auth/session";

const slugify = (value = "") =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

const parseSubmittedDocUrls = (value = "") => {
  return String(value)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [left, right] = line.split("|").map((item) => item?.trim());
      const hasPipe = Boolean(right);
      const url = hasPipe ? right : left;

      if (!/^https?:\/\//i.test(url || "")) {
        return null;
      }

      let fallbackName = "Document URL";
      try {
        const parsedUrl = new URL(url);
        const segments = parsedUrl.pathname.split("/").filter(Boolean);
        fallbackName = decodeURIComponent(segments[segments.length - 1] || parsedUrl.hostname || fallbackName);
      } catch {
        fallbackName = "Document URL";
      }

      const docName = hasPipe ? left || fallbackName : fallbackName;

      return {
        docName,
        fileUrl: url,
        originalName: docName,
        mimeType: "url",
        size: 0,
      };
    })
    .filter(Boolean);
};

const ApplyPage = () => {
  const { country, visaType } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const { token, user } = readSession();
  const isCustomerSession = Boolean(token) && ["customer", "user"].includes(user?.role);
  const redirectTo = `${location.pathname}${location.search || ""}${location.hash || ""}`;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [travelPurpose, setTravelPurpose] = useState("");
  const [documentLinkEntries, setDocumentLinkEntries] = useState("");
  const [isConfigLoading, setIsConfigLoading] = useState(true);
  const [configError, setConfigError] = useState("");
  const [applicationConfig, setApplicationConfig] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    nationality: "",
    address: "",
    passportType: "",
    priorRefusal: false,
    refusalDetails: "",
    declaration: false,
    consentAccepted: false,
    disclaimerAccepted: false,
    refundPolicyAccepted: false,
  });

  const [uploadedFiles, setUploadedFiles] = useState({});

  const documentSections = useMemo(() => {
    const requiredDocs = Array.isArray(applicationConfig?.requiredDocs)
      ? applicationConfig.requiredDocs
      : [];

    if (requiredDocs.length === 0) {
      return [
        {
          key: "general-documents",
          title: "General Documents",
          subtitle: "Upload all relevant documents for your visa application.",
          isMandatory: false,
          maxFiles: 10,
          allowedFileTypes: [],
        },
      ];
    }

    return requiredDocs.map((doc, index) => ({
      key: slugify(doc?.name || `document-${index}`),
      title: doc?.name || `Document ${index + 1}`,
      subtitle: doc?.description || "Upload the required file(s).",
      isMandatory: doc?.isMandatory !== false,
      maxFiles: Number(doc?.maxFiles) || 1,
      allowedFileTypes: Array.isArray(doc?.allowedFileTypes) ? doc.allowedFileTypes : [],
    }));
  }, [applicationConfig]);

  const wordCount = useMemo(() => {
    return travelPurpose.trim()
      ? travelPurpose.trim().split(/\s+/).filter(Boolean).length
      : 0;
  }, [travelPurpose]);

  useEffect(() => {
    if (!isCustomerSession) {
      setIsConfigLoading(false);
      return undefined;
    }

    let mounted = true;

    const loadConfig = async () => {
      try {
        setIsConfigLoading(true);
        setConfigError("");
        const config = await getVisaApplicationConfig(country, visaType);
        if (!mounted) {
          return;
        }

        setApplicationConfig(config);

        const initialFiles = (Array.isArray(config?.requiredDocs) && config.requiredDocs.length > 0
          ? config.requiredDocs
          : [{ name: "general-documents" }
        ]).reduce((acc, doc, index) => {
          acc[slugify(doc?.name || `document-${index}`)] = [];
          return acc;
        }, {});

        setUploadedFiles(initialFiles);
      } catch (error) {
        if (mounted) {
          setApplicationConfig(null);
          setUploadedFiles({});
          setConfigError(error.message || "Failed to load application configuration");
        }
      } finally {
        if (mounted) {
          setIsConfigLoading(false);
        }
      }
    };

    loadConfig();

    return () => {
      mounted = false;
    };
  }, [country, visaType, isCustomerSession]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTravelPurposeChange = (e) => {
    const value = e.target.value;
    const words = value.trim().split(/\s+/).filter(Boolean);

    if (value.trim() === "" || words.length <= 200) {
      setTravelPurpose(value);
    }
  };

  const handleFileChange = (sectionKey, files) => {
    const section = documentSections.find((item) => item.key === sectionKey);
    const maxFiles = Number(section?.maxFiles) || 1;
    const fileArray = Array.from(files || []).slice(0, maxFiles);
    setUploadedFiles((prev) => ({
      ...prev,
      [sectionKey]: fileArray,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isCustomerSession) {
      toast.error("Please login or register before applying.");
      return;
    }

    if (isConfigLoading) {
      toast.error("Application configuration is still loading");
      return;
    }

    if (configError) {
      toast.error("Unable to submit because form configuration failed to load");
      return;
    }

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.nationality
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (
      !formData.declaration ||
      !formData.consentAccepted ||
      !formData.disclaimerAccepted ||
      !formData.refundPolicyAccepted
    ) {
      toast.error("Please accept all required declarations and policies.");
      return;
    }

    const manualDocRefs = parseSubmittedDocUrls(documentLinkEntries);

    const missingDocs = documentSections
      .filter((doc) => doc.isMandatory)
      .filter((doc) => {
        const uploadedCount = uploadedFiles[doc.key]?.length || 0;

        const hasManualReference = manualDocRefs.some((entry) => {
          const normalizedDoc = slugify(doc.title).replace(/-/g, "");
          const normalizedEntry = slugify(entry.docName).replace(/-/g, "");
          return normalizedDoc && normalizedEntry && (normalizedEntry.includes(normalizedDoc) || normalizedDoc.includes(normalizedEntry));
        });

        return uploadedCount === 0 && !hasManualReference;
      })
      .map((doc) => doc.title);

    if (missingDocs.length > 0) {
      toast.error(`Missing required document uploads: ${missingDocs.join(", ")}`);
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = new FormData();
      payload.append("countrySlug", country || "");
      payload.append("visaTypeSlug", visaType || "");
      payload.append("country", country || "");
      payload.append("visaType", visaType || "");
      payload.append("fullName", formData.fullName);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("travelPurpose", travelPurpose);
      payload.append("consentAccepted", String(formData.consentAccepted));
      payload.append("disclaimerAccepted", String(formData.disclaimerAccepted));
      payload.append("refundPolicyAccepted", String(formData.refundPolicyAccepted));
      payload.append(
        "applicantDetails",
        JSON.stringify({
          firstName: formData.fullName.trim().split(/\s+/)[0] || "",
          lastName: formData.fullName.trim().split(/\s+/).slice(1).join(" ") || "",
          email: formData.email,
          phone: formData.phone,
          dob: formData.dob || null,
          nationality: formData.nationality,
          address: formData.address,
          passportNumber: formData.passportType,
          customFields: {
            passportType: formData.passportType,
            priorRefusal: formData.priorRefusal,
            refusalDetails: formData.refusalDetails,
            declaration: formData.declaration,
            travelPurpose,
          },
        })
      );

      Object.entries(uploadedFiles).forEach(([sectionKey, files]) => {
        files.forEach((file) => {
          payload.append(`documents.${sectionKey}`, file);
        });
      });

      if (manualDocRefs.length > 0) {
        payload.append("submittedDocs", JSON.stringify(manualDocRefs));
      }

      await submitVisaApplication(payload);

      toast.success("Application and documents submitted successfully.");

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        dob: "",
        nationality: "",
        address: "",
        passportType: "",
        priorRefusal: false,
        refusalDetails: "",
        declaration: false,
        consentAccepted: false,
        disclaimerAccepted: false,
        refundPolicyAccepted: false,
      });

      setTravelPurpose("");
      setDocumentLinkEntries("");

      setUploadedFiles(
        (documentSections || []).reduce((acc, section) => {
          acc[section.key] = [];
          return acc;
        }, {})
      );
    } catch (error) {
      toast.error(error?.message || "Failed to submit application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isCustomerSession) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 py-16 md:py-20">
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-orange-600">Secure Application Flow</p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">Login or Register to Continue</h1>
          <p className="mt-3 text-slate-600">
            You need an account before submitting visa applications. This helps keep your documents secure and shows
            application history in your dashboard.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() =>
                navigate(`/login?next=${encodeURIComponent(redirectTo)}`, {
                  state: {
                    redirectTo,
                    redirectMessage: "Please login to continue your visa application.",
                  },
                })
              }
              className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() =>
                navigate(`/signup?next=${encodeURIComponent(redirectTo)}`, {
                  state: {
                    redirectTo,
                    redirectMessage: "Create your account to continue your visa application.",
                  },
                })
              }
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Register
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (isConfigLoading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 py-16 md:py-20">
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 text-slate-700 shadow-sm">
          Loading application form configuration...
        </div>
      </section>
    );
  }

  if (configError) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 py-16 md:py-20">
        <div className="mx-auto max-w-4xl rounded-3xl border border-rose-200 bg-rose-50 p-8 text-rose-700 shadow-sm">
          {configError}
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-orange-500 px-6 py-10 md:px-10">
            <p className="inline-flex rounded-full bg-white/15 px-4 py-1 text-sm font-medium text-white/90">
              Visa Verification Documents Form
            </p>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              {applicationConfig?.title ? `Apply for ${applicationConfig.title}` : "Submit Your Visa Documents"}
            </h1>

            <p className="mt-4 max-w-3xl text-base text-white/85 md:text-lg">
              Upload your documents for{" "}
              <span className="font-semibold capitalize text-white">
                {visaType}
              </span>{" "}
              visa application in{" "}
              <span className="font-semibold capitalize text-white">
                {country}
              </span>
              . {applicationConfig?.summary || "Our team will review your documents and process your visa application."}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-10 px-6 py-8 md:px-10 md:py-10"
          >
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-extrabold text-slate-900">
                  Applicant Details
                </h2>
                <p className="mt-2 text-slate-600">
                  Please enter your personal details exactly as per your
                  passport and official records.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    className="h-14 w-full rounded-2xl border border-slate-200 px-4 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    className="h-14 w-full rounded-2xl border border-slate-200 px-4 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    className="h-14 w-full rounded-2xl border border-slate-200 px-4 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="h-14 w-full rounded-2xl border border-slate-200 px-4 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Nationality
                  </label>
                  <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                    placeholder="Enter nationality"
                    className="h-14 w-full rounded-2xl border border-slate-200 px-4 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter address"
                    className="h-14 w-full rounded-2xl border border-slate-200 px-4 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Applying Country
                  </label>
                  <input
                    type="text"
                    value={country}
                    readOnly
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 capitalize text-slate-700"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Visa Type
                  </label>
                  <input
                    type="text"
                    value={visaType}
                    readOnly
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 capitalize text-slate-700"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Passport Type
                  </label>
                  <select
                    name="passportType"
                    value={formData.passportType}
                    onChange={handleInputChange}
                    className="h-14 w-full rounded-2xl border border-slate-200 px-4 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  >
                    <option value="">Select passport type</option>
                    <option value="ordinary">Ordinary Passport</option>
                    <option value="official">Official Passport</option>
                    <option value="diplomatic">Diplomatic Passport</option>
                    <option value="service">Service Passport</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Travel Purpose
                  </label>
                  <textarea
                    value={travelPurpose}
                    onChange={handleTravelPurposeChange}
                    placeholder="Write your travel purpose in maximum 200 words"
                    className="min-h-[150px] w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  />
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-slate-500">Maximum 200 words</span>
                    <span className="text-slate-500">{wordCount}/200 words</span>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Prior Refusal Details
                  </label>
                  <textarea
                    name="refusalDetails"
                    value={formData.refusalDetails}
                    onChange={handleInputChange}
                    placeholder="Mention prior refusal details if applicable"
                    className="min-h-[110px] w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  />
                </div>

                <label className="md:col-span-2 inline-flex items-center gap-3 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    name="priorRefusal"
                    checked={formData.priorRefusal}
                    onChange={handleInputChange}
                  />
                  I had a prior visa refusal
                </label>
              </div>

              <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900">Document URL References (Optional)</h3>
                <p className="mt-2 text-sm text-slate-600">
                  If a file cannot be uploaded now, add a secure URL. Use one line per entry.
                </p>
                <p className="mt-1 text-xs text-slate-500">Format: Document Name | https://example.com/file.pdf</p>

                <textarea
                  rows={5}
                  value={documentLinkEntries}
                  onChange={(event) => setDocumentLinkEntries(event.target.value)}
                  placeholder="Passport Copy | https://...\nBank Statement | https://..."
                  className="mt-3 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                />
              </div>
            </div>

            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-extrabold text-slate-900">
                  Upload Verification Documents
                </h2>
                <p className="mt-2 text-slate-600">
                  Please upload all required documents clearly. Our admin team
                  will review them and proceed with offline visa processing.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {documentSections.map((section) => (
                  <div
                    key={section.key}
                    className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 shadow-sm"
                  >
                    <h3 className="text-lg font-bold text-slate-900">
                      {section.title}
                      {section.isMandatory ? (
                        <span className="ml-2 rounded-full bg-rose-100 px-2 py-0.5 text-xs font-semibold text-rose-700">
                          Required
                        </span>
                      ) : null}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {section.subtitle}
                    </p>
                    {section.maxFiles ? (
                      <p className="mt-1 text-xs text-slate-500">Maximum files: {section.maxFiles}</p>
                    ) : null}
                    {section.allowedFileTypes?.length ? (
                      <p className="mt-1 text-xs text-slate-500">
                        Allowed: {section.allowedFileTypes.join(", ")}
                      </p>
                    ) : null}

                    <label className="mt-5 flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-orange-200 bg-orange-50/60 px-4 text-center transition hover:border-orange-400 hover:bg-orange-50">
                      <span className="text-sm font-semibold text-slate-700">
                        Click to upload files
                      </span>
                      <span className="mt-1 text-xs text-slate-500">
                        PDF, JPG, JPEG, PNG accepted
                      </span>

                      <input
                        type="file"
                        multiple={section.maxFiles > 1}
                        className="hidden"
                        onChange={(e) =>
                          handleFileChange(section.key, e.target.files)
                        }
                      />
                    </label>

                    {uploadedFiles[section.key]?.length > 0 && (
                      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                        <p className="text-sm font-semibold text-slate-800">
                          Uploaded Files:
                        </p>
                        <ul className="mt-2 space-y-2 text-sm text-slate-600">
                          {uploadedFiles[section.key].map((file, index) => (
                            <li key={index} className="truncate">
                              • {file.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-orange-200 bg-orange-50 p-6 md:p-8">
              <h3 className="text-2xl font-extrabold text-slate-900">
                Declaration
              </h3>

              <div className="mt-5 space-y-4">
                <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                  <input
                    type="checkbox"
                    name="declaration"
                    checked={formData.declaration}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                  <span className="text-sm leading-6 text-slate-700">
                    I confirm that all uploaded documents are genuine and
                    correct.
                  </span>
                </label>

                <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                  <input
                    type="checkbox"
                    name="consentAccepted"
                    checked={formData.consentAccepted}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                  <span className="text-sm leading-6 text-slate-700">
                    I accept the consent terms.
                  </span>
                </label>

                <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                  <input
                    type="checkbox"
                    name="disclaimerAccepted"
                    checked={formData.disclaimerAccepted}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                  <span className="text-sm leading-6 text-slate-700">
                    I accept the disclaimer.
                  </span>
                </label>

                <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                  <input
                    type="checkbox"
                    name="refundPolicyAccepted"
                    checked={formData.refundPolicyAccepted}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                  <span className="text-sm leading-6 text-slate-700">
                    I accept the refund policy.
                  </span>
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-14 rounded-full bg-[#f2653a] px-8 font-semibold text-white shadow-lg transition hover:scale-[1.01] hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Submitting..." : "Submit Documents"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ApplyPage;