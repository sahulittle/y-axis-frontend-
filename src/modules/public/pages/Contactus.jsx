import React, { useState } from "react";
import {
    Mail,
    Phone,
    MapPin,
    Clock3,
    Send,
    MessageSquare,
    Headphones,
    Globe,
} from "lucide-react";
import { useToast } from "../../../app/providers/ToastProvider";
import { submitPublicEnquiry } from "../../../user/api/publicApi";

const ContactUs = () => {
    const toast = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const payload = {
            name: `${String(formData.get("firstName") || "").trim()} ${String(formData.get("lastName") || "").trim()}`.trim(),
            email: String(formData.get("email") || "").trim(),
            phone: String(formData.get("phone") || "").trim(),
            countryOfInterest: String(formData.get("countryOfInterest") || "General").trim(),
            visaInterestType: String(formData.get("visaCategory") || "").trim(),
            enquiryType: "contact_form",
            message: String(formData.get("message") || "").trim(),
            pageSource: "contact",
        };

        if (!payload.name || !payload.email || !payload.phone || !payload.message) {
            toast.error("Please fill all required fields");
            return;
        }

        try {
            setIsSubmitting(true);
            await submitPublicEnquiry(payload);
            toast.success("Your request has been submitted successfully");
            event.currentTarget.reset();
        } catch (error) {
            toast.error(error.message || "Failed to submit contact form");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-24 pb-16">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.10),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.10),_transparent_30%)]" />
                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <p className="inline-flex items-center rounded-full border border-indigo-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 shadow-sm">
                            Contact Us
                        </p>
                        <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight">
                            Let’s start a conversation
                        </h1>
                        <p className="mt-5 text-lg leading-8 text-slate-600">
                            Have questions, need support, or want to discuss your project?
                            Our team is here to help you with fast, friendly, and reliable
                            assistance.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="pb-10">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition">
                            <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-5">
                                <Phone className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">Call Us</h3>
                            <p className="mt-2 text-slate-600 leading-7">
                                Speak directly with our team for quick help and support.
                            </p>
                            <p className="mt-4 font-semibold text-slate-900">+91 98765 43210</p>
                        </div>

                        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition">
                            <div className="w-14 h-14 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center mb-5">
                                <Mail className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">Email Us</h3>
                            <p className="mt-2 text-slate-600 leading-7">
                                Send us your query anytime and we’ll get back to you soon.
                            </p>
                            <p className="mt-4 font-semibold text-slate-900">info@example.com</p>
                        </div>

                        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition">
                            <div className="w-14 h-14 rounded-2xl bg-fuchsia-100 text-fuchsia-600 flex items-center justify-center mb-5">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">Visit Us</h3>
                            <p className="mt-2 text-slate-600 leading-7">
                                Meet us at our office for detailed discussions and guidance.
                            </p>
                            <p className="mt-4 font-semibold text-slate-900">
                                Bhubaneswar, Odisha, India
                            </p>
                        </div>

                        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5">
                                <Clock3 className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">Working Hours</h3>
                            <p className="mt-2 text-slate-600 leading-7">
                                We’re available throughout the week to assist you.
                            </p>
                            <p className="mt-4 font-semibold text-slate-900">
                                Mon - Sat, 9:00 AM - 7:00 PM
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Contact Section */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-10 items-start">
                        {/* Left Content */}
                        <div className="space-y-6">
                            <div className="rounded-[32px] bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-8 md:p-10 text-white shadow-[0_20px_80px_rgba(79,70,229,0.28)]">
                                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
                                    Get in touch
                                </p>
                                <h2 className="mt-4 text-3xl md:text-4xl font-black leading-tight">
                                    We’d love to hear from you
                                </h2>
                                <p className="mt-5 text-white/85 leading-8 text-base md:text-lg">
                                    Whether you have a question about services, pricing, support,
                                    or anything else, our team is ready to answer all your
                                    questions.
                                </p>

                                <div className="mt-8 space-y-5">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center border border-white/10">
                                            <MessageSquare className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg">Fast Response</h4>
                                            <p className="text-white/80 text-sm leading-7">
                                                Our team aims to reply as quickly as possible to every inquiry.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center border border-white/10">
                                            <Headphones className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg">Dedicated Support</h4>
                                            <p className="text-white/80 text-sm leading-7">
                                                We provide professional guidance for all your requirements.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center border border-white/10">
                                            <Globe className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg">Global Reach</h4>
                                            <p className="text-white/80 text-sm leading-7">
                                                Helping clients across locations with reliable communication.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-[32px] bg-white border border-slate-200 p-8 shadow-sm">
                                <h3 className="text-2xl font-black text-slate-900">
                                    Office Hours
                                </h3>
                                <div className="mt-6 space-y-4 text-slate-600">
                                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                        <span>Monday - Friday</span>
                                        <span className="font-semibold text-slate-900">9:00 AM - 7:00 PM</span>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                        <span>Saturday</span>
                                        <span className="font-semibold text-slate-900">10:00 AM - 5:00 PM</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Sunday</span>
                                        <span className="font-semibold text-rose-500">Closed</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Form */}
                        <div className="rounded-[32px] bg-white border border-slate-200 p-8 md:p-10 shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
                            <div className="mb-8">
                                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
                                    Send Message
                                </p>
                                <h2 className="mt-3 text-3xl md:text-4xl font-black text-slate-900">
                                    Contact our team
                                </h2>
                                <p className="mt-3 text-slate-500 leading-7">
                                    Fill out the form below and we’ll get back to you shortly.
                                </p>
                            </div>

                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block mb-2 text-sm font-bold text-slate-700">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            placeholder="Enter first name"
                                            className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-bold text-slate-700">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            placeholder="Enter last name"
                                            className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                        />
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block mb-2 text-sm font-bold text-slate-700">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Enter email address"
                                            className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-bold text-slate-700">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Enter phone number"
                                            className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-bold text-slate-700">
                                        Country Of Interest
                                    </label>
                                    <input
                                        type="text"
                                        name="countryOfInterest"
                                        placeholder="Enter country"
                                        className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-bold text-slate-700">
                                        Visa Category (optional)
                                    </label>
                                    <input
                                        type="text"
                                        name="visaCategory"
                                        placeholder="Enter visa category"
                                        className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-bold text-slate-700">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        rows="6"
                                        placeholder="Write your message here..."
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm outline-none transition resize-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-6 py-4 text-sm font-bold text-white shadow-[0_18px_45px_rgba(79,70,229,0.28)] transition duration-300 hover:-translate-y-0.5 active:scale-[0.99] flex items-center justify-center gap-2"
                                >
                                    <Send className="w-4 h-4" />
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-b from-white to-slate-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">

                    {/* Heading */}
                    <div className="text-center mb-12">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
                            Contact Us
                        </p>
                        <h2 className="mt-3 text-3xl md:text-4xl font-black text-slate-900">
                            Speak to our Consultant
                        </h2>
                        <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
                            Connect with our global experts across different regions for quick support and personalized guidance.
                        </p>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">

                        {/* India */}
                        <div className="group bg-white border border-slate-200 rounded-3xl p-6 text-center shadow-sm hover:shadow-xl transition hover:-translate-y-2">
                            <img
                                src="https://flagcdn.com/w80/in.png"
                                alt="India"
                                className="w-12 h-12 mx-auto rounded-full shadow mb-4"
                            />
                            <h3 className="text-lg font-bold text-slate-900">India</h3>
                            <p className="text-sm text-slate-500 mt-1">India</p>
                            <p className="mt-3 font-semibold text-indigo-600">
                                +91 7670800001
                            </p>
                        </div>

                        {/* UAE */}
                        <div className="group bg-white border border-slate-200 rounded-3xl p-6 text-center shadow-sm hover:shadow-xl transition hover:-translate-y-2">
                            <img
                                src="https://flagcdn.com/w80/ae.png"
                                alt="UAE"
                                className="w-12 h-12 mx-auto rounded-full shadow mb-4"
                            />
                            <h3 className="text-lg font-bold text-slate-900">UAE</h3>
                            <p className="text-sm text-slate-500 mt-1">United Arab Emirates</p>
                            <p className="mt-3 font-semibold text-indigo-600">
                                +971 (0) 42 483 900
                            </p>
                        </div>

                        {/* Australia */}
                        <div className="group bg-white border border-slate-200 rounded-3xl p-6 text-center shadow-sm hover:shadow-xl transition hover:-translate-y-2">
                            <img
                                src="https://flagcdn.com/w80/au.png"
                                alt="Australia"
                                className="w-12 h-12 mx-auto rounded-full shadow mb-4"
                            />
                            <h3 className="text-lg font-bold text-slate-900">Australia</h3>
                            <p className="text-sm text-slate-500 mt-1">Australia</p>
                            <p className="mt-3 font-semibold text-indigo-600">
                                +61 3 99394818
                            </p>
                        </div>

                        {/* Canada */}
                        <div className="group bg-white border border-slate-200 rounded-3xl p-6 text-center shadow-sm hover:shadow-xl transition hover:-translate-y-2">
                            <img
                                src="https://flagcdn.com/w80/ca.png"
                                alt="Canada"
                                className="w-12 h-12 mx-auto rounded-full shadow mb-4"
                            />
                            <h3 className="text-lg font-bold text-slate-900">Canada</h3>
                            <p className="text-sm text-slate-500 mt-1">Canada</p>
                            <p className="mt-3 font-semibold text-indigo-600">
                                +1 226 243 2213
                            </p>
                        </div>

                        {/* UK */}
                        <div className="group bg-white border border-slate-200 rounded-3xl p-6 text-center shadow-sm hover:shadow-xl transition hover:-translate-y-2">
                            <img
                                src="https://flagcdn.com/w80/gb.png"
                                alt="UK"
                                className="w-12 h-12 mx-auto rounded-full shadow mb-4"
                            />
                            <h3 className="text-lg font-bold text-slate-900">UK</h3>
                            <p className="text-sm text-slate-500 mt-1">United Kingdom</p>
                            <p className="mt-3 font-semibold text-indigo-600">
                                +44 1253226009
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* Map / Location Section */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="rounded-[32px] overflow-hidden border border-slate-200 bg-white shadow-sm">
                        <div className="p-8 border-b border-slate-100">
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
                                Our Location
                            </p>
                            <h2 className="mt-3 text-3xl font-black text-slate-900">
                                Find us easily
                            </h2>
                        </div>

                        <div className="h-[320px] md:h-[420px] bg-gradient-to-br from-slate-100 to-indigo-50 flex items-center justify-center text-center px-6">
                            <div>
                                <MapPin className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-slate-900">
                                    Map Placeholder
                                </h3>
                                <p className="mt-2 text-slate-600">
                                    Embed your Google Map or location iframe here.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="pt-4 pb-20">
                <div className="max-w-5xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
                            FAQs
                        </p>
                        <h2 className="mt-3 text-3xl md:text-4xl font-black text-slate-900">
                            Frequently asked questions
                        </h2>
                    </div>

                    <div className="space-y-5">
                        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900">
                                How soon will I get a response?
                            </h3>
                            <p className="mt-2 text-slate-600 leading-7">
                                We aim to respond to all inquiries as quickly as possible during working hours.
                            </p>
                        </div>

                        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900">
                                Can I contact you for support and sales?
                            </h3>
                            <p className="mt-2 text-slate-600 leading-7">
                                Yes, you can use this contact page for both support questions and business inquiries.
                            </p>
                        </div>

                        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900">
                                Can I visit your office directly?
                            </h3>
                            <p className="mt-2 text-slate-600 leading-7">
                                Yes, you can visit during our office hours. It is better to schedule an appointment first.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactUs;