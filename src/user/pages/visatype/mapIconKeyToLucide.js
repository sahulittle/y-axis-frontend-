import {
  BadgeCheck,
  Briefcase,
  Clock3,
  FileText,
  FolderCheck,
  GraduationCap,
  HeartHandshake,
  MapPinned,
  MessagesSquare,
  Plane,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const ICON_MAP = {
  "graduation-cap": GraduationCap,
  users: Users,
  briefcase: Briefcase,
  plane: Plane,
  "file-text": FileText,
  "shield-check": ShieldCheck,
  "clock-3": Clock3,
  "badge-check": BadgeCheck,
  sparkles: Sparkles,
  "folder-check": FolderCheck,
  "messages-square": MessagesSquare,
  "map-pinned": MapPinned,
  "heart-handshake": HeartHandshake,
};

export const mapIconKeyToLucide = (iconKey) => {
  const normalized = String(iconKey || "").trim().toLowerCase();
  return ICON_MAP[normalized] || Plane;
};

export const visaTypeIconMap = ICON_MAP;
