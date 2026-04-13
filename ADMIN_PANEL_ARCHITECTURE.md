# Admin Panel Architecture (Current Implementation)

Date: 2026-04-10
Status: Implemented (with scaffold placeholders)

This document explains how the running admin panel is structured and how data flows between frontend and backend.

## 1. Runtime Layers

### Routing and Access

- Route file: src/app/routes/index.jsx
- Route guard: src/shared/auth/ProtectedRoute.jsx
- Role gate: src/shared/auth/PermissionGate.jsx
- Role definitions: src/app/config/permissions.js
- Sidebar metadata: src/app/config/routeMeta.js

### Layout Shell

- Shell: src/shared/layout/AdminShell.jsx
- Sidebar: src/shared/layout/Sidebar.jsx
- Topbar: src/shared/layout/Topbar.jsx
- Breadcrumbs: src/shared/layout/Breadcrumbs.jsx

### Feature Modules

Active modules in src/modules:

- auth
- dashboard
- leads
- applicants
- cases

Each module has api.js, hooks.js, pages, and components.

### API Client and Session

- HTTP client: src/lib/axios/client.js
- Session storage: src/shared/auth/session.js
- Base URL: src/app/config/env.js

## 2. Route to Module Map

Implemented pages:

- /admin/login -> modules/auth/pages/LoginPage.jsx
- /admin/forgot-password -> modules/auth/pages/ForgotPasswordPage.jsx
- /admin/reset-password -> modules/auth/pages/ResetPasswordPage.jsx
- /admin/dashboard -> modules/dashboard/pages/DashboardPage.jsx
- /admin/leads -> modules/leads/pages/LeadsListPage.jsx
- /admin/leads/:leadId -> modules/leads/pages/LeadDetailPage.jsx
- /admin/applicants -> modules/applicants/pages/ApplicantsListPage.jsx
- /admin/applicants/:applicantId -> modules/applicants/pages/ApplicantDetailPage.jsx
- /admin/cases -> modules/cases/pages/CasesListPage.jsx
- /admin/cases/:caseId -> modules/cases/pages/CaseDetailPage.jsx

Placeholder routes (scaffolded):

- /admin/documents
- /admin/appointments
- /admin/payments
- /admin/services
- /admin/checklists
- /admin/templates
- /admin/country-updates
- /admin/reports
- /admin/settings
- /admin/compliance

## 3. Auth and Authorization Flow

1. Staff login submits email/password.
2. Frontend calls POST /visaassist/auth/staff-login.
3. On failure, it retries POST /auth/login.
4. token, refreshToken, user are stored in localStorage.
5. Axios interceptor adds Authorization Bearer token.
6. 401 response clears local session.
7. ProtectedRoute blocks unauthenticated users.
8. PermissionGate enforces route-level role access.
9. Sidebar items are role-filtered.

## 4. Data Flow by Module

### Dashboard

- Hook: useDashboardSummaryQuery
- API: GET /visaassist/reports/dashboard

### Leads

- List: GET /visaassist/leads
- Detail: lead detail query via useLeadDetailQuery
- Update stage: PATCH /visaassist/leads/:leadId/stage
- Assign: PATCH /visaassist/leads/:leadId/assign
- Add note: POST /visaassist/leads/:leadId/notes
- Staff list: GET /visaassist/staff

### Applicants

- List: GET /visaassist/applicants
- Detail: GET /visaassist/applicants/:applicantId

### Cases

- List: GET /visaassist/cases
- Detail: GET /visaassist/cases/:caseId
- Update status: PATCH /visaassist/cases/:caseId/status
- Assign staff: PATCH /visaassist/cases/:caseId/assign
- Add note: POST /visaassist/cases/:caseId/notes
- Staff list: GET /visaassist/staff

## 5. Query and Cache Behavior

QueryClient defaults:

- queries staleTime: 15s
- queries gcTime: 5m
- queries retry: 1
- refetchOnWindowFocus: false
- mutations retry: 0

Leads and cases mutations invalidate list/detail caches after success.

## 6. Backend Contract Expectations

### List Endpoints

Expected shape:

- data.items: array
- data.pagination: { page, totalPages }

### Errors

Expected message source:

- response.data.error.message

### Success Envelope

Frontend handles either:

- response.data.data
- response.data

## 7. Roles Used by Frontend

Recognized roles:

- super_admin
- admin
- documentation_executive
- support_executive
- destination_specialist
- adviser
- support

Role groups:

- operations: super_admin, admin, documentation_executive, support_executive, destination_specialist
- finance: super_admin, admin
- compliance: super_admin, admin, support_executive

## 8. Caveat

Legacy admin stack still exists in:

- src/admin
- src/shared/api

Current routes use the modules-based stack under src/app, src/modules, src/lib, and src/shared/layout.
