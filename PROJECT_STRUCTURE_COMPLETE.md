# Y-Axis Project - Complete Folder Structure & Architecture Document

**Last Updated**: April 13, 2026  
**Project Type**: Immigration Consulting Platform  
**Build Tool**: Vite  
**Framework**: React 19.2.4  
**Status**: In Development (Admin & User Panels)

---

## 📋 TABLE OF CONTENTS

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Complete Folder Structure](#complete-folder-structure)
4. [Architecture Breakdown](#architecture-breakdown)
5. [Module Descriptions](#module-descriptions)
6. [Key Features & Routes](#key-features--routes)
7. [Development Setup](#development-setup)

---

## 🎯 PROJECT OVERVIEW

**Y-Axis** is a **dual-panel immigration consulting platform** built for Visaassist.org. It consists of:

- **User Panel**: Public-facing frontend for visa/immigration services (Study, Work, Migrate, Visa destinations)
- **Admin Panel**: Staff operational dashboard for case management, lead tracking, and applicant management
- **Shared Components**: Reusable UI components, API clients, and utility functions

**Primary Purpose**: Enable customers to explore visa services, apply via structured workflows, and allow staff to manage cases, leads, applicants, and documents.

---

## 🛠️ TECH STACK

### Core Dependencies

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.2.4 | UI Framework |
| **React DOM** | 19.2.4 | DOM Rendering |
| **React Router** | 7.14.0 | Client-side routing |
| **Vite** | 8.0.1 | Build tool & dev server |
| **Tailwind CSS** | 3.4.19 | Utility-first CSS framework |
| **Axios** | 1.14.0 | HTTP client |
| **React Query (TanStack)** | 5.96.2 | Server state management |
| **React Hook Form** | 7.72.1 | Form state management |
| **Zod** | 4.3.6 | Schema validation |
| **Recharts** | 3.8.1 | Data visualization (charts) |
| **Headless UI** | 2.2.10 | Unstyled UI components |
| **React Hot Toast** | 2.6.0 | Toast notifications |
| **Lucide React** | 1.8.0 | Icon library |
| **React Icons** | 5.6.0 | Additional icons |
| **clsx** | 2.1.1 | Conditional class names |
| **Hook Form Resolvers** | 5.2.2 | Zod integration with React Hook Form |

### Dev Dependencies

- **ESLint** - Code linting
- **TypeScript Types** - Type definitions for React
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes
- **Vite React Plugin** - React HMR support

---

## 📁 COMPLETE FOLDER STRUCTURE

```
y-axis/
│
├── 📄 package.json               # Project dependencies & scripts
├── 📄 vite.config.js             # Vite build configuration
├── 📄 tailwind.config.js         # Tailwind CSS configuration
├── 📄 postcss.config.js          # PostCSS configuration
├── 📄 eslint.config.js           # ESLint configuration
├── 📄 index.html                 # HTML entry point
│
├── 📄 README.md                  # Basic project info
├── 📄 ADMIN_PANEL_ARCHITECTURE.md    # Admin panel blueprint
├── 📄 FEATURE_ANALYSIS_DOCUMENTATION.md # Feature requirements analysis
│
├── public/                       # Static assets (images, fonts, etc.)
│
└── src/                          # ⭐ SOURCE CODE ROOT
    │
    ├── main.jsx                  # React app entry point
    ├── App.jsx                   # Root App component
    ├── index.css                 # Global styles
    │
    ├── 📂 app/                   # ⭐ APPLICATION CORE LAYER
    │   ├── 📂 config/            # Global configuration
    │   │   ├── env.js            # Environment variables
    │   │   ├── permissions.js    # Role-based access control (RBAC)
    │   │   └── routeMeta.js      # Route metadata & guards
    │   │
    │   ├── 📂 providers/         # Context providers & setup
    │   │   ├── AppProviders.jsx  # Main app provider wrapper
    │   │   ├── QueryProvider.jsx # React Query setup
    │   │   └── ToastProvider.jsx # Toast notification setup
    │   │
    │   └── 📂 routes/            # Router configuration
    │       └── index.jsx         # Main route definitions
    │
    ├── 📂 lib/                   # ⭐ UTILITY LIBRARIES
    │   ├── 📂 axios/             # HTTP client setup
    │   │   └── client.js         # Axios instance & interceptors
    │   │
    │   └── 📂 query/             # React Query utilities
    │       ├── queryClient.js    # Query client configuration
    │       └── queryKeys.js      # Query key definitions
    │
    ├── 📂 admin/                 # ⭐ ADMIN PANEL (STAFF)
    │   ├── AdminLayout.jsx       # Admin main layout wrapper
    │   │
    │   ├── 📂 api/               # Admin-specific API integration
    │   │   └── adminApi.js       # Admin endpoints
    │   │
    │   ├── 📂 components/        # Admin-specific components
    │   │   ├── AdminSidebar.jsx  # Sidebar navigation
    │   │   └── AdminTopbar.jsx   # Top navigation bar
    │   │
    │   └── 📂 pages/             # Admin page components
    │       ├── AdminLogin.jsx    # Staff login page
    │       ├── AdminDashboard.jsx # Admin dashboard/overview
    │       ├── AdminBlogPosts.jsx # Blog management
    │       ├── AdminConsultations.jsx # Consultation management
    │       ├── AdminCountries.jsx # Country/service management
    │       ├── AdminJobs.jsx     # Job listings management
    │       └── AdminUsers.jsx    # User management
    │
    ├── 📂 modules/               # ⭐ FEATURE MODULES (BOTH PANELS)
    │   │
    │   ├── 📂 auth/              # Authentication module
    │   │   ├── api.js            # Auth API calls (login, register, reset, etc.)
    │   │   ├── hooks.js          # Custom auth hooks
    │   │   ├── schemas.js        # Zod validation schemas
    │   │   └── 📂 pages/
    │   │       ├── LoginPage.jsx         # Admin/App login
    │   │       ├── ForgotPasswordPage.jsx
    │   │       └── ResetPasswordPage.jsx
    │   │
    │   ├── 📂 dashboard/         # Dashboard module (stats, analytics)
    │   │   ├── api.js            # Dashboard data endpoints
    │   │   ├── hooks.js          # Dashboard hooks
    │   │   └── 📂 pages/
    │   │       └── DashboardPage.jsx # Main dashboard view
    │   │
    │   ├── 📂 leads/             # Lead management module (admin)
    │   │   ├── api.js            # Lead API calls
    │   │   ├── hooks.js          # Lead hooks (useLeads, useLeadDetail, etc.)
    │   │   ├── schemas.js        # Lead validation schemas
    │   │   ├── 📂 pages/
    │   │   │   ├── LeadsListPage.jsx    # Lead list/table view
    │   │   │   └── LeadDetailPage.jsx   # Individual lead details
    │   │   └── 📂 components/
    │   │       ├── LeadsFiltersBar.jsx  # Filter controls
    │   │       ├── LeadStageSelect.jsx  # Stage dropdown
    │   │       ├── LeadAssignDrawer.jsx # Assignment drawer
    │   │       ├── LeadNotesPanel.jsx   # Internal notes
    │   │       └── ConvertLeadModal.jsx # Convert to case modal
    │   │
    │   ├── 📂 applicants/        # Applicant management module (admin)
    │   │   ├── api.js            # Applicant endpoints
    │   │   ├── hooks.js          # Applicant hooks
    │   │   ├── 📂 pages/
    │   │   │   ├── ApplicantsListPage.jsx    # Applicants list
    │   │   │   └── ApplicantDetailPage.jsx   # Applicant profile
    │   │   └── 📂 components/
    │   │       └── ApplicantsFiltersBar.jsx  # Filter bar
    │   │
    │   ├── 📂 cases/             # Case management module (admin)
    │   │   ├── api.js            # Case API endpoints
    │   │   ├── hooks.js          # Case hooks
    │   │   ├── 📂 pages/
    │   │   │   ├── CasesListPage.jsx    # Cases list
    │   │   │   └── CaseDetailPage.jsx   # Case detail view
    │   │   └── 📂 components/
    │   │       ├── CasesFiltersBar.jsx  # Filter controls
    │   │       ├── CaseStatusSelect.jsx # Status selector
    │   │       ├── CaseAssignDrawer.jsx # Assignment drawer
    │   │       ├── CaseNotesPanel.jsx   # Internal notes panel
    │   │       ├── CaseStatusGuardedSelect.jsx
    │   │       ├── CasePriorityBadge.jsx
    │   │       ├── CaseTabs.jsx         # Tab navigation
    │   │       ├── CaseTimeline.jsx     # Case history timeline
    │   │       └── InternalNotesPanel.jsx
    │   │
    │   └── 📂 consultations/     # Future: Consultation management
    │
    ├── 📂 user/                  # ⭐ USER PANEL (PUBLIC)
    │   ├── UserLayout.jsx        # User layout wrapper
    │   ├── Navbar.jsx            # Top navigation bar
    │   │
    │   └── 📂 pages/             # Public user pages
    │       ├── Home.jsx          # Landing page
    │       ├── About.jsx         # About page
    │       ├── Contactus.jsx     # Contact page
    │       ├── Footer.jsx        # Footer component
    │       ├── FreeEligiblityCheck.jsx # Eligibility assessment
    │       ├── Migrate.jsx       # Migration info page
    │       ├── Work.jsx          # Work visa info page
    │       ├── Study.jsx         # Study visa info page
    │       ├── Visa.jsx          # Visa services overview page
    │       │
    │       ├── 📂 visa/          # ⭐ COUNTRY-SPECIFIC VISA PAGES
    │       │   ├── USA.jsx       # USA visa details
    │       │   ├── UK.jsx        # UK visa details
    │       │   ├── Canada.jsx    # Canada visa details
    │       │   ├── Australia.jsx # Australia visa details
    │       │   ├── NewZealand.jsx # New Zealand visa details
    │       │   ├── Japan.jsx     # Japan visa details
    │       │   ├── Turkey.jsx    # Turkey visa details
    │       │   └── Schengen.jsx  # Schengen (Europe) visa details
    │       │
    │       └── 📂 visatype/      # ⭐ VISA TYPE & APPLICATION PAGES
    │           ├── VisaFaq.jsx           # FAQ by visa type
    │           ├── VisaTypeData.jsx     # Visa type data
    │           └── ApplyPage.jsx        # Application workflow
    │
    ├── 📂 shared/                # ⭐ SHARED (REUSABLE) CODE
    │   │
    │   ├── 📂 api/               # Shared API services
    │   │   ├── auth.js           # Auth API methods
    │   │   └── http.js           # Base HTTP client
    │   │
    │   ├── 📂 auth/              # Auth utilities & guards
    │   │   ├── ProtectedRoute.jsx # Route protection wrapper
    │   │   ├── PermissionGate.jsx # Role-based access gate
    │   │   └── session.js        # Session management
    │   │
    │   ├── 📂 feedback/          # Error handling
    │   │   ├── AppErrorFallback.jsx  # Error boundary fallback
    │   │   └── ErrorBoundary.jsx    # Error boundary wrapper
    │   │
    │   ├── 📂 layout/            # Shared layout components
    │   │   ├── AdminShell.jsx    # Admin layout shell
    │   │   ├── Breadcrumbs.jsx   # Breadcrumb navigation
    │   │   ├── Sidebar.jsx       # Generic sidebar
    │   │   └── Topbar.jsx        # Generic topbar
    │   │
    │   ├── 📂 ui/                # ⭐ SHARED UI COMPONENTS
    │   │   ├── Badge.jsx         # Badge component
    │   │   ├── Button.jsx        # Button component
    │   │   ├── Input.jsx         # Input field component
    │   │   ├── DataTable.jsx     # Data table/grid component
    │   │   ├── Drawer.jsx        # Drawer/modal component
    │   │   ├── FiltersBar.jsx    # Filter bar component
    │   │   ├── EmptyState.jsx    # Empty state component
    │   │   ├── Skeleton.jsx      # Loading skeleton
    │   │   ├── StatsCard.jsx     # Stats card component
    │   │   └── ModulePlaceholderPage.jsx # Placeholder for WIP modules
    │   │
    │   └── 📂 routes/            # Route utilities
    │
    ├── 📂 components/            # ROOT-LEVEL COMPONENTS
    │   ├── Login.jsx             # Login form component
    │   └── Signup.jsx            # Signup form component
    │
    ├── 📂 assets/                # Static assets
    │
    └── 📂 layout/                # Layout components (root level)
```

---

## 🏗️ ARCHITECTURE BREAKDOWN

### **Architecture Layers**

```
┌─────────────────────────────────────────────────────────┐
│               USER INTERFACE LAYER                       │
│  (React Components: Pages, Forms, UI Widgets)           │
├─────────────────────────────────────────────────────────┤
│              STATE MANAGEMENT LAYER                      │
│  (React Query, Context Providers, Custom Hooks)         │
├─────────────────────────────────────────────────────────┤
│               SERVICES LAYER                             │
│  (API Hooks, Business Logic, Utilities)                 │
├─────────────────────────────────────────────────────────┤
│              HTTP CLIENT LAYER                           │
│  (Axios, Interceptors, Error Handling)                  │
├─────────────────────────────────────────────────────────┤
│                API SERVER (Backend)                      │
└─────────────────────────────────────────────────────────┘
```

### **Data Flow Pattern**

```
Component → Custom Hook → React Query → Axios Client → Backend API
   ↓           ↓              ↓             ↓              ↓
Renders    Manages      Caches &      Handles        Returns
State      Business     Updates      Auth &           JSON
           Logic        State         Errors          Data
```

### **Two-Panel Architecture**

```
┌─────────────────────────────────────────────────────────┐
│                    Y-AXIS APP                            │
├──────────────────────┬──────────────────────────────────┤
│                      │                                   │
│   USER PANEL (/user) │     ADMIN PANEL (/admin)        │
│                      │                                   │
│  • Home              │   • Dashboard                    │
│  • Visa Services     │   • Lead Management             │
│  • Applications      │   • Case Management             │
│  • Contact           │   • Applicant Management        │
│                      │   • Blog Management             │
│  Public Access       │   Staff Only (Protected)        │
│                      │                                   │
└──────────────────────┴──────────────────────────────────┘
         │                        │
         │         ┌─────────────┘
         │         │
    ┌────────────────────────────┐
    │   SHARED LAYER             │
    │ • Components               │
    │ • API Services             │
    │ • Auth/Permissions         │
    │ • Utilities & Hooks        │
    └────────────────────────────┘
```

---

## 📦 MODULE DESCRIPTIONS

### **1. Auth Module** (`src/modules/auth/`)
Handles user authentication for both admin and public users.
- **Pages**: Login, Forgot Password, Reset Password
- **API**: login, register, logout, resetPassword, forgotPassword
- **Schemas**: Login validation, password reset validation
- **Status**: ✅ Active

### **2. Dashboard Module** (`src/modules/dashboard/`)
Admin dashboard with analytics, KPIs, and operational metrics.
- **Pages**: Main dashboard view with charts and stats
- **Components**: KPI cards, charts, activity feeds
- **Status**: ✅ Implemented

### **3. Leads Module** (`src/modules/leads/`)
Lead/inquiry management for admin staff.
- **Pages**: Lead list, Lead detail
- **Features**: Filtering, sorting, assignment, notes, conversion to cases
- **Status**: ✅ Active

### **4. Applicants Module** (`src/modules/applicants/`)
Applicant profile and information management.
- **Pages**: Applicants list, Applicant detail
- **Features**: Profile data, passport details, family info, consent tracking
- **Status**: ✅ Scaffolded

### **5. Cases Module** (`src/modules/cases/`)
Case/application management for visa processing.
- **Pages**: Cases list, Case detail
- **Features**: Status tracking, priority, assignments, notes, timeline, tabs
- **Status**: ✅ Core features implemented

### **6. Admin Panel** (`src/admin/`)
Staff operational interface.
- **Pages**: Login, Dashboard, Blog, Consultations, Countries, Jobs, Users
- **Navigation**: Sidebar, topbar, role-based access
- **Status**: 🟡 Partially implemented

### **7. User Panel** (`src/user/`)
Public-facing customer interface for visa services.
- **Pages**: Home, About, Contact, Visa info pages, Country-specific pages
- **Features**: Free eligibility check, service information, contact forms
- **Status**: 🟡 Partially implemented

---

## 🗺️ KEY FEATURES & ROUTES

### **Admin Routes (Protected)**
```
/admin/login                 → Staff login
/admin/dashboard            → Main dashboard
/admin/leads                → Lead management
/admin/leads/:id            → Lead details
/admin/applicants           → Applicant management
/admin/applicants/:id       → Applicant details
/admin/cases                → Case management
/admin/cases/:id            → Case details
/admin/blog                 → Blog management
/admin/consultations        → Consultation management
/admin/countries            → Country/service management
/admin/jobs                 → Job listings
/admin/users                → User management
```

### **User Routes (Public)**
```
/                           → Home page
/about                      → About page
/contact-us                 → Contact page
/visa                       → Visa services overview
/visa/usa                   → USA visa info
/visa/canada                → Canada visa info
/visa/uk                    → UK visa info
/visa/australia             → Australia visa info
/visa/new-zealand           → New Zealand visa info
/visa/japan                 → Japan visa info
/visa/turkey                → Turkey visa info
/visa/schengen              → Schengen visa info
/study                      → Study visa info
/work                       → Work visa info
/migrate                    → Migration info
/free-eligibility-check     → Eligibility assessment
/visa-faq                   → FAQ
/apply                      → Application page
/login                      → User login
/signup                     → User registration
```

---

## 🔑 KEY FILES & FUNCTIONS

### **Configuration Files**
- **`src/app/config/env.js`** - Environment variable management
- **`src/app/config/permissions.js`** - Role definitions (ROLE_GROUPS, STAFF_ROLES)
- **`src/app/config/routeMeta.js`** - Route metadata and access control

### **Provider Setup**
- **`src/app/providers/AppProviders.jsx`** - Main context wrapper
- **`src/app/providers/QueryProvider.jsx`** - React Query setup
- **`src/app/providers/ToastProvider.jsx`** - Toast notifications

### **HTTP Client**
- **`src/lib/axios/client.js`** - Axios instance with interceptors
- **`src/lib/query/queryKeys.js`** - React Query key factory

### **Route Entry**
- **`src/app/routes/index.jsx`** - Main route definitions with protections

### **Shared Utilities**
- **`src/shared/auth/ProtectedRoute.jsx`** - Route protection wrapper
- **`src/shared/auth/PermissionGate.jsx`** - Role-based access control
- **`src/shared/ui/`** - Reusable UI component library

---

## 🚀 DEVELOPMENT SETUP

### **Scripts**
```bash
npm run dev              # Start dev server (Vite HMR)
npm run build           # Build for production
npm run preview         # Preview production build locally
npm run lint            # Run ESLint
npm start               # Alias for dev
```

### **Dev Server**
- **Port**: http://localhost:5173 (default Vite)
- **HMR**: Fast refresh enabled
- **Tailwind**: JIT compilation in dev

### **Build Output**
- **Output**: `dist/` folder
- **Format**: Optimized ES modules
- **CSS**: Minified Tailwind with purging

### **Environment Setup**
Create a `.env` file in project root:
```
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=Y-Axis
```

---

## 📊 PROJECT STATUS SUMMARY

| Component | Status | Priority | Notes |
|-----------|--------|----------|-------|
| **Core Infrastructure** | ✅ Complete | Critical | React, Vite, routing working |
| **Authentication** | ✅ Active | Critical | Form-based auth with validation |
| **Admin Dashboard** | ✅ Active | High | Basic dashboard implemented |
| **Lead Management** | ✅ Complete | High | List, detail, filters working |
| **Case Management** | ✅ Complete | High | Full CRUD operations |
| **Applicant Module** | 🟡 Scaffolded | Medium | Structure ready, needs completion |
| **User Panel** | 🟡 Partial | High | Home, visa pages, contact working |
| **Country-Specific Pages** | 🟡 Started | High | 8 country pages implemented |
| **Application Workflow** | 🟠 Missing | Critical | Needs implementation |
| **Document Management** | 🔴 Missing | High | Not yet implemented |
| **Payment Integration** | 🔴 Missing | High | Not yet implemented |
| **Blog Module** | 🔴 Missing | Medium | Admin page exists, no frontend |
| **Consultation Booking** | 🔴 Missing | Medium | Scaffolded only |

---

## 🎯 NEXT DEVELOPMENT PHASES

### **Phase 1: User Panel (Current Focus)**
- [ ] Complete all country-specific visa pages
- [ ] Build application workflow system
- [ ] Implement document upload/management
- [ ] Add user dashboard for application tracking
- [ ] Integrate payment system

### **Phase 2: Admin Panel Enhancement**
- [ ] Complete blog management UI
- [ ] Build consultation booking system
- [ ] Add country/service management UI
- [ ] Implement job listings management
- [ ] Build user management interface

### **Phase 3: Advanced Features**
- [ ] Document automation/generation
- [ ] Interview preparation tools
- [ ] Case status notifications
- [ ] Integration with payment gateway
- [ ] Report generation

---

## 📝 CODING CONVENTIONS

### **Module Organization**
Each module follows this pattern:
```
module/
├── api.js          # API endpoints
├── hooks.js        # Custom React hooks
├── schemas.js      # Zod validation schemas (if form-heavy)
├── pages/          # Page components
└── components/     # Module-specific components
```

### **Component Patterns**
- **Pages**: Full-page components with layout
- **Components**: Reusable component units
- **Hooks**: Custom logic extraction (useLeads, useCases, etc.)
- **API**: Async functions using axios

### **File Naming**
- Components: PascalCase (e.g., `CaseDetailPage.jsx`)
- Utilities: camelCase (e.g., `queryKeys.js`)
- Folders: kebab-case or camelCase (no spaces)

---

## 🔐 SECURITY & PERMISSIONS

### **Role-Based Access Control**
Defined in `src/app/config/permissions.js`:
- **Admin/Staff Roles**: Access admin panel features
- **Public Users**: Access user panel features
- **Protected Routes**: Wrapped with `ProtectedRoute` and `PermissionGate`

### **Auth Flow**
1. User logs in (LoginPage)
2. Backend returns JWT token
3. Token stored in axios interceptors
4. Token validated on protected routes
5. Auto-redirected if unauthorized

---

## 📚 RESOURCES & DOCUMENTATION

- **Vite Docs**: https://vite.dev
- **React Docs**: https://react.dev
- **React Router**: https://reactrouter.com
- **React Query**: https://tanstack.com/query/latest
- **Tailwind CSS**: https://tailwindcss.com
- **Zod Validation**: https://zod.dev
- **React Hook Form**: https://react-hook-form.com

---

**End of Document**

