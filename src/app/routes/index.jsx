import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminShell from "../../shared/layout/AdminShell";
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
        <Route path="/visa" element={<Visa />} />
        <Route path="/visa/uk" element={<UK />}/>
        <Route path="/visa/usa" element={<Usa />}/>
        <Route path="/visa/japan" element={<Japan />}/>
        <Route path="/visa/australia" element={<Australia />}/>
        <Route path="/visa/canada" element={<Canada />}/>
        <Route path="/visa/newzealand" element={<NewZealand/>}/>
        <Route path="/visa/turkey" element={<Turkey />}/>
        <Route path="/visa/schengen" element={<Schengen />}/>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
