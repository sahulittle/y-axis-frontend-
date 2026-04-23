import React from "react";
import { FaYoutube, FaInstagram, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";
import { Phone, Mail, Globe2 } from "lucide-react"; // keep lucide for UI icons

const footerData = [
  {
    title: "ABOUT US",
    links: [
      "About Visaassist",
      "Careers",
      "CSR",
      "Office Network",
      "Press and News",
    ],
  },
  {
    title: "TESTIMONIALS",
    links: [
      "Success Videos",
      "Customer Reviews",
      "Social Reviews",
      "Visa Success",
    ],
  },
  {
    title: "BLOGS",
    links: [
      "Work Abroad",
      "Immigration Blog",
      "Newsletter",
      "Visa Stories",
      "Immigration Statistics",
    ],
  },
  {
    title: "Indian Languages",
    links: ["Hindi", "Tamil", "Gujarati", "Telugu", "Marathi", "Kannada"],
  },
  {
    title: "Foreign Languages",
    links: [
      "Arabic",
      "French",
      "Chinese",
      "German",
      "Korean",
      "Ukranian",
      "Italian",
    ],
  },
];

const contactData = [
  // {
  //   title: "INDIA",
  //   subtitle: "India",
  //   phone: "+91 7670800000",
  //   email: "info@visaassist.com",
  //   website: "www.visaassist.com",
  // },
  // {
  //   title: "AUSTRALIA",
  //   subtitle: "Australia",
  //   phone: "+61 399394818",
  //   email: "australia@visaassist.com.au",
  //   website: "www.visaassist.com.au",
  // },
  {
    title: "USA",
    subtitle: "USA",
    phone: "+19729720314",
    email: "usa@visaassist.org",
    website: "www.visaassist.org",
  },
  // {
  //   title: "UK",
  //   subtitle: "UK",
  //   phone: "+44 1253226009",
  //   email: "info@visaasist.co.uk",
  //   website: "www.visaassist.co.uk",
  // },
  // {
  //   title: "CANADA",
  //   subtitle: "Canada",
  //   phone: "+1 226 243 2213",
  //   email: "info@visaassist.ca",
  //   website: "www.visaassist.ca",
  // },
];

const socialLinks = [
  { icon: <FaYoutube size={18} />, label: "YouTube" },
  { icon: <FaInstagram size={18} />, label: "Instagram" },
  { icon: <FaTwitter size={18} />, label: "Twitter" },
  { icon: <FaLinkedin size={18} />, label: "LinkedIn" },
  { icon: <FaFacebook size={18} />, label: "Facebook" },
];

const Footer = () => {
  return (
    <footer className="w-full bg-slate-950 text-white">
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
            {footerData.map((section, index) => (
              <div key={index}>
                <h3 className="text-sm font-bold tracking-wider text-orange-400 uppercase mb-5">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="text-sm text-slate-300 hover:text-white transition"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="text-sm font-bold tracking-wider text-orange-400 uppercase mb-5">
                CONTACT US
              </h3>
              <p className="text-sm text-slate-300 leading-7">
                Global offices and trusted support for immigration, study, work,
                and overseas career guidance.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-slate-950 font-extrabold text-lg">
              Y
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-white">Visaassist</h3>
              <p className="text-sm text-slate-400">
                Overseas Career & Immigration Consultant
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">
            {contactData.map((item, index) => (
              <div
                key={index}
                className="rounded-[24px] border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition-all duration-300"
              >
                <p className="text-xs font-bold tracking-widest text-orange-400 uppercase">
                  {item.title}
                </p>
                <h4 className="mt-2 text-lg font-bold text-white">
                  {item.subtitle}
                </h4>

                <div className="mt-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <Phone size={16} className="text-orange-400 mt-1 shrink-0" />
                    <a
                      href={`tel:${item.phone}`}
                      className="text-sm text-slate-300 hover:text-white transition"
                    >
                      {item.phone}
                    </a>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail size={16} className="text-orange-400 mt-1 shrink-0" />
                    <a
                      href={`mailto:${item.email}`}
                      className="text-sm text-slate-300 hover:text-white transition break-all"
                    >
                      {item.email}
                    </a>
                  </div>

                  <div className="flex items-start gap-3">
                    <Globe2 size={16} className="text-orange-400 mt-1 shrink-0" />
                    <a
                      href={`https://${item.website}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-slate-300 hover:text-white transition break-all"
                    >
                      {item.website}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <p className="text-sm text-slate-400 leading-7">
              © 2026 Visaassist. All rights reserved.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="text-sm font-semibold text-white">Follow us</p>

            <div className="flex items-center gap-3">
              {socialLinks.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  aria-label={item.label}
                  className="h-11 w-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-300 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;