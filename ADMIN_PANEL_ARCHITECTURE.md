# Visaassist.org Admin Panel Architecture Blueprint

Date: 2026-04-08
Target stack: React + Vite + Tailwind + React Router + Axios + React Query + React Hook Form + Zod + Recharts + Headless UI

This blueprint is designed for operational staff handling high daily case volume. It prioritizes speed, readability, safe workflows, and modular growth.

## 1) Recommended Frontend Folder Structure

frontend/src
- app
  - providers
    - AppProviders.jsx
    - QueryProvider.jsx
    - RouterProvider.jsx
    - ThemeProvider.jsx
    - ToastProvider.jsx
  - routes
    - index.jsx
    - routeGuards.jsx
    - routeMeta.js
  - store
    - authStore.js
    - uiStore.js
  - config
    - env.js
    - constants.js
    - permissions.js
    - statusMaps.js
- lib
  - axios
    - client.js
    - interceptors.js
  - query
    - queryClient.js
    - queryKeys.js
  - utils
    - date.js
    - currency.js
    - formatters.js
    - table.js
  - validators
    - commonSchemas.js
- modules
  - auth
    - api.js
    - hooks.js
    - schemas.js
    - pages
      - LoginPage.jsx
      - ForgotPasswordPage.jsx
      - ResetPasswordPage.jsx
    - components
      - LoginForm.jsx
  - dashboard
    - api.js
    - hooks.js
    - pages
      - DashboardPage.jsx
    - components
      - KpiGrid.jsx
      - SourceChart.jsx
      - CasesStatusChart.jsx
      - CountryVolumeChart.jsx
      - StaffWorkloadWidget.jsx
      - RecentActivityFeed.jsx
  - leads
    - api.js
    - hooks.js
    - schemas.js
    - pages
      - LeadsListPage.jsx
      - LeadDetailPage.jsx
    - components
      - LeadsFiltersBar.jsx
      - LeadStageSelect.jsx
      - LeadAssignDrawer.jsx
      - LeadNotesPanel.jsx
      - ConvertLeadModal.jsx
  - services
    - api.js
    - hooks.js
    - schemas.js
    - pages
      - CountriesPage.jsx
      - VisaCategoriesPage.jsx
      - ServicePackagesPage.jsx
      - PricingConfigPage.jsx
    - components
      - ServiceStatusToggle.jsx
  - checklists
    - api.js
    - hooks.js
    - schemas.js
    - pages
      - ChecklistTemplatesPage.jsx
      - ChecklistTemplateDetailPage.jsx
    - components
      - ChecklistItemEditor.jsx
      - ChecklistVersionTimeline.jsx
      - AttachChecklistDrawer.jsx
  - applicants
    - api.js
    - hooks.js
    - schemas.js
    - pages
      - ApplicantsListPage.jsx
      - ApplicantProfilePage.jsx
    - components
      - PassportDetailsCard.jsx
      - FamilyDependentsTable.jsx
      - ConsentSection.jsx
  - cases
    - api.js
    - hooks.js
    - schemas.js
    - pages
      - CasesListPage.jsx
      - CaseDetailPage.jsx
    - components
      - CaseStatusGuardedSelect.jsx
      - CasePriorityBadge.jsx
      - CaseTabs.jsx
      - CaseTimeline.jsx
      - InternalNotesPanel.jsx
      - CustomerNotesPanel.jsx
  - documents
    - api.js
    - hooks.js
    - schemas.js
    - pages
      - DocumentsPage.jsx
    - components
      - FileUploader.jsx
      - DocumentPreviewDrawer.jsx
      - DocStatusBoard.jsx
      - FileHistoryTimeline.jsx
  - appointments
    - api.js
    - hooks.js
    - schemas.js
    - pages
      - AppointmentsPage.jsx
    - components
      - AppointmentCalendar.jsx
      - AppointmentTable.jsx
      - RescheduleLogDrawer.jsx
  - payments
    - api.js
    - hooks.js
    - schemas.js
    - pages
      - PaymentsPage.jsx
      - InvoiceDetailPage.jsx
    - components
      - PaymentStatusBadge.jsx
      - AddPaymentModal.jsx
      - InvoiceViewer.jsx
      - TransactionHistoryTable.jsx
  - templates
    - api.js
    - hooks.js
    - schemas.js
    - pages
      - TemplatesPage.jsx
    - components
      - TemplateEditor.jsx
      - PlaceholderPicker.jsx
      - TemplatePreviewPane.jsx
  - countryUpdates
    - api.js
    - hooks.js
    - schemas.js
    - pages
      - CountryUpdatesPage.jsx
  - reports
    - api.js
    - hooks.js
    - pages
      - ReportsPage.jsx
    - components
      - ExportCsvButton.jsx
      - RevenueReportChart.jsx
      - ConversionReportChart.jsx
      - StaffPerformanceTable.jsx
  - settings
    - api.js
    - hooks.js
    - schemas.js
    - pages
      - SettingsPage.jsx
      - StaffRolesPage.jsx
      - ComplianceAuditPage.jsx
    - components
      - PolicyEditor.jsx
      - AuditLogTable.jsx
