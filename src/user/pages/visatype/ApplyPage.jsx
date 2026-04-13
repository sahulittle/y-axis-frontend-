import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "../../../app/providers/ToastProvider";
import { submitVisaApplication } from "../../api/publicApi";

const ApplyPage = () => {
  const { country, visaType } = useParams();
  const toast = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nationality: "",
    occupation: "",
    passportNumber: "",
    travelPurpose: "",
    priorRefusal: false,
    refusalDetails: "",
    consentAccepted: false,
    disclaimerAccepted: false,
    refundPolicyAccepted: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!formData.consentAccepted || !formData.disclaimerAccepted || !formData.refundPolicyAccepted) {
      toast.error("Please accept consent, disclaimer, and refund policy");
      return;
    }

    try {
      setIsSubmitting(true);
      await submitVisaApplication({
        country,
        visaType,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        nationality: formData.nationality || "Unknown",
        occupation: formData.occupation,
        passport: {
          passportNumber: formData.passportNumber,
        },
        travelProfile: {
          priorRefusal: formData.priorRefusal,
          refusalDetails: formData.refusalDetails,
          previousTravelCountries: [],
          previousVisaHistory: [],
        },
        consentAccepted: formData.consentAccepted,
        disclaimerAccepted: formData.disclaimerAccepted,
        refundPolicyAccepted: formData.refundPolicyAccepted,
      });
      toast.success("Application submitted successfully");
      setFormData((current) => ({
        ...current,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        nationality: "",
        occupation: "",
        passportNumber: "",
        travelPurpose: "",
        priorRefusal: false,
        refusalDetails: "",
        consentAccepted: false,
        disclaimerAccepted: false,
        refundPolicyAccepted: false,
      }));
    } catch (error) {
      toast.error(error.message || "Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="rounded-[32px] bg-white border border-slate-200 shadow-xl p-8 md:p-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900">
            Start Your Application
          </h1>
          <p className="mt-4 text-slate-600 text-lg">
            Applying for <span className="font-semibold capitalize">{visaType}</span> in{" "}
            <span className="font-semibold capitalize">{country}</span>.
          </p>

          <form className="mt-8 grid md:grid-cols-2 gap-5" onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="h-14 px-4 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-100"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="h-14 px-4 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-100"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="h-14 px-4 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-100"
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="h-14 px-4 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-100"
            />
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              placeholder="Nationality"
              className="h-14 px-4 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-100"
            />
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              placeholder="Occupation"
              className="h-14 px-4 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-100"
            />
            <input
              type="text"
              name="passportNumber"
              value={formData.passportNumber}
              onChange={handleChange}
              placeholder="Passport Number"
              className="h-14 px-4 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-100"
            />
            <input
              type="text"
              value={country}
              readOnly
              className="h-14 px-4 rounded-2xl border border-slate-200 bg-slate-50 capitalize"
            />
            <input
              type="text"
              value={visaType}
              readOnly
              className="h-14 px-4 rounded-2xl border border-slate-200 bg-slate-50 capitalize"
            />
            <textarea
              name="travelPurpose"
              value={formData.travelPurpose}
              onChange={handleChange}
              placeholder="Tell us about your travel purpose"
              className="md:col-span-2 min-h-[130px] p-4 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-100"
            />
            <textarea
              name="refusalDetails"
              value={formData.refusalDetails}
              onChange={handleChange}
              placeholder="Prior refusal details (optional)"
              className="md:col-span-2 min-h-[100px] p-4 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-100"
            />
            <label className="md:col-span-2 inline-flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" name="priorRefusal" checked={formData.priorRefusal} onChange={handleChange} />
              I had a prior refusal
            </label>
            <label className="md:col-span-2 inline-flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" name="consentAccepted" checked={formData.consentAccepted} onChange={handleChange} />
              I accept consent terms
            </label>
            <label className="md:col-span-2 inline-flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" name="disclaimerAccepted" checked={formData.disclaimerAccepted} onChange={handleChange} />
              I accept disclaimer
            </label>
            <label className="md:col-span-2 inline-flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" name="refundPolicyAccepted" checked={formData.refundPolicyAccepted} onChange={handleChange} />
              I accept refund policy
            </label>
            <button
              type="submit"
              disabled={isSubmitting}
              className="md:col-span-2 h-14 rounded-full bg-[#f2653a] text-white font-semibold shadow-lg hover:opacity-90 transition"
            >
              {isSubmitting ? "Submitting..." : "Submit Application Request"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ApplyPage;