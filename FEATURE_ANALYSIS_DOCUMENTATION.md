# Frontend Feature and Backend Integration Documentation

Date: 2026-04-10
Scope: Current frontend implementation in y-axis/frontend

This document is written for backend modification work. It focuses on what the frontend actually uses at runtime.

## 1. Functional Modules Currently Active

### Admin Side

- Authentication
- Dashboard summary
- Leads management
- Applicants management
- Cases management

### User Side

- Mostly content and informational pages
- No active shared API contracts in user pages from the new module-based architecture

## 2. Endpoints Matrix Used by Frontend

Base URL:

- VITE_API_BASE_URL
- Default fallback: https://api.visaassist.org/api/v1

### Authentication

1) Staff login
- Preferred endpoint: POST /visaassist/auth/staff-login
- Fallback endpoint: POST /auth/login
- Request body:
  - email: string
  - password: string
- Response data required by frontend:
  - token: string
  - refreshToken: string (optional but stored when present)
  - user: object with role and display fields

2) Forgot password
- Preferred endpoint: POST /visaassist/auth/forgot-password
- Fallback endpoint: POST /auth/forgot-password
- Request body:
  - email: string

3) Reset password
- Preferred endpoint: POST /visaassist/auth/reset-password
- Fallback endpoint: POST /auth/reset-password
- Request body:
  - token: string
  - newPassword: string

4) Logout
- Endpoint: POST /auth/logout
- Request body: {}

### Dashboard

1) Summary
- Endpoint: GET /visaassist/reports/dashboard
- Response fields consumed:
  - leadCountsByStage: [{ _id, count }]
  - caseCountsByStatus: [{ _id, count }]
  - pendingDocumentCount: number
  - revenueSummary.totalPaid: number
  - staffWorkload: [{ _id, activeCaseCount, staff: [{ email }] }]
  - upcomingAppointments: [{ _id, appointmentType, appointmentDate, center }]

### Leads

1) Leads list
- Endpoint: GET /visaassist/leads
- Query params used by frontend:
  - page
  - limit
  - search
  - stage
  - sortBy
  - sortOrder
- Response shape expected:
  - items: []
  - pagination: { page, totalPages }

2) Lead stage update
- Endpoint: PATCH /visaassist/leads/:leadId/stage
- Request body:
  - stage: one of [new, contacted, qualified, converted, lost]

3) Lead assignment
- Endpoint: PATCH /visaassist/leads/:leadId/assign
- Request body:
  - assignedTo: string (staff id)

4) Lead note
- Endpoint: POST /visaassist/leads/:leadId/notes
- Request body:
  - note: string

5) Assignable staff
- Endpoint: GET /visaassist/staff
- Query params:
  - page=1
  - limit=100
- Response used:
  - items: []

### Applicants

1) Applicants list
- Endpoint: GET /visaassist/applicants
- Query params used by frontend:
  - page
  - limit
  - search
  - nationality
  - sortBy
  - sortOrder
- Response shape expected:
  - items: []
  - pagination: { page, totalPages }

2) Applicant details
- Endpoint: GET /visaassist/applicants/:applicantId

### Cases

1) Cases list
- Endpoint: GET /visaassist/cases
- Query params used:
  - page
  - limit
  - search
  - caseStatus
  - priority
  - sortBy
  - sortOrder
- Response shape expected:
  - items: []
  - pagination: { page, totalPages }

2) Case detail
- Endpoint: GET /visaassist/cases/:caseId

3) Case status update
- Endpoint: PATCH /visaassist/cases/:caseId/status
- Request body:
  - caseStatus: string enum value

4) Case staff assignment
- Endpoint: PATCH /visaassist/cases/:caseId/assign
- Request body:
  - assignedStaff: [staffId]

5) Case note
- Endpoint: POST /visaassist/cases/:caseId/notes
- Request body:
  - message: string
  - visibility: internal | customer

6) Assignable staff
- Endpoint: GET /visaassist/staff
- Query params:
  - page=1
  - limit=100

## 3. Field-Level UI Dependencies

If backend field names change, these pages will break.

### Lead UI Depends On

- _id
- fullName
- email
- phone
- destinationCountry
- visaCategory
- source
- stage
- assignedTo._id or assignedTo
- assignedTo.email or assignedTo.firstName
- nationality
- noteHistory[].note
- noteHistory[].createdAt
- activityHistory[].message
- activityHistory[].createdAt

### Applicant UI Depends On

- _id
- fullName
- email
- phone
- nationality
- passport.passportNumber
- basicProfile.occupation
- consentAccepted
- disclaimerAccepted
- refundPolicyAccepted
- travelProfile.priorRefusal
- travelProfile.previousTravelCountries[]
- travelProfile.refusalDetails
- leadId

### Case UI Depends On

- _id
- caseId
- destinationCountry
- visaCategory
- caseStatus
- priority
- applicantId.fullName
- leadId.fullName
- assignedStaff[].email
- assignedStaff[].id or assignedStaff[]._id
- assignedStaff[].role
- assignedStaff[].firstName
- assignedStaff[].lastName
- timeline[].status
- timeline[].note
- internalNotes[].message
- customerNotes[].message

## 4. Validation Constraints Enforced by Frontend

These are frontend constraints and should be aligned with backend validation where possible.

- Login password minimum: 8 chars
- Reset token minimum length: 10 chars
- Lead assignment id minimum length: 24 chars
- Lead note length: 2 to 2000 chars

## 5. Session and Header Behavior

- Access token is read from localStorage key yaxis_access_token.
- Axios request interceptor injects Authorization Bearer token.
- On 401 response, frontend clears all session keys.

## 6. Response and Error Envelope Behavior

Frontend request helper accepts:

- response.data.data (preferred)
- response.data (fallback)

Error message source used in UI:

- response.data.error.message
- fallback to generic request error message

## 7. Backend Modification Guidance

If you need to change backend APIs, use one of these patterns:

1) Keep old endpoints and add new endpoints in parallel.
2) If renaming fields, provide compatibility mapping in backend response.
3) Keep pagination payload keys unchanged for list endpoints.
4) Preserve role values expected by permissions config.
5) Return error.message consistently.

## 8. Quick Regression Checklist After Backend Changes

- Staff login works from /admin/login.
- Dashboard charts and KPI cards load.
- Leads list pagination and filter work.
- Lead stage update works.
- Lead assignment works.
- Lead note add works.
- Applicants list and detail load.
- Cases list pagination and filter work.
- Case status update works.
- Case assignment works.
- Case note add works.
- Session clears correctly after unauthorized response.

## 9. Important Note About Legacy Files

There are legacy files under src/admin and src/shared/api that are not part of the currently routed app in src/app/routes/index.jsx. If you later remove them, verify no external branch or planned migration still depends on them.
