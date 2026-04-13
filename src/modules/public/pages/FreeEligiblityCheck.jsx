import React, { useState } from "react";
import {
    PhoneCall,
    ArrowRight,
    Calculator,
    BadgeHelp,
    ChevronDown
} from "lucide-react";
import { BsShieldCheck } from "react-icons/bs";
import { FaArrowRight, FaRegCheckCircle } from "react-icons/fa";
import Footer from "./Footer";
import { useToast } from "../../app/providers/ToastProvider";
import { submitEligibilityCheck } from "../api/publicApi";

const FreeEligiblityCheck = () => {
    const steps = Array.from({ length: 8 }, (_, i) => i + 1);

    const countries = [
        "UK",
        "Canada",
        "Germany",
        "Australia",
        "Australia Partner",
        "Saskatchewan",
        "Quebec",
    ];

    const [selectedGoal, setSelectedGoal] = useState("Immigration");
    const [selectedCountry, setSelectedCountry] = useState("UK");
    const [openIndex, setOpenIndex] = useState(0);
    const toast = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        age: "",
        priorRefusal: false,
        coApplicantCount: 0,
        message: "",
        consentAccepted: false,
    });

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((current) => ({
            ...current,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const submitEligibility = async () => {
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
            toast.error("Please fill all required fields");
            return;
        }

        if (!formData.consentAccepted) {
            toast.error("Please accept consent to continue");
            return;
        }

        try {
            setIsSubmitting(true);
            await submitEligibilityCheck({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                age: formData.age ? Number(formData.age) : undefined,
                countryOfInterest: selectedCountry,
                visaCategory: selectedGoal,
                priorRefusal: Boolean(formData.priorRefusal),
                coApplicantCount: Number(formData.coApplicantCount || 0),
                message: formData.message,
                consentAccepted: true,
            });
            toast.success("Eligibility request submitted");
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                age: "",
                priorRefusal: false,
                coApplicantCount: 0,
                message: "",
                consentAccepted: false,
            });
        } catch (error) {
            toast.error(error.message || "Failed to submit eligibility request");
        } finally {
            setIsSubmitting(false);
        }
    };


    const whyChoosePoints = [
        "Check your eligibility for FREE.",
        "Get your score instantly.",
        "Easy steps to follow.",
        "Expert tips to improve your score.",
        "Immediate assistance by Visaassist professionals.",
    ];

    const calculatorLinks = [
        "UK Immigration Points Calculator",
        "Australia Immigration Points Calculator",
        "Canada Immigration Points Calculator",
        "Germany Immigration Points Calculator",
        "Canada SINP Calculator",
        "Quebec Immigration Points Calculator",
    ];

    const faqData = [
        {
            question: "What are the advantages of using a points-based system?",
            answer: [
                "Individual applicants are chosen based on the goals set forth by the destination country.",
                "A point system produces higher-quality immigration applicants.",
                "The initial stage of the immigration procedure is expedited, which means valid applications can be processed with less resources.",
                "Helps avoid lower skilled immigrants from entering the country.",
                "The evaluation procedure is open and transparent.",
            ],
        },
        {
            question:
                "What are the advantages of using a points-based system when evaluating immigration applicants?",
            answer: [
                "The advantages of using a points-based system are many — it ensures only highly skilled migrants gain entry and gives a fair chance to every applicant.",
                "The other advantage of the points-based system is transparency.",
                "The system makes it clear to applicants the various criteria on which they will be given points and the scoring basis for each criterion.",
                "Based on their scores, applicants will know exactly where they stand, and they can determine the areas they need to improve on to score more points.",
            ],
        },
        {
            question: "What are the general criteria for calculating points?",
            answer: [
                "Canada awards points based on – age, language, education, work experience, adaptability, and arranged employment.",
                "Australia gives points on – age, English language, employment outside Australia, employment in Australia, education, studied in Australia, niche skills education or specialist education qualification, and spouse skills points.",
                "Germany considers – qualification, work experience matching one’s qualification, German language skills, English language skills, and age.",
            ],
        },
        {
            question: "How many points do I need for Canada Express Entry?",
            answer: [
                "67 points must be scored to create an Express Entry profile with Immigration, Refugees and Citizenship Canada (IRCC).",
            ],
        },
        {
            question:
                "Can I make profile with Express Entry of Canada if I score less than 67 points?",
            answer: [
                "No. You can’t create an Express Entry profile if you don’t score the required 67 points.",
            ],
        },
        {
            question:
                "Is there an upper age limit for Express Entry for permanent residence in Canada?",
            answer: [
                "There is no upper age limit.",
                "Age 47 years and above will get you no points on Canada eligibility calculation.",
                "You can, however, still create an Express Entry profile if you secure 67 points.",
            ],
        },
        {
            question: "How many points for Australia eligibility calculation?",
            answer: [
                "65 points needed to register an Expression of Interest (EOI) profile.",
            ],
        },
        {
            question:
                "Can I make SkillSelect profile for Australia if I don’t get 65 points?",
            answer: [
                "You can make a SkillSelect profile even if you don’t get 65 points.",
                "You will, however, not be eligible to receive an invitation in the SkillSelect rounds held later.",
            ],
        },
        {
            question: "What is the new points-based UK immigration system?",
            answer: [
                "On January 31, 2020, the United Kingdom (UK) exited the European Union (EU). Following which, a new points-based system was introduced by the UK to bring in high-skilled workers with the aim of creating a high wage, high-skill, high productivity economy.",
                "With the points-based UK system, the focus is now on the skills that an individual has to offer, regardless of where they come from.",
            ],
        },
        {
            question: "How many points for UK immigration?",
            answer: [
                "70 points are to be scored to be granted a UK Skilled Worker visa, as per the UK Skilled Immigration Points Calculator.",
                "Required – (1) job offer from an approved UK sponsor, (2) the UK job offer to be at the required skill level, and (3) ability to speak English at the required level.",
                "These are the mandatory conditions that will have to be met by each applicant, whether applying from an EU or non-EU country.",
                "Other factors are tradeable and can be adjusted against each other.",
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-[#f3f3f3] px-4 py-4 md:px-8 lg:px-10">
            <section className="relative overflow-hidden bg-gradient-to-br from-[#f8fbff] via-white to-[#fff4ed] py-16 md:py-20">
                {/* background glow */}
                <div className="absolute -top-16 -left-16 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />
                <div className="absolute -bottom-16 -right-16 h-80 w-80 rounded-full bg-orange-100/60 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-[36px] border border-slate-200/70 bg-white/90 shadow-[0_20px_70px_rgba(15,23,42,0.10)] backdrop-blur">
                        {/* Top header */}
                        <div className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#334155] px-6 py-10 text-white md:px-10 md:py-14 lg:px-14">
                            <div className="absolute right-0 top-0 h-full w-1/3 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_55%)]" />

                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-300 md:text-base">
                                Free Quick Evaluation
                            </p>

                            <h1 className="mt-4 max-w-4xl text-3xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
                                Find Your Best Visa Path
                            </h1>

                            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-200 md:text-lg">
                                Answer a few simple questions and get a smarter direction for your
                                immigration, study, or work journey.
                            </p>
                        </div>

                        {/* Main content */}
                        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_380px]">
                            {/* Left side */}
                            <div className="px-6 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12">
                                {/* step header */}
                                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
                                            Step 1 of 8
                                        </p>
                                        <h2 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
                                            Start Your Eligibility Check
                                        </h2>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {steps.map((step) => (
                                            <span
                                                key={step}
                                                className={`h-2.5 w-10 rounded-full transition-all duration-300 ${step === 1 ? "bg-[#f04124]" : "bg-slate-200"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* goal block */}
                                <div className="mt-10 rounded-[28px] border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm md:p-8">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                                                Step 1
                                            </p>
                                            <h3 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
                                                Select Your Primary Goal
                                            </h3>
                                            <p className="mt-3 max-w-2xl text-slate-600 leading-7">
                                                Choose the pathway you want to explore so we can recommend the
                                                right next steps and document direction.
                                            </p>
                                        </div>

                                        <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 md:flex">
                                            <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path d="M12 20h9"></path>
                                                <path d="M12 4h9"></path>
                                                <path d="M4 9h16"></path>
                                                <path d="M4 15h16"></path>
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                                        {["Immigration", "Study", "Work"].map((goal) => (
                                            <button
                                                key={goal}
                                                onClick={() => setSelectedGoal(goal)}
                                                className={`group rounded-2xl border px-6 py-5 text-left transition-all duration-300 ${selectedGoal === goal
                                                        ? "border-[#f04124] bg-[#f04124] text-white shadow-lg"
                                                        : "border-slate-200 bg-white text-slate-700 hover:-translate-y-1 hover:border-[#f04124] hover:shadow-md"
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="text-lg font-bold">{goal}</span>
                                                    <span
                                                        className={`rounded-full px-2 py-1 text-xs font-semibold ${selectedGoal === goal
                                                                ? "bg-white/20 text-white"
                                                                : "bg-orange-50 text-orange-600"
                                                            }`}
                                                    >
                                                        Select
                                                    </span>
                                                </div>
                                                <p
                                                    className={`mt-3 text-sm leading-6 ${selectedGoal === goal ? "text-white/90" : "text-slate-500"
                                                        }`}
                                                >
                                                    {goal === "Immigration" &&
                                                        "Explore long-term relocation and settlement opportunities."}
                                                    {goal === "Study" &&
                                                        "Find the right academic route and country options."}
                                                    {goal === "Work" &&
                                                        "Check pathways for employment-based opportunities abroad."}
                                                </p>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* country block */}
                                <div className="mt-8 rounded-[28px] border border-slate-200 bg-gradient-to-br from-white to-orange-50 p-6 shadow-sm md:p-8">
                                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">
                                        Step 2
                                    </p>
                                    <h3 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
                                        Choose Your Preferred Country
                                    </h3>
                                    <p className="mt-3 text-slate-600 leading-7">
                                        Select your destination preference and we will align the
                                        evaluation around the right visa route.
                                    </p>

                                    <div className="mt-6 flex flex-wrap gap-3">
                                        {countries.map((country) => (
                                            <button
                                                key={country}
                                                onClick={() => setSelectedCountry(country)}
                                                className={`rounded-full border px-5 py-3 text-sm md:text-base font-semibold transition-all duration-200 ${selectedCountry === country
                                                        ? "border-[#f04124] bg-[#f04124] text-white shadow-md"
                                                        : "border-slate-200 bg-white text-slate-700 hover:border-[#f04124] hover:text-[#f04124] hover:shadow-sm"
                                                    }`}
                                            >
                                                {country}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* note */}
                                <div className="mt-8 rounded-[28px] bg-[#0f172a] p-6 text-white shadow-lg md:p-7">
                                    <p className="text-base leading-8 text-slate-200 md:text-lg">
                                        This quick wizard helps us understand your goal, destination, and
                                        direction so we can suggest a more relevant visa pathway with
                                        better clarity.
                                    </p>
                                </div>

                                {/* actions */}
                                <div className="mt-10 flex flex-wrap items-center gap-4">
                                    <button className="inline-flex items-center gap-2 rounded-full bg-[#f04124] px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:opacity-95">
                                        Next
                                        <ArrowRight size={20} />
                                    </button>

                                    <button className="rounded-full border border-slate-300 px-7 py-4 text-lg font-medium text-slate-700 transition hover:bg-slate-50 hover:text-black">
                                        Save & Exit
                                    </button>
                                </div>
                            </div>

                            {/* Right side */}
                            <aside className="border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white px-6 py-8 lg:border-l lg:border-t-0 lg:px-8 lg:py-10">
                                <div className="mx-auto flex h-full max-w-[340px] flex-col rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_15px_40px_rgba(15,23,42,0.08)]">
                                    <div className="rounded-[24px] bg-gradient-to-br from-[#f04124] to-[#ff7a5c] p-6 text-white">
                                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
                                            Live Overview
                                        </p>
                                        <h3 className="mt-3 text-3xl font-extrabold">Your Score</h3>

                                        <div className="mt-6 flex items-center justify-center">
                                            <div className="flex h-32 w-32 items-center justify-center rounded-full border-8 border-white/20 bg-white/10 text-5xl font-extrabold shadow-inner md:h-36 md:w-36 md:text-6xl">
                                                00
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 grid gap-4">
                                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Current step
                                            </p>
                                            <p className="mt-2 text-lg font-bold text-slate-900">
                                                Goal selection
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Estimated time
                                            </p>
                                            <p className="mt-2 text-lg font-bold text-slate-900">
                                                2 minutes
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Selected goal
                                            </p>
                                            <p className="mt-2 text-lg font-bold text-slate-900">
                                                {selectedGoal || "Not selected"}
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Preferred country
                                            </p>
                                            <p className="mt-2 text-lg font-bold text-slate-900">
                                                {selectedCountry || "Not selected"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6 rounded-2xl border border-orange-100 bg-orange-50 p-4">
                                        <p className="text-sm leading-7 text-slate-700">
                                            Your selections help us shape a more accurate recommendation and
                                            checklist direction for the next steps.
                                        </p>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>

                <a
                    href="https://wa.me/917670800000"
                    className="fixed bottom-6 right-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#59ce72] text-white shadow-[0_15px_35px_rgba(0,0,0,0.18)] transition hover:scale-105"
                    aria-label="WhatsApp"
                >
                    <PhoneCall size={30} />
                </a>
            </section>

            <section className="w-full bg-gradient-to-br from-white via-slate-50 to-orange-50 py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
                    <div className="space-y-8">
                        {/* Top grid */}
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                            {/* Why opt */}
                            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.06)] md:p-8">
                                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f04124] to-orange-400 text-white shadow-md">
                                    <BsShieldCheck size={28} />
                                </div>

                                <h3 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
                                    Why opt Visaassist Eligibility Calculator?
                                </h3>

                                <div className="mt-6 space-y-4">
                                    {whyChoosePoints.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4"
                                        >
                                            <FaRegCheckCircle
                                                size={20}
                                                className="mt-0.5 shrink-0 text-[#f04124]"
                                            />
                                            <p className="text-base leading-7 text-slate-700">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Calculator list */}
                            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.06)] md:p-8">
                                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 text-white shadow-md">
                                    <Calculator size={28} />
                                </div>

                                <h3 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
                                    Immigration Points calculator
                                </h3>

                                <p className="mt-4 text-base leading-8 text-slate-600">
                                    Through the Visaassist Immigration Points Calculator, you can check
                                    your eligibility through
                                </p>

                                <div className="mt-6 grid gap-3">
                                    {calculatorLinks.map((item, index) => (
                                        <button
                                            key={index}
                                            className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left transition hover:border-[#f04124] hover:bg-orange-50"
                                        >
                                            <span className="font-medium text-slate-800">{item}</span>
                                            <ArrowRight size={18} className="text-[#f04124]" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Eligibility Evaluation */}
                        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.06)] md:p-8 lg:p-10">
                            <h3 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
                                Visaassist Eligibility Evaluation
                            </h3>

                            <div className="mt-6 space-y-5 text-base leading-8 text-slate-600">
                                <p>
                                    When you plan to migrate abroad to work, invest, or settle, you
                                    must first determine whether you can apply for a visa to enter
                                    that nation. This can help you evaluate whether applying for a
                                    visa to migrate to a given nation is worth your time and effort.
                                    This is where determining eligibility is crucial.
                                </p>

                                <p>
                                    Each country has its own set of eligibility criteria. Countries
                                    such as Australia, Canada, Saskatchewan, Quebec, the United
                                    Kingdom, and Germany use a points-based system to determine
                                    whether applicants are eligible to live, work, or study in their
                                    country.
                                </p>

                                <p>
                                    You must score the appropriate points to meet the eligibility
                                    requirements for these countries. The number of points available
                                    and the conditions for earning them vary by country.
                                </p>

                                <p>
                                    Eligibility evaluation is a process that determines whether or
                                    not you might be able to apply for a specific visa for a
                                    particular country. Regarding migrating overseas, countries such
                                    as Canada, Australia, and the United Kingdom require a
                                    points-based eligibility evaluation.
                                </p>

                                <p>
                                    You should obtain an eligibility evaluation before filling out
                                    the application form for these nations. This will assist you in
                                    determining whether you satisfy the requirements and can score
                                    the required points. As a result, you’ll be able to analyze your
                                    odds of acquiring the visa.
                                </p>

                                <p>
                                    Visaassist helps you decide about moving abroad with our eligibility
                                    evaluation process. With an Eligibility Evaluation, we assess
                                    your profile against the prevailing visa norms and evaluate your
                                    application’s chances of success.
                                </p>
                            </div>
                        </div>

                        {/* Score calculator */}
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_0.7fr]">
                            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.06)] md:p-8 lg:p-10">
                                <h3 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
                                    Visaassist Eligibility Score Calculator
                                </h3>

                                <div className="mt-6 space-y-5 text-base leading-8 text-slate-600">
                                    <p>
                                        The Visaassist Eligibility Evaluation helps you check your
                                        eligibility with the Visaassist points calculator. This will help
                                        you understand the strong factors in your profile, which will
                                        help you decide which country you will have greater chances of
                                        migrating to.
                                    </p>

                                    <p>
                                        It will assist you in making an informed decision based on
                                        available options. An Eligibility Evaluation can also help you
                                        identify any flaws in your profile that you can address with
                                        the help of Visaassist' professional services. We provide you with
                                        a cost and time estimate for completing this so that you know
                                        exactly what to expect.
                                    </p>

                                    <p>
                                        The Visaassist Eligibility Evaluation provides a scorecard and
                                        suggests the best options.
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-[32px] border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.06)] md:p-8">
                                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f04124] text-white shadow-md">
                                    <BadgeHelp size={28} />
                                </div>

                                <h4 className="text-2xl font-extrabold text-slate-900">
                                    Quick help
                                </h4>

                                <p className="mt-4 text-base leading-8 text-slate-600">
                                    Use the calculator to understand your profile strength, compare
                                    country options, and get guidance on the next best steps for
                                    your immigration journey.
                                </p>

                                <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#f04124] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90">
                                    Start Evaluation
                                    <FaArrowRight size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Disclaimer */}
                        <div className="rounded-[28px] border border-red-100 bg-red-50/60 p-6 md:p-8">
                            <h4 className="text-xl font-bold text-slate-900">Disclaimer</h4>

                            <p className="mt-4 text-sm leading-8 text-slate-600 md:text-base">
                                A quick eligibility check of Visaassist is only to help the applicants
                                understand their scores. The points displayed are based on your
                                answers only. Please note the points on each section are evaluated
                                based on various parameters set in the immigration guidelines, and
                                a technical evaluation is a must to know your accurate scores and
                                eligibility to find out which immigration program you can apply
                                for. The Quick eligibility check does not guarantee the below
                                points; you may score high or low points once our expert team
                                technically evaluates you. There are many assessing bodies that
                                process skills assessment, which will depend on your nominated
                                occupation, and these assessing bodies will have their own
                                criteria for considering an applicant as skilled. State/ territory
                                authorities will also have their own criteria to allow
                                sponsorships, which an applicant should satisfy. So, it is very
                                important for an applicant to apply for a technical evaluation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full bg-gradient-to-br from-slate-50 via-white to-orange-50 py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
                    <div className="mx-auto max-w-5xl">
                        <div className="text-center">
                            <span className="inline-flex rounded-full bg-orange-100 px-4 py-1.5 text-sm font-semibold text-orange-700">
                                Help Center
                            </span>

                            <h2 className="mt-4 text-3xl font-extrabold text-slate-900 md:text-5xl">
                                Frequently Asked Questions
                            </h2>

                            <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
                                Find quick answers to the most common questions about immigration
                                points, eligibility, and country-specific requirements.
                            </p>
                        </div>

                        <div className="mt-12 space-y-4">
                            {faqData.map((faq, index) => {
                                const isOpen = openIndex === index;

                                return (
                                    <div
                                        key={index}
                                        className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.06)] transition-all duration-300"
                                    >
                                        <button
                                            onClick={() => toggleFaq(index)}
                                            className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-7 md:py-6"
                                        >
                                            <h3 className="text-base font-bold leading-7 text-slate-900 md:text-lg">
                                                {index + 1}. {faq.question}
                                            </h3>

                                            <span
                                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${isOpen
                                                    ? "border-[#f04124] bg-[#f04124] text-white"
                                                    : "border-slate-200 bg-slate-50 text-slate-600"
                                                    }`}
                                            >
                                                <ChevronDown
                                                    size={20}
                                                    className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                                        }`}
                                                />
                                            </span>
                                        </button>

                                        <div
                                            className={`grid transition-all duration-300 ${isOpen
                                                ? "grid-rows-[1fr] opacity-100"
                                                : "grid-rows-[0fr] opacity-0"
                                                }`}
                                        >
                                            <div className="overflow-hidden">
                                                <div className="border-t border-slate-100 px-5 py-5 md:px-7 md:py-6">
                                                    <div className="space-y-4">
                                                        {faq.answer.map((point, pointIndex) => (
                                                            <div
                                                                key={pointIndex}
                                                                className="flex items-start gap-3"
                                                            >
                                                                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#f04124]" />
                                                                <p className="text-sm leading-8 text-slate-600 md:text-base">
                                                                    {point}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default FreeEligiblityCheck;