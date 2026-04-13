import React, { useState } from 'react'
import { ArrowRight, BookOpen, CheckCircle2, ChevronDown, GraduationCap, MessageCircle, MoreHorizontal, ShieldCheck, Sparkles } from "lucide-react";

const Study = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const phoneNumber = "9876543212";
    const message = "Hi I need visa assistance";

    const countryCodes = [
        "IND (+91)",
        "UAE (+971)",
        "UK (+44)",
        "CAN (+1)",
        "AUS (+61)",
    ];

    const states = [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Delhi",
        "Goa",
        "Gujarat",
        "Haryana",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Tamil Nadu",
        "Telangana",
        "Uttar Pradesh",
        "West Bengal",
    ];
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        code: "IND (+91)",
        phone: "",
        state: "Andhra Pradesh",
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
        console.log("Study form submitted:", formData);
    };

    const studyCountries = [
        "Study in Canada",
        "Study in Australia",
        "Study in Germany",
        "Study in UK",
        "Study in USA",
        "Study in Europe",
        "Study in Korea",
        "Study in Finland",
        "Study in Netherlands",
        "Study in France",
        "Study in Sweden",
        "Study in Switzerland",
        "Study in Denmark",
        "Study in Dubai",
        "Study in Ireland",
        "Study in Italy",
        "Study in Japan",
        "Study in Luxembourg",
        "Study in New Zealand",
        "Study in Norway",
        "Study in Poland",
        "Study in Spain",
    ];

    const studyDegrees = ["Masters", "MBA", "B.TECH", "Bachelors"];

    const trustTabs = [
        {
            title: "Our Value",
            content: [
                {
                    heading: "Learning",
                    text: "Continuous growth and knowledge acquisition to offer solutions that empower students to pursue their dreams.",
                },
                {
                    heading: "Integrity",
                    text: "Upholding the highest standards of honesty and ethical behavior in everything we do.",
                },
                {
                    heading: "Fast",
                    text: "Ensuring efficiency and responsiveness in all our services so your process is on time and on track.",
                },
                {
                    heading: "Empathy",
                    text: "Understanding and addressing the unique needs of each student to empower them in this challenging journey.",
                },
            ],
        },
        {
            title: "Our Methodology",
            content: [
                {
                    heading: "A course that sets you up for success",
                    text: "Our approach ensures that the course you choose not only sparks your interest but also aligns with the global demand for skills. We carefully consider the latest immigration trends and market needs to help you make an informed decision that maximizes your chances of success—both during your studies and after you graduate.",
                },
                {
                    heading: "You take the lead—we’re here to guide",
                    text: "We believe your study abroad experience is a transformative journey, and that journey begins with you. Our innovative UniBase system empowers you to take control of your application process. By removing any agent bias, UniBase enables an objective course search that starts with your Wishlist, moves to your Shortlist, and culminates in a thoughtfully curated Final List. We categorize options as Sure Shot (Partner Included), Close Match Right Fit, and Long Shot, allowing you to make well-informed decisions.",
                },
                {
                    heading: "Student-first commitment",
                    text: "Our commitment is to you, the student. Unlike others who serve universities as their primary clients, we put your interests and aspirations at the heart of everything we do. Our focus is solely on helping you succeed in your global education journey, with no divided loyalties.",
                },
                {
                    heading: "Maximizing your global potential",
                    text: "We’re not just helping you get into a great program—we’re setting you up for a future that offers global employability and mobility. Our goal is to enhance your chances of staying back, finding fulfilling work, and getting a strong return on your investment, ensuring that you thrive long after you’ve completed your studies.",
                },
            ],
        },
        {
            title: "Why choose Visaassist",
            content: [
                {
                    heading: "We work for you",
                    text: "We deeply understand the aspirations, sacrifices, and challenges families face when funding an education abroad. We know the importance of making that investment count. That’s why we craft a personalized plan for you—one that ensures, upon graduation, you’ll be able to repay your student loan and become financially independent. Our goal is to help you succeed without burdening your family, building your confidence and self-esteem in the process.",
                },
                {
                    heading: "We offer you great value",
                    text: "At Visaassist, we bundle all of our services to give you the best value. For a small fee, you receive India’s top career consultants working on your side for a lifetime. This package includes everything from counseling and course selection to documentation, exam coaching, and student visa applications. When you look at the individual cost of our services, you’ll see just how reasonable and fair we are.",
                },
                {
                    heading: "We make it a great investment",
                    text: "Your education is more than a degree—it’s an investment in your future. We help you make that investment count by ensuring you don’t just get a degree, but a skill set that leads to a job and potentially a PR visa. Some courses lead to permanent residency opportunities while others don’t, and we’ll guide you toward the right ones. With the right plan, you can transform your overseas education into a life-changing experience.",
                },
                {
                    heading: "A lifetime of support",
                    text: "At Visaassist, we don’t see you as a one-time client. We’re here for the long haul—supporting you through every step of your journey, even after you graduate. In fact, we believe this is when you’ll need us the most—whether it’s finding a job, handling a migration issue, or simply needing help after you’ve landed in a new country. We’re with you for life.",
                },
                {
                    heading: "Our counseling is life-changing",
                    text: "Our Visaassist is designed to help you become a Global Indian who makes your family and community proud. Developed from years of counseling experience, Visaassist has helped thousands of Indians settle abroad successfully. Admissions are just the beginning—we see the bigger picture, helping you chart a career path that takes you from student to global professional.",
                },
                {
                    heading: "Our processes are seamless",
                    text: "We’re not just a one-stop shop—our services are fully integrated to ensure a smooth, stress-free journey from one stage to the next. Whether it’s admissions, visa processing, or job search support after graduation, we’re with you every step of the way. Our use of cutting-edge technology like Salesforce and Genesys ensures an enhanced customer experience. We’re always just a call, email, chat, or drive away.",
                },
                {
                    heading: "Premium Memberships & Verified status",
                    text: "As a Visaassist client, you’ll be listed in our open resume bank as a premium member, giving you direct access to potential employers. And with your Visaassist Verified status, employers can trust that your identity and credentials have been vetted by us, giving you a competitive edge in the job market.",
                },
                {
                    heading: "Job Search support upon Graduation",
                    text: "Once you’ve graduated, finding a job is your top priority—and we’re here to support you every step of the way. From resume development to networking, we offer the resources and guidance you need to land the right job and settle into your new life abroad.",
                },
                {
                    heading: "Join the Global Indian Community",
                    text: "With Visaassist, you’re never alone. As part of our Global Indian network, you’ll have the opportunity to connect with other Indians living abroad, sharing experiences and building a community of support. Your journey can inspire others just as theirs can inspire you.",
                },
                {
                    heading: "Unmatched immigration support",
                    text: "As one of the world’s largest immigration firms, Visaassist has unparalleled experience in overseas education and immigration services. We’ve helped thousands of Indians settle abroad, and our expertise means you’re in the best hands when it comes to navigating the complexities of immigration.",
                },
            ],
        },
    ];

    const serviceBlocks = [
        {
            title: "Talk to a Visaassist study abroad expert",
            description:
                "Don’t know where to start, or need help with something specific? We can help.",
            points: [],
            image:
                "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop",
            imageLeft: true,
        },
        {
            title: "Admission Services",
            description: "Make your admission application stand out",
            points: [
                "Customized applications",
                "Deadline management",
                "Phased preparation",
            ],
            image:
                "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1400&auto=format&fit=crop",
            imageLeft: false,
        },
        {
            title: "Course selection services",
            description: "The right course will lead you to the right path",
            points: [
                "Student driven results",
                "Expert assisted search",
                "Unbiased recommendations",
            ],
            image:
                "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1400&auto=format&fit=crop",
            imageLeft: true,
        },
        {
            title: "Student visa services",
            description: "Get your visa right the first time",
            points: [
                "Visa counseling & mock interviews",
                "Complete documentation assistance",
                "Interview slot booking",
            ],
            image:
                "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1400&auto=format&fit=crop",
            imageLeft: false,
        },
        {
            title: "Statement of Purpose",
            description: "SOPs crafted to create a compelling narrative",
            points: [
                "Clear and focused",
                "Persuasive narrative",
                "Crafted & reviewed by experts",
            ],
            image:
                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop",
            imageLeft: true,
        },
        {
            title: "Letters of Recommendation",
            description:
                "Powerful recommendations that elevate your application",
            points: [
                "Personalised to your strengths",
                "Advice on the best sources of referees",
                "Institution-specific customization",
            ],
            image:
                "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1400&auto=format&fit=crop",
            imageLeft: false,
        },
    ];

    const packageItems = [
        "Expert counseling",
        "Course selection",
        "Admissions services",
        "Student visa services",
        "Statement of purpose",
        "Letters of Recommendation",
        "Any one coaching solution",
        "Dedicated support",
    ];

    const universityData = [
        {
            country: "United States",
            logos: [
                "https://www.y-axis.com/lp/study/images/universities/us/pennstate.png",
                "https://www.y-axis.com/lp/study/images/universities/us/purdue.png",
                "https://www.y-axis.com/lp/study/images/universities/us/UC-Berkeley.png",
                "https://www.y-axis.com/lp/study/images/universities/us/University_of_Southern_California.png",
            ],
        },
        {
            country: "United Kingdom",
            logos: [
                "https://upload.wikimedia.org/wikipedia/en/d/d6/University_of_Oxford_coat_of_arms.svg",
                "https://upload.wikimedia.org/wikipedia/en/c/c3/University_of_Cambridge_coat_of_arms.svg",
                "https://upload.wikimedia.org/wikipedia/en/5/53/Imperial_College_London_new_logo.svg",
                "https://upload.wikimedia.org/wikipedia/commons/8/8e/UCL_logo.svg",
            ],
        },
        {
            country: "Australia",
            logos: [
                "https://upload.wikimedia.org/wikipedia/en/5/51/University_of_Melbourne_coat_of_arms.svg",
                "https://upload.wikimedia.org/wikipedia/en/9/9b/University_of_Sydney_coat_of_arms.svg",
                "https://upload.wikimedia.org/wikipedia/en/8/87/Monash_University_logo.svg",
                "https://upload.wikimedia.org/wikipedia/en/0/0b/University_of_Queensland_logo.svg",
            ],
        },
        {
            country: "Germany",
            logos: [
                "https://upload.wikimedia.org/wikipedia/commons/c/c8/Tum-logo.svg",
                "https://upload.wikimedia.org/wikipedia/commons/7/70/LMU_Muenchen_Logo.svg",
                "https://upload.wikimedia.org/wikipedia/commons/7/77/Heidelberg_University_logo.svg",
                "https://upload.wikimedia.org/wikipedia/commons/5/5e/HU_Berlin_Logo.svg",
            ],
        },
        {
            country: "Canada",
            logos: [
                "https://upload.wikimedia.org/wikipedia/en/4/4a/University_of_Toronto_coat_of_arms.svg",
                "https://upload.wikimedia.org/wikipedia/en/b/b0/McGill_University_CoA.svg",
                "https://upload.wikimedia.org/wikipedia/en/6/6f/University_of_British_Columbia_logo.svg",
                "https://upload.wikimedia.org/wikipedia/en/2/21/University_of_Alberta_coat_of_arms.svg",
            ],
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
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4kNq76NxPsb89cq0wvKjYIH-PcvZx3HEbdQ&s"
                                alt="Study Abroad"
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-900/15 to-transparent" />

                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                                <div className="max-w-md rounded-[24px] border border-white/20 bg-white/10 p-5 backdrop-blur-md">
                                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/85">
                                        Global Education
                                    </p>
                                    <h3 className="mt-2 text-2xl font-extrabold text-white md:text-3xl">
                                        Shape your future with the right study destination
                                    </h3>
                                    <p className="mt-3 text-sm leading-7 text-white/85 md:text-base">
                                        Get support for counseling, admissions, student visas, and
                                        coaching in one place.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Content */}
                        <div className="p-6 md:p-8 lg:p-10">
                            <span className="inline-flex rounded-full bg-orange-100 px-4 py-1.5 text-sm font-semibold text-orange-700">
                                Study Abroad
                            </span>

                            <h3 className="mt-4 text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
                                Study Abroad With Visaassist
                            </h3>

                            <p className="mt-3 text-base leading-8 text-slate-600 md:text-lg">
                                Value packed career counseling, college admissions, student visa
                                and coaching solutions.
                            </p>

                            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        value={formData.firstName}
                                        onChange={(e) => handleChange("firstName", e.target.value)}
                                        className="h-14 w-full rounded-2xl border border-slate-300 bg-white px-4 text-base text-slate-700 placeholder:text-slate-400 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                                    />

                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={(e) => handleChange("lastName", e.target.value)}
                                        className="h-14 w-full rounded-2xl border border-slate-300 bg-white px-4 text-base text-slate-700 placeholder:text-slate-400 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                                    />
                                </div>

                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    className="h-14 w-full rounded-2xl border border-slate-300 bg-white px-4 text-base text-slate-700 placeholder:text-slate-400 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                                />

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-[180px_1fr]">
                                    <div className="relative">
                                        <select
                                            value={formData.code}
                                            onChange={(e) => handleChange("code", e.target.value)}
                                            className="h-14 w-full appearance-none rounded-2xl border border-slate-300 bg-white px-4 pr-12 text-base text-slate-700 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                                        >
                                            {countryCodes.map((code) => (
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
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={(e) => handleChange("phone", e.target.value)}
                                        className="h-14 w-full rounded-2xl border border-slate-300 bg-white px-4 text-base text-slate-700 placeholder:text-slate-400 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                                    />
                                </div>

                                <div className="relative">
                                    <select
                                        value={formData.state}
                                        onChange={(e) => handleChange("state", e.target.value)}
                                        className="h-14 w-full appearance-none rounded-2xl border border-slate-300 bg-white px-4 pr-12 text-base text-slate-700 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                                    >
                                        {states.map((state) => (
                                            <option key={state} value={state}>
                                                {state}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown
                                        size={18}
                                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                                    />
                                </div>

                                <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                                    <input
                                        type="checkbox"
                                        checked={formData.accepted}
                                        onChange={(e) => handleChange("accepted", e.target.checked)}
                                        className="mt-1 h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-400"
                                    />
                                    <span className="text-sm leading-6 text-slate-600">
                                        I accept all terms &amp; privacy policy
                                    </span>
                                </label>

                                <button
                                    type="submit"
                                    className="w-full rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-4 text-base font-semibold text-slate-950 shadow-md transition hover:scale-[1.01] hover:shadow-lg"
                                >
                                    Get Started
                                </button>
                            </form>

                            <div className="mt-6 rounded-[24px] border border-orange-100 bg-orange-50 p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
                                        <GraduationCap size={28} />
                                    </div>

                                    <div>
                                        <p className="text-lg font-bold text-slate-900">
                                            Personalized student guidance
                                        </p>
                                        <p className="mt-1 text-sm leading-7 text-slate-600 md:text-base">
                                            Get support for admission planning, profile building, visa
                                            guidance, and coaching from experts.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center gap-3 text-sm text-slate-500">
                                <ShieldCheck size={18} className="text-orange-500" />
                                <span>Your details are safe and securely handled.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full bg-gradient-to-br from-white via-slate-50 to-orange-50 py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
                    <div className="mb-10 text-center lg:mb-14">
                        <span className="inline-flex rounded-full bg-orange-100 px-4 py-1.5 text-sm font-semibold text-orange-700">
                            Global Education Guidance
                        </span>

                        <h3 className="mt-4 text-3xl font-extrabold text-slate-900 md:text-4xl lg:text-5xl">
                            India’s Most Trusted Study Abroad Consultants
                        </h3>

                        <p className="mx-auto mt-4 max-w-4xl text-base leading-8 text-slate-600 md:text-lg">
                            Visaassist helps students like you find and apply to in-demand courses
                            in international universities that lead to a rewarding career. Our
                            Right Course, Right Path methodology ensures you don’t just get an
                            education but global mobility and a successful future.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.35fr_0.65fr]">
                        {/* Left side */}
                        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] md:p-8">
                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-white shadow-md">
                                <GraduationCap size={28} />
                            </div>

                            <h4 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
                                Study abroad by country
                            </h4>

                            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                {studyCountries.map((item, index) => (
                                    <button
                                        key={index}
                                        className="group flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-left transition hover:border-orange-300 hover:bg-orange-50"
                                    >
                                        <span className="font-semibold text-slate-800">{item}</span>
                                        <MoreHorizontal
                                            size={20}
                                            className="text-slate-500 transition group-hover:text-orange-500"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right side */}
                        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] md:p-8">
                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 text-white shadow-md">
                                <BookOpen size={28} />
                            </div>

                            <h4 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
                                Study abroad by degree
                            </h4>

                            <div className="mt-8 space-y-4">
                                {studyDegrees.map((degree, index) => (
                                    <button
                                        key={index}
                                        className="group flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left transition hover:border-orange-300 hover:bg-orange-50"
                                    >
                                        <span className="text-base font-semibold text-slate-800 md:text-lg">
                                            {degree}
                                        </span>
                                        <ArrowRight
                                            size={18}
                                            className="text-orange-500 transition group-hover:translate-x-1"
                                        />
                                    </button>
                                ))}
                            </div>

                            <div className="mt-8 rounded-[24px] border border-orange-100 bg-orange-50 p-5">
                                <p className="text-lg font-bold text-slate-900">
                                    Find the right degree path
                                </p>
                                <p className="mt-2 text-sm leading-7 text-slate-600 md:text-base">
                                    Explore degree options that align with your academic background,
                                    career goals, and future migration opportunities.
                                </p>

                                <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-500">
                                    Explore Degrees
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full bg-gradient-to-br from-orange-50 via-white to-orange-100 py-16 lg:py-24">
                <div className="w-full px-4 md:px-10 lg:px-16 xl:px-24">

                    <div className="rounded-[32px] border border-orange-100 bg-white p-6 md:p-10 lg:p-14 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">

                        {/* Title */}
                        <p className="text-2xl font-extrabold text-slate-900 md:text-3xl">
                            Supporting students since 1999
                        </p>

                        <p className="mt-4 max-w-4xl text-base leading-8 text-slate-600 md:text-lg">
                            Visaassist is one of the most trusted names in the education space. We have
                            the skills, experience, and network to help students like you unlock
                            their potential by gaining an admission to their dream university.
                        </p>

                        {/* Buttons */}
                        <div className="mt-6 flex flex-wrap gap-3">
                            {trustTabs.map((tab, index) => {
                                const isOpen = openIndex === index;

                                return (
                                    <button
                                        key={tab.title}
                                        onClick={() => setOpenIndex(isOpen ? null : index)}
                                        className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${isOpen
                                            ? "bg-gradient-to-r from-orange-500 to-amber-400 text-white shadow-md"
                                            : "border border-slate-200 bg-white text-slate-700 hover:border-orange-300 hover:text-orange-600"
                                            }`}
                                    >
                                        {tab.title}
                                        <ChevronDown
                                            size={16}
                                            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>
                                );
                            })}
                        </div>

                        {/* Content */}
                        <div className="mt-8">
                            {trustTabs.map((tab, index) => {
                                const isOpen = openIndex === index;

                                return (
                                    <div
                                        key={tab.title}
                                        className={`grid transition-all duration-500 ${isOpen
                                            ? "grid-rows-[1fr] opacity-100"
                                            : "grid-rows-[0fr] opacity-0"
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 md:p-8 lg:p-10">

                                                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                                                    {tab.content.map((item, itemIndex) => (
                                                        <div
                                                            key={itemIndex}
                                                            className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md"
                                                        >
                                                            <h4 className="text-base font-bold text-slate-900 md:text-lg">
                                                                {item.heading}
                                                            </h4>
                                                            <p className="mt-2 text-sm leading-7 text-slate-600 md:text-base">
                                                                {item.text}
                                                            </p>
                                                        </div>
                                                    ))}
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

            <section className="w-full bg-gradient-to-br from-slate-50 via-white to-orange-50 py-16 lg:py-24">
                <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16">
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
                                        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/25 via-transparent to-transparent" />
                                    </div>
                                )}

                                <div className="flex items-center p-6 md:p-8 lg:p-10 xl:p-12">
                                    <div className="w-full">
                                        <span className="inline-flex rounded-full bg-orange-100 px-4 py-1.5 text-sm font-semibold text-orange-700">
                                            Service {index + 1}
                                        </span>

                                        <h4 className="mt-4 text-2xl font-extrabold text-slate-900 md:text-3xl lg:text-4xl">
                                            {block.title}
                                        </h4>

                                        <p className="mt-4 text-base leading-8 text-slate-600 md:text-lg">
                                            {block.description}
                                        </p>

                                        {block.points.length > 0 && (
                                            <div className="mt-7 grid gap-4">
                                                {block.points.map((point, pointIndex) => (
                                                    <div
                                                        key={pointIndex}
                                                        className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4"
                                                    >
                                                        <span className="mt-2 h-3 w-3 shrink-0 rounded-full bg-orange-500" />
                                                        <p className="text-sm leading-7 text-slate-700 md:text-base">
                                                            {point}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <button
                                            onClick={() =>
                                                window.open(
                                                    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
                                                    "_blank"
                                                )
                                            }
                                            className="mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-md transition hover:scale-[1.02]">
                                            <MessageCircle size={18} />
                                            Chat with us
                                        </button>
                                    </div>
                                </div>

                                {!block.imageLeft && (
                                    <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-full">
                                        <img
                                            src={block.image}
                                            alt={block.title}
                                            className="h-full w-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-tl from-slate-950/25 via-transparent to-transparent" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="w-full bg-gradient-to-br from-orange-50 via-white to-amber-50 py-16 lg:py-24">
                <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16">
                    <div className="relative overflow-hidden rounded-[34px] border border-orange-100 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                        <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-orange-200/40 blur-3xl" />
                        <div className="absolute -right-10 bottom-0 h-44 w-44 rounded-full bg-amber-200/40 blur-3xl" />

                        <div className="relative z-10 grid grid-cols-1 gap-8 p-6 md:p-8 lg:grid-cols-[1fr_0.9fr] lg:p-12 xl:p-14">
                            {/* Left content */}
                            <div>
                                <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1.5 text-sm font-semibold text-orange-700">
                                    <Sparkles size={16} />
                                    Best Value Package
                                </span>

                                <h3 className="mt-4 text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl lg:text-5xl">
                                    Study Abroad Super Saver Package
                                </h3>

                                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                                    Get all the services mentioned above for a discounted price.
                                </p>

                                <button
                                    onClick={() =>
                                        window.open(
                                            `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
                                            "_blank"
                                        )
                                    }
                                    className="mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-7 py-4 text-sm font-semibold text-slate-950 shadow-lg transition hover:scale-[1.02]">
                                    <MessageCircle size={18} />
                                    Chat with us
                                </button>
                            </div>

                            {/* Right features */}
                            <div className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 md:p-6">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {packageItems.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-4 shadow-sm"
                                        >
                                            <CheckCircle2
                                                size={20}
                                                className="mt-0.5 shrink-0 text-orange-500"
                                            />
                                            <p className="text-sm font-medium leading-7 text-slate-700 md:text-base">
                                                {item}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 rounded-2xl border border-orange-100 bg-orange-50 px-5 py-4">
                                    <p className="text-sm leading-7 text-slate-700 md:text-base">
                                        Save more while getting complete guidance for your study
                                        abroad journey with expert-backed support at every stage.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full bg-gradient-to-br from-slate-50 via-white to-orange-50 py-16 lg:py-24">
                <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16">
                    <div className="mb-10 text-center lg:mb-14">
                        <span className="inline-flex rounded-full bg-orange-100 px-4 py-1.5 text-sm font-semibold text-orange-700">
                            Global University Network
                        </span>

                        <h3 className="mt-4 text-3xl font-extrabold text-slate-900 md:text-4xl lg:text-5xl">
                            Top University Placements
                        </h3>

                        <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
                            Explore top study destinations and leading university placements
                            supported through expert counseling and admissions guidance.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {universityData.map((group, index) => (
                            <div
                                key={index}
                                className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] md:p-8"
                            >
                                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                                    <div className="lg:w-[280px]">
                                        <h4 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
                                            {group.country}
                                        </h4>
                                        <p className="mt-2 text-sm leading-7 text-slate-600 md:text-base">
                                            Featured university placements and popular academic options.
                                        </p>
                                    </div>

                                    <div className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-4">
                                        {group.logos.map((logo, logoIndex) => (
                                            <div
                                                key={logoIndex}
                                                className="group flex h-32 items-center justify-center rounded-[24px] border border-slate-200 bg-slate-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:bg-white hover:shadow-md"
                                            >
                                                <img
                                                    src={logo}
                                                    alt={`${group.country} university logo ${logoIndex + 1}`}
                                                    className="max-h-16 w-auto max-w-full object-contain transition duration-300 group-hover:scale-105"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Study