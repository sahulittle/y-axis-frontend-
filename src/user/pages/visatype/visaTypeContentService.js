import {
  BadgeCheck,
  Briefcase,
  Clock3,
  FileText,
  FolderCheck,
  GraduationCap,
  MessagesSquare,
  Plane,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { getVisaTypeContentBySlug } from "../../api/publicApi";
import { getVisaTypeContent as getStaticVisaTypeContent } from "./visatypedata";

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
};

const FALLBACK_ICON = Plane;

const resolveIcon = (iconKey) => ICON_MAP[String(iconKey || "").toLowerCase()] || FALLBACK_ICON;

const normalizeStringArray = (input) => {
  if (!Array.isArray(input)) {
    return [];
  }

  return input
    .map((item) => String(item || "").trim())
    .filter(Boolean);
};

const normalizeFaqs = (input) => {
  if (!Array.isArray(input)) {
    return [];
  }

  return input
    .map((item) => ({
      question: String(item?.question || "").trim(),
      answer: String(item?.answer || "").trim(),
    }))
    .filter((item) => item.question && item.answer);
};

const normalizeApiVisaContent = (data) => {
  return {
    countrySlug: data.countrySlug,
    countryName: data.countryName,
    visaTypeSlug: data.visaTypeSlug,
    visaTypeName: data.visaTypeName,
    title: data.title || "Visa Type",
    badge: data.badge || "",
    subtitle: data.subtitle || "",
    heroImage: data.heroImage || "",
    iconKey: data.iconKey || "plane",
    icon: resolveIcon(data.iconKey),
    serviceHighlights: Array.isArray(data.serviceHighlights)
      ? data.serviceHighlights
          .map((item) => ({
            title: String(item?.title || "").trim(),
            description: String(item?.description || "").trim(),
            iconKey: String(item?.iconKey || "").trim(),
            icon: resolveIcon(item?.iconKey),
          }))
          .filter((item) => item.title && item.description)
      : [],
    eligibility: normalizeStringArray(data.eligibility),
    requiredDocs: normalizeStringArray(data.requiredDocs),
    process: normalizeStringArray(data.process),
    timeline: normalizeStringArray(data.timeline),
    faqs: normalizeFaqs(data.faqs),
    ctaTitle: data.ctaTitle || "Ready to start your visa application?",
    ctaText: data.ctaText || "Connect with our team for personalized guidance.",
    seoTitle: data.seoTitle || "",
    seoDescription: data.seoDescription || "",
  };
};

const normalizeStaticVisaContent = (data) => {
  if (!data) {
    return null;
  }

  return {
    ...data,
    iconKey: data.iconKey || "plane",
    icon: data.icon || resolveIcon(data.iconKey),
    serviceHighlights: Array.isArray(data.serviceHighlights)
      ? data.serviceHighlights.map((item) => ({
          ...item,
          icon: item.icon || resolveIcon(item.iconKey),
        }))
      : [],
    eligibility: normalizeStringArray(data.eligibility),
    requiredDocs: normalizeStringArray(data.requiredDocs),
    process: normalizeStringArray(data.process),
    timeline: normalizeStringArray(data.timeline),
    faqs: normalizeFaqs(data.faqs),
    ctaTitle: data.ctaTitle || "Ready to start your visa application?",
    ctaText: data.ctaText || "Connect with our team for personalized guidance.",
  };
};

export const getVisaTypeContent = async (countrySlug, visaTypeSlug) => {
  try {
    const data = await getVisaTypeContentBySlug(countrySlug, visaTypeSlug);
    return normalizeApiVisaContent(data);
  } catch (error) {
    const fallback = import.meta.env.DEV
      ? normalizeStaticVisaContent(getStaticVisaTypeContent(countrySlug, visaTypeSlug))
      : null;

    if (fallback) {
      return fallback;
    }

    if (error?.statusCode === 404) {
      return null;
    }

    throw error;
  }
};

export const visaTypeIconMap = ICON_MAP;