- shared
  - layout
    - AdminShell.jsx
    - Sidebar.jsx
    - Topbar.jsx
    - Breadcrumbs.jsx
    - PageHeader.jsx
  - ui
    - Button.jsx
    - Input.jsx
    - Select.jsx
    - Textarea.jsx
    - Modal.jsx
    - Drawer.jsx
    - Tabs.jsx
    - Badge.jsx
    - Avatar.jsx
    - Skeleton.jsx
    - EmptyState.jsx
    - ConfirmDialog.jsx
    - DataTable.jsx
    - FiltersBar.jsx
    - StatsCard.jsx
    - NotesPanel.jsx
    - StepperTimeline.jsx
  - feedback
    - ErrorBoundary.jsx
    - AppErrorFallback.jsx
    - InlineError.jsx
  - auth
    - ProtectedRoute.jsx
    - PermissionGate.jsx
  - hooks
    - useDebounce.js
    - usePaginationState.js
    - useSortState.js
    - useFiltersState.js

## 2) Route Structure

Use role-aware nested routes with metadata-driven sidebar.

- /admin/login
- /admin/forgot-password
- /admin/reset-password
- /admin
  - /dashboard
  - /leads
  - /leads/:leadId
  - /applicants
  - /applicants/:applicantId
  - /cases
  - /cases/:caseId
    - tab=overview
    - tab=applicant
    - tab=checklist
    - tab=documents
    - tab=appointment
    - tab=payments
    - tab=notes
    - tab=timeline
  - /documents
  - /appointments
  - /payments
  - /payments/invoices/:invoiceId
  - /services/countries
  - /services/visa-categories
  - /services/service-packages
  - /services/pricing
  - /checklists/templates
  - /checklists/templates/:templateId
  - /templates
  - /country-updates
  - /reports
  - /settings/policies
  - /settings/staff-roles
  - /settings/compliance-audit

Role-to-section example:
- super_admin: all routes
- admin: all except critical policy updates and role deletion
- operations_staff: dashboard, leads, applicants, cases, docs, appointments
- finance_staff: dashboard, payments, invoices, reports
- compliance_officer: compliance, templates, audit, reports (read-only on cases)

## 3) Page and Component Breakdown

Authentication
- Pages: Login, Forgot Password, Reset Password
- Core components: LoginForm, PasswordStrengthMeter
- Guards: ProtectedRoute, PermissionGate

Dashboard
- KPI cards
- 3 core charts
- Staff workload panel
- Recent activity feed

Lead Management
- Leads list with server pagination + filter chips
- Lead detail drawer/page with notes timeline
- Create/edit lead modal
- Stage progression control
- Assign staff drawer
- Convert lead modal

Services Management
- Countries, Visa Categories, Service Packages, Pricing pages
- Master tables and edit drawers
- Active/inactive toggles

Checklist Management
- Template list by country + visa category
- Template detail with item editor
- Required/optional tagging
- Version timeline
- Attach template to case action

Applicant Management
- Profile shell with sections
- Personal + passport + travel + family + dependents
- Consent/disclaimer capture

Case Management
- Case list with advanced filters
- Detail page with tab layout
- Guarded status transitions
- Assignment + priority controls
- Internal vs customer notes
- Timeline and audit events

Document Management
- Bulk upload area
- Document table with tags and checklist links
- Preview and download actions
- Missing/rejected documents board
- File history timeline

Appointments and Biometrics
- Calendar and table toggle
- Add/update appointment
- Reschedule log drawer
- Upcoming alerts in topbar and dashboard

