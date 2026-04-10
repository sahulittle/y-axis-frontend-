import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Plane,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  MapPinned,
} from "lucide-react";

const UK = () => {
  const navigate = useNavigate();

  const visaTypes = [
    {
      title: "Standard Visitor Visa",
      icon: <MapPinned size={24} />,
      description:
        "For tourism, family visits, short business visits, and other permitted short stays in the UK.",
    },
  ];

  const requiredDocuments = [
    "Valid passport",
    "Recent passport-size photograph if required",
    "Completed visa application details",
    "Travel purpose statement",
    "Proof of sufficient funds",
    "Travel itinerary or trip plan",
    "Accommodation details",
    "Employment or business proof, if applicable",
    "Invitation letter, if applicable",
    "Supporting documents showing ties to home country",
  ];

  const processSteps = [
    "Choose the correct UK visitor visa category based on your travel purpose.",
    "Collect and organize all required documents.",
    "Complete the visa application accurately.",
    "Review your documents for consistency and clarity.",
    "Submit the application and pay applicable fees.",
    "Attend biometrics if required and track status updates.",
  ];

  const commonMistakes = [
    "Choosing the wrong visa category",
    "Incomplete financial documents",
    "Weak travel purpose explanation",
    "Missing accommodation or itinerary details",
    "Inconsistent information across application and documents",
    "Submitting without a final checklist review",
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#eef6ff] via-white to-[#f7efe7] py-20 lg:py-24">
        <div className="absolute top-0 left-0 h-40 w-40 rounded-full bg-blue-100 blur-3xl opacity-60" />
        <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-indigo-100 blur-3xl opacity-60" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
                <Plane size={16} />
                UK Visa Services
              </span>

              <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                Apply for Your UK Standard Visitor Visa With Confidence
              </h1>

              <p className="mt-6 text-lg text-gray-600 leading-8 max-w-2xl">
                Get expert support for your UK visitor visa application with
                clear documentation guidance, application review, and
                step-by-step assistance for a smoother journey.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => navigate("/contact")}
                  className="inline-flex items-center gap-2 rounded-full bg-[#f2653a] px-7 py-4 text-white font-semibold shadow-lg hover:opacity-90 transition"
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
                  src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop"
                  alt="United Kingdom"
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
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-3">
              Visa Types
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
              UK Visa Category We Support
            </h2>
          </div>

          <div className="grid md:grid-cols-1 xl:grid-cols-1 gap-8 max-w-2xl mx-auto">
            {visaTypes.map((item, index) => (
              <div
                key={index}
                className="rounded-3xl border border-gray-100 bg-gradient-to-b from-white to-indigo-50 p-8 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-6">
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
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-3">
                Required Documents
              </p>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                Documents You May Need for a UK Standard Visitor Visa
              </h2>
              <p className="mt-5 text-lg text-gray-600 leading-8">
                Prepare your visa application with complete and well-organized
                documents to reduce delays and improve application clarity.
              </p>
            </div>

            <div className="bg-white rounded-[32px] border border-gray-100 shadow-xl p-8">
              <div className="space-y-4">
                {requiredDocuments.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 rounded-2xl bg-indigo-50 px-5 py-4"
                  >
                    <CheckCircle2
                      className="text-indigo-600 shrink-0 mt-0.5"
                      size={20}
                    />
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
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-3">
              Step-by-Step Process
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
              How We Help With Your UK Visitor Visa
            </h2>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="relative rounded-3xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-xl transition"
              >
                <div className="absolute top-6 right-6 text-5xl font-extrabold text-indigo-50">
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
                Avoid These Common UK Visitor Visa Errors
              </h2>
              <p className="mt-5 text-lg text-gray-600 leading-8">
                Small errors in documentation or application details can create
                delays or extra queries, so proper review matters.
              </p>
            </div>

            <div className="space-y-4">
              {commonMistakes.map((mistake, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-3xl border border-orange-100 bg-white p-5 shadow-sm"
                >
                  <AlertTriangle
                    className="text-orange-500 shrink-0 mt-1"
                    size={20}
                  />
                  <p className="text-gray-700 font-medium leading-7">
                    {mistake}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0f172a]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="rounded-[36px] bg-gradient-to-r from-[#f2653a] to-indigo-500 p-10 md:p-14 text-center shadow-2xl">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 text-white mb-6">
              <BadgeCheck size={30} />
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold text-white">
              Ready to Start Your UK Standard Visitor Visa Application?
            </h2>

            <p className="mt-5 text-lg text-white/90 max-w-3xl mx-auto leading-8">
              Get personalized guidance for documentation, application review,
              and smooth next-step support from our visa team.
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

export default UK;