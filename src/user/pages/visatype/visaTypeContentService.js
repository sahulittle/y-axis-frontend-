import { getVisaTypeContentBySlug } from "../../api/publicApi";
import { getVisaTypeContent as getStaticVisaTypeContent } from "./visatypedata";
import { mapIconKeyToLucide, visaTypeIconMap } from "./mapIconKeyToLucide";

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

const normalizeRequiredDocs = (input) => {
  if (!Array.isArray(input)) {
    return [];
  }

  return input
    .map((item, index) => {
      if (typeof item === "string") {
        return {
          name: String(item || "").trim(),
          description: "",
          isMandatory: true,
          allowedFileTypes: [],
          maxFiles: 1,
          sortOrder: index,
        };
      }

      return {
        name: String(item?.name || "").trim(),
        description: String(item?.description || "").trim(),
        isMandatory: item?.isMandatory !== false,
        allowedFileTypes: Array.isArray(item?.allowedFileTypes) ? item.allowedFileTypes : [],
        maxFiles: Number(item?.maxFiles) || 1,
        sortOrder: Number(item?.sortOrder) || index,
      };
    })
    .filter((item) => item.name);
};

const normalizeProcess = (input) => {
  if (!Array.isArray(input)) {
    return [];
  }

  return input
    .map((item, index) => {
      if (typeof item === "string") {
        return {
          title: String(item || "").trim(),
          description: "",
          sortOrder: index,
        };
      }

      return {
        title: String(item?.title || item?.label || "").trim(),
        description: String(item?.description || "").trim(),
        sortOrder: Number(item?.sortOrder) || index,
      };
    })
    .filter((item) => item.title || item.description);
};

const normalizeTimeline = (input) => {
  if (!Array.isArray(input)) {
    return [];
  }

  return input
    .map((item, index) => {
      if (typeof item === "string") {
        return {
          label: String(item || "").trim(),
          description: "",
          sortOrder: index,
        };
      }

      return {
        label: String(item?.label || item?.title || "").trim(),
        description: String(item?.description || "").trim(),
        sortOrder: Number(item?.sortOrder) || index,
      };
    })
    .filter((item) => item.label || item.description);
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
    icon: mapIconKeyToLucide(data.iconKey),
    serviceHighlights: Array.isArray(data.serviceHighlights)
      ? data.serviceHighlights
          .map((item) => ({
            title: String(item?.title || "").trim(),
            description: String(item?.description || "").trim(),
            iconKey: String(item?.iconKey || "").trim(),
            icon: mapIconKeyToLucide(item?.iconKey),
          }))
          .filter((item) => item.title && item.description)
      : [],
    eligibility: normalizeStringArray(data.eligibility),
    requiredDocs: normalizeRequiredDocs(data.requiredDocs),
    process: normalizeProcess(data.process),
    timeline: normalizeTimeline(data.timeline),
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
    icon: data.icon || mapIconKeyToLucide(data.iconKey),
    serviceHighlights: Array.isArray(data.serviceHighlights)
      ? data.serviceHighlights.map((item) => ({
          ...item,
          icon: item.icon || mapIconKeyToLucide(item.iconKey),
        }))
      : [],
    eligibility: normalizeStringArray(data.eligibility),
    requiredDocs: normalizeRequiredDocs(data.requiredDocs),
    process: normalizeProcess(data.process),
    timeline: normalizeTimeline(data.timeline),
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

export { mapIconKeyToLucide, visaTypeIconMap };
