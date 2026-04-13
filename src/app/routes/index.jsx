import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import AdminShell from "../../shared/layout/AdminShell.jsx";
import ProtectedRoute from "../../shared/auth/ProtectedRoute";
import PermissionGate from "../../shared/auth/PermissionGate";
import ModulePlaceholderPage from "../../shared/ui/ModulePlaceholderPage";
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

const roleRoute = (roles, title) => {
  return (
    <PermissionGate roles={roles} fallback={<Navigate to="/admin/dashboard" replace />}>
      <ModulePlaceholderPage
        title={title}
        description="This module is scaffolded in the new architecture and ready for the next implementation pass."
      />
    </PermissionGate>
  );
};

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
          <Route path="leads" element={<LeadsListPage />} />
          <Route path="leads/:leadId" element={<LeadDetailPage />} />

          <Route path="applicants" element={protectedModuleRoute(ROLE_GROUPS.operations, <ApplicantsListPage />)} />
          <Route
            path="applicants/:applicantId"
            element={protectedModuleRoute(ROLE_GROUPS.operations, <ApplicantDetailPage />)}
          />
          <Route path="cases" element={protectedModuleRoute(ROLE_GROUPS.operations, <CasesListPage />)} />
          <Route path="cases/:caseId" element={protectedModuleRoute(ROLE_GROUPS.operations, <CaseDetailPage />)} />
          <Route path="documents" element={roleRoute(ROLE_GROUPS.operations, "Document Management")} />
          <Route path="appointments" element={roleRoute(ROLE_GROUPS.operations, "Appointment and Biometrics")} />
          <Route path="payments" element={roleRoute(ROLE_GROUPS.finance, "Payments and Invoices")} />
          <Route path="services" element={roleRoute(ROLE_GROUPS.operations, "Services Management")} />
          <Route path="checklists" element={roleRoute(ROLE_GROUPS.operations, "Checklist Management")} />
          <Route path="templates" element={roleRoute(ROLE_GROUPS.operations, "Communication Templates")} />
          <Route path="country-updates" element={roleRoute(ROLE_GROUPS.operations, "Country Process Updates")} />
          <Route path="reports" element={roleRoute(ROLE_GROUPS.allStaff, "Reports")} />
          <Route path="settings" element={roleRoute(ROLE_GROUPS.compliance, "Settings and Compliance")} />
          <Route path="compliance" element={roleRoute(ROLE_GROUPS.compliance, "Audit and Compliance Logs")} />
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
