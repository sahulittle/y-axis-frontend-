import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Home, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { useToast } from "../app/providers/ToastProvider";
import { signupCustomer } from "../user/api/publicApi";

const Signup = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleGoogleSignup = () => {
    window.open("https://accounts.google.com/", "_self");
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      setIsSubmitting(true);
      await signupCustomer(formData);
      toast.success("Account created successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Signup failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 rounded-[32px] overflow-hidden bg-white shadow-[0_20px_80px_rgba(15,23,42,0.12)] border border-slate-200">
        
        {/* Left Side */}
        <div className="hidden lg:flex relative bg-gradient-to-br from-indigo-700 via-violet-700 to-fuchsia-700 text-white p-12 xl:p-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.12),_transparent_35%)]" />
          
          <div className="relative z-10 flex flex-col justify-center">
            <p className="inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-md mb-6">
              Welcome
            </p>

            <h1 className="text-4xl xl:text-5xl font-black leading-tight max-w-xl">
              Create your account and get started today.
            </h1>

            <p className="mt-6 text-white/85 text-lg leading-8 max-w-lg">
              Join with a clean and simple signup experience. Fast, modern, and
              easy to use across all devices.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-4 max-w-xl">
              <div className="rounded-2xl bg-white/10 border border-white/15 p-5 backdrop-blur-md">
                <p className="text-2xl font-extrabold">Fast</p>
                <p className="text-xs uppercase tracking-[0.18em] text-white/70 mt-2">
                  Signup Flow
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 border border-white/15 p-5 backdrop-blur-md">
                <p className="text-2xl font-extrabold">Clean</p>
                <p className="text-xs uppercase tracking-[0.18em] text-white/70 mt-2">
                  Modern UI
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 border border-white/15 p-5 backdrop-blur-md">
                <p className="text-2xl font-extrabold">Easy</p>
                <p className="text-xs uppercase tracking-[0.18em] text-white/70 mt-2">
                  To Use
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="px-6 py-8 sm:px-10 md:px-12 lg:px-14 bg-white">
          <div className="mx-auto max-w-[460px]">
            <div className="mb-8 flex items-center justify-between">
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                <Home className="h-4 w-4" />
                Home
              </button>

              <div className="rounded-2xl bg-slate-100 p-1">
                <div className="flex items-center gap-1">
                  <Link
                    to="/login"
                    className="rounded-xl px-5 py-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
                  >
                    Login
                  </Link>
                  <button
                    type="button"
                    className="rounded-xl bg-white px-5 py-2 text-sm font-bold text-indigo-600 shadow-sm"
                  >
                    Signup
                  </button>
                </div>
              </div>
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600 mb-3">
              Start for free
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              Create your account
            </h2>
            <p className="mt-3 text-slate-500 leading-7">
              Enter your details below to create your account.
            </p>

            <button
              onClick={handleGoogleSignup}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>

            <div className="relative my-8">
              <div className="h-px w-full bg-slate-200" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
                Or sign up with email
              </span>
            </div>

            <form onSubmit={handleSignup} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="hello@example.com"
                  required
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
                  <div className="text-sm text-slate-600">
                    Use at least 6 characters for a stronger password.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="terms"
                  className="text-sm leading-6 text-slate-500"
                >
                  I agree to the{" "}
                  <span className="font-semibold text-indigo-600 cursor-pointer hover:underline">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="font-semibold text-indigo-600 cursor-pointer hover:underline">
                    Privacy Policy
                  </span>
                  .
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-6 py-4 text-sm font-bold text-white shadow-[0_18px_45px_rgba(79,70,229,0.28)] transition duration-300 hover:-translate-y-0.5 active:scale-[0.99]"
              >
                {isSubmitting ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500">
              Already have an account?
              <Link
                to="/login"
                className="ml-2 font-bold text-indigo-600 hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;