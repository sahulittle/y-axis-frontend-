import { useMutation } from "@tanstack/react-query";
import { forgotPassword, resetPassword, staffLogin } from "./api";

export const useStaffLogin = () => {
  return useMutation({
    mutationFn: staffLogin,
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
  });
};
