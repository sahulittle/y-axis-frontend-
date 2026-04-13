import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminShell from "../../shared/layout/AdminShell";
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
import UserLayout from "../../user/UserLayout";
import Home from "../../user/pages/Home";
import FreeEligiblityCheck from "../../user/pages/FreeEligiblityCheck";
import Migrate from "../../user/pages/Migrate";
import Work from "../../user/pages/Work";
import Study from "../../user/pages/Study";
import Visa from "../../user/pages/Visa";
import UK from "../../user/pages/visa/UK";
import Usa from "../../user/pages/visa/Usa";
import Japan from "../../user/pages/visa/Japan";
import Australia from "../../user/pages/visa/Australia";
import Canada from "../../user/pages/visa/Canada";
import NewZealand from "../../user/pages/visa/NewZealand";
import Turkey from "../../user/pages/visa/Turkey";
import Schengen from "../../user/pages/visa/Schengen";
import ContactUs from "../../user/pages/Contactus";
import Login from "../../components/Login";
import Signup from "../../components/Signup";
import About from "../../user/pages/About";
import VisaFaq from "../../user/pages/visatype/VisaFaq";
import VisaTypeData from "../../user/pages/visatype/visaTypeData.jsx";
import ApplyPage from "../../user/pages/visatype/ApplyPage.jsx";

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
          <Route path="checklists" element={protectedModuleRoute(ROLE_GROUPS.operations, <ChecklistsPage />)} />
          <Route path="templates" element={protectedModuleRoute(ROLE_GROUPS.operations, <TemplatesPage />)} />
          <Route path="country-updates" element={protectedModuleRoute(ROLE_GROUPS.operations, <CountryUpdatesPage />)} />
          <Route path="reports" element={protectedModuleRoute(ROLE_GROUPS.allStaff, <ReportsPage />)} />
          <Route path="settings" element={protectedModuleRoute(ROLE_GROUPS.compliance, <SettingsPage />)} />
          <Route path="compliance" element={protectedModuleRoute(ROLE_GROUPS.compliance, <CompliancePage />)} />
        </Route>
      </Route>

      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/free-eligibility-check" element={<FreeEligiblityCheck />} />
        <Route path="/migrate" element={<Migrate />} />
        <Route path="/work" element={<Work />} />
        <Route path="/study" element={<Study />} />
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
