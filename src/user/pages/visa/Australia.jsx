import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Plane,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Briefcase,
  GraduationCap,
  MapPinned,
} from "lucide-react";

const Australia = () => {
  const navigate = useNavigate();

  const visaTypes = [
    {
      title: "Visitor Visa",
      slug: "visitor",
      icon: <MapPinned size={24} />,
      description:
        "For tourism, family visits, and short personal travel to Australia.",
    }
  ];

  const requiredDocuments = [
    "Valid passport",
    "Recent passport-size photograph",
    "Visa application form and personal details",
    "Travel itinerary or purpose of visit",
    "Proof of sufficient funds",
    "Accommodation details",
    "Employment / business / study supporting documents",
    "Invitation letter, if applicable",
  ];

  const processSteps = [
    "Choose the correct visa category based on your travel purpose.",
    "Collect and organize all required documents.",
    "Complete the visa application accurately.",
    "Review your application and supporting documents.",
    "Submit the application and pay applicable fees.",
    "Track progress and respond to any additional requests.",
  ];

  const commonMistakes = [
    "Selecting the wrong visa category",
    "Incomplete or inconsistent documents",
    "Passport details not matching supporting records",
    "Weak financial documentation",
    "Unclear travel purpose or missing itinerary details",
    "Last-minute submission without review",
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#eef6ff] via-white to-[#f7efe7] py-20 lg:py-24">
        <div className="absolute top-0 left-0 h-40 w-40 rounded-full bg-blue-100 blur-3xl opacity-60" />
        <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-orange-100 blur-3xl opacity-60" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                <Plane size={16} />
                Australia Visa Services
              </span>

              <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                Start Your Australia Visa Journey With Confidence
              </h1>

              <p className="mt-6 text-lg text-gray-600 leading-8 max-w-2xl">
                Get expert support for Australia visa applications with clear
                documentation guidance, application assistance, and step-by-step
                support for a smoother process.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => navigate("/visa/australia/visitor")}
                  className="inline-flex items-center gap-2 rounded-full bg-[#f2653a] px-7 py-4 text-white font-semibold shadow-lg hover:scale-[1.02] transition"
                >
                  Start Application
                  <ArrowRight size={18} />
                </button>

                <button
                  onClick={() => navigate("/visa")}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-7 py-4 text-gray-800 font-semibold hover:bg-gray-50 transition"
                >
                  Explore More Visas
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[32px] overflow-hidden shadow-2xl bg-white p-3">
                <img
                  src="https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=1200&auto=format&fit=crop"
                  alt="Australia"
                  className="w-full h-[320px] md:h-[500px] object-cover rounded-[26px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visa Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-600 mb-3">
              Visa Types
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
              Australia Visa Categories We Support
            </h2>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3">
            {visaTypes.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate(`/visa/australia/${item.slug}`);
                }}
                className="rounded-3xl border border-gray-100 bg-gradient-to-b from-white to-blue-50 p-8 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-7">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-20 bg-[#f8fbff]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-600 mb-3">
                Required Documents
              </p>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                Documents You May Need for Australia Visa Processing
              </h2>
              <p className="mt-5 text-lg text-gray-600 leading-8">
                Prepare your application with complete and accurate documents to
                reduce delays and improve clarity during the review process.
              </p>
            </div>

            <div className="bg-white rounded-[32px] border border-gray-100 shadow-xl p-8">
              <div className="space-y-4">
                {requiredDocuments.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 rounded-2xl bg-blue-50 px-5 py-4"
                  >
                    <CheckCircle2 className="text-blue-600 shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-800 font-medium">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-step Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-600 mb-3">
              Step-by-Step Process
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
              How We Help You Apply
            </h2>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="relative rounded-3xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-xl transition"
              >
                <div className="absolute top-6 right-6 text-5xl font-extrabold text-blue-50">
                  0{index + 1}
                </div>
                <div className="w-14 h-14 rounded-2xl bg-[#f2653a] text-white flex items-center justify-center mb-6">
                  <FileText size={22} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Step {index + 1}
                </h3>
                <p className="text-gray-600 leading-7">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="py-20 bg-gradient-to-b from-[#fff8f5] to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-orange-600 mb-3">
                Common Mistakes
              </p>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                Avoid These Common Australia Visa Errors
              </h2>
              <p className="mt-5 text-lg text-gray-600 leading-8">
                Small mistakes can create delays or confusion. A properly
                reviewed application helps improve accuracy and confidence.
              </p>
            </div>

            <div className="space-y-4">
              {commonMistakes.map((mistake, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-3xl border border-orange-100 bg-white p-5 shadow-sm"
                >
                  <AlertTriangle className="text-orange-500 shrink-0 mt-1" size={20} />
                  <p className="text-gray-700 font-medium leading-7">{mistake}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0f172a]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="rounded-[36px] bg-gradient-to-r from-[#f2653a] to-orange-400 p-10 md:p-14 text-center shadow-2xl">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 text-white mb-6">
              <BadgeCheck size={30} />
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold text-white">
              Ready to Begin Your Australia Visa Application?
            </h2>

            <p className="mt-5 text-lg text-white/90 max-w-3xl mx-auto leading-8">
              Connect with our team for personalized guidance, document support,
              and a smoother application experience.
            </p>

            <button
              onClick={() => navigate("/contact")}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-[#f2653a] font-bold shadow-lg hover:scale-[1.02] transition"
            >
              Start Application
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Australia;