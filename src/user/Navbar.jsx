import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Menu,
  X,
  Phone,
  Search,
  User,
  MessageCircle,
  ChevronDown,
} from "lucide-react";
import { clearSession, readSession } from "../shared/auth/session";
import { getPublicSiteSettings } from "./api/publicApi";
import logo from '../../public/logo.jpeg'

const navItems = [
  { label: "Free Eligiblity Check", href: "/free-eligibility-check" },
  { label: "Migrate", href: "/migrate" },
  { label: "Study", href: "/study" },
  { label: "Visa", href: "/visa" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { token, user } = readSession();
  const isLoggedIn = Boolean(token);

  const siteSettingsQuery = useQuery({
    queryKey: ["public-site-settings"],
    queryFn: getPublicSiteSettings,
    staleTime: 5 * 60 * 1000,
  });

  const siteSettings = siteSettingsQuery.data?.values || {};
  const siteName = siteSettings.siteName || "Visaassist";
  const siteTagline = siteSettings.siteTagline || "Global Services";
  const siteLogoUrl = siteSettings.siteLogoUrl || "";
  const supportPhone = siteSettings.supportPhone || "+91 12345 67890";
  const whatsappNumber = siteSettings.whatsappNumber || "911234567890";
  const telHref = `tel:${supportPhone.replace(/\s+/g, "")}`;
  const whatsappHref = `https://wa.me/${String(whatsappNumber || "").replace(/[^0-9]/g, "")}`;

  const handleLogout = () => {
    clearSession();
    setOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full sticky top-0 z-50">
      {/* Top Navbar */}
      <div className="bg-slate-950 text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden md:flex items-center justify-between h-12 text-sm">
            <div className="flex items-center gap-6">
              <a
                href={telHref}
                className="flex items-center gap-2 text-white/90 hover:text-white transition"
              >
                <Phone size={16} />
                <span>{supportPhone}</span>
              </a>

              <a
                href={whatsappHref}
                className="flex items-center gap-2 text-green-400 hover:text-green-300 transition"
              >
                <MessageCircle size={16} />
                <span>WhatsApp</span>
              </a>
            </div>

            <div className="flex items-center gap-3">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/user/dashboard"
                    className="px-3 py-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition"
                  >
                    Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="px-3 py-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="px-3 py-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition"
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/login"
                    className="px-3 py-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition"
                  >
                    Login
                  </Link>
                </>
              )}
              <a
                href="/contact"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 text-slate-950 font-semibold hover:scale-[1.02] transition"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Mobile Top Navbar */}
          <div className="md:hidden flex items-center justify-between h-11 text-sm">
            <a
              href={telHref}
              className="flex items-center gap-2 text-white/90"
            >
              <Phone size={15} />
              <span>{supportPhone}</span>
            </a>
            <a
              href={whatsappHref}
              className="text-green-400 font-medium"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white/95 backdrop-blur-xl shadow-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Logo + Links */}
            <div className="flex items-center gap-10 min-w-0">
              <a href="/" className="flex items-center gap-3 shrink-0">
                {siteLogoUrl ? (
                  <img
                    src={logo}
                    alt={`${siteName} logo`}
                    className="h-12 w-12 rounded-2xl border border-slate-200 object-cover shadow-lg"
                  />
                ) : (
                  <img
                    src={logo}
                    alt={`${siteName} logo`}
                    className="h-12 w-12 rounded-2xl border border-slate-200 object-cover shadow-lg"
                  />
                  // <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-orange-500 via-amber-400 to-yellow-300 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg">
                  //   {siteName.slice(0, 1).toUpperCase()}
                  // </div>
                )}
                <div className="leading-tight">
                  <div className="text-xl font-extrabold text-slate-900 tracking-tight">
                    {siteName}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    {siteTagline}
                  </div>
                </div>
              </a>

              <nav className="hidden lg:flex items-center gap-1">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group px-4 py-2.5 rounded-full text-slate-700 font-medium hover:text-slate-950 hover:bg-orange-50 transition flex items-center gap-1"
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDown
                        size={15}
                        className="text-slate-400 group-hover:text-orange-500 transition"
                      />
                    )}
                  </a>
                ))}
              </nav>
            </div>

            {/* Search + User */}
            <div className="hidden md:flex items-center gap-3 flex-1 justify-end">
              <div className="relative w-full max-w-xs xl:max-w-sm">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search here..."
                  className="w-full h-12 pl-11 pr-4 rounded-full border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition"
                />
              </div>

              <div className="relative" ref={dropdownRef}>
                {/* USER BUTTON */}
                <button
                  onClick={() => setOpen(!open)}
                  className="h-12 w-12 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center overflow-hidden transition"
                >
                  {isLoggedIn && user?.avatarUrl ? (
                    <img src={user.avatarUrl} alt="User avatar" className="h-full w-full object-cover" />
                  ) : (
                    <User size={19} />
                  )}
                </button>

                {/* DROPDOWN */}
                {open && (
                  <div className="absolute right-0 mt-3 w-52 rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden z-50">

                    {/* USER INFO */}
                    <div className="px-4 py-3 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        {isLoggedIn && user?.avatarUrl ? (
                          <img src={user.avatarUrl} alt="User avatar" className="h-9 w-9 rounded-full object-cover" />
                        ) : (
                          <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                            <User size={16} />
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{user?.fullName || `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Guest"}</p>
                          <p className="text-xs text-slate-500">{user?.email || "Not logged in"}</p>
                        </div>
                      </div>
                    </div>

                    {/* MENU ITEMS */}
                    {isLoggedIn ? (
                      <>
                        <button
                          className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition"
                          onClick={() => {
                            setOpen(false);
                            navigate("/user/dashboard");
                          }}
                        >
                          Dashboard
                        </button>

                        <button
                          className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition"
                          onClick={() => {
                            setOpen(false);
                            navigate("/user/profile");
                          }}
                        >
                          Profile
                        </button>

                        <button
                          className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition"
                          onClick={() => {
                            setOpen(false);
                            navigate("/login");
                          }}
                        >
                          Login
                        </button>
                        <button
                          className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition"
                          onClick={() => {
                            setOpen(false);
                            navigate("/signup");
                          }}
                        >
                          Sign Up
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden h-11 w-11 rounded-xl border border-slate-200 text-slate-700 flex items-center justify-center bg-white"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full h-12 pl-11 pr-4 rounded-full border border-slate-200 bg-slate-50 text-slate-800 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition"
                />
              </div>

              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center justify-between px-4 py-3 rounded-2xl text-slate-700 hover:bg-orange-50 hover:text-slate-950 transition"
                  >
                    <span className="font-medium">{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDown size={16} className="text-slate-400" />
                    )}
                  </a>
                ))}
              </nav>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/user/dashboard"
                      className="text-center px-4 py-3 rounded-2xl border border-slate-200 font-medium text-slate-700 hover:bg-slate-50 transition"
                    >
                      Dashboard
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="text-center px-4 py-3 rounded-2xl border border-slate-200 font-medium text-slate-700 hover:bg-slate-50 transition"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/signup"
                      className="text-center px-4 py-3 rounded-2xl border border-slate-200 font-medium text-slate-700 hover:bg-slate-50 transition"
                    >
                      Sign Up
                    </Link>
                    <Link
                      to="/login"
                      className="text-center px-4 py-3 rounded-2xl border border-slate-200 font-medium text-slate-700 hover:bg-slate-50 transition"
                    >
                      Login
                    </Link>
                  </>
                )}
                <a
                  href="/contact"
                  className="col-span-2 text-center px-4 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 text-slate-950 font-semibold shadow-md"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;