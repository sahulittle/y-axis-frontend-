import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { forgotPasswordSchema } from "../schemas";
import { useForgotPassword } from "../hooks";
import Input from "../../../shared/ui/Input";
import Button from "../../../shared/ui/Button";
import { useToast } from "../../../app/providers/ToastProvider";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const mutation = useForgotPassword();

  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await mutation.mutateAsync(values);
      toast.success("Reset instructions sent if email exists");
      navigate("/admin/login", { replace: true });
    } catch (error) {
      toast.error(error.message || "Failed to process request");
    }
  });

  return (
    <div className="min-h-screen grid place-items-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7">
        <h1 className="text-2xl font-bold text-slate-900">Forgot Password</h1>
        <p className="mt-2 text-sm text-slate-600">Enter your staff email to receive reset instructions.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
            <Input type="email" placeholder="staff@visaassist.org" {...form.register("email")} />
            {form.formState.errors.email ? (
              <p className="mt-1 text-xs text-rose-600">{form.formState.errors.email.message}</p>
            ) : null}
          </div>

          <Button className="w-full" type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Submitting..." : "Send Reset Link"}
          </Button>

          <Button className="w-full" type="button" variant="secondary" onClick={() => navigate("/admin/login")}>
            Back to Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
