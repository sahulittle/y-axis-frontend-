import { request } from "../../lib/axios/client";

export const listAppointments = (params) => {
  return request({
    url: "/visaassist/appointments",
    method: "GET",
    params,
  });
};

export const updateAppointmentStatus = (appointmentId, payload) => {
  return request({
    url: `/visaassist/appointments/${appointmentId}/status`,
    method: "PATCH",
    data: payload,
  });
};

export const deleteAppointment = (appointmentId) => {
  return request({
    url: `/visaassist/appointments/${appointmentId}`,
    method: "DELETE",
  });
};