Payments and Invoices
- Payments table
- Add payment modal
- Partial/full/refund status support
- Invoice/receipt viewer
- Transaction history

Communication Templates
- Email and WhatsApp template tabs
- Placeholder picker
- Rendered preview panel

Country Process Updates
- Update list with active badge and effective dates
- New update form with versioning

Reports
- Revenue, conversion, country demand, staff performance
- CSV export by report block

Settings and Compliance
- Policy text manager
- Staff role management
- Audit log explorer with filters

## 4) Reusable UI Components List

Navigation and layout
- AdminShell
- SidebarNav with role filtering
- Topbar (search, notifications, profile menu)
- Breadcrumbs

Data UX
- DataTable (server pagination, sort, row actions)
- FiltersBar
- StatusBadge
- PriorityBadge
- EmptyState
- Skeleton blocks

Workflow UI
- StepperTimeline
- NotesPanel
- ActivityFeed
- AssignmentChip

Input and forms
- FormField wrapper
- AsyncSelect
- DatePicker
- CurrencyInput
- FileUploader
- RichTextEditor (for templates/policies)

Overlay and actions
- DrawerForm
- ModalForm
- ConfirmDialog
- Toast system

## 5) State and Query Architecture

Server state
- React Query for all backend entities
- Query keys organized by module and resource ID
- keepPreviousData for table pagination
- staleTime tuned per domain:
  - dashboard widgets: 30 to 60 seconds
  - leads/cases lists: 10 to 20 seconds
  - master catalogs: 5 to 10 minutes

Client state
- authStore: user profile, role, token mirror, permissions
- uiStore: sidebar collapsed state, active filters, open drawers
- local form state via React Hook Form

Mutation strategy
- Optimistic updates for fast toggles and assignment
- Invalidate only affected queries
- Central mutation error handler with toast

Guarded case transitions
- frontend map for allowed transitions by current status and role
- backend validates again; frontend prevents invalid actions early

## 6) API Integration Layer Examples

Use Axios client + interceptors + module APIs.

Example axios client

import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5010/api/v1/visaassist",
  timeout: 20000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("yaxis_access_token");
  if (token) config.headers.Authorization = "Bearer " + token;
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("yaxis_access_token");
      localStorage.removeItem("yaxis_refresh_token");
      localStorage.removeItem("yaxis_user");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

Example module API: leads

import { apiClient } from "@/lib/axios/client";

export const leadsApi = {
  list: (params) => apiClient.get("/leads", { params }),
  detail: (leadId) => apiClient.get("/leads/" + leadId),
  create: (payload) => apiClient.post("/public/leads", payload),
  update: (leadId, payload) => apiClient.patch("/leads/" + leadId, payload),
  assign: (leadId, payload) => apiClient.patch("/leads/" + leadId + "/assign", payload),
  updateStage: (leadId, payload) => apiClient.patch("/leads/" + leadId + "/stage", payload),
  addNote: (leadId, payload) => apiClient.post("/leads/" + leadId + "/notes", payload),
};

Example module hook: useLeads

import { useQuery } from "@tanstack/react-query";
import { leadsApi } from "./api";

export function useLeads(params) {
  return useQuery({
    queryKey: ["leads", params],
    queryFn: async () => (await leadsApi.list(params)).data?.data,
    keepPreviousData: true,
  });
}

## 7) Admin Panel Design System Tokens

Token goals
- High-contrast, readable status colors
- Clear hierarchy
- Dense data surfaces for desktop

CSS variable set

:root {
  --font-sans: "Manrope", "Segoe UI", sans-serif;
  --font-mono: "JetBrains Mono", Consolas, monospace;

  --bg-app: #f4f6f8;
  --bg-surface: #ffffff;
  --bg-elevated: #f8fafc;

  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #64748b;

  --brand-500: #0f766e;
  --brand-600: #0d9488;
  --accent-500: #ea580c;

  --border-default: #dbe3ea;
  --ring-focus: #0891b2;

  --status-new: #0284c7;
  --status-qualified: #0369a1;
  --status-converted: #15803d;
  --status-doc-pending: #d97706;
  --status-doc-rejected: #b91c1c;
  --status-case-active: #0f766e;
  --status-case-onhold: #7c3aed;
  --status-case-closed: #334155;

  --priority-low: #16a34a;
  --priority-medium: #d97706;
  --priority-high: #dc2626;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;

  --shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.06);
  --shadow-md: 0 6px 20px rgba(15, 23, 42, 0.08);
}

