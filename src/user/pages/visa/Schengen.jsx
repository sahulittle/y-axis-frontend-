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
  Briefcase,
  Users,
} from "lucide-react";

const Schengen = () => {
  const navigate = useNavigate();

  const visaTypes = [
    {
      title: "Tourist Visa",
      slug:"tourist",
      icon: <MapPinned size={24} />,
      description:
        "For holidays, sightseeing, leisure travel, and short personal visits across Schengen countries.",
    },
    {
      title: "Business Visa",
      slug:"tourist",
      icon: <Briefcase size={24} />,
      description:
        "For meetings, conferences, trade visits, and short professional travel within the Schengen area.",
    },
    {
      title: "Family / Visit Visa",
      slug:"tourist",
      icon: <Users size={24} />,
      description:
        "For visiting family or friends in Schengen member countries for a short stay.",
    },
  ];

  const requiredDocuments = [
    "Valid passport",
    "Recent passport-size photographs",
    "Completed visa application details",
    "Travel itinerary and trip plan",
    "Proof of sufficient funds",
    "Confirmed accommodation details",
    "Travel insurance, if applicable",
    "Return flight or onward journey proof",
    "Employment or business proof, if applicable",
    "Invitation letter, if applicable",
  ];

  const processSteps = [
    "Choose the correct Schengen visa category based on your travel purpose.",
    "Identify the correct embassy or visa application center for submission.",
    "Collect and organize all required documents.",
    "Complete the application accurately and review all details carefully.",
    "Book biometrics or appointment if required.",
    "Submit the application and track progress until a decision is received.",
  ];

  const commonMistakes = [
    "Applying through the wrong embassy or country",
    "Incomplete travel itinerary or accommodation proof",
    "Weak financial documentation",
    "Missing travel insurance where required",
    "Inconsistent dates across forms and bookings",
    "Submitting documents without a final review",
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
                Schengen Visa Services
              </span>

              <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                Apply for Your Schengen Visa With Expert Guidance
              </h1>

              <p className="mt-6 text-lg text-gray-600 leading-8 max-w-2xl">
                Get complete support for your Schengen visa application with
                help for documentation, embassy guidance, appointment support,
                and a smoother step-by-step process.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => navigate("/visa/schengen")}
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
                  src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1200&auto=format&fit=crop"
                  alt="Schengen"
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
              Schengen Visa Categories We Support
            </h2>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {visaTypes.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate(`/visa/schengen/${item.slug}`);
                }}
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
                Documents You May Need for Schengen Visa Processing
              </h2>
              <p className="mt-5 text-lg text-gray-600 leading-8">
                Prepare your application with complete, accurate, and organized
                documents to reduce delays and improve clarity for embassy review.
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
              How We Help With Your Schengen Visa Application
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
                Avoid These Common Schengen Visa Errors
              </h2>
              <p className="mt-5 text-lg text-gray-600 leading-8">
                Small errors in embassy selection, travel documents, or dates
                can create delays, so proper review is essential.
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
              Ready to Start Your Schengen Visa Application?
            </h2>

            <p className="mt-5 text-lg text-white/90 max-w-3xl mx-auto leading-8">
              Get personalized guidance for embassy selection, document
              preparation, and a smoother Schengen visa application process.
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

export default Schengen;