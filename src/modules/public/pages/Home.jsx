import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GraduationCap, Plane, Briefcase, MapPinned, BadgeHelp, CalendarDays, Globe2 } from "lucide-react";
import {
    Users,
    UserCheck,
    BadgeCheck,
    Building2,
    ArrowRight,
} from "lucide-react";
import Footer from "./Footer";
import { getPublicSiteSettings } from "../../../user/api/publicApi";

const options = [
    {
        label: "Study",
        icon: <GraduationCap size={20} />,
        path: "/study",
    },
    {
        label: "Migrate",
        icon: <Plane size={20} />,
        path: "/migrate",
    },
    {
        label: "Visit",
        icon: <MapPinned size={20} />,
        path: "/visa",
    },
];

const sections = [
    {
        title: "The Visaassist Trust Standard",
        description: "Ethical counselling | Disciplined execution | Clear value.",
        buttons: [
            { label: "Free Consultation", path: "/contact" },
            { label: "Learn More", path: "/about" }
        ],
        image:
            "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop",
        imageLeft: true,
        dark: true,
    },
    {
        title: "Migrate",
        description:
            "Get personalized migration solutions and join the millions. Sign-up today!",
        buttons: [
            { label: "Canada", path: "/visa/canada" },
            { label: "Australia", path: "/visa/australia" }
        ],
        image:
            "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop",
        imageLeft: false,
    },
    {
        title: "Study",
        description: "Discover your career opportunities.",
        buttons: [
            { label: "School Students", path: "/study" },
            { label: "Graduates", path: "/study" },
            { label: "Professional", path: "/study" },
            { label: "Parent", path: "/study" }
        ],
        nextButton: true,
        image:
            "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
        imageLeft: true,
    },
    // {
    //     title: "Work",
    //     description: "Excited to work overseas? Start here...",
    //     buttons: [
    //         { label: "Post Resume", path: "/work" },
    //         { label: "Resume Writing", path: "/work" },
    //         { label: "LinkedIn Optimization", path: "/work" },
    //         { label: "Resume Marketing", path: "/work" },
    //         { label: "Post a Job", path: "/work" },
    //         { label: "Why choose Visaassist?", path: "/about" },
    //     ],
    //     image:
    //         "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    //     imageLeft: false,
    // }
];


