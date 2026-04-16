import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Clock3,
  BadgeCheck,
  AlertCircle,
  Sparkles,
  CalendarCheck,
  FolderCheck,
  MessagesSquare,
  ChevronRight,
} from "lucide-react";
import VisaFaq from "./VisaFaq";
import { getVisaTypeContent } from "./visaTypeContentService";

const VisaTypeData = () => {
  const navigate = useNavigate();
  const { country, visaType } = useParams();
  const [visa, setVisa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    let mounted = true;

    const loadVisaContent = async () => {
      try {
        setLoading(true);
        setErrorMessage("");
        const content = await getVisaTypeContent(country, visaType);

        if (mounted) {
          setVisa(content);
        }
      } catch (error) {
        if (mounted) {
          setVisa(null);
          setErrorMessage(error.message || "Failed to load visa content");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadVisaContent();

    return () => {
      mounted = false;
    };
  }, [country, visaType]);

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 flex items-center">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">Loading visa details...</h1>
          <p className="mt-4 text-base text-slate-600">Please wait while we fetch the latest content.</p>
        </div>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 flex items-center">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-6 shadow-sm">
            <AlertCircle size={34} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">Unable to load visa content</h1>
          <p className="mt-5 text-lg text-slate-600 leading-8">{errorMessage}</p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 rounded-full bg-[#f2653a] px-7 py-4 text-white font-semibold shadow-lg hover:opacity-90 transition"
            >
              Retry
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-7 py-4 text-slate-800 font-semibold hover:bg-slate-50 transition"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!visa) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 flex items-center">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-6 shadow-sm">
            <AlertCircle size={34} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">
            Visa page not found
          </h1>
          <p className="mt-5 text-lg text-slate-600 leading-8">
            We could not find this visa-type page. Please go back and choose a
            valid visa route.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => navigate("/visa")}
              className="inline-flex items-center gap-2 rounded-full bg-[#f2653a] px-7 py-4 text-white font-semibold shadow-lg hover:opacity-90 transition"
            >
              Back to Visa Page
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-7 py-4 text-slate-800 font-semibold hover:bg-slate-50 transition"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    );
  }

  const Icon = visa.icon;
  const serviceHighlights = Array.isArray(visa.serviceHighlights) ? visa.serviceHighlights : [];
  const eligibilityItems = Array.isArray(visa.eligibility) ? visa.eligibility : [];
  const requiredDocs = Array.isArray(visa.requiredDocs)
    ? [...visa.requiredDocs].sort((a, b) => (a?.sortOrder || 0) - (b?.sortOrder || 0))
    : [];
  const processItems = Array.isArray(visa.process)
    ? [...visa.process].sort((a, b) => (a?.sortOrder || 0) - (b?.sortOrder || 0))
    : [];
  const timelineItems = Array.isArray(visa.timeline)
    ? [...visa.timeline].sort((a, b) => (a?.sortOrder || 0) - (b?.sortOrder || 0))
    : [];
  const faqItems = Array.isArray(visa.faqs) ? visa.faqs : [];
  const canApply = visa.applicationEnabled !== false;

  const processIcons = [
    Sparkles,
    FolderCheck,
    FileText,
    CalendarCheck,
    ShieldCheck,
    MessagesSquare,
  ];

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#eef6ff] via-white to-[#fff4ed] py-20 lg:py-24">
        <div className="absolute -top-12 -left-12 w-72 h-72 rounded-full bg-blue-100/70 blur-3xl" />
        <div className="absolute -bottom-12 -right-12 w-80 h-80 rounded-full bg-orange-100/70 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white border border-orange-100 shadow-sm text-orange-700 px-4 py-2 text-sm font-semibold">
                {Icon && <Icon size={18} />}
                {visa.badge}
              </span>

              <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
                {visa.title}
              </h1>

              <p className="mt-6 text-lg text-slate-600 leading-8 max-w-2xl">
                {visa.subtitle}
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-slate-700">
                <span className="rounded-full bg-orange-50 px-4 py-2 border border-orange-100">
                  Ethical Guidance
                </span>
                <span className="rounded-full bg-blue-50 px-4 py-2 border border-blue-100">
                  Document Accuracy
                </span>
                <span className="rounded-full bg-indigo-50 px-4 py-2 border border-indigo-100">
                  Proactive Updates
                </span>
                <span className="rounded-full bg-purple-50 px-4 py-2 border border-purple-100">
                  Checklist-Based Workflow
                </span>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    if (canApply) {
                      navigate(`/apply/${country}/${visaType}`);
                    }
                  }}
                  disabled={!canApply}
                  className={`inline-flex items-center gap-2 rounded-full px-7 py-4 text-white font-semibold shadow-lg transition ${
                    canApply ? "bg-[#f2653a] hover:scale-[1.02]" : "bg-slate-400 cursor-not-allowed"
                  }`}
                >
                  {canApply ? "Start Application" : "Application Unavailable"}
                  <ArrowRight size={18} />
                </button>

                <button
                  onClick={() => navigate("/contact")}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-4 text-slate-800 font-semibold hover:bg-slate-50 transition"
                >
                  Talk to an Expert
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-[36px] bg-gradient-to-r from-orange-200/30 to-blue-200/30 blur-2xl" />
              <div className="relative rounded-[36px] overflow-hidden bg-white p-3 shadow-[0_25px_70px_rgba(15,23,42,0.12)]">
                <img
                  src={
                    visa.heroImage ||
                    "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200&auto=format&fit=crop"
                  }
                  alt={visa.title}
                  className="w-full h-[340px] md:h-[520px] object-cover rounded-[28px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE HELP YOU WITH */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-orange-600 mb-3">
              What We Help You With
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900">
              Service Support for This Visa Type
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
              This page is not just about the visa. It clearly shows the support
              we provide for application quality, checklist preparation,
              appointment readiness, and next-step guidance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-7">
            {serviceHighlights.map((item, index) => {
              const ServiceIcon = item.icon;
              return (
                <div
                  key={index}
                  className="group rounded-[28px] border border-slate-200 bg-gradient-to-br from-white to-orange-50 p-7 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#f2653a] text-white flex items-center justify-center shadow-md mb-6 group-hover:scale-110 transition">
                    {ServiceIcon && <ServiceIcon size={24} />}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 leading-7">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ELIGIBILITY */}
      <section className="py-20 bg-gradient-to-b from-[#f8fbff] to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-600 mb-3">
              Eligibility
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900">
              Who Can Apply
            </h2>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {eligibilityItems.map((item, index) => (
              <div
                key={index}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl transition"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-5">
                  <ShieldCheck size={22} />
                </div>
                <p className="text-slate-700 leading-7">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REQUIRED DOCS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-600 mb-3">
                Required Documents
              </p>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                Documents You May Need
              </h2>
              <p className="mt-5 text-lg text-slate-600 leading-8">
                We use structured document checklists to reduce missed items and
                incomplete submissions.
              </p>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
              <div className="space-y-4">
                {requiredDocs.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 rounded-2xl bg-blue-50 px-5 py-4"
                  >
                    <CheckCircle2
                      className="text-blue-600 shrink-0 mt-0.5"
                      size={20}
                    />
                    <div>
                      <p className="text-slate-800 font-medium">{doc?.name || doc}</p>
                      {doc?.description ? <p className="mt-1 text-sm text-slate-600">{doc.description}</p> : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-orange-600 mb-3">
              Process
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900">
              Step-by-Step Support
            </h2>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {processItems.map((step, index) => {
              const StepIcon = processIcons[index] || FileText;
              return (
                <div
                  key={index}
                  className="relative rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-xl transition"
                >
                  <div className="absolute top-6 right-6 text-5xl font-extrabold text-slate-100">
                    0{index + 1}
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-[#f2653a] text-white flex items-center justify-center mb-6">
                    <StepIcon size={22} />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {step?.title || `Step ${index + 1}`}
                  </h3>

                  <p className="text-slate-600 leading-7">{step?.description || step?.title || step}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-600 mb-3">
              Timeline
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900">
              Your Case Flow
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-5">
            {timelineItems.map((item, index) => (
              <div key={index} className="relative">
                <div className="rounded-3xl bg-gradient-to-br from-white to-blue-50 border border-slate-200 p-6 shadow-sm h-full">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                    <Clock3 size={20} />
                  </div>
                  <p className="font-semibold text-slate-900 leading-6">{item?.label || item}</p>
                  {item?.description ? <p className="mt-2 text-sm text-slate-600">{item.description}</p> : null}
                </div>

                {index !== timelineItems.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 items-center">
                    <ChevronRight className="text-orange-300" size={22} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gradient-to-b from-[#f8fbff] to-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-600 mb-3">
              FAQs
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900">
              Common Questions
            </h2>
          </div>

          <VisaFaq faqs={faqItems} />
        </div>
      </section>

      {/* COMPLIANCE NOTE */}
      <section className="py-10 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="rounded-[28px] border border-orange-100 bg-orange-50 p-6 md:p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Important Note
            </h3>
            <p className="text-slate-700 leading-7">
              We do not influence visa decisions. Visa issuance remains with the
              relevant embassy, consulate, or immigration authority. We provide
              structured advisory and documentation support to improve
              application quality and readiness.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0f172a]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="rounded-[36px] bg-gradient-to-r from-[#f2653a] via-orange-500 to-blue-500 p-10 md:p-14 text-center shadow-2xl">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 text-white mb-6">
              <BadgeCheck size={30} />
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold text-white">
              {visa.ctaTitle}
            </h2>

            <p className="mt-5 text-lg text-white/90 max-w-3xl mx-auto leading-8">
              {visa.ctaText}
            </p>

            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <button
                onClick={() => {
                  if (canApply) {
                    navigate(`/apply/${country}/${visaType}`);
                  }
                }}
                disabled={!canApply}
                className={`inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold shadow-lg transition ${
                  canApply
                    ? "bg-white text-[#f2653a] hover:scale-[1.02]"
                    : "bg-white/60 text-slate-300 cursor-not-allowed"
                }`}
              >
                {canApply ? "Start Application" : "Application Unavailable"}
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => navigate("/contact")}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-4 text-white font-semibold hover:bg-white/20 transition"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisaTypeData;