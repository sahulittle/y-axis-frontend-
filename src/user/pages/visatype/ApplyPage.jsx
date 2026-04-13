import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "../../../app/providers/ToastProvider";
import { submitVisaApplication } from "../../api/publicApi";

const documentSections = [
  {
    key: "identityDocs",
    title: "🪪 Identity Documents",
    subtitle: "Upload passport, old passports, and passport-size photographs.",
    multiple: true,
  },
  {
    key: "educationDocs",
    title: "🎓 Educational Documents",
    subtitle:
      "Upload 10th, 12th, degree, diploma, mark sheets, and certifications.",
    multiple: true,
  },
  {
    key: "workDocs",
    title: "💼 Work & Experience Proof",
    subtitle:
      "Upload resume, experience letters, salary slips, offer letter, etc.",
    multiple: true,
  },
  {
    key: "financialDocs",
    title: "💰 Financial Documents",
    subtitle:
      "Upload bank statements, ITR, sponsorship documents, salary proof.",
    multiple: true,
  },
  {
    key: "medicalDocs",
    title: "🏥 Medical & Insurance",
    subtitle: "Upload medical certificate, insurance, vaccination records.",
    multiple: true,
  },
  {
    key: "policeDocs",
    title: "👮 Police Verification",
    subtitle: "Upload PCC and background verification documents.",
    multiple: true,
  },
  {
    key: "accommodationDocs",
    title: "🏠 Accommodation Proof",
    subtitle: "Upload hotel booking, rental agreement, or invitation letter.",
    multiple: true,
  },
  {
    key: "travelDocs",
    title: "✈️ Travel Documents",
    subtitle: "Upload flight booking and travel itinerary.",
    multiple: true,
  },
  {
    key: "visaSpecificDocs",
    title: "📑 Visa-Specific Documents",
    subtitle: "Upload visa form, fee receipt, cover letter, SOP, etc.",
    multiple: true,
  },
  {
    key: "employerDocs",
    title: "🏢 Employer-Side Documents",
    subtitle:
      "Upload work permit approval, employer sponsorship, registration proof.",
    multiple: true,
  },
];

const ApplyPage = () => {
  const { country, visaType } = useParams();
  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [travelPurpose, setTravelPurpose] = useState("");

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

  const [uploadedFiles, setUploadedFiles] = useState(
    documentSections.reduce((acc, section) => {
      acc[section.key] = [];
      return acc;
    }, {})
  );

  const wordCount = useMemo(() => {
    return travelPurpose.trim()
      ? travelPurpose.trim().split(/\s+/).filter(Boolean).length
      : 0;
  }, [travelPurpose]);

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
    const fileArray = Array.from(files || []);
    setUploadedFiles((prev) => ({
      ...prev,
      [sectionKey]: fileArray,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    try {
      setIsSubmitting(true);

      const payload = new FormData();
      payload.append("fullName", formData.fullName);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("dob", formData.dob);
      payload.append("nationality", formData.nationality);
      payload.append("address", formData.address);
      payload.append("passportType", formData.passportType);
      payload.append("country", country || "");
      payload.append("visaType", visaType || "");
      payload.append("travelPurpose", travelPurpose);
      payload.append("priorRefusal", formData.priorRefusal);
      payload.append("refusalDetails", formData.refusalDetails);
      payload.append("declaration", formData.declaration);
      payload.append("consentAccepted", formData.consentAccepted);
      payload.append("disclaimerAccepted", formData.disclaimerAccepted);
      payload.append("refundPolicyAccepted", formData.refundPolicyAccepted);

      Object.entries(uploadedFiles).forEach(([sectionKey, files]) => {
        files.forEach((file) => {
          payload.append(sectionKey, file);
        });
      });

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

      setUploadedFiles(
        documentSections.reduce((acc, section) => {
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

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-orange-500 px-6 py-10 md:px-10">
            <p className="inline-flex rounded-full bg-white/15 px-4 py-1 text-sm font-medium text-white/90">
              Visa Verification Documents Form
            </p>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              Submit Your Visa Documents
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
              . Our team will review your documents and process your visa
              application offline.
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
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {section.subtitle}
                    </p>

                    <label className="mt-5 flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-orange-200 bg-orange-50/60 px-4 text-center transition hover:border-orange-400 hover:bg-orange-50">
                      <span className="text-sm font-semibold text-slate-700">
                        Click to upload files
                      </span>
                      <span className="mt-1 text-xs text-slate-500">
                        PDF, JPG, JPEG, PNG accepted
                      </span>

                      <input
                        type="file"
                        multiple={section.multiple}
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