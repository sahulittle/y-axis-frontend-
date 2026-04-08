import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPasswordSchema } from "../schemas";
import { useResetPassword } from "../hooks";
import Input from "../../../shared/ui/Input";
import Button from "../../../shared/ui/Button";
import { useToast } from "../../../app/providers/ToastProvider";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();
  const mutation = useResetPassword();

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: searchParams.get("token") || "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await mutation.mutateAsync({ token: values.token, newPassword: values.newPassword });
      toast.success("Password reset successful");
      navigate("/admin/login", { replace: true });
    } catch (error) {
      toast.error(error.message || "Failed to reset password");
    }
  });

  return (
    <div className="min-h-screen grid place-items-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7">
        <h1 className="text-2xl font-bold text-slate-900">Reset Password</h1>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Reset Token</label>
            <Input placeholder="Paste token" {...form.register("token")} />
            {form.formState.errors.token ? (
              <p className="mt-1 text-xs text-rose-600">{form.formState.errors.token.message}</p>
            ) : null}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">New Password</label>
            <Input type="password" {...form.register("newPassword")} />
            {form.formState.errors.newPassword ? (
              <p className="mt-1 text-xs text-rose-600">{form.formState.errors.newPassword.message}</p>
            ) : null}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Confirm Password</label>
            <Input type="password" {...form.register("confirmPassword")} />
            {form.formState.errors.confirmPassword ? (
              <p className="mt-1 text-xs text-rose-600">{form.formState.errors.confirmPassword.message}</p>
            ) : null}
          </div>

          <Button className="w-full" type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
