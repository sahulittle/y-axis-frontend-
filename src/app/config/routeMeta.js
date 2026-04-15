import {
  Briefcase,
  ClipboardList,
  FileText,
  Gauge,
  Globe,
  MessageSquareText,
  Plane,
  User,
  Settings,
  Users,
} from "lucide-react";
import { ROLE_GROUPS } from "./permissions";

export const adminNavItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: Gauge, roles: ROLE_GROUPS.allStaff },
  { to: "/admin/users", label: "Users", icon: Users, roles: ROLE_GROUPS.finance },
  { to: "/admin/countries", label: "Countries", icon: Globe, roles: ROLE_GROUPS.finance },
  { to: "/admin/visa-categories", label: "Visa Categories", icon: Briefcase, roles: ROLE_GROUPS.finance },
  { to: "/admin/visa-types", label: "Country Visa Types", icon: Plane, roles: ROLE_GROUPS.finance },
  { to: "/admin/applications", label: "Applications", icon: ClipboardList, roles: ROLE_GROUPS.finance },
  { to: "/admin/enquiries", label: "Enquiries / Leads", icon: MessageSquareText, roles: ROLE_GROUPS.finance },
  { to: "/admin/tickets", label: "Support Tickets", icon: FileText, roles: ROLE_GROUPS.finance },
  { to: "/admin/profile", label: "My Profile", icon: User, roles: ROLE_GROUPS.allStaff },
  { to: "/admin/settings", label: "Settings", icon: Settings, roles: ROLE_GROUPS.compliance },
];
