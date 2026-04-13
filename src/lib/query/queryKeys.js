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
  documents: {
    all: ["documents"],
    list: (params) => ["documents", "list", params],
    detail: (id) => ["documents", "detail", id],
  },
  appointments: {
    all: ["appointments"],
    list: (params) => ["appointments", "list", params],
    detail: (id) => ["appointments", "detail", id],
  },
  payments: {
    all: ["payments"],
    list: (params) => ["payments", "list", params],
    detail: (id) => ["payments", "detail", id],
  },
  services: {
    all: ["services"],
    list: (params) => ["services", "list", params],
    detail: (id) => ["services", "detail", id],
  },
  checklists: {
    all: ["checklists"],
    list: (params) => ["checklists", "list", params],
    detail: (id) => ["checklists", "detail", id],
  },
  templates: {
    all: ["templates"],
    list: (params) => ["templates", "list", params],
    detail: (id) => ["templates", "detail", id],
  },
  countryUpdates: {
    all: ["country-updates"],
    list: (params) => ["country-updates", "list", params],
    detail: (id) => ["country-updates", "detail", id],
  },
  reports: {
    revenue: ["reports", "revenue"],
    conversion: ["reports", "conversion"],
    staffPerformance: ["reports", "staff-performance"],
    applications: ["reports", "applications"],
  },
  settings: {
    all: ["settings"],
    list: (params) => ["settings", "list", params],
  },
  compliance: {
    logs: (params) => ["compliance", "logs", params],
    summary: ["compliance", "summary"],
  },
  users: {
    all: ["users"],
    list: (params) => ["users", "list", params],
    detail: (id) => ["users", "detail", id],
  },
  countries: {
    all: ["countries"],
    list: (params) => ["countries", "list", params],
    detail: (id) => ["countries", "detail", id],
  },
  visaCategories: {
    all: ["visa-categories"],
    list: (params) => ["visa-categories", "list", params],
    detail: (id) => ["visa-categories", "detail", id],
  },
  visaTypes: {
    all: ["visa-types"],
    list: (params) => ["visa-types", "list", params],
    detail: (id) => ["visa-types", "detail", id],
  },
  applications: {
    all: ["applications"],
    list: (params) => ["applications", "list", params],
    detail: (id) => ["applications", "detail", id],
  },
  enquiries: {
    all: ["enquiries"],
    list: (params) => ["enquiries", "list", params],
    detail: (id) => ["enquiries", "detail", id],
  },
  tickets: {
    all: ["tickets"],
    list: (params) => ["tickets", "list", params],
    detail: (id) => ["tickets", "detail", id],
  },
  userPortal: {
    profile: ["user-portal", "profile"],
    dashboardSummary: ["user-portal", "dashboard-summary"],
    applications: {
      all: ["user-portal", "applications"],
      list: (params) => ["user-portal", "applications", "list", params],
      detail: (id) => ["user-portal", "applications", "detail", id],
    },
    tickets: {
      all: ["user-portal", "tickets"],
      list: (params) => ["user-portal", "tickets", "list", params],
      detail: (id) => ["user-portal", "tickets", "detail", id],
    },
    documents: {
      all: ["user-portal", "documents"],
      list: (params) => ["user-portal", "documents", "list", params],
    },
    appointments: {
      all: ["user-portal", "appointments"],
      list: (params) => ["user-portal", "appointments", "list", params],
    },
  },
};
