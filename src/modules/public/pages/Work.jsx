import { ArrowRight, ArrowRightLeft, BriefcaseBusiness, CheckCircle2, ChevronDown, FileText, Globe2, HelpCircle, MoreHorizontal, Search, Settings2, ShieldCheck } from 'lucide-react';
import React, { useState } from 'react'
import Footer from './Footer';

const Work = () => {
    const [selectedCountry, setSelectedCountry] = useState("");
    const [jobQuery, setJobQuery] = useState("");

    const countryOptions = [
        "Australia",
        "Austria",
        "Canada",
        "Denmark",
        "Finland",
        "France",
        "Germany",
        "Ireland",
        "Italy",
        "Japan",
        "Netherlands",
        "New Zealand",
        "Norway",
        "Portugal",
        "Singapore",
        "Sweden",
        "Switzerland",
        "UAE",
        "UK",
        "USA",
    ];

    const phoneCodes = [
        "IN +91",
        "AE +971",
        "UK +44",
        "CA +1",
        "AU +61",
    ];

    const [formData, setFormData] = useState({
        name: "",
        country: "",
        phoneCode: "IN +91",
        mobile: "",
        whatsappSame: true,
        email: "",
        accepted: false,
    });

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Work form submitted:", formData);
    };

    const byCountry = [
        "Jobs in USA",
        "Jobs in Germany",
        "Jobs in Canada",
        "Jobs in Australia",
        "Jobs in UK",
        "Jobs in Dubai",
    ];

    const byProfession = [
        "IT",
        "Engineering",
        "Marketing and Sales",
        "HR",
        "Healthcare",
        "Teachers",
        "Accountants",
        "Nursing",
        "Hospitality",
    ];

    const byVisa = [
        "Australia Work Visa",
        "Canada Work Visa",
        "UK Skilled Worker Visa",
        "Germany Opportunity Card",
        "Sweden Residence Permit",
        "Portugal Jobseeker Visa",
    ];

    const byServices = [
        "Post Resume",
        "Resume Writing",
        "LinkedIn Optimization",
        "Smart Assisted Service",
        "Post a Job",
    ];

    const countries = [
        "USA",
        "UK",
        "UAE",
        "Australia",
        "Canada",
        "Germany",
        "Sweden",
        "Portugal",
    ];

    const serviceBlocks = [
        {
            title: "Resume Marketing Strategy",
            image:
                "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1400&auto=format&fit=crop",
            imageLeft: true,
            points: [
                "Role and industry alignment based on your profile",
                "Target countries and job markets identified",
                "Clear positioning to match employer expectations",
                "Personalized roadmap",
            ],
        },
        {
            title: "Unified Application Kit",
            image:
                "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1400&auto=format&fit=crop",
            imageLeft: false,
            points: [
                "ATS-optimized resume creation",
                "Customized cover letter framework",
                "Professionally aligned LinkedIn profile",
                "Consistent branding across all documents",
            ],
        },
        {
            title: "Portal Presence",
            image:
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop",
            imageLeft: true,
            points: [
                "Profile creation on key portals",
                "Optimization for recruiter searches",
                "Accurate and complete profile details",
                "Visibility across recruitment platforms",
            ],
        },
        {
            title: "Structured Applications",
            image:
                "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1400&auto=format&fit=crop",
            imageLeft: false,
            points: [
                "Tailored applications for each role",
                "Systematic weekly application process",
                "Consistent follow-ups and tracking",
                "Execution over an 8–24 week timeline",
            ],
        },
    ];

    const benefits = [
        "Rapid economic growth",
        "Excellent work-life balance",
        "5x more income than your current salary",
        "Millions of job opportunities in various sectors",
        "Professional job market is truly global",
        "Better career opportunities and prospects",
        "Develop your cultural intelligence",
        "Expand your professional network",
        "Healthcare & social benefits",
        "Retirement benefits",
    ];

    const comparisonRows = [
        {
            factor: "Definition",
            permit: "Permission to work in a specific job/employer",
            visa: "Entry clearance to live and work abroad",
        },
        {
            factor: "Issuing Body",
            permit: "Labor/immigration authorities",
            visa: "Embassy/consulate of destination country",
        },
        {
            factor: "Requirements",
            permit: "Employer sponsorship, job offer",
            visa: "Proof of eligibility may include sponsorship",
        },
        {
            factor: "Scope",
            permit: "Tied to one role/employer",
            visa: "Broader but depends on the visa category",
        },
        {
            factor: "Validity",
            permit: "Matches job contract or set by labor regulations",
            visa: "Determined by immigration laws, often renewable",
        },
        {
            factor: "Renewability",
            permit: "Needs reapproval from authorities",
            visa: "Typically renewable if conditions are met",
        },
        {
            factor: "Employer Change",
            permit: "Usually requires a new permit",
            visa: "May need a new or amended visa",
        },
        {
            factor: "Processing Time",
            permit: "Varies by local rules and bureaucracy",
            visa: "Often longer due to visa processing requirements",
        },
        {
            factor: "Fees",
            permit: "Mostly paid by employer or shared",
            visa: "Usually paid by the applicant",
        },
    ];

    return (
        <div>
            <section className="w-full bg-gradient-to-br from-slate-50 via-white to-orange-50 py-12 lg:py-20">
                <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
                    <div className="grid grid-cols-1 overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] lg:grid-cols-2">
                        {/* Left Image */}
                        <div className="relative min-h-[320px] lg:min-h-full">
                            <img
                                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1400&auto=format&fit=crop"
                                alt="Work overseas"
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-900/15 to-transparent" />

                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                                <div className="max-w-md rounded-[24px] border border-white/20 bg-white/10 p-5 backdrop-blur-md">
                                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/85">
                                        Global Careers
                                    </p>
                                    <h3 className="mt-2 text-2xl font-extrabold text-white md:text-3xl">
                                        Find the right overseas work opportunity
                                    </h3>
                                    <p className="mt-3 text-sm leading-7 text-white/85 md:text-base">
                                        Start your work visa journey with expert support and fast,
                                        guided assistance.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Content */}
                        <div className="p-6 md:p-8 lg:p-10">
                            <span className="inline-flex rounded-full bg-orange-100 px-4 py-1.5 text-sm font-semibold text-orange-700">
                                Work Abroad
                            </span>

                            <h3 className="mt-4 text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
                                Secure Your Work Visa Quickly &amp; Easily
                            </h3>

                            <p className="mt-3 text-base leading-8 text-slate-600 md:text-lg">
                                Want to Work Overseas? Avail our Services
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
                                        wanted to work in
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

                                {/* Phone */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-800">
                                        You can contact me at
                                    </label>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[180px_1fr]">
                                        <div className="relative">
                                            <select
                                                value={formData.phoneCode}
                                                onChange={(e) =>
                                                    handleChange("phoneCode", e.target.value)
                                                }
                                                className="h-14 w-full appearance-none rounded-2xl border border-slate-300 bg-white px-4 pr-12 text-base text-slate-700 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                                            >
                                                {phoneCodes.map((code) => (
                                                    <option key={code} value={code}>
                                                        {code}
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
                                        and Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Email Id"
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

                                {/* Button */}
                                <button
                                    type="submit"
                                    className="w-full rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-4 text-base font-semibold text-slate-950 shadow-md transition hover:scale-[1.01] hover:shadow-lg"
                                >
                                    Get Started
                                </button>
                            </form>

                            {/* Consultation Card */}
                            <div className="mt-6 rounded-[24px] border border-orange-100 bg-orange-50 p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
                                        <HelpCircle size={28} />
                                    </div>

                                    <div>
                                        <p className="text-lg font-bold text-slate-900">
                                            Don&apos;t know what to do?
                                        </p>
                                        <p className="mt-1 text-sm leading-7 text-slate-600 md:text-base">
                                            Get Free Counsultation
                                        </p>
                                        <button className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-500">
                                            <BriefcaseBusiness size={16} />
                                            Talk to an Expert
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full bg-gradient-to-br from-white via-slate-50 to-orange-50 py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
                    <div className="mb-10 text-center lg:mb-14">
                        <span className="inline-flex rounded-full bg-orange-100 px-4 py-1.5 text-sm font-semibold text-orange-700">
                            Career Abroad
                        </span>

                        <h3 className="mt-4 text-3xl font-extrabold text-slate-900 md:text-4xl lg:text-5xl">
                            Work Opportunity
                        </h3>

                        <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
                            Explore international job options, visa pathways, and career
                            services to build your future overseas.
                        </p>
                    </div>

                    {/* Search Box */}
                    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] md:p-8">
                        <h4 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
                            Search Careers
                        </h4>

                        {/* Search Inputs */}
                        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr_auto]">

                            {/* Job Search */}
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search job (e.g. Software Engineer)"
                                    value={jobQuery}
                                    onChange={(e) => setJobQuery(e.target.value)}
                                    className="h-14 w-full rounded-2xl border border-slate-300 bg-white px-4 pr-12 text-base text-slate-700 placeholder:text-slate-400 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                                />
                            </div>

                            {/* Country Dropdown */}
                            <div className="relative">
                                <select
                                    value={selectedCountry}
                                    onChange={(e) => setSelectedCountry(e.target.value)}
                                    className="h-14 w-full appearance-none rounded-2xl border border-slate-300 bg-white px-4 pr-12 text-base text-slate-700 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                                >
                                    <option value="">Select Country</option>
                                    {countries.map((country) => (
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

                            {/* Search Button */}
                            <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 px-7 py-4 text-base font-semibold text-slate-950 shadow-md transition hover:scale-[1.01]">
                                <Search size={18} />
                                Search
                            </button>
                        </div>

                        {/* Helper Text */}
                        <p className="mt-5 text-sm text-slate-500">
                            Try searching for roles like <span className="font-medium text-slate-700">IT, Engineer, Nurse, Marketing</span>
                        </p>
                    </div>

                    {/* Cards */}
                    <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-4">
                        {/* By Country */}
                        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-white shadow-md">
                                <Globe2 size={28} />
                            </div>

                            <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600">
                                By Country
                            </p>

                            <div className="mt-6 space-y-4">
                                {byCountry.map((item, index) => (
                                    <button
                                        key={index}
                                        className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-left transition hover:border-orange-300 hover:bg-orange-50"
                                    >
                                        <span className="font-semibold text-slate-800">{item}</span>
                                        <MoreHorizontal size={20} className="text-slate-500" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* By Profession */}
                        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 text-white shadow-md">
                                <BriefcaseBusiness size={28} />
                            </div>

                            <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600">
                                By Profession
                            </p>

                            <div className="mt-6 flex flex-wrap gap-3">
                                {byProfession.map((item, index) => (
                                    <button
                                        key={index}
                                        className="rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-slate-900"
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* By Visa */}
                        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-white shadow-md">
                                <FileText size={28} />
                            </div>

                            <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600">
                                By Visa
                            </p>

                            <div className="mt-6 space-y-3">
                                {byVisa.map((item, index) => (
                                    <button
                                        key={index}
                                        className="group flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-left transition hover:border-orange-300 hover:bg-orange-50"
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

                        {/* By Services */}
                        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 text-white shadow-md">
                                <Settings2 size={28} />
                            </div>

                            <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600">
                                By Services
                            </p>

                            <div className="mt-6 space-y-3">
                                {byServices.map((item, index) => (
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
                        {/* Left Content */}
                        <div className="p-6 md:p-8 lg:p-12">
                            <span className="inline-flex rounded-full bg-orange-100 px-4 py-1.5 text-sm font-semibold text-orange-700">
                                Global Careers
                            </span>

                            <h3 className="mt-4 text-3xl font-extrabold text-slate-900 md:text-4xl lg:text-5xl">
                                Work Abroad
                            </h3>

                            <p className="mt-4 text-lg font-semibold text-slate-800 md:text-2xl">
                                Top countries to work abroad
                            </p>

                            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-2">
                                {countries.map((country, index) => (
                                    <div
                                        key={index}
                                        className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-orange-300 hover:bg-orange-50"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-orange-500 shadow-sm">
                                                <Globe2 size={18} />
                                            </div>
                                            <span className="font-semibold text-slate-800">
                                                {country}
                                            </span>
                                        </div>

                                        <ArrowRight
                                            size={18}
                                            className="text-orange-500 transition group-hover:translate-x-1"
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 rounded-[24px] border border-orange-100 bg-orange-50 p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
                                <h4 className="text-xl font-bold text-slate-900">
                                    Why choose us?
                                </h4>

                                <div className="mt-4 space-y-3">
                                    {[
                                        "Expert guidance for work visas",
                                        "Country-specific job support",
                                        "End-to-end profile assistance",
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <CheckCircle2
                                                size={20}
                                                className="mt-0.5 shrink-0 text-[#f04124]"
                                            />
                                            <p className="text-sm leading-7 text-slate-600 md:text-base">
                                                {item}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="relative h-[320px] sm:h-[420px] lg:h-full min-h-full">
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop"
                                alt="Work Abroad"
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />

                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                                <div className="max-w-sm rounded-[24px] border border-white/20 bg-white/10 p-5 backdrop-blur-md">
                                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/85">
                                        Career Opportunities
                                    </p>
                                    <h4 className="mt-2 text-2xl font-extrabold text-white">
                                        Build your future in top global destinations
                                    </h4>
                                    <p className="mt-3 text-sm leading-7 text-white/85 md:text-base">
                                        Discover the best countries for work, growth, and a better
                                        lifestyle with expert support.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full bg-gradient-to-br from-white via-slate-50 to-orange-50 py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
                    <div className="mb-10 text-center lg:mb-14">
                        <span className="inline-flex rounded-full bg-orange-100 px-4 py-1.5 text-sm font-semibold text-orange-700">
                            Career Growth Solutions
                        </span>

                        <h3 className="mt-4 text-3xl font-extrabold text-slate-900 md:text-4xl lg:text-5xl">
                            Y-Axis Resume Marketing Services Solution
                        </h3>
                    </div>

                    <div className="space-y-8">
                        {serviceBlocks.map((block, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-1 overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] lg:grid-cols-2"
                            >
                                {block.imageLeft && (
                                    <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-full">
                                        <img
                                            src={block.image}
                                            alt={block.title}
                                            className="h-full w-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/30 via-transparent to-transparent" />
                                    </div>
                                )}

                                <div className="flex items-center p-6 md:p-8 lg:p-10 xl:p-12">
                                    <div className="w-full">
                                        <span className="inline-flex rounded-full bg-slate-100 px-4 py-1.5 text-sm font-semibold text-slate-700">
                                            Solution {index + 1}
                                        </span>

                                        <h4 className="mt-4 text-2xl font-extrabold text-slate-900 md:text-3xl">
                                            {block.title}
                                        </h4>

                                        <div className="mt-7 space-y-4">
                                            {block.points.map((point, pointIndex) => (
                                                <div
                                                    key={pointIndex}
                                                    className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4"
                                                >
                                                    <span className="mt-2 h-3 w-3 shrink-0 rounded-full bg-blue-500" />
                                                    <p className="text-sm leading-7 text-slate-700 md:text-base">
                                                        {point}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-8 flex flex-wrap gap-3">
                                            <button className="rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-md transition hover:scale-[1.02]">
                                                Sign Up Now
                                            </button>

                                            <button className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-orange-400 hover:text-orange-600">
                                                More Info
                                                <ArrowRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {!block.imageLeft && (
                                    <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-full">
                                        <img
                                            src={block.image}
                                            alt={block.title}
                                            className="h-full w-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-tl from-slate-950/30 via-transparent to-transparent" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="w-full bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950 py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
                    <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 px-6 py-10 shadow-[0_20px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl md:px-10 lg:px-14 lg:py-14">
                        <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-orange-500/20 blur-3xl" />
                        <div className="absolute -right-10 bottom-0 h-44 w-44 rounded-full bg-amber-400/20 blur-3xl" />

                        <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                            <div className="max-w-3xl">
                                <span className="inline-flex items-center rounded-full border border-orange-400/20 bg-orange-400/10 px-4 py-1.5 text-sm font-semibold text-orange-300">
                                    Career Support
                                </span>

                                <div className="mt-5 flex items-center gap-4">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-slate-950 shadow-md">
                                        <ArrowRightLeft size={28} />
                                    </div>

                                    <h3 className="text-3xl font-extrabold leading-tight text-white md:text-4xl lg:text-5xl">
                                        Want a Career change?
                                    </h3>
                                </div>

                                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                                    Looking for a career change. We make it easy. Get in touch with
                                    us.
                                </p>
                            </div>

                            <div className="w-full lg:w-auto">
                                <button className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-8 py-4 text-base font-semibold text-slate-950 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl lg:w-auto">
                                    Get Connected
                                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white">
                                        <ArrowRight size={18} />
                                    </span>
                                </button>
                            </div>
                        </div>

                        <div className="relative z-10 mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="rounded-[24px] border border-white/10 bg-white/5 px-5 py-4">
                                <p className="text-sm font-semibold text-white">Career Guidance</p>
                                <p className="mt-1 text-sm text-slate-300">
                                    Expert support for your next move
                                </p>
                            </div>

                            <div className="rounded-[24px] border border-white/10 bg-white/5 px-5 py-4">
                                <p className="text-sm font-semibold text-white">Easy Process</p>
                                <p className="mt-1 text-sm text-slate-300">
                                    Clear steps and practical solutions
                                </p>
                            </div>

                            <div className="rounded-[24px] border border-white/10 bg-white/5 px-5 py-4">
                                <p className="text-sm font-semibold text-white">Fast Support</p>
                                <p className="mt-1 text-sm text-slate-300">
                                    Connect with our team quickly
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full bg-gradient-to-br from-white via-slate-50 to-orange-50 py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
                    <div className="space-y-8">
                        {/* Top grid */}
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr]">
                            {/* Why apply */}
                            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] md:p-8 lg:p-10">
                                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-white shadow-md">
                                    <BriefcaseBusiness size={28} />
                                </div>

                                <h3 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
                                    Why apply for a Work Permit?
                                </h3>

                                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                                    {benefits.map((item, index) => (
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

                            {/* What is a work permit */}
                            <div className="rounded-[32px] border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] md:p-8 lg:p-10">
                                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-md">
                                    <ShieldCheck size={28} />
                                </div>

                                <h3 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
                                    What is a Work Permit?
                                </h3>

                                <div className="mt-6 space-y-5 text-base leading-8 text-slate-600">
                                    <p>
                                        Working abroad can dramatically transform your life and
                                        career. Working in a foreign country would surely require you
                                        to acquire new abilities. You will learn new soft skills, such
                                        as communication and networking, as well as new technical
                                        skills in your new career abroad.
                                    </p>

                                    <p>
                                        After all, navigating a new location without knowing the
                                        language requires resourcefulness, and working in an
                                        international team will improve your communication skills.
                                    </p>

                                    <p>
                                        Working Abroad also allows you to learn a foreign language.
                                        This will help you in your work and make a living abroad
                                        easier. Besides this, your new language skills will positively
                                        impact your career.
                                    </p>

                                    <p>
                                        Working in a foreign country is a fantastic way to broaden
                                        your personal and professional network. Working in another
                                        country exposes you to fresh opportunities because you will
                                        collaborate with locals and expats from other countries.
                                    </p>

                                    <p>
                                        You will also develop friendships with people from various
                                        walks of life, some of which will last a lifetime.
                                    </p>

                                    <p>
                                        Having an international assignment on your resume may help you
                                        find work in the future. Talent mobility is a hot topic in
                                        recruiting, and an increasing proportion of future professions
                                        will necessitate foreign travel.
                                    </p>

                                    <p>
                                        Working Abroad will demonstrate your flexibility and
                                        independence and make your resume stand out. Additionally, any
                                        other talents you acquire abroad, such as language skills,
                                        will enhance your resume.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Comparison table */}
                        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] md:p-8 lg:p-10">
                            <h3 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
                                What is the difference between a Work permit and a Work Visa?
                            </h3>

                            <div className="mt-8 overflow-hidden rounded-[24px] border border-slate-200">
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[760px] border-collapse">
                                        <thead>
                                            <tr className="bg-slate-900 text-left text-white">
                                                <th className="px-5 py-4 text-sm font-semibold md:text-base">
                                                    Factor
                                                </th>
                                                <th className="px-5 py-4 text-sm font-semibold md:text-base">
                                                    Work Permit
                                                </th>
                                                <th className="px-5 py-4 text-sm font-semibold md:text-base">
                                                    Work Visa
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {comparisonRows.map((row, index) => (
                                                <tr
                                                    key={index}
                                                    className={
                                                        index % 2 === 0
                                                            ? "bg-white"
                                                            : "bg-slate-50"
                                                    }
                                                >
                                                    <td className="border-t border-slate-200 px-5 py-4 align-top text-sm font-semibold text-slate-900 md:text-base">
                                                        {row.factor}
                                                    </td>
                                                    <td className="border-t border-slate-200 px-5 py-4 align-top text-sm leading-7 text-slate-700 md:text-base">
                                                        {row.permit}
                                                    </td>
                                                    <td className="border-t border-slate-200 px-5 py-4 align-top text-sm leading-7 text-slate-700 md:text-base">
                                                        {row.visa}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="mt-6 rounded-[20px] border border-orange-100 bg-orange-50 px-5 py-4">
                                <p className="text-sm leading-7 text-slate-600 md:text-base">
                                    A work permit is generally tied to a specific employer or role,
                                    while a work visa is broader entry authorization based on the
                                    immigration category and country rules.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer/>
        </div>
    )
}

export default Work