import React, { useEffect, useState } from 'react'
import { ArrowRight, Briefcase, GraduationCap, HeartHandshake, Plane, Users } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { getPublicCountries, getPublicVisaTypesByCountry } from "../../../user/api/publicApi";

const FALLBACK_VISA_ITEMS = [
    {
        id: 0,
        name: "Canada",
        slug: "canada",
        image: "https://thumbs.dreamstime.com/b/canadian-flag-vancouver-skyscrapers-background-48534349.jpg",
        description:
            "Canada welcomes global applicants with quality education, jobs, and strong settlement opportunities.",
        defaultVisaType: "visitor",
    },
    {
        id: 1,
        name: "Australia",
        slug: "australia",
        image: "https://img.freepik.com/premium-photo/flag-flying-city-with-words-union-it_514619-5546.jpg?w=360",
        description:
            "Live, work, or study in Australia with structured visa pathways and strong quality-of-life outcomes.",
        defaultVisaType: "visitor",
    },
    {
        id: 2,
        name: "USA",
        slug: "usa",
        image: "https://www.shutterstock.com/image-photo/manhattan-new-york-sunny-skyline-600nw-2611716607.jpg",
        description:
            "Explore business, student, and dependent visa opportunities with end-to-end visa application guidance.",
        defaultVisaType: "f1",
    },
];

const Visa = () => {
    const [visaItems, setVisaItems] = useState(FALLBACK_VISA_ITEMS);

    const visaCategories = [
        {
            title: "Tourist Visa",
            description: "Explore destinations for leisure, travel, and short stays.",
            icon: <Plane size={30} />,
            color: "from-purple-200 to-white",
            border: "border-purple-100",
            bubble: "bg-purple-100",
            iconBg: "bg-purple-600",
        },
        {
            title: "Visitor Visa",
            description: "Visit family, attend short trips, or personal travel plans.",
            icon: <Users size={30} />,
            color: "from-indigo-100 to-white",
            border: "border-indigo-100",
            bubble: "bg-indigo-100",
            iconBg: "bg-indigo-600",
        },
        {
            title: "Student Visa",
            description: "Study abroad with structured guidance and documentation support.",
            icon: <GraduationCap size={30} />,
            color: "from-sky-100 to-white",
            border: "border-sky-100",
            bubble: "bg-sky-100",
            iconBg: "bg-sky-600",
        },
        {
            title: "Business Visa",
            description: "Travel for meetings, conferences, and professional activities.",
            icon: <Briefcase size={30} />,
            color: "from-blue-100 to-white",
            border: "border-blue-100",
            bubble: "bg-blue-100",
            iconBg: "bg-blue-600",
        },
        {
            title: "Dependent Visa",
            description: "Join your spouse or family members living abroad.",
            icon: <HeartHandshake size={30} />,
            color: "from-rose-100 to-white",
            border: "border-rose-100",
            bubble: "bg-rose-100",
            iconBg: "bg-rose-600",
        },
    ];

    const navigate = useNavigate();

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        let mounted = true;

        const loadCountries = async () => {
            try {
                const countries = await getPublicCountries();
                if (!Array.isArray(countries) || countries.length === 0 || !mounted) {
                    return;
                }

                const mapped = await Promise.all(
                    countries.map(async (countryItem, index) => {
                        let firstVisaType = null;
                        try {
                            const visaTypes = await getPublicVisaTypesByCountry(countryItem.slug);
                            firstVisaType = Array.isArray(visaTypes) ? visaTypes[0] : null;
                        } catch (_error) {
                            firstVisaType = null;
                        }

                        return {
                            id: index,
                            name: countryItem.name,
                            slug: countryItem.slug,
                            image: countryItem.heroImage || countryItem.flagImage || FALLBACK_VISA_ITEMS[index % FALLBACK_VISA_ITEMS.length].image,
                            description: countryItem.description || `Explore ${countryItem.name} visa opportunities with expert support.`,
                            defaultVisaType: firstVisaType?.visaTypeSlug || null,
                        };
                    })
                );

                if (mounted) {
                    setVisaItems(mapped);
                    setActiveIndex(0);
                }
            } catch (_error) {
                // Keep fallback content if API call fails.
            }
        };

        loadCountries();

        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        if (!visaItems.length) {
            return undefined;
        }

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % visaItems.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [visaItems.length]);

    return (
        <div className="min-h-screen bg-[#f3f3f3]">
            <section className="w-full h-screen bg-[#f3efea]">
                <div className="w-full h-[85vh] px-4 md:px-8 lg:px-12 xl:px-16">

                    <div className="grid h-full grid-cols-1 items-center lg:grid-cols-2">

                        {/* Left Content */}
                        <div className="flex items-center">
                            <div className="max-w-2xl">

                                <span className="inline-block rounded-md bg-[#f2653a] px-5 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-white">
                                    Your Path to New Beginnings
                                </span>

                                <h1 className="mt-6 text-3xl font-extrabold leading-tight text-[#1f252d] sm:text-4xl md:text-5xl lg:text-5xl">
                                    Visas Done Right. The First Time. Every Time.
                                </h1>

                                <p className="mt-6 text-base leading-7 text-[#4b5563] md:text-lg">
                                    Trusted by millions, Visaassist ensures a smooth, accurate, and
                                    end-to-end visa process for every journey.
                                </p>

                                {/* ✅ CTA BUTTONS */}
                                <div className="mt-6 flex flex-wrap gap-4">

                                    {/* Primary CTA */}
                                    <button
                                        onClick={() => navigate("/contact")} // OR /apply/general
                                        className="inline-flex items-center gap-2 bg-[#f2653a] px-6 py-3 text-base font-semibold text-white rounded-full shadow hover:opacity-90 transition"
                                    >
                                        Contact Us
                                    </button>

                                    {/* Secondary CTA */}
                                    <button
                                        onClick={() => {
                                            document.getElementById("countries")?.scrollIntoView({
                                                behavior: "smooth",
                                            });
                                        }}
                                        className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 text-base font-semibold text-[#1f252d] rounded-full hover:bg-gray-100 transition"
                                    >
                                        Explore Countries
                                    </button>

                                </div>

                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="flex h-full items-end justify-center lg:justify-end">
                            <img
                                src="https://images.unsplash.com/photo-1573496799515-eebbb63814f2?q=80&w=1200&auto=format&fit=crop"
                                alt="Visa professional"
                                className="h-[90%] w-auto object-contain"
                            />
                        </div>

                    </div>
                </div>
            </section>

            <section className="py-20 bg-gradient-to-b from-white to-blue-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">
                        WHY CHOOSE US
                    </h2>

                    <p className="text-3xl md:text-4xl lg:text-5xl text-gray-900 font-extrabold max-w-4xl mx-auto leading-tight">
                        Trusted Visa Support Built on <br /> Clarity, Accuracy, and Care
                    </p>

                    <p className="mt-6 text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Visaassist helps you move forward with ethical guidance, accurate document
                        preparation, proactive communication, and a checklist-based workflow
                        designed to reduce avoidable errors.
                    </p>

                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Card 1 */}
                        <div className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition duration-300 border border-gray-100">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z"></path>
                                    <path d="M9.5 12.5l1.5 1.5 3.5-3.5"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">
                                Ethical Guidance
                            </h3>
                            <p className="text-gray-600 text-sm leading-6">
                                We recommend the right path with honest advice, clear expectations,
                                and realistic guidance for your visa journey.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition duration-300 border border-gray-100">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M9 12h6"></path>
                                    <path d="M9 16h6"></path>
                                    <path d="M9 8h6"></path>
                                    <path d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">
                                Document Accuracy
                            </h3>
                            <p className="text-gray-600 text-sm leading-6">
                                We focus on careful document preparation and review to help reduce
                                mistakes, missing details, and avoidable delays.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition duration-300 border border-gray-100">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">
                                Proactive Updates
                            </h3>
                            <p className="text-gray-600 text-sm leading-6">
                                You receive timely milestone-based communication, so you stay informed
                                without having to chase for updates.
                            </p>
                        </div>

                        {/* Card 4 */}
                        <div className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition duration-300 border border-gray-100">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M9 11l3 3L22 4"></path>
                                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">
                                Checklist-Based Workflow
                            </h3>
                            <p className="text-gray-600 text-sm leading-6">
                                Our structured process uses clear checklists and step-by-step review
                                to make your application journey smoother and more organized.
                            </p>
                        </div>
                    </div>

                    <div className="mt-14">
                        <button
                            onClick={() => navigate("/contact")}
                            className="px-8 py-4 rounded-full bg-[#f2653a] text-white text-lg font-semibold shadow-lg hover:opacity-90 hover:scale-105 transition duration-300"
                        >
                            Speak to an Expert
                        </button>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-[#e7dccb]">
                <div className="max-w-[1700px] mx-auto px-6 lg:px-10">
                    <div className="text-center mb-12">
                        <p className="text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-gray-700 mb-3">
                            Visaassist Global Passport
                        </p>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                            Specialised Visa Services for the Big 5 Visas
                        </h2>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6 overflow-hidden">
                        {visaItems.map((item, index) => {
                            const isActive = index === activeIndex;

                            return (
                                <div
                                    key={item.id}
                                    onClick={() => setActiveIndex(index)}
                                    className={`relative group h-[520px] rounded-none overflow-hidden transition-all duration-700 ease-in-out cursor-pointer ${isActive ? "lg:w-[32%] w-full" : "lg:w-[17%] w-full"
                                        }`}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />

                                    <div
                                        className={`absolute inset-0 transition-all duration-500 ${isActive
                                            ? "bg-gradient-to-r from-black/65 via-black/35 to-transparent"
                                            : "bg-black/10 group-hover:bg-black/20"
                                            }`}
                                    />

                                    {!isActive && (
                                        <div className="absolute inset-0 border border-white/20" />
                                    )}

                                    {isActive ? (
                                        <div className="absolute inset-0 flex items-end">
                                            <div className="w-full p-8 md:p-10 text-left">
                                                <h3 className="text-white text-3xl md:text-4xl font-bold mb-4">
                                                    {item.name}
                                                </h3>
                                                <p className="text-white/90 text-lg leading-relaxed max-w-xl mb-8">
                                                    {item.description}
                                                </p>

                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();

                                                        // 👇 scroll to top
                                                        window.scrollTo({
                                                            top: 0,
                                                            behavior: "smooth", // optional
                                                        });

                                                        // 👇 navigate
                                                        if (item.defaultVisaType) {
                                                            navigate(`/visa/${item.slug}/${item.defaultVisaType}`);
                                                        } else {
                                                            navigate(`/visa/${item.slug}`);
                                                        }
                                                    }}
                                                    className="inline-flex items-center gap-3 px-7 py-3 rounded-full border border-white text-white text-lg font-medium hover:bg-white hover:text-gray-900 transition"
                                                >
                                                    Apply now
                                                    <span className="text-xl">→</span>
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                                            <div className="w-3 h-3 rounded-full bg-white/80" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Visa category */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <p className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-600 mb-3">
                            Visa Category
                        </p>
                        <h4 className="text-3xl md:text-5xl font-extrabold text-gray-900">
                            Discover the Right Visa for Your Journey
                        </h4>
                        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                            Choose the visa path that matches your goals with clarity, confidence,
                            and structured support.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-8">
                        {visaCategories.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => navigate("/contact")}
                                className={`group relative cursor-pointer bg-gradient-to-br ${item.color} border ${item.border} rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden`}
                            >
                                <div
                                    className={`absolute top-0 right-0 w-28 h-28 ${item.bubble} rounded-full blur-3xl opacity-60 transition-all duration-500 group-hover:scale-125`}
                                ></div>

                                <div className="relative">
                                    <div
                                        className={`w-16 h-16 rounded-2xl ${item.iconBg} text-white flex items-center justify-center shadow-lg mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}
                                    >
                                        {item.icon}
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 transition-colors duration-300 group-hover:text-[#f2653a]">
                                        {item.title}
                                    </h3>

                                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                        {item.description}
                                    </p>

                                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#f2653a] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                        Learn More
                                        <ArrowRight size={16} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* our service */}
            <section className="py-20 bg-gradient-to-b from-[#f8fbff] to-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <p className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-600 mb-3">
                            Our Services
                        </p>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
                            Expert Visa Services for a Smooth Journey
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                            From expert consultation to final submission support, we guide you through every step with clarity, care, and confidence.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

                        {/* Card 1 */}
                        <div className="group bg-white border border-blue-100 rounded-3xl p-7 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                            <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition">
                                <img src="https://www.y-axis.com/lp/visa/images/vc.png" alt="" w-18 h-18 />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Visa Consultation</h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Expert guidance to help you choose the right visa and ensure a smooth application process.
                            </p>
                            <a href="#" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all">
                                Learn More <span>→</span>
                            </a>
                        </div>

                        {/* Card 2 */}
                        <div className="group bg-white border border-indigo-100 rounded-3xl p-7 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                            <div className="w-20 h-20 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition">
                                <img src="https://www.y-axis.com/lp/visa/images/dr.png" alt="" w-18 h-18 />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Visa Review</h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Ensure all your documents are accurate and complete to avoid delays and rejections.
                            </p>
                            <a href="#" className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:gap-3 transition-all">
                                Learn More <span>→</span>
                            </a>
                        </div>

                        {/* Card 3 */}
                        <div className="group bg-white border border-sky-100 rounded-3xl p-7 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                            <div className="w-20 h-20 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center mb-6 group-hover:bg-sky-600 group-hover:text-white transition">
                                <img src="https://www.y-axis.com/lp/visa/images/aa.png" alt="" h-18 w-18 />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Application Assistance</h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Step-by-step support to complete and submit your application with precision and confidence.
                            </p>
                            <a href="#" className="inline-flex items-center gap-2 text-sky-600 font-semibold hover:gap-3 transition-all">
                                Learn More <span>→</span>
                            </a>
                        </div>

                        {/* Card 4 */}
                        <div className="group bg-white border border-purple-100 rounded-3xl p-7 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                            <div className="w-20 h-20 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition">
                                <img src="https://www.y-axis.com/lp/visa/images/ip.png" alt="" w-18 h-18 />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Interview Preparation</h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Prepare for visa interviews with tailored tips and mock sessions to boost your confidence.
                            </p>
                            <a href="#" className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:gap-3 transition-all">
                                Learn More <span>→</span>
                            </a>
                        </div>

                        {/* Card 5 */}
                        <div className="group bg-white border border-emerald-100 rounded-3xl p-7 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition">
                                <img src="https://www.y-axis.com/lp/visa/images/pss.png" alt="" w-18 h-18 />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Submission Support</h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Stay informed and supported throughout the waiting process, with updates and advice if needed.
                            </p>
                            <a href="#" className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:gap-3 transition-all">
                                Learn More <span>→</span>
                            </a>
                        </div>

                    </div>
                </div>
            </section>

            <section className="py-20 bg-gradient-to-b from-[#f8fbff] to-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">

                        {/* Left Content */}
                        <div className="lg:sticky lg:top-24">
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-6">
                                <span>Contact Information</span>
                                <span className="text-lg">↗</span>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                                Connect with Our Visa Experts Today
                            </h2>

                            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-xl">
                                Share your details and our expert team will help you choose the right visa path, guide you through the process, and support you at every step.
                            </p>

                            <div className="space-y-5">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 012.08 4.18 2 2 0 014.06 2h3a2 2 0 012 1.72c.12.9.33 1.78.63 2.62a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.46-1.18a2 2 0 012.11-.45c.84.3 1.72.51 2.62.63A2 2 0 0122 16.92z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">Quick Assistance</h3>
                                        <p className="text-gray-600">Our visa specialists connect with you to understand your case and recommend the right next step.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">Personalized Guidance</h3>
                                        <p className="text-gray-600">Get help based on your visa category, destination, age profile, and application background.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M9 12l2 2 4-4"></path>
                                            <path d="M21 12c0 4.97-4.03 9-9 9S3 16.97 3 12 7.03 3 12 3s9 4.03 9 9z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">Trusted Support</h3>
                                        <p className="text-gray-600">From initial consultation to visa submission, we help keep your journey smooth and stress-free.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Form */}
                        <div className="bg-white border border-gray-100 rounded-[32px] shadow-2xl p-6 md:p-8 lg:p-10">
                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            className="w-full h-14 px-4 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            className="w-full h-14 px-4 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                                            Country Code
                                        </label>
                                        <select className="w-full h-14 px-4 rounded-2xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition">
                                            <option>IND (+91)</option>
                                            <option>USA (+1)</option>
                                            <option>UK (+44)</option>
                                            <option>UAE (+971)</option>
                                            <option>AUS (+61)</option>
                                            <option>CAN (+1)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            placeholder="Phone Number"
                                            className="w-full h-14 px-4 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            className="w-full h-14 px-4 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                                            Age
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="Your Age"
                                            className="w-full h-14 px-4 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                                            Prior Refusal
                                        </label>
                                        <select className="w-full h-14 px-4 rounded-2xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition">
                                            <option>Select</option>
                                            <option>Yes</option>
                                            <option>No</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                                            Co-Applicant
                                        </label>
                                        <select className="w-full h-14 px-4 rounded-2xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition">
                                            <option>Select</option>
                                            <option>Yes</option>
                                            <option>No</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                                            Number of Co-Applicants
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="Number of Co-Applicants"
                                            className="w-full h-14 px-4 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                                            Country of Interest
                                        </label>
                                        <select className="w-full h-14 px-4 rounded-2xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition">
                                            <option>Select Country</option>
                                            <option>Canada</option>
                                            <option>Australia</option>
                                            <option>UK</option>
                                            <option>USA</option>
                                            <option>Schengen</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                                        Visa Category
                                    </label>
                                    <select className="w-full h-14 px-4 rounded-2xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition">
                                        <option>Select Visa type</option>
                                        <option>Business Visa</option>
                                        <option>Work Visa</option>
                                        <option>Student Visa</option>
                                        <option>Tourist Visa</option>
                                    </select>
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        className="w-full md:w-auto px-8 py-4 rounded-full bg-blue-600 text-white text-lg font-semibold shadow-lg hover:bg-blue-700 hover:scale-[1.02] transition duration-300"
                                    >
                                        Submit Inquiry
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default Visa