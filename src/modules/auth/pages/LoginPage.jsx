import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";
import { loginSchema } from "../schemas";
import { useStaffLogin } from "../hooks";
import Input from "../../../shared/ui/Input";
import Button from "../../../shared/ui/Button";
import { useToast } from "../../../app/providers/ToastProvider";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useStaffLogin();

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await loginMutation.mutateAsync(values);
      toast.success("Welcome back");
      const redirectPath = location.state?.from?.pathname || "/admin/dashboard";
      navigate(redirectPath, { replace: true });
    } catch (error) {
      toast.error(error.message || "Login failed");
    }
  });

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#1f2937,_#0f172a_45%,_#052e2b)] grid place-items-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200/20 bg-white p-8 shadow-2xl">
        <p className="text-xs uppercase tracking-[0.2em] text-teal-600">Visaassist.org</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Staff Login</h1>
        <p className="mt-2 text-sm text-slate-600">Manage leads, cases, documents, and compliance operations.</p>

        <form onSubmit={onSubmit} className="mt-7 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
            <Input type="email" placeholder="ops@visaassist.org" {...form.register("email")} />
            {form.formState.errors.email ? (
              <p className="mt-1 text-xs text-rose-600">{form.formState.errors.email.message}</p>
            ) : null}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
            <Input type="password" placeholder="Enter password" {...form.register("password")} />
            {form.formState.errors.password ? (
              <p className="mt-1 text-xs text-rose-600">{form.formState.errors.password.message}</p>
            ) : null}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate("/admin/forgot-password")}
              className="text-xs font-medium text-slate-600 hover:text-slate-900"
            >
              Forgot password?
            </button>
          </div>

          <Button className="w-full" type="submit" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
