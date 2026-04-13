# Y-Axis Frontend (Current Implementation)

This document describes the current frontend implementation in the y-axis frontend folder so backend changes can be made safely.

## 1. Stack Used

- React 19 + Vite
- React Router DOM 7
- Axios
- TanStack React Query
- React Hook Form + Zod
- Tailwind CSS
- Recharts (dashboard charts)

## 2. Runtime App Architecture

### Entry and Providers

- Entry: src/main.jsx
- App root: src/App.jsx
- Router: src/app/routes/index.jsx
- Global providers:
  - BrowserRouter
  - QueryProvider (TanStack QueryClient)
  - ToastProvider (custom toast context)
  - ErrorBoundary

### Active vs Legacy Code

There are two admin implementations in the repository:

- Active implementation (used by routes):
  - src/app
  - src/modules
  - src/shared/layout
  - src/lib/axios
- Legacy implementation (currently not connected to active routes):
  - src/admin
  - src/shared/api

If you modify backend APIs for the current app, prioritize the Active implementation contracts in src/modules and src/lib/axios.

## 3. Route Flow

### Admin Routes

Public admin routes:

- /admin/login
- /admin/forgot-password
- /admin/reset-password

Protected admin area:

- /admin/dashboard
- /admin/leads
- /admin/leads/:leadId
- /admin/applicants
- /admin/applicants/:applicantId
- /admin/cases
- /admin/cases/:caseId
- /admin/documents (placeholder)
- /admin/appointments (placeholder)
- /admin/payments (placeholder)
- /admin/services (placeholder)
- /admin/checklists (placeholder)
- /admin/templates (placeholder)
- /admin/country-updates (placeholder)
- /admin/reports (placeholder)
- /admin/settings (placeholder)
- /admin/compliance (placeholder)

Authorization behavior:

- ProtectedRoute checks token existence and allowed roles.
- PermissionGate controls module-level access by role group.
- Sidebar visibility also depends on role.

### User Routes

User routes are rendered under UserLayout and are public pages such as:

- /
- /free-eligibility-check
- /migrate
- /work
- /study
- /visa and country visa pages
- /contact
- /about
- /login
- /signup
- /visa/:country/:visaType
- /apply/:country/:visaType

## 4. Authentication and Session Flow

Session storage keys in localStorage:

- yaxis_access_token
- yaxis_refresh_token
- yaxis_user

Flow:

1. Login page calls staffLogin from src/modules/auth/api.js.
2. It first tries POST /visaassist/auth/staff-login.
3. On failure, it falls back to POST /auth/login.
4. Token, refreshToken, user are saved in localStorage.
5. Axios request interceptor attaches Bearer token.
6. On 401 response, session is cleared automatically.
7. Logout calls POST /auth/logout and clears session locally even if API fails.

## 5. Backend API Contracts Used by Active UI

Base URL:

- VITE_API_BASE_URL (default: https://api.visaassist.org/api/v1)

All paths below are relative to base URL.

### Auth Module

- POST /visaassist/auth/staff-login (fallback: /auth/login)
  - Request: { email, password }
  - Response data used: { token, refreshToken, user }
- POST /visaassist/auth/forgot-password (fallback: /auth/forgot-password)
  - Request: { email }
- POST /visaassist/auth/reset-password (fallback: /auth/reset-password)
  - Request: { token, newPassword }
- POST /auth/logout
  - Request: {}

### Dashboard Module

- GET /visaassist/reports/dashboard
  - Response fields used by UI:
    - leadCountsByStage: [{ _id, count }]
    - caseCountsByStatus: [{ _id, count }]
    - pendingDocumentCount: number
    - revenueSummary.totalPaid: number
    - staffWorkload: [{ _id, activeCaseCount, staff: [{ email }] }]
    - upcomingAppointments: [{ _id, appointmentType, appointmentDate, center }]

### Leads Module

- GET /visaassist/leads
  - Query params used: page, limit, search, stage, sortBy, sortOrder
  - Response used: { items, pagination }
- PATCH /visaassist/leads/:leadId/stage
  - Request: { stage }
- PATCH /visaassist/leads/:leadId/assign
  - Request: { assignedTo }
- POST /visaassist/leads/:leadId/notes
  - Request: { note }
- GET /visaassist/staff
  - Query params: page=1, limit=100
  - Response used: { items }

Lead item fields expected in UI:

- _id, fullName, email, phone
- destinationCountry, visaCategory
- source, stage
- assignedTo: { _id, firstName, email }
- nationality
- noteHistory: [{ note, createdAt }]
- activityHistory: [{ message, createdAt }]

### Applicants Module

- GET /visaassist/applicants
  - Query params used: page, limit, search, nationality, sortBy, sortOrder
  - Response used: { items, pagination }
- GET /visaassist/applicants/:applicantId

Applicant fields expected in UI:

- _id, fullName, email, phone
- nationality
- passport.passportNumber
- basicProfile.occupation
- consentAccepted, disclaimerAccepted, refundPolicyAccepted
- travelProfile.priorRefusal
- travelProfile.previousTravelCountries
- travelProfile.refusalDetails
- leadId

### Cases Module

- GET /visaassist/cases
  - Query params used: page, limit, search, caseStatus, priority, sortBy, sortOrder
  - Response used: { items, pagination }
- GET /visaassist/cases/:caseId
- PATCH /visaassist/cases/:caseId/status
  - Request: { caseStatus }
- PATCH /visaassist/cases/:caseId/assign
  - Request: { assignedStaff: [staffId] }
- POST /visaassist/cases/:caseId/notes
  - Request: { message, visibility }
- GET /visaassist/staff
  - Query params: page=1, limit=100

Case fields expected in UI:

- _id, caseId, destinationCountry, visaCategory
- caseStatus, priority
- applicantId.fullName
- leadId.fullName
- assignedStaff: [{ _id or id, email, role, firstName, lastName }]
- timeline: [{ status, note }]
- internalNotes: [{ message }]
- customerNotes: [{ message }]

## 6. API Response Envelope Expectation

Axios response unwrapping logic:

- If server returns { data: ... } then frontend uses response.data.data.
- Otherwise frontend uses response.data directly.

Best compatibility for all modules:

- Keep response shape as:
  - { success: true, data: ... }
  - and errors as { error: { message: "..." } }

## 7. Role Model Expected by Frontend

Allowed staff roles:

- super_admin
- admin
- documentation_executive
- support_executive
- destination_specialist
- adviser
- support

If backend sends a role outside this set, ProtectedRoute/PermissionGate and sidebar visibility may fail for that user.

## 8. Backend Change Checklist

When modifying backend for this frontend, verify these points:

1. Keep all endpoints listed in section 5 or add compatibility aliases.
2. Preserve list response shape with items + pagination.
3. Preserve critical field names consumed by UI (for example fullName, caseStatus, assignedTo, assignedStaff).
4. Keep auth responses returning token and user.
5. Keep server error format with error.message.
6. Confirm role names match frontend permission config.
7. Test these pages after backend changes:
   - /admin/login
   - /admin/dashboard
   - /admin/leads and detail
   - /admin/applicants and detail
   - /admin/cases and detail

## 9. Development Commands

From frontend directory:

- npm install
- npm run dev
- npm run build
- npm run preview
