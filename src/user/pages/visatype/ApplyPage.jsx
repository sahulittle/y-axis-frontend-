import React from "react";
import { useParams } from "react-router-dom";

const ApplyPage = () => {
  const { country, visaType } = useParams();

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

          <form className="mt-8 grid md:grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="First Name"
              className="h-14 px-4 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-100"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="h-14 px-4 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-100"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="h-14 px-4 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-100"
            />
            <input
              type="tel"
              placeholder="Phone Number"
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
              placeholder="Tell us about your travel purpose"
              className="md:col-span-2 min-h-[130px] p-4 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-100"
            />
            <button
              type="submit"
              className="md:col-span-2 h-14 rounded-full bg-[#f2653a] text-white font-semibold shadow-lg hover:opacity-90 transition"
            >
              Submit Application Request
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ApplyPage;