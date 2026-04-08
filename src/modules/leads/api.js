import { request } from "../../lib/axios/client";

export const listLeads = (params) => {
  return request({
    url: "/visaassist/leads",
    method: "GET",
    params,
  });
};

export const getLeadById = async (leadId) => {
  const data = await listLeads({ search: leadId, page: 1, limit: 20 });
  const items = data?.items || [];
  const found = items.find((item) => item._id === leadId || item.id === leadId);

  if (!found) {
    throw new Error("Lead not found");
  }

  return found;
};

export const updateLeadStage = (leadId, payload) => {
  return request({
    url: `/visaassist/leads/${leadId}/stage`,
    method: "PATCH",
    data: payload,
  });
};

export const assignLead = (leadId, payload) => {
  return request({
    url: `/visaassist/leads/${leadId}/assign`,
    method: "PATCH",
    data: payload,
  });
};

export const addLeadNote = (leadId, payload) => {
  return request({
    url: `/visaassist/leads/${leadId}/notes`,
    method: "POST",
    data: payload,
  });
};

export const listAssignableStaff = async () => {
  const data = await request({
    url: "/visaassist/staff",
    method: "GET",
    params: { page: 1, limit: 100 },
  });

  return data?.items || [];
};
