import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import AdminShell from "../../shared/layout/AdminShell.jsx";
import ProtectedRoute from "../../shared/auth/ProtectedRoute";
import PermissionGate from "../../shared/auth/PermissionGate";
import { ROLE_GROUPS, STAFF_ROLES } from "../config/permissions";
import LoginPage from "../../modules/auth/pages/LoginPage";
import ForgotPasswordPage from "../../modules/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "../../modules/auth/pages/ResetPasswordPage";
import DashboardPage from "../../modules/dashboard/pages/DashboardPage";
import LeadsListPage from "../../modules/leads/pages/LeadsListPage";
import LeadDetailPage from "../../modules/leads/pages/LeadDetailPage";
import ApplicantsListPage from "../../modules/applicants/pages/ApplicantsListPage";
import ApplicantDetailPage from "../../modules/applicants/pages/ApplicantDetailPage";
import CasesListPage from "../../modules/cases/pages/CasesListPage";
import CaseDetailPage from "../../modules/cases/pages/CaseDetailPage";
import DocumentsPage from "../../modules/documents/pages/DocumentsPage";
import AppointmentsPage from "../../modules/appointments/pages/AppointmentsPage";
import PaymentsPage from "../../modules/payments/pages/PaymentsPage";
import ServicesPage from "../../modules/services/pages/ServicesPage";
import ChecklistsPage from "../../modules/checklists/pages/ChecklistsPage";
import TemplatesPage from "../../modules/templates/pages/TemplatesPage";
import CountryUpdatesPage from "../../modules/country-updates/pages/CountryUpdatesPage";
import ReportsPage from "../../modules/reports/pages/ReportsPage";
import SettingsPage from "../../modules/settings/pages/SettingsPage";
import CompliancePage from "../../modules/compliance/pages/CompliancePage";
import UsersPage from "../../modules/users/pages/UsersPage";
import VisaTypesListPage from "../../modules/visa-types/pages/VisaTypesListPage";
import VisaTypeFormPage from "../../modules/visa-types/pages/VisaTypeFormPage";
import CountriesPage from "../../modules/countries/pages/CountriesPage";
import VisaCategoriesPage from "../../modules/visa-categories/pages/VisaCategoriesPage";
import ApplicationsPage from "../../modules/applications/pages/ApplicationsPage";
import EnquiriesPage from "../../modules/enquiries/pages/EnquiriesPage";
import TicketsPage from "../../modules/tickets/pages/TicketsPage";
import UserLayout from "../../user/UserLayout";
import Home from "../../modules/public/pages/Home.jsx";
import FreeEligiblityCheck from "../../modules/public/pages/FreeEligiblityCheck.jsx";
import Migrate from "../../modules/public/pages/Migrate.jsx";
import Work from "../../modules/public/pages/Work.jsx";
import Study from "../../modules/public/pages/Study.jsx";
import Visa from "../../modules/public/pages/Visa.jsx";
import UK from "../../user/pages/visa/UK";
import Usa from "../../user/pages/visa/Usa";
import Japan from "../../user/pages/visa/Japan";
import Australia from "../../user/pages/visa/Australia";
import Canada from "../../user/pages/visa/Canada";
import NewZealand from "../../user/pages/visa/NewZealand";
import Turkey from "../../user/pages/visa/Turkey";
import Schengen from "../../user/pages/visa/Schengen";
import ContactUs from "../../modules/public/pages/Contactus.jsx";
import Login from "../../modules/auth/components/Login.jsx";
import Signup from "../../modules/auth/components/Signup.jsx";
import About from "../../modules/public/pages/About.jsx";
import VisaFaq from "../../user/pages/visatype/VisaFaq";
import VisaTypeData from "../../user/pages/visatype/visaTypeData.jsx";
import ApplyPage from "../../user/pages/visatype/ApplyPage.jsx";
import Footer from "../../modules/public/pages/Footer.jsx";

const UserDashboardLayout = React.lazy(() => import("../../user/pages/dashboard/UserDashboardLayout"));
const UserDashboardPage = React.lazy(() => import("../../user/pages/dashboard/Dashboard"));
const UserApplicationsPage = React.lazy(() => import("../../user/pages/dashboard/Applications"));
const UserApplicationDetailPage = React.lazy(() => import("../../user/pages/dashboard/ApplicationDetail"));
const UserTicketsPage = React.lazy(() => import("../../user/pages/dashboard/Tickets"));
const UserTicketDetailPage = React.lazy(() => import("../../user/pages/dashboard/TicketDetail"));
const UserDocumentsPage = React.lazy(() => import("../../user/pages/dashboard/Documents"));
const UserAppointmentsPage = React.lazy(() => import("../../user/pages/dashboard/Appointments"));
const UserProfilePage = React.lazy(() => import("../../user/pages/dashboard/Profile"));