Typography scale
- H1: 28/36, semibold
- H2: 22/30, semibold
- H3: 18/26, semibold
- Body: 14/22, medium
- Data cell: 13/20, medium

## 8) Step-by-Step Implementation Order

Phase 1: Foundations (Week 1)
- Install dependencies: axios, @tanstack/react-query, react-hook-form, zod, @hookform/resolvers, recharts, @headlessui/react, clsx
- Add AppProviders and QueryClient
- Create axios client and auth interceptors
- Build AdminShell, Sidebar, Topbar, Breadcrumbs
- Implement ProtectedRoute and PermissionGate

Phase 2: Authentication and Dashboard (Week 2)
- Login/forgot/reset pages and flows
- Dashboard KPI endpoint integration
- Charts and activity feed
- Global skeletons, empty states, and toast system

Phase 3: Core Operations (Weeks 3-4)
- Leads module fully operational
- Applicants and Cases module with tabbed details
- Checklist and Documents linked to cases

Phase 4: Scheduling and Billing (Week 5)
- Appointments calendar/table + alerts
- Payments and invoices
- Transaction history and receipt view

Phase 5: Templates, Country Updates, Reports, Settings (Week 6)
- Template manager with preview
- Country updates with versioning
- Reports with CSV export
- Compliance audit and staff roles

Phase 6: Hardening (Week 7)
- Error boundaries and retry UX
- Access control audit
- Performance tuning for tables
- QA with backend contracts

## 9) Mock JSON Data Examples by Module

Authentication
{
  "user": {
    "id": "u_101",
    "name": "Anita Sharma",
    "email": "anita@visaassist.org",
    "role": "admin"
  },
  "token": "jwt_access_token",
  "refreshToken": "jwt_refresh_token"
}

Dashboard
{
  "kpis": {
    "totalLeads": 1830,
    "qualifiedLeads": 762,
    "convertedLeads": 298,
    "activeCases": 421,
    "pendingDocs": 156,
    "upcomingAppointments": 47,
    "revenueThisMonth": 1874500
  },
  "leadsBySource": [
    { "source": "Website", "count": 640 },
    { "source": "Referral", "count": 390 },
    { "source": "WhatsApp", "count": 510 },
    { "source": "Walk-in", "count": 290 }
  ],
  "casesByStatus": [
    { "status": "new", "count": 112 },
    { "status": "in_review", "count": 164 },
    { "status": "docs_pending", "count": 97 },
    { "status": "submitted", "count": 48 }
  ]
}

Leads
{
  "items": [
    {
      "id": "l_9001",
      "name": "Rahul Mehta",
      "email": "rahul@example.com",
      "phone": "+91-9000000001",
      "source": "Website",
      "stage": "qualified",
      "assignedTo": "staff_23",
      "countryInterest": "Canada",
      "createdAt": "2026-04-06T10:20:00Z"
    }
  ],
  "meta": { "page": 1, "pageSize": 25, "total": 1830 }
}

Services (Countries, Visa Categories, Packages)
{
  "countries": [
    { "id": "c_canada", "name": "Canada", "active": true },
    { "id": "c_aus", "name": "Australia", "active": true }
  ],
  "visaCategories": [
    { "id": "v_pr", "name": "PR", "countryId": "c_canada", "active": true }
  ],
  "servicePackages": [
    {
      "id": "sp_100",
      "name": "Express PR Package",
      "countryId": "c_canada",
      "visaCategoryId": "v_pr",
      "price": 75000,
      "currency": "INR",
      "active": true
    }
  ]
}

Checklists
{
  "template": {
    "id": "ct_501",
    "countryId": "c_canada",
    "visaCategoryId": "v_pr",
    "name": "Canada PR Basic Checklist",
    "version": "3.2",
    "effectiveFrom": "2026-03-01",
    "items": [
      { "id": "ci_1", "label": "Passport front and back", "required": true },
      { "id": "ci_2", "label": "IELTS scorecard", "required": true },
      { "id": "ci_3", "label": "PCC", "required": false }
    ]
  }
}

