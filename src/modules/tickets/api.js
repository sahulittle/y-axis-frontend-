import { request } from "../../lib/axios/client";

export const listTickets = (params) => {
  return request({
    url: "/admin/tickets",
    method: "GET",
    params,
  });
};

export const getTicketById = (id) => {
  return request({
    url: `/admin/tickets/${id}`,
    method: "GET",
  });
};

export const updateTicketStatus = (id, payload) => {
  return request({
    url: `/admin/tickets/${id}/status`,
    method: "PATCH",
    data: payload,
  });
};

export const replyToTicket = (id, payload) => {
  const formData = new FormData();
  formData.append("message", payload.message || "");

  return request({
    url: `/admin/tickets/${id}/replies`,
    method: "POST",
    data: formData,
  });
};