const Home = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState("Study");

    const siteSettingsQuery = useQuery({
        queryKey: ["public-site-settings"],
        queryFn: getPublicSiteSettings,
        staleTime: 5 * 60 * 1000,
    });

    const siteSettings = siteSettingsQuery.data?.values || {};
    const homeBannerTitle = siteSettings.homeBannerTitle || "What can we do for you today?";
    const homeBannerSubtitle =
        siteSettings.homeBannerSubtitle ||
        "Choose your goal and let us guide you with the right solution, expert support, and the best next steps for your journey.";
    const homeBannerImageUrl =
        siteSettings.homeBannerImageUrl ||
        "https://res.cloudinary.com/dpgos2eya/image/upload/v1776324559/y-axis/site-settings/thivgp1ue21jgyeqcw5l.png";

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const visaData = [
        {
            country: "Canada",
            image:
                "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1200&auto=format&fit=crop",
            visas: [
                "Visit Visa",
                "Work Visa",
                "Student Visa",
                "Tourist Visa",
                "Business Visa",
            ],
        },
        {
            country: "Australia",
            image:
                "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=1200&auto=format&fit=crop",
            visas: [
                "Visit Visa",
                "Work Visa",
                "Student Visa",
                "Business Visa",
                "B1 / B2",

            ],
        },
        {
            country: "Canada",
            image:
                "https://images.unsplash.com/photo-1723091758834-7bc705d288bd?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            visas: [
                "Japan Visit Visa",
                "Work Visa",
                "Student Visa",
                "Visit Visa",
                "Business Visa",
            ],
        },
        {
            country: "Japan",
            image:
                "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop",
            visas: [
                "Work Visa",
                "Student Visa",
                "Business Visa",
                "Visit Visa",
            ],
        },
        {
            country: "UK",
            image:
                "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop",
            visas: [
                "Australia Visitor Support",
                "Student Visa",
                "Business Visa",
                "Schengen Visa",
                "Visit Visa",
                "Youth Mobility Visa",
            ],
        },
        {
            country: "USA",
            image:
                "https://images.unsplash.com/photo-1657214800744-a2a23450afc9?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            visas: [
                "Canada Visit Visa",
                "Work Visa",
                "Student Visa",
                "UK Visit Visa",
                "Visit Visa",
                "Schengen Visa",
            ],
        },
    ];

    // const stats = [
    //     {
    //         icon: <BadgeCheck size={26} />,
    //         title: "1 Million",
    //         subtitle: "Successful Applicant",
    //     },
    //     {
    //         icon: <Users size={26} />,
    //         title: "10 Million+",
    //         subtitle: "Counselled",
    //     },
    //     {
    //         icon: <UserCheck size={26} />,
    //         title: "Since 1999",
    //         subtitle: "Experts Since 1999",
    //     },
    //     {
    //         icon: <Building2 size={26} />,
    //         title: "50+",
    //         subtitle: "Offices",
    //     },
    // ];

    const stats = [
        {
            icon: <BadgeCheck size={22} />,
            value: "1 Million+",
            label: "Customers Served",
        },
        {
            icon: <Building2 size={22} />,
            value: "40+ Offices",
            label: "Across Multiple Countries",
        },
        {
            icon: <Users size={22} />,
            value: "1500+",
            label: "Employees",
        },
        {
            icon: <Globe2 size={22} />,
            value: "10 Million+",
            label: "Applicants Counselled",
        },
    ];

    return (
        <div>
            <section className="w-full bg-gradient-to-br from-orange-50 via-white to-amber-50 py-8 lg:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
                        {/* Left Image */}
                        <div className="relative">
                            <div className="absolute -top-6 -left-6 w-32 h-32 bg-orange-200/40 rounded-full blur-3xl"></div>
                            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-amber-200/40 rounded-full blur-3xl"></div>

                            <div className="relative rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)] bg-white p-1">
                                <img
                                    src={homeBannerImageUrl}
                                    alt="Consultation"
                                    className="w-full h-[300px] sm:h-[420px] object-fill rounded-xl"
                                />
                            </div>
                        </div>

                        {/* Right Content */}
                        <div className="lg:pl-6">
                            <span className="inline-flex items-center rounded-full bg-orange-100 text-orange-700 px-4 py-1.5 text-sm font-semibold mb-5">
                                Welcome to Our Services
                            </span>

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                                {homeBannerTitle}
                            </h2>

                            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-xl leading-7">
                                {homeBannerSubtitle}
                            </p>

                            {/* Buttons */}
                            <div className="grid grid-cols-3 sm:grid-cols-3 gap-3 lg:gap-4 mt-8">
                                {options.map((item) => (
                                    <button
                                        key={item.label}
                                        onClick={() => {
                                            setActive(item.label);
                                            window.scrollTo(0, 0);
                                            navigate(item.path);
                                        }}
                                        className={`group flex flex-col items-center justify-center gap-2 rounded-2xl border px-2 py-3 lg:px-4 lg:py-5 font-semibold transition-all duration-300 shadow-sm ${active === item.label
                                            ? "bg-gradient-to-r from-orange-500 to-amber-400 text-white border-orange-500 shadow-lg scale-[1.02]"
                                            : "bg-white text-slate-700 border-slate-200 hover:border-orange-300 hover:bg-orange-50"
                                            }`}
                                    >
                                        <span
                                            className={`transition ${active === item.label
                                                ? "text-white"
                                                : "text-orange-500 group-hover:text-orange-600"
                                                }`}
                                        >
                                            {item.icon}
                                        </span>
                                        <span>{item.label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Counselling Card */}
                            {/* <div className="mt-8">
                                <div className="flex items-start gap-4 bg-white border border-orange-100 rounded-xl p-5 sm:p-6 shadow-[0_10px_35px_rgba(15,23,42,0.08)]">
                                    <div className="shrink-0 h-14 w-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-white flex items-center justify-center shadow-md">
                                        <BadgeHelp size={28} />
                                    </div>

                                    <div>
                                        <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                                            Don’t know what to do?
                                        </h3>
                                        <p className="mt-1 text-slate-600 leading-7">
                                            Get free counselling from our experts and discover the best path
                                            for study, migration, work, or travel.
                                        </p>

                                        <button
                                            onClick={() => window.open("https://wa.me/917670800000", "_blank")}
                                            className="mt-4 inline-flex items-center rounded-full bg-slate-900 text-white px-5 py-3 font-medium hover:bg-orange-500 transition"
                                        >
                                            Get Free Counselling
                                        </button>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full bg-gradient-to-br from-slate-50 via-white to-orange-50 py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
                        {/* Left Content */}
                        <div className="xl:col-span-4 xl:sticky xl:top-28">
                            <span className="inline-flex items-center rounded-full bg-orange-100 text-orange-700 px-4 py-1.5 text-sm font-semibold mb-4">
                                Explore Top Destinations
                            </span>

                            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                                Popular Visa
                            </h3>

                            <p className="mt-4 text-slate-600 text-base sm:text-lg leading-7 max-w-lg">
                                Visaassist offers expert guidance and support that increases your
                                chances of visa success.
                            </p>

                            <div className="mt-8 hidden xl:block">
                                <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-[0_15px_40px_rgba(15,23,42,0.08)]">
                                    <h4 className="text-lg font-bold text-slate-900">
                                        Trusted Visa Assistance
                                    </h4>
                                    <p className="mt-2 text-slate-600 leading-7">
                                        Choose your destination and discover the most popular visa
                                        pathways for study, work, migration, and travel.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Cards */}
                        <div className="xl:col-span-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {visaData.map((item, index) => (
                                    <div
                                        key={index}
                                        className="group [perspective:1200px] h-[340px]"
                                    >
                                        <div className="relative h-full w-full rounded-[28px] transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                                            {/* Front Side */}
                                            <div className="absolute inset-0 [backface-visibility:hidden] rounded-[28px] overflow-hidden shadow-[0_18px_50px_rgba(15,23,42,0.14)]">
                                                <img
                                                    src={item.image}
                                                    alt={item.country}
                                                    className="h-full w-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/25 to-transparent" />
                                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                                    <span className="inline-flex rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-medium text-white border border-white/20 mb-3">
                                                        Popular Destination
                                                    </span>
                                                    <h4 className="text-2xl font-extrabold text-white">
                                                        {item.country}
                                                    </h4>
                                                    <p className="mt-2 text-sm text-white/85">
                                                        Hover to explore visa options
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Back Side */}
                                            <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-[28px] bg-white border border-slate-200 shadow-[0_18px_50px_rgba(15,23,42,0.12)] p-6 flex flex-col">
                                                <div className="mb-4">
                                                    <h4 className="text-2xl font-extrabold text-slate-900">
                                                        {item.country}
                                                    </h4>
                                                    <p className="text-sm text-slate-500 mt-1">
                                                        Popular visa categories
                                                    </p>
                                                </div>

                                                <div className="space-y-3 overflow-y-auto pr-1 custom-scroll">
                                                    {item.visas.map((visa, visaIndex) => (
                                                        <div
                                                            key={visaIndex}
                                                            className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 hover:bg-orange-50 hover:border-orange-200 transition"
                                                        >
                                                            <span className="text-sm font-medium text-slate-700">
                                                                {visa}
                                                            </span>
                                                            <ArrowRight
                                                                size={16}
                                                                className="text-orange-500 shrink-0"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <style>{`
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.5);
          border-radius: 999px;
        }
      `}</style>
            </section>

            <section className="w-full bg-gradient-to-b from-white via-slate-50 to-orange-50 py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 lg:space-y-10">
                    {sections.map((section, index) => (
                        <div
                            key={index}
                            className={`grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-xl border shadow-[0_20px_60px_rgba(15,23,42,0.08)] ${section.dark
                                ? "bg-slate-950 border-slate-900"
                                : "bg-white border-slate-200"
                                }`}
                        >
                            {/* Image Left */}
                            {section.imageLeft && (
                                <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-full">
                                    <img
                                        src={section.image}
                                        alt={section.title}
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/40 via-transparent to-transparent" />
                                </div>
                            )}

                            {/* Content */}
                            <div
                                className={`flex flex-col justify-center p-6 sm:p-8 lg:p-10 xl:p-12 ${section.dark ? "text-white" : "text-slate-900"
                                    }`}
                            >
                                <div className="max-w-xl">
                                    <span
                                        className={`inline-flex rounded-full px-4 py-1.5 text-sm font-semibold mb-5 ${section.dark
                                            ? "bg-white/10 text-white border border-white/10"
                                            : "bg-orange-100 text-orange-700"
                                            }`}
                                    >
                                        Featured Service
                                    </span>

                                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
                                        {section.title}
                                    </h3>

                                    <p
                                        className={`mt-4 text-base sm:text-lg leading-7 ${section.dark ? "text-white/80" : "text-slate-600"
                                            }`}
                                    >
                                        {section.description}
                                    </p>

                                    <div className="mt-7 flex flex-wrap gap-3">
                                        {section.buttons.map((button, btnIndex) => (
                                            <button
                                                key={btnIndex}
                                                onClick={() => {
                                                    window.scrollTo(0, 0);
                                                    button.path && navigate(button.path);
                                                }}
                                                className={`rounded-full px-5 py-3 text-sm sm:text-base font-semibold transition-all duration-300 ${section.dark
                                                    ? "bg-white text-slate-950 hover:bg-orange-400 hover:text-slate-950"
                                                    : "bg-slate-100 text-slate-800 hover:bg-orange-500 hover:text-white"
                                                    } shadow-sm hover:scale-[1.02]`}
                                            >
                                                {button.label}
                                            </button>
                                        ))}

                                        {section.nextButton && (
                                            <button
                                                onClick={() => {
                                                    window.scrollTo(0, 0);
                                                    navigate("/study");
                                                }}
                                                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-5 py-3 text-sm sm:text-base font-semibold text-slate-950 shadow-md hover:scale-[1.02] transition-all duration-300"
                                            >
                                                Next
                                                <ArrowRight size={18} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Image Right */}
                            {!section.imageLeft && (
                                <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-full">
                                    <img
                                        src={section.image}
                                        alt={section.title}
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-tl from-slate-950/40 via-transparent to-transparent" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <section className="w-full bg-gradient-to-br from-slate-50 via-white to-orange-50 py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                        {/* Left Content */}
                        <div>
                            <span className="inline-flex items-center rounded-full bg-orange-100 text-orange-700 px-4 py-1.5 text-sm font-semibold mb-4">
                                Why People Trust Us
                            </span>

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                                Why choose Visaassist
                            </h2>

                            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-7 max-w-xl">
                                Trusted by millions for expert guidance, proven results, and
                                long-term support for study, migration, work, and global
                                opportunities.
                            </p>

                            {/* Mini Cards */}
                            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {stats.map((item, index) => (
                                    <div
                                        key={index}
                                        className="group rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.07)] hover:shadow-[0_18px_45px_rgba(15,23,42,0.12)] hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-white flex items-center  justify-center shadow-md group-hover:scale-105 transition">
                                                {item.icon}
                                            </div>

                                            <div>
                                                <h3 className="text-xl font-extrabold text-slate-900">
                                                    {item.value}
                                                </h3>
                                                <p className="mt-1 text-sm sm:text-base text-slate-600 font-medium leading-6">
                                                    {item.label}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="relative">
                            <div className="absolute -top-6 -left-6 w-28 h-28 bg-orange-200/40 rounded-full blur-3xl"></div>
                            <div className="absolute -bottom-8 -right-8 w-36 h-36 bg-amber-200/40 rounded-full blur-3xl"></div>

                            <div className="relative rounded-xl overflow-hidden bg-white p-1 shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
                                <img
                                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop"
                                    alt="Why Choose Y-Axis"
                                    className="w-full h-[320px] sm:h-[420px] lg:h-[520px] object-cover rounded-xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full bg-gradient-to-br from-white via-slate-50 to-orange-50 py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">

                    {/* Heading */}
                    <div className="mb-10 lg:mb-14 text-center">
                        <span className="inline-flex rounded-full bg-orange-100 text-orange-700 px-4 py-1.5 text-sm font-semibold mb-4">
                            Stay Updated
                        </span>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
                            Latest Update
                        </h2>
                    </div>

                    {/* Main Grid */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-center items-center lg:ml-80">

                        {/* News Card */}
                        <div className="mx-auto w-full max-w-[380px]">
                            <div className="rounded-[28px] overflow-hidden border border-slate-200 bg-white shadow-[0_15px_45px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_55px_rgba(15,23,42,0.12)] transition-all duration-300">

                                <div className="relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop"
                                        alt="News"
                                        className="w-full h-[240px] object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                                    <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow">
                                        News
                                    </span>
                                </div>

                                <div className="p-6 text-center">
                                    <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide">
                                        News
                                    </p>

                                    <p className="mt-3 text-slate-700 leading-7 text-base">
                                        Canada Introduces Eight Major Immigration Changes from April 1,
                                        Impacting PR Applicants and Newcomers.
                                    </p>

                                    <h4 className="mt-4 text-xl font-bold text-slate-900 leading-snug">
                                        Highlights: Canada Announces Changes
                                    </h4>

                                    <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-white font-semibold hover:bg-orange-500 transition-all duration-300">
                                        See All News
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Blog Card */}
                        <div className="mx-auto w-full max-w-[380px]">
                            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_15px_45px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_55px_rgba(15,23,42,0.12)] transition-all duration-300 flex flex-col">

                                <div className="text-center mb-5">
                                    <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide">
                                        Blog
                                    </p>
                                    <h3 className="text-2xl font-bold text-slate-900 mt-1">
                                        Featured Blogs
                                    </h3>
                                </div>

                                <div className="space-y-4 flex-1">
                                    <div className="group rounded-[22px] overflow-hidden relative">
                                        <img
                                            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop"
                                            alt="Blog 1"
                                            className="w-full h-[200px] object-cover group-hover:scale-105 transition duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <p className="text-white font-semibold text-lg text-center">
                                                Global visa guidance for your future
                                            </p>
                                        </div>
                                    </div>

                                    <div className="group rounded-[22px] overflow-hidden relative">
                                        <img
                                            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop"
                                            alt="Blog 2"
                                            className="w-full h-[200px] object-cover group-hover:scale-105 transition duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <p className="text-white font-semibold text-lg text-center">
                                                Explore opportunities abroad
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <button className="mt-5 mx-auto inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-white font-semibold hover:bg-slate-900 transition-all duration-300">
                                    See All Blogs
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className="w-full bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950 py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-[34px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.28)]">
                        <div className="grid grid-cols-1 lg:grid-cols-12">
                            {/* Left Content */}
                            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-12 xl:p-14">
                                <span className="inline-flex items-center rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-1.5 text-sm font-semibold text-orange-300 mb-5">
                                    Trusted Immigration Guidance
                                </span>

                                <h3 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-white leading-tight">
                                    India&apos;s No.1 Immigration &amp; Study Visa Consultant
                                </h3>

                                <p className="mt-6 text-sm sm:text-base lg:text-lg leading-8 text-slate-300">
                                    Visaassist is India&apos;s No.1 Overseas Career and Immigration
                                    Consultant, and presumably the world&apos;s largest B2C
                                    immigration consulting firm, established in 1999. With 40+
                                    company-owned and managed offices across India, the United Arab
                                    Emirates, the United Kingdom, Australia, and Canada, and a team
                                    of 1500+ employees, Visaassist has served over 1 million customers
                                    as a trusted immigration consultant.
                                </p>

                                <p className="mt-5 text-sm sm:text-base lg:text-lg leading-8 text-slate-300">
                                    The firm provides end-to-end guidance for Canada PR (Express
                                    Entry, PNP), Australia PR (Subclass 189/190), UK Skilled Worker
                                    Visa, Germany Opportunity Card, and study visas, having
                                    counselled over 10 million applicants. Visaassist is a Licensed
                                    Recruitment Agent in India and also an IATA travel agent,
                                    offering personalized one-on-one immigration consulting and
                                    counseling to over 1,00,000 individual inquiries every month.
                                </p>

                                <p className="mt-5 text-sm sm:text-base lg:text-lg leading-8 text-slate-300">
                                    Over 50% of its customers come through word-of-mouth, reflecting
                                    strong client trust in our immigration consultant services. No
                                    other immigration consultant understands overseas careers as
                                    Visaassist does.
                                </p>

                                <div className="mt-8 flex flex-wrap gap-3">
                                    <button
                                        onClick={() => window.open("https://wa.me/917670800000", "_blank")}
                                        className="rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-3 text-sm sm:text-base font-semibold text-slate-950 shadow-lg hover:scale-[1.02] transition-all duration-300"
                                    >
                                        Book Free Consultation
                                    </button>
                                    <button
                                        onClick={() => {
                                            window.scrollTo(0, 0);
                                            navigate("/about");
                                        }}
                                        className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm sm:text-base font-semibold text-white hover:bg-white/10 transition-all duration-300"
                                    >
                                        Learn More
                                    </button>
                                </div>
                            </div>

                            {/* Right Side */}
                            <div className="lg:col-span-5 relative border-t lg:border-t-0 lg:border-l border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 sm:p-8 lg:p-10">
                                <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-orange-400/10 blur-3xl"></div>
                                <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-amber-300/10 blur-3xl"></div>

                                <div className="relative">
                                    <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 sm:p-6">
                                        <h4 className="text-2xl font-bold text-white">
                                            Why clients trust Visaassist
                                        </h4>
                                        <p className="mt-3 text-slate-300 leading-7">
                                            A trusted global presence, one-to-one counselling, proven
                                            immigration expertise, and decades of successful client
                                            outcomes.
                                        </p>
                                    </div>

                                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                                        {stats.map((item, index) => (
                                            <div
                                                key={index}
                                                className="rounded-[24px] border border-white/10 bg-white/5 p-5 text-center sm:text-left flex flex-col items-center sm:items-start hover:bg-white/10 transition-all duration-300"
                                            >
                                                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-slate-950 flex items-center justify-center  shadow-md">
                                                    {item.icon}
                                                </div>
                                                <h5 className="mt-4 text-xl font-extrabold text-white">
                                                    {item.value}
                                                </h5>
                                                <p className="mt-1 text-sm text-slate-300 leading-6">
                                                    {item.label}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 rounded-[28px] border border-orange-400/20 bg-gradient-to-r from-orange-500/10 to-amber-400/10 p-6">
                                        <h5 className="text-lg font-bold text-white">
                                            Personalized Immigration Support
                                        </h5>
                                        <p className="mt-2 text-slate-300 leading-7">
                                            Get complete guidance for PR, study, work, and visit visas
                                            from experienced consultants who understand your overseas
                                            career goals.
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
    );
};

export default Home;