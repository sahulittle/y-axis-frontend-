export const queryKeys = {
  auth: {
    me: ["auth", "me"],
  },
  dashboard: {
    summary: ["dashboard", "summary"],
  },
  leads: {
    all: ["leads"],
    list: (params) => ["leads", "list", params],
    detail: (leadId) => ["leads", "detail", leadId],
  },
  applicants: {
    all: ["applicants"],
    list: (params) => ["applicants", "list", params],
    detail: (applicantId) => ["applicants", "detail", applicantId],
  },
  cases: {
    all: ["cases"],
    list: (params) => ["cases", "list", params],
    detail: (caseId) => ["cases", "detail", caseId],
  },
  staff: {
    assignable: ["staff", "assignable"],
  },
};
