import { request } from "../../lib/axios/client";

export const listPayments = (params) => {
  return request({
    url: "/visaassist/payments",
    method: "GET",
    params,
  });
};

export const createManualPayment = (payload) => {
  return request({
    url: "/visaassist/payments/manual",
    method: "POST",
    data: payload,
  });
};

export const updatePaymentStatus = (paymentId, payload) => {
  return request({
    url: `/visaassist/payments/${paymentId}/status`,
    method: "PATCH",
    data: payload,
  });
};
