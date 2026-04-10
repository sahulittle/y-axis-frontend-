import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const VisaFaqAccordion = ({ faqs = [] }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-base md:text-lg font-semibold text-slate-900">
                {faq.question}
              </span>
              <ChevronDown
                size={20}
                className={`shrink-0 text-slate-500 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-6 pb-6 text-slate-600 leading-7">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default VisaFaqAccordion;