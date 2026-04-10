import React from "react";
import { useNavigate } from "react-router-dom";
import { Scale, ShieldCheck, CheckCircle2, BellRing, BadgeCheck, FileCheck, NotepadText, AlarmClock, Check, Target, AlertTriangle, ArrowRight } from "lucide-react";

const About = () => {
    const navigate = useNavigate();

    const promises = [
        {
            title: "Ethical counselling",
            subtitle: "Always",
            icon: <Scale size={20} />,
        },
        {
            title: "Clarity",
            subtitle: "Before you pay",
            icon: <ShieldCheck size={20} />,
        },
        {
            title: "Quality-controlled",
            subtitle: "Execution",
            icon: <CheckCircle2 size={20} />,
        },
        {
            title: "No chasing",
            subtitle: "Proactive updates",
            icon: <BellRing size={20} />,
        },
        {
            title: "Fair resolution",
            subtitle: "If we fall short",
            icon: <BadgeCheck size={20} />,
        },
    ];

    const trustPromises = [
        {
            number: "1",
            title: "Ethical Counselling — Always",
            description:
                "We recommend the right path for you, with clear trade-offs and risks—so you can decide with confidence.",
            receive: "A written counselling summary for applicable services.",
            icon: <Scale size={24} />,
        },
        {
            number: "2",
            title: "Clarity Before You Commit",
            description:
                "Before you pay, you will know the scope, timelines, fees, exclusions, and responsibilities in writing.",
            receive: "Scope-of-work confirmation + timeline and next steps.",
            icon: <FileCheck size={24} />,
        },
        {
            number: "3",
            title: "Quality-Controlled Execution",
            description:
                "We use defined checklists and reviews for critical deliverables to reduce avoidable errors and rework.",
            receive: "Structured document guidance and quality checks (where applicable).",
            icon: <ShieldCheck size={24} />,
        },
        {
            number: "4",
            title: "Proactive Updates (No Chasing)",
            description:
                "You'll get milestone-based updates and clear next steps, so you don't have to chase for status.",
            receive: "Proactive communication at key milestones.",
            icon: <BellRing size={24} />,
        },
        {
            number: "5",
            title: "Fair Resolution If We Fall Short",
            description:
                "If we miss defined service standards, we respond with accountability and a corrective plan—priority handling or rework where applicable.",
            receive: "Clear ownership, timelines, and a written resolution plan.",
            icon: <BadgeCheck size={24} />,
        },
    ];

    const serviceStandards = [
        {
            icon: <NotepadText size={28} />,
            title: "Clear Scope & Next Steps",
            subtitle: "Before commitment",
            description:
                "We explain the service scope, process flow, and next actions clearly so you know what comes next before moving forward.",
        },
        {
            icon: <AlarmClock size={28} />,
            title: "Timely Responses",
            subtitle: "Proactive milestone updates",
            description:
                "You receive timely communication and milestone-based updates, helping you stay informed without unnecessary follow-up.",
        },
        {
            icon: <Check size={28} />,
            title: "Quality Checks",
            subtitle: "Before critical submissions",
            description:
                "Important application stages are reviewed carefully to reduce avoidable errors and improve documentation quality.",
        },
        {
            icon: <Target size={28} />,
            title: "Clear Escalation Path",
            subtitle: "If you have a concern",
            description:
                "If any issue arises, there is a clear escalation path so your concern is acknowledged, addressed, and resolved responsibly.",
        },
    ];

    

    return (
        <div>
            <section className="w-full bg-gradient-to-br from-[#eef6ff] via-white to-[#fdf4ec] py-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">

                    <div className="grid lg:grid-cols-2 gap-10 items-center">

                        {/* LEFT */}
                        <div>
                            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                                The Visaassist Trust Promises
                            </h2>

                            <p className="mt-3 text-lg font-semibold text-gray-700">
                                Ethical counselling | Disciplined execution | Clear value
                            </p>

                            <p className="mt-5 text-gray-600 leading-7">
                                At Visaassist, trust is the foundation of every interaction. We believe in
                                ethical counselling, transparent processes, and high-quality execution
                                that puts your interests first.
                            </p>

                            <p className="mt-3 text-gray-600 leading-7">
                                We don’t promise outcomes we can’t control, but we do commit to a
                                disciplined, transparent process that helps you move forward with confidence.
                            </p>

                            <button
                                onClick={() => navigate("/contact")}
                                className="mt-6 inline-flex items-center gap-2 bg-[#f2653a] px-6 py-3 rounded-full text-white font-semibold hover:opacity-90 transition"
                            >
                                Start Application
                                <ArrowRight size={18} />
                            </button>
                        </div>

                        {/* RIGHT */}
                        <div className="grid grid-cols-2 gap-4">
                            {promises.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition"
                                >
                                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-orange-100 text-orange-600 mb-3">
                                        {item.icon}
                                    </div>

                                    <h3 className="text-sm font-bold text-gray-900">
                                        {item.title}
                                    </h3>

                                    <p className="text-xs text-orange-600 font-semibold">
                                        {item.subtitle}
                                    </p>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-gradient-to-br from-[#fff7f2] via-white to-[#eef6ff] py-20">
                <div className="absolute top-0 left-0 w-56 h-56 bg-orange-100/50 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-100/50 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <span className="inline-flex items-center rounded-full bg-orange-100 text-orange-700 px-4 py-2 text-sm font-semibold">
                            Our 5 Trust Promises
                        </span>

                        <h2 className="mt-5 text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                            Built on Trust. Delivered with Discipline.
                        </h2>

                        <p className="mt-5 text-lg text-gray-600 leading-8">
                            We believe every client deserves honest advice, clear expectations,
                            quality execution, timely updates, and accountability at every step.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">
                        {trustPromises.map((item, index) => (
                            <div
                                key={index}
                                className="group relative rounded-[28px] border border-white/60 bg-white/90 backdrop-blur-sm p-7 shadow-[0_12px_40px_rgba(15,23,42,0.08)] hover:shadow-[0_18px_50px_rgba(15,23,42,0.14)] hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition">
                                        {item.icon}
                                    </div>

                                    <div className="text-5xl font-extrabold text-gray-100 leading-none">
                                        {item.number}
                                    </div>
                                </div>

                                <h3 className="mt-6 text-xl font-bold text-gray-900 leading-snug">
                                    {item.title}
                                </h3>

                                <p className="mt-4 text-gray-600 leading-7 text-sm md:text-base">
                                    {item.description}
                                </p>

                                <div className="mt-6 rounded-2xl bg-gradient-to-r from-orange-50 to-blue-50 border border-orange-100 p-4">
                                    <p className="text-sm font-semibold text-gray-900">
                                        What you'll receive:
                                    </p>
                                    <p className="mt-2 text-sm text-gray-600 leading-6">
                                        {item.receive}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-gradient-to-br from-[#f8fbff] via-white to-[#fff7f2] py-20">
                <div className="absolute top-0 left-0 w-56 h-56 rounded-full bg-blue-100/40 blur-3xl" />
                <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-orange-100/40 blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <span className="inline-flex rounded-full bg-blue-100 text-blue-700 px-4 py-2 text-sm font-semibold">
                            Our Service Standards
                        </span>

                        <h2 className="mt-5 text-3xl md:text-5xl font-extrabold text-gray-900">
                            What You Can Expect
                        </h2>

                        <p className="mt-5 text-lg text-gray-600 leading-8">
                            We focus on clarity, accountability, quality, and structured support
                            so every client experience feels professional and reliable.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-7">
                        {serviceStandards.map((item, index) => (
                            <div
                                key={index}
                                className="group rounded-[28px] border border-white/70 bg-white/90 backdrop-blur-sm p-7 shadow-[0_12px_40px_rgba(15,23,42,0.08)] hover:shadow-[0_18px_50px_rgba(15,23,42,0.14)] hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-white flex items-center justify-center text-3xl shadow-md group-hover:scale-105 transition">
                                    {item.icon}
                                </div>

                                <h3 className="mt-6 text-xl font-bold text-gray-900 leading-snug">
                                    {item.title}
                                </h3>

                                <p className="mt-2 text-sm font-semibold text-orange-600 uppercase tracking-wide">
                                    {item.subtitle}
                                </p>

                                <p className="mt-4 text-gray-600 leading-7 text-sm md:text-base">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gradient-to-br from-[#fff7f2] via-white to-[#eef6ff]">
                <div className="max-w-5xl mx-auto px-6 text-center">

                    {/* Icon */}
                    <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-orange-100 text-orange-600 mb-6">
                        <AlertTriangle size={28} />
                    </div>

                    {/* Heading */}
                    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
                        If You Have a Concern
                    </h2>

                    {/* Description */}
                    <p className="mt-6 text-lg text-gray-600 leading-8 max-w-3xl mx-auto">
                        If something doesn't feel right, tell us. We will investigate with transparency
                        and resolve issues with speed and care.
                    </p>

                    {/* CTA */}
                    <div className="mt-8 flex justify-center gap-4 flex-wrap">
                        <button
                            onClick={() => navigate("/contact")}
                            className="inline-flex items-center gap-2 bg-[#f2653a] px-7 py-4 rounded-full text-white font-semibold shadow-lg hover:opacity-90 transition"
                        >
                            Raise a Concern
                            <ArrowRight size={18} />
                        </button>

                        <button
                            onClick={() => navigate("/about-us")}
                            className="inline-flex items-center gap-2 border border-gray-300 px-7 py-4 rounded-full text-gray-800 font-semibold hover:bg-gray-50 transition"
                        >
                            Learn More
                        </button>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default About;