const protectedModuleRoute = (roles, component) => {
  return <PermissionGate roles={roles} fallback={<Navigate to="/admin/dashboard" replace />}>{component}</PermissionGate>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<LoginPage />} />
      <Route path="/admin/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/admin/reset-password" element={<ResetPasswordPage />} />

      <Route element={<ProtectedRoute allowedRoles={STAFF_ROLES} />}>
        <Route path="/admin" element={<AdminShell />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="users" element={protectedModuleRoute(ROLE_GROUPS.finance, <UsersPage />)} />
          <Route path="countries" element={protectedModuleRoute(ROLE_GROUPS.finance, <CountriesPage />)} />
          <Route
            path="visa-categories"
            element={protectedModuleRoute(ROLE_GROUPS.finance, <VisaCategoriesPage />)}
          />
          <Route path="applications" element={protectedModuleRoute(ROLE_GROUPS.finance, <ApplicationsPage />)} />
          <Route path="enquiries" element={protectedModuleRoute(ROLE_GROUPS.finance, <EnquiriesPage />)} />
          <Route path="tickets" element={protectedModuleRoute(ROLE_GROUPS.finance, <TicketsPage />)} />
          <Route path="leads" element={<LeadsListPage />} />
          <Route path="leads/:leadId" element={<LeadDetailPage />} />

          <Route path="applicants" element={protectedModuleRoute(ROLE_GROUPS.operations, <ApplicantsListPage />)} />
          <Route
            path="applicants/:applicantId"
            element={protectedModuleRoute(ROLE_GROUPS.operations, <ApplicantDetailPage />)}
          />
          <Route path="cases" element={protectedModuleRoute(ROLE_GROUPS.operations, <CasesListPage />)} />
          <Route path="cases/:caseId" element={protectedModuleRoute(ROLE_GROUPS.operations, <CaseDetailPage />)} />
          <Route path="documents" element={protectedModuleRoute(ROLE_GROUPS.operations, <DocumentsPage />)} />
          <Route path="appointments" element={protectedModuleRoute(ROLE_GROUPS.operations, <AppointmentsPage />)} />
          <Route path="payments" element={protectedModuleRoute(ROLE_GROUPS.finance, <PaymentsPage />)} />
          <Route path="services" element={protectedModuleRoute(ROLE_GROUPS.operations, <ServicesPage />)} />
          <Route path="visa-types" element={protectedModuleRoute(ROLE_GROUPS.finance, <VisaTypesListPage />)} />
          <Route path="visa-types/new" element={protectedModuleRoute(ROLE_GROUPS.finance, <VisaTypeFormPage />)} />
          <Route
            path="visa-types/:visaTypeId/edit"
            element={protectedModuleRoute(ROLE_GROUPS.finance, <VisaTypeFormPage />)}
          />
          <Route path="checklists" element={protectedModuleRoute(ROLE_GROUPS.operations, <ChecklistsPage />)} />
          <Route path="templates" element={protectedModuleRoute(ROLE_GROUPS.operations, <TemplatesPage />)} />
          <Route path="country-updates" element={protectedModuleRoute(ROLE_GROUPS.operations, <CountryUpdatesPage />)} />
          <Route path="reports" element={protectedModuleRoute(ROLE_GROUPS.allStaff, <ReportsPage />)} />
          <Route path="settings" element={protectedModuleRoute(ROLE_GROUPS.compliance, <SettingsPage />)} />
          <Route path="compliance" element={protectedModuleRoute(ROLE_GROUPS.compliance, <CompliancePage />)} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["customer", "user"]} redirectTo="/login" unauthorizedTo="/" />}>
        <Route path="/user" element={<UserDashboardLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<UserDashboardPage />} />
          <Route path="applications" element={<UserApplicationsPage />} />
          <Route path="applications/:id" element={<UserApplicationDetailPage />} />
          <Route path="tickets" element={<UserTicketsPage />} />
          <Route path="tickets/:id" element={<UserTicketDetailPage />} />
          <Route path="documents" element={<UserDocumentsPage />} />
          <Route path="appointments" element={<UserAppointmentsPage />} />
          <Route path="profile" element={<UserProfilePage />} />
        </Route>
      </Route>

      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/free-eligibility-check" element={<FreeEligiblityCheck />} />
        <Route path="/migrate" element={<Migrate />} />
        <Route path="/work" element={<Work />} />
        <Route path="/study" element={<Study />} />
        <Route path="/footer" element={<Footer/>}/>
        <Route path="/visa" element={<Visa />} />
        <Route path="/visa/uk" element={<UK />} />
        <Route path="/visa/usa" element={<Usa />} />
        <Route path="/visa/japan" element={<Japan />} />
        <Route path="/visa/australia" element={<Australia />} />
        <Route path="/visa/canada" element={<Canada />} />
        <Route path="/visa/newzealand" element={<NewZealand />} />
        <Route path="/visa/turkey" element={<Turkey />} />
        <Route path="/visa/schengen" element={<Schengen />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/visa/:country/:visaType" element={<VisaTypeData />} />
        <Route path="/apply/:country/:visaType" element={<ApplyPage />} />
        <Route path="visafaq" element={<VisaFaq />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