Applicants
{
  "id": "a_1101",
  "fullName": "Rahul Mehta",
  "dob": "1991-02-11",
  "passport": {
    "number": "N1234567",
    "expiryDate": "2031-11-05"
  },
  "travelHistory": [
    { "country": "UAE", "from": "2019-01-01", "to": "2019-03-01" }
  ],
  "dependents": [
    { "name": "Sneha Mehta", "relation": "Spouse", "dob": "1993-07-19" }
  ],
  "consent": {
    "disclaimerVersion": "2026.04",
    "acceptedAt": "2026-04-04T08:12:00Z"
  }
}

Cases
{
  "id": "case_7801",
  "applicantId": "a_1101",
  "country": "Canada",
  "visaCategory": "PR",
  "status": "docs_pending",
  "priority": "high",
  "assignedTo": "staff_23",
  "internalNotesCount": 9,
  "customerNotesCount": 2,
  "timeline": [
    { "at": "2026-04-01T10:00:00Z", "event": "Case created", "by": "staff_23" },
    { "at": "2026-04-03T09:30:00Z", "event": "Checklist attached", "by": "staff_23" }
  ]
}

Documents
{
  "items": [
    {
      "id": "doc_2001",
      "caseId": "case_7801",
      "type": "passport",
      "status": "approved",
      "checklistItemId": "ci_1",
      "uploadedAt": "2026-04-03T11:10:00Z",
      "version": 2
    },
    {
      "id": "doc_2002",
      "caseId": "case_7801",
      "type": "language_test",
      "status": "rejected",
      "reason": "Scorecard unclear"
    }
  ]
}

Appointments
{
  "items": [
    {
      "id": "ap_3001",
      "caseId": "case_7801",
      "type": "biometrics",
      "scheduledAt": "2026-04-14T09:30:00Z",
      "location": "VFS Delhi",
      "status": "scheduled",
      "rescheduleCount": 1
    }
  ]
}

Payments and Invoices
{
  "payments": [
    {
      "id": "pay_4101",
      "caseId": "case_7801",
      "amount": 25000,
      "currency": "INR",
      "status": "partial",
      "method": "card",
      "receivedAt": "2026-04-05T12:00:00Z"
    }
  ],
  "invoice": {
    "id": "inv_9901",
    "caseId": "case_7801",
    "total": 75000,
    "paid": 25000,
    "balance": 50000,
    "status": "partially_paid"
  }
}

Communication Templates
{
  "id": "tpl_601",
  "channel": "email",
  "name": "Document Reminder",
  "subject": "Pending documents for {{applicant_name}}",
  "body": "Hello {{applicant_name}}, please upload {{missing_docs}} before {{due_date}}.",
  "active": true,
  "updatedAt": "2026-04-01T07:00:00Z"
}

Country Process Updates
{
  "id": "cu_77",
  "countryId": "c_canada",
  "title": "Biometrics timeline revised",
  "description": "Average slot availability is now 3 to 4 weeks.",
  "version": "2026.04.1",
  "effectiveDate": "2026-04-10",
  "active": true
}

Reports
{
  "revenue": [
    { "month": "2025-11", "amount": 1220000 },
    { "month": "2025-12", "amount": 1380000 },
    { "month": "2026-01", "amount": 1490000 }
  ],
  "leadConversion": {
    "total": 1830,
    "qualified": 762,
    "converted": 298,
    "conversionRate": 16.29
  },
  "staffPerformance": [
    { "staffId": "staff_23", "name": "Riya", "activeCases": 43, "closures": 12 }
  ]
}

Settings and Compliance
{
  "disclaimer": {
    "version": "2026.04",
    "text": "Visaassist provides process support and documentation guidance, not legal representation.",
    "active": true
  },
  "refundPolicy": {
    "updatedAt": "2026-04-02T09:00:00Z",
    "text": "Refund eligibility depends on service milestone completion."
  },
  "auditLogs": [
    {
      "id": "audit_1",
      "actor": "admin_1",
      "action": "CASE_STATUS_UPDATED",
      "entityType": "case",
      "entityId": "case_7801",
      "timestamp": "2026-04-07T16:45:00Z"
    }
  ]
}

## Practical Notes for This Repository

- Your current frontend already has admin routing and token storage helpers.
- The backend OpenAPI file already declares Visaassist CRM-style endpoints aligned with this architecture.
- Start by replacing fetch wrappers with Axios client and React Query hooks while keeping existing route paths stable.
- Migrate module by module (Dashboard, Leads, Cases first) rather than a full rewrite.
