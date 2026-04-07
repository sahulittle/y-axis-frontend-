import React, { useState, useMemo } from 'react'
import { ArrowRight, BriefcaseBusiness, CheckCircle2, ChevronDown, FileCheck2, Globe2, HelpCircle, MoreHorizontal, ShieldCheck } from "lucide-react";
import Footer from "./Footer";

const Migrate = () => {
    const countryOptions = [
        "Australia",
        "Austria",
        "Belgium",
        "Brazil",
        "Canada",
        "Denmark",
        "Finland",
        "France",
        "Germany",
        "Ireland",
        "Italy",
        "Japan",
        "Malaysia",
        "Netherlands",
        "New Zealand",
        "Norway",
        "Poland",
        "Portugal",
        "Singapore",
        "South Korea",
        "Spain",
        "Sweden",
        "Switzerland",
        "UAE",
        "UK",
        "USA",
    ];

    const dialCodes = [
        { code: "IN +91", value: "+91" },
        { code: "AE +971", value: "+971" },
        { code: "UK +44", value: "+44" },
        { code: "CA +1", value: "+1" },
        { code: "AU +61", value: "+61" },
    ];

    const [formData, setFormData] = useState({
        name: "",
        country: "",
        dialCode: "+91",
        mobile: "",
        whatsappSame: true,
        email: "",
        accepted: false,
    });

    const selectedDialCodeLabel = useMemo(() => {
        const found = dialCodes.find((item) => item.value === formData.dialCode);
        return found ? found.code : "IN +91";
    }, [formData.dialCode, dialCodes]);

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Migrate form:", formData);
    };

    const countries = [
        { label: "Migrate to Australia" },
        { label: "Migrate to Canada" },
        { label: "Migrate to Germany" },
    ];

    const prVisas = [
        "Australia Permanent Resident Visa",
        "Canada Permanent Resident Visa",
    ];

    const workVisas = [
        "Germany Opportunity Card",
        "UK Skilled Worker Visa",
        "USA H-1B",
        "Canada Work Visa",
        "Australia Work Visa",
        "Portugal Job Seeker Visa",
        "Sweden Residence Permit",
    ];

    const processSteps = [
        {
            title: "Inquiry",
            description: "Welcome! Your immigration journey starts here...",
            number: "01",
        },
        {
            title: "Expert Counselling",
            description:
                "Our expert will personally guide you based on your interests and goals.",
            number: "02",
        },
        {
            title: "Eligibility",
            description:
                "Check your eligibility for immigration to specific country and sign-up for this process.",
            number: "03",
        },
        {
            title: "Documentation",
            description:
                "All your documents will be compiled to create a strong application.",
            number: "04",
        },
        {
            title: "Processing",
            description:
                "Assists you in every step while filing the application.",
            number: "05",
        },
    ];

    const futureBenefits = [
        "High standards of living",
        "Excellent work-life balance",
        "Earn 5x more income than your current salary",
        "Millions of job opportunities in various sectors",
        "Better career prospects",
        "FREE education for your children",
        "Healthcare & social benefits",
        "Retirement benefits",
        "Apply for citizenship based on your eligibility",
    ];

    const immigrationReasons = [
        "Increased earning potential",
        "More job opportunities",
        "Better healthcare and education",
    ];

    const firstStepCriteria = [
        "Age",
        "Education",
        "Language requirements",
        "Work Experience",
        "Arranged Employment",
        "Adaptability",
    ];

    const migrateRequirements = [
        "Education",
        "Identity",
        "Work experience",
        "General background",
    ];

    const applySteps = [
        "Check your eligibility",
        "Find out if your score meets the specific criteria of the points grid (for instance - 65 points for Australia, 67 points for Canada)",
        "Arrange the checklist of documents",
        "Apply for the visa",
        "Complete the visa application form and submit it",
        "Wait for the visa status",
        "Settle overseas",
    ];

    return (
        <div>
            <section className="w-full bg-gradient-to-br from-slate-50 via-white to-orange-50 py-12 lg:py-20">
                <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
                    <div className="grid grid-cols-1 items-stretch gap-8 overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] lg:grid-cols-2">
                        {/* Left Image */}
                        <div className="relative min-h-[320px] lg:min-h-full">
                            <img
                                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1400&auto=format&fit=crop"
                                alt="Migrate abroad"
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-slate-900/10 to-transparent" />

                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                                <div className="max-w-md rounded-[24px] border border-white/20 bg-white/10 p-5 backdrop-blur-md">
                                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/85">
                                        Global Migration
                                    </p>
                                    <h3 className="mt-2 text-2xl font-extrabold text-white md:text-3xl">
                                        Start your migration journey with confidence
                                    </h3>
                                    <p className="mt-3 text-sm leading-7 text-white/85 md:text-base">
                                        Explore overseas opportunities and take the next step with
                                        the right expert guidance.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Form */}
                        <div className="p-6 md:p-8 lg:p-10">
                            <span className="inline-flex rounded-full bg-orange-100 px-4 py-1.5 text-sm font-semibold text-orange-700">
                                Free Consultation
                            </span>

                            <h4 className="mt-4 text-3xl font-extrabold text-slate-900 md:text-4xl">
                                Migrate
                            </h4>

                            <p className="mt-3 text-base leading-8 text-slate-600 md:text-lg">
                                Move abroad with your family.
                            </p>

                            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                                {/* Name */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-800">
                                        I am
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={formData.name}
                                        onChange={(e) => handleChange("name", e.target.value)}
                                        className="h-14 w-full rounded-2xl border border-slate-300 bg-slate-950 px-4 text-base text-white placeholder:text-slate-400 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                                    />
                                </div>

                                {/* Country */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-800">
                                        wanted to migrate to
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={formData.country}
                                            onChange={(e) => handleChange("country", e.target.value)}
                                            className="h-14 w-full appearance-none rounded-2xl border border-slate-300 bg-white px-4 pr-12 text-base text-slate-700 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                                        >
                                            <option value="">Select Country</option>
                                            {countryOptions.map((country) => (
                                                <option key={country} value={country}>
                                                    {country}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown
                                            size={18}
                                            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                                        />
                                    </div>
                                </div>

                                {/* Contact */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-800">
                                        You can connect me at
                                    </label>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[180px_1fr]">
                                        <div className="relative">
                                            <select
                                                value={formData.dialCode}
                                                onChange={(e) => handleChange("dialCode", e.target.value)}
                                                className="h-14 w-full appearance-none rounded-2xl border border-slate-300 bg-white px-4 pr-12 text-base text-slate-700 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                                            >
                                                {dialCodes.map((item) => (
                                                    <option key={item.value} value={item.value}>
                                                        {item.code}
                                                    </option>
                                                ))}
                                            </select>
                                            <ChevronDown
                                                size={18}
                                                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                                            />
                                        </div>

                                        <input
                                            type="tel"
                                            placeholder="Mobile No."
                                            value={formData.mobile}
                                            onChange={(e) => handleChange("mobile", e.target.value)}
                                            className="h-14 w-full rounded-2xl border border-slate-300 bg-white px-4 text-base text-slate-700 placeholder:text-slate-400 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                                        />
                                    </div>

                                    <label className="mt-3 flex cursor-pointer items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={formData.whatsappSame}
                                            onChange={(e) =>
                                                handleChange("whatsappSame", e.target.checked)
                                            }
                                            className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-400"
                                        />
                                        <span className="text-sm text-slate-600">
                                            Use this as Whatsapp number
                                        </span>
                                    </label>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-800">
                                        email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Email ID"
                                        value={formData.email}
                                        onChange={(e) => handleChange("email", e.target.value)}
                                        className="h-14 w-full rounded-2xl border border-slate-300 bg-white px-4 text-base text-slate-700 placeholder:text-slate-400 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                                    />
                                </div>

                                {/* Terms */}
                                <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                                    <input
                                        type="checkbox"
                                        checked={formData.accepted}
                                        onChange={(e) => handleChange("accepted", e.target.checked)}
                                        className="mt-1 h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-400"
                                    />
                                    <span className="text-sm leading-6 text-slate-600">
                                        I accept the Terms &amp; Conditions
                                    </span>
                                </label>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className="w-full rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-4 text-base font-semibold text-slate-950 shadow-md transition hover:scale-[1.01] hover:shadow-lg"
                                >
                                    Submit
                                </button>
                            </form>

                            {/* Consultation Card */}
                            <div className="mt-6 rounded-[24px] border border-orange-100 bg-orange-50 p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
                                        <HelpCircle size={28} />
                                    </div>

                                    <div>
                                        <p className="text-lg font-bold text-slate-900">Confused?</p>
                                        <p className="mt-1 text-sm leading-7 text-slate-600 md:text-base">
                                            Get Free Counsultation
                                        </p>
                                        <button className="mt-3 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-500">
                                            Talk to an Expert
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* small info */}
                            <p className="mt-4 text-xs leading-6 text-slate-500">
                                Selected code: {selectedDialCodeLabel}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full bg-gradient-to-br from-white via-slate-50 to-orange-50 py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
                    <div className="mb-10 text-center lg:mb-14">
                        <span className="inline-flex rounded-full bg-orange-100 px-4 py-1.5 text-sm font-semibold text-orange-700">
                            Global Opportunities
                        </span>

                        <h3 className="mt-4 text-3xl font-extrabold text-slate-900 md:text-4xl lg:text-5xl">
                            Migrate Opportunity
                        </h3>

                        <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
                            Explore top migration destinations, permanent residence pathways,
                            and work visa options to begin your overseas journey with confidence.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                        {/* Card 1 */}
                        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-white shadow-md">
                                <Globe2 size={28} />
                            </div>

                            <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600">
                                Country
                            </p>

                            <div className="mt-6 space-y-4">
                                {countries.map((item, index) => (
                                    <button
                                        key={index}
                                        className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-left transition hover:border-orange-300 hover:bg-orange-50"
                                    >
                                        <span className="font-semibold text-slate-800">
                                            {item.label}
                                        </span>
                                        <MoreHorizontal size={20} className="text-slate-500" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 text-white shadow-md">
                                <ShieldCheck size={28} />
                            </div>

                            <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600">
                                PR Visas
                            </p>

                            <div className="mt-6 space-y-4">
                                {prVisas.map((item, index) => (
                                    <button
                                        key={index}
                                        className="group flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left transition hover:border-orange-300 hover:bg-orange-50"
                                    >
                                        <span className="font-semibold text-slate-800">{item}</span>
                                        <ArrowRight
                                            size={18}
                                            className="text-orange-500 transition group-hover:translate-x-1"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-white shadow-md">
                                <BriefcaseBusiness size={28} />
                            </div>

                            <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600">
                                Work Visas
                            </p>

                            <div className="mt-6 space-y-3">
                                {workVisas.map((item, index) => (
                                    <button
                                        key={index}
                                        className="group flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-left transition hover:border-orange-300 hover:bg-orange-50"
                                    >
                                        <span className="text-sm font-semibold text-slate-800 md:text-base">
                                            {item}
                                        </span>
                                        <ArrowRight
                                            size={18}
                                            className="shrink-0 text-orange-500 transition group-hover:translate-x-1"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full bg-gradient-to-br from-slate-50 via-white to-orange-50 py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
                    <div className="grid grid-cols-1 items-center gap-10 overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] lg:grid-cols-2">

                        {/* Left Image */}
                        <div className="relative h-[300px] sm:h-[400px] lg:h-full">
                            <img
                                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1400&auto=format&fit=crop"
                                alt="Eligibility"
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-transparent" />
                        </div>

                        {/* Right Content */}
                        <div className="p-6 md:p-10 lg:p-12">
                            <span className="inline-flex rounded-full bg-orange-100 px-4 py-1.5 text-sm font-semibold text-orange-700">
                                Quick Check
                            </span>

                            <h3 className="mt-4 text-3xl font-extrabold text-slate-900 md:text-4xl lg:text-5xl leading-tight">
                                Check your eligibility instantly
                            </h3>

                            <p className="mt-4 text-base md:text-lg text-slate-600 leading-8 max-w-xl">
                                Evaluate your eligibility instantly for free! Discover your chances
                                of migrating abroad with our quick and reliable assessment tool.
                            </p>

                            {/* CTA Button */}
                            <button className="mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-7 py-4 text-base font-semibold text-slate-950 shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-xl">
                                Check Eligibility
                                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white">
                                    <ArrowRight size={20} />
                                </span>
                            </button>

                            {/* Extra small info */}
                            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                                <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 font-bold">
                                    ✓
                                </div>
                                <p className="text-sm text-slate-600">
                                    100% Free • Instant Results • No Obligation
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full bg-gradient-to-br from-white via-slate-50 to-orange-50 py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
                    <div className="mb-10 text-center lg:mb-14">
                        <span className="inline-flex rounded-full bg-orange-100 px-4 py-1.5 text-sm font-semibold text-orange-700">
                            Step by Step Guidance
                        </span>

                        <h3 className="mt-4 text-3xl font-extrabold text-slate-900 md:text-4xl lg:text-5xl">
                            Migrate Process
                        </h3>

                        <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
                            In recent times, migration has become a dream for everyone willing
                            to settle abroad. People move abroad to study, work, or have a
                            better quality of life.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">
                        {processSteps.map((step, index) => (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)]"
                            >
                                <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-orange-100/70 transition-all duration-300 group-hover:bg-orange-200/80" />

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-lg font-extrabold text-white shadow-md">
                                            {step.number}
                                        </div>

                                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition-all duration-300 group-hover:bg-slate-900 group-hover:text-white">
                                            <ArrowRight size={20} />
                                        </span>
                                    </div>

                                    <h4 className="mt-8 text-2xl font-extrabold text-slate-900">
                                        {step.title}
                                    </h4>

                                    <p className="mt-4 text-base leading-8 text-slate-600">
                                        {step.description}
                                    </p>
                                </div>

                                <div className="mt-8 h-1.5 w-16 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-300 group-hover:w-24" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="w-full bg-gradient-to-br from-slate-50 via-white to-orange-50 py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
                    <div className="space-y-8">
                        {/* Top section */}
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] md:p-8 lg:p-10">
                                <span className="inline-flex rounded-full bg-orange-100 px-4 py-1.5 text-sm font-semibold text-orange-700">
                                    Build Your Future Abroad
                                </span>

                                <h3 className="mt-4 text-3xl font-extrabold text-slate-900 md:text-4xl lg:text-5xl">
                                    Migrate Overseas to Build a Better Future
                                </h3>

                                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                    {futureBenefits.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4"
                                        >
                                            <CheckCircle2
                                                size={20}
                                                className="mt-0.5 shrink-0 text-[#f04124]"
                                            />
                                            <p className="text-sm leading-7 text-slate-700 md:text-base">
                                                {item}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-[32px] border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] md:p-8 lg:p-10">
                                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f04124] text-white shadow-md">
                                    <Globe2 size={28} />
                                </div>

                                <p className="text-base leading-8 text-slate-600 md:text-lg">
                                    According to the United Nations Department of Economic and
                                    Social Affairs (UNDESA), there were an estimated{" "}
                                    <span className="font-bold text-slate-900">
                                        232 million international migrants globally
                                    </span>
                                    .
                                </p>

                                <div className="mt-8 rounded-[24px] border border-slate-200 bg-white p-5">
                                    <h4 className="text-xl font-bold text-slate-900">
                                        Why people choose overseas migration
                                    </h4>
                                    <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
                                        Better earnings, more opportunities, and a stronger quality of
                                        life continue to make global migration a preferred path for
                                        ambitious individuals and families.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Reasons for immigration */}
                        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] md:p-8 lg:p-10">
                            <h3 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
                                What are the reasons for immigration?
                            </h3>

                            <div className="mt-6 space-y-5 text-base leading-8 text-slate-600">
                                <p>
                                    The reasons for moving abroad differ from person to person.
                                    Still, the primary motive to migrate can be either for
                                    employment, studies, a better quality of life, or just to expand
                                    one’s horizons.
                                </p>

                                <div className="rounded-[24px] border border-slate-100 bg-slate-50 p-5">
                                    <p className="font-semibold text-slate-900">
                                        Generally, the top three reasons believed to be the motivating
                                        factors for migrating overseas are –
                                    </p>

                                    <div className="mt-4 grid gap-3 md:grid-cols-3">
                                        {immigrationReasons.map((item, index) => (
                                            <div
                                                key={index}
                                                className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-700 md:text-base"
                                            >
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <p>
                                    An international migrant is a person living outside the country
                                    that they were born in. Crossing borders in search of work,
                                    education, and new horizons, a migrant is primarily driven by
                                    the search for new opportunities and better livelihood.
                                </p>
                            </div>
                        </div>

                        {/* Countries */}
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] md:p-8 lg:p-10">
                                <h3 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
                                    Which countries do Y-Axis help you to immigrate to?
                                </h3>

                                <div className="mt-6 space-y-5 text-base leading-8 text-slate-600">
                                    <p>
                                        We help you immigrate to top destinations where Indians thrive
                                        and build successful futures. With over 18 million Indians
                                        abroad, the diaspora is the world's largest, and migration is
                                        a well-trodden path to better opportunities.
                                    </p>

                                    <p className="font-semibold text-slate-900">
                                        We help you to immigrate to:
                                    </p>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                                            <div>
                                                <p className="font-bold text-slate-900">Australia</p>
                                                <p className="text-sm text-slate-600">
                                                    Secure your future with a PR Visa
                                                </p>
                                            </div>
                                            <ArrowRight size={18} className="text-[#f04124]" />
                                        </div>

                                        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                                            <div>
                                                <p className="font-bold text-slate-900">Canada</p>
                                                <p className="text-sm text-slate-600">
                                                    Settle permanently with a PR Visa
                                                </p>
                                            </div>
                                            <ArrowRight size={18} className="text-[#f04124]" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-[32px] border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] md:p-8 lg:p-10">
                                <h3 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
                                    What is the first step to Immigrate?
                                </h3>

                                <div className="mt-6 space-y-5 text-base leading-8 text-slate-600">
                                    <p>
                                        <span className="font-semibold text-slate-900">
                                            Get evaluated:
                                        </span>{" "}
                                        Check your eligibility to migrate abroad instantly for FREE
                                        through the Y-Axis eligibility points calculator.
                                    </p>

                                    <p>
                                        Generally, the eligibility criteria for migrating overseas
                                        include meeting the –
                                    </p>

                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {firstStepCriteria.map((item, index) => (
                                            <div
                                                key={index}
                                                className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-700 md:text-base"
                                            >
                                                {item}
                                            </div>
                                        ))}
                                    </div>

                                    <p>
                                        The specific requirements will vary from program to program
                                        and country to country.
                                    </p>

                                    <div className="overflow-hidden rounded-[24px] border border-slate-200">
                                        <table className="w-full border-collapse">
                                            <thead>
                                                <tr className="bg-slate-900 text-left text-white">
                                                    <th className="px-4 py-4 text-sm font-semibold md:text-base">
                                                        Country
                                                    </th>
                                                    <th className="px-4 py-4 text-sm font-semibold md:text-base">
                                                        Minimum points required
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-t border-slate-200 bg-white">
                                                    <td className="px-4 py-4 text-sm text-slate-700 md:text-base">
                                                        Canada immigration points
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-semibold text-slate-900 md:text-base">
                                                        67
                                                    </td>
                                                </tr>
                                                <tr className="border-t border-slate-200 bg-slate-50">
                                                    <td className="px-4 py-4 text-sm text-slate-700 md:text-base">
                                                        Australia immigration points
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-semibold text-slate-900 md:text-base">
                                                        65
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Requirements */}
                        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] md:p-8 lg:p-10">
                            <h3 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
                                Requirements to migrate abroad
                            </h3>

                            <div className="mt-6 space-y-5 text-base leading-8 text-slate-600">
                                <p>
                                    Each immigration program has its own eligibility requirements as
                                    per government policies. The required documents supporting the
                                    claims you make in your application will depend on the program
                                    you are applying to.
                                </p>

                                <p>
                                    It is advisable to confirm your eligibility before applying. The
                                    government concerned usually verifies your education, identity,
                                    work experience, and general background.
                                </p>

                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                    {migrateRequirements.map((item, index) => (
                                        <div
                                            key={index}
                                            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-5 text-center"
                                        >
                                            <p className="font-semibold text-slate-800">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Steps */}
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                            <div className="rounded-[32px] border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] md:p-8 lg:p-10">
                                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f04124] text-white shadow-md">
                                    <FileCheck2 size={28} />
                                </div>

                                <h3 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
                                    Steps to apply for overseas immigration
                                </h3>

                                <div className="mt-6 space-y-4">
                                    {applySteps.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-4"
                                        >
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                                                {index + 1}
                                            </div>
                                            <p className="text-sm leading-7 text-slate-700 md:text-base">
                                                {item}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] md:p-8 lg:p-10">
                                <h3 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
                                    Guidance you can trust
                                </h3>

                                <div className="mt-6 space-y-5 text-base leading-8 text-slate-600">
                                    <p>
                                        We help our clients discover the best country for them and
                                        give them unbiased advice on their best migration options.
                                    </p>

                                    <p>
                                        From checking eligibility and understanding points to building
                                        the right application strategy, our team supports you at every
                                        important stage of your migration journey.
                                    </p>

                                    <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 p-6">
                                        <p className="text-lg font-bold text-slate-900">
                                            Plan smarter. Apply better. Move confidently.
                                        </p>
                                        <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
                                            Choose the right country, understand the process clearly,
                                            and improve your chances with structured expert support.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Migrate;