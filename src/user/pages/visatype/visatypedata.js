import {
  GraduationCap,
  Users,
  Briefcase,
  Plane,
} from "lucide-react";


export const visaTypeData = {
  usa: {
    f1: {
      title: "USA F1 Visa",
      badge: "USA • F1 Visa",
      subtitle:
        "Study in the United States with structured visa guidance, document support, and interview preparation.",
      heroImage:
        "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=1200&auto=format&fit=crop",
      icon: GraduationCap,
      eligibility: [
        "Accepted by a recognized academic institution in the United States",
        "Clear study intent supported by academic and personal background",
        "Ability to show sufficient financial support for tuition and living costs",
        "Prepared to complete application and interview formalities accurately",
      ],
      requiredDocs: [
        "Valid passport",
        "Recent passport-size photograph",
        "DS-160 confirmation details",
        "Academic admission documents",
        "Financial proof",
        "SEVIS / I-20 related details if applicable",
      ],
      process: [
        "Choose the F1 visa path based on your study plans",
        "Collect academic, financial, and identity documents",
        "Complete the DS-160 carefully",
        "Review your file for consistency and completeness",
        "Book appointment and prepare for interview",
        "Attend interview and track next steps",
      ],
      timeline: [
        "Consultation",
        "Document Preparation",
        "Application Review",
        "Submission / Appointment",
        "Decision Awaited",
      ],
      faqs: [
        {
          question: "What is the USA F1 visa used for?",
          answer:
            "The F1 visa is generally used for academic study in the United States at approved institutions.",
        },
        {
          question: "Do I need financial proof for an F1 visa?",
          answer:
            "Yes, applicants are generally expected to show financial capability to support tuition and living expenses.",
        },
        {
          question: "Is interview preparation important for F1 applicants?",
          answer:
            "Yes, interview readiness is important because your course intent, funding, and study plans should be presented clearly.",
        },
        {
          question: "Can Visaassist help with DS-160 support?",
          answer:
            "Yes, we can guide you through structured application preparation and supporting document review.",
        },
      ],
      ctaTitle: "Ready to Start Your USA F1 Visa Application?",
      ctaText:
        "Get expert guidance for documentation, DS-160 support, and interview readiness.",
    },

    f2: {
      title: "USA F2 Visa",
      badge: "USA • F2 Visa",
      subtitle:
        "Support for dependent visa applications for eligible family members of F1 visa holders.",
      heroImage:
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1200&auto=format&fit=crop",
      icon: Users,
      eligibility: [
        "Eligible spouse or child of a valid F1 visa holder",
        "Relationship can be supported through clear documentation",
        "Principal applicant’s visa and study status are available for reference",
        "Prepared application details and supporting records",
      ],
      requiredDocs: [
        "Valid passport",
        "Recent passport-size photograph",
        "Relationship proof such as marriage or birth certificate",
        "Principal applicant visa and supporting details",
        "DS-160 confirmation details",
        "Financial support evidence if applicable",
      ],
      process: [
        "Confirm F2 eligibility based on relationship and principal applicant status",
        "Collect identity and relationship documents",
        "Complete DS-160 carefully",
        "Review documentation for clarity and consistency",
        "Book appointment and prepare for visa interview if required",
        "Attend appointment and respond to any follow-up requests",
      ],
      timeline: [
        "Consultation",
        "Relationship Document Review",
        "Application Preparation",
        "Appointment / Submission",
        "Decision Awaited",
      ],
      faqs: [
        {
          question: "Who can apply for an F2 visa?",
          answer:
            "Generally, eligible dependents such as spouse and qualifying children of an F1 visa holder may apply.",
        },
        {
          question: "What documents are important for F2 applications?",
          answer:
            "Relationship proof, passport details, application records, and principal applicant support documents are important.",
        },
        {
          question: "Can F2 applicants study in the USA?",
          answer:
            "Study permissions depend on the applicable rules and circumstances. Specific planning should be reviewed carefully.",
        },
        {
          question: "Can you help review dependent visa documents?",
          answer:
            "Yes, we can help organize and review supporting documents for better clarity and completeness.",
        },
      ],
      ctaTitle: "Ready to Start Your USA F2 Visa Application?",
      ctaText:
        "Get structured support for dependent visa documentation and application preparation.",
    },

    "b1-b2": {
      title: "USA B1/B2 Visa",
      badge: "USA • B1/B2 Visa",
      subtitle:
        "Visa support for business visits, tourism, family visits, and short personal travel to the United States.",
      heroImage:
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1200&auto=format&fit=crop",
      icon: Briefcase,
      eligibility: [
        "Clear business, tourism, family visit, or personal travel purpose",
        "Ability to show supporting travel and financial documents",
        "Prepared to present a complete and consistent application",
        "Willingness to attend interview formalities where required",
      ],
      requiredDocs: [
        "Valid passport",
        "Recent passport-size photograph",
        "DS-160 confirmation details",
        "Travel purpose statement",
        "Financial proof",
        "Invitation or business support documents if applicable",
      ],
      process: [
        "Identify whether your purpose fits the B1/B2 category",
        "Prepare identity, financial, and travel support documents",
        "Complete DS-160 carefully",
        "Review your application for consistency",
        "Book appointment and prepare for the interview",
        "Attend interview and track follow-up updates",
      ],
      timeline: [
        "Consultation",
        "Document Preparation",
        "Application Review",
        "Appointment",
        "Decision Awaited",
      ],
      faqs: [
        {
          question: "What is the B1/B2 visa used for?",
          answer:
            "It is commonly used for short business visits, tourism, family visits, or limited personal travel purposes.",
        },
        {
          question: "Do I need an invitation letter?",
          answer:
            "It depends on the nature of your trip. In some cases, invitation or supporting business/family documents strengthen the file.",
        },
        {
          question: "Is interview preparation necessary?",
          answer:
            "Yes, clear and consistent presentation of your purpose and supporting documents is important.",
        },
        {
          question: "Can you help with refusal follow-up support?",
          answer:
            "Yes, we can help review the case and guide document preparation for appropriate next steps.",
        },
      ],
      ctaTitle: "Ready to Start Your USA B1/B2 Visa Application?",
      ctaText:
        "Get practical help for documentation, DS-160 support, and interview preparation.",
    },
  },

  canada: {
    visitor: {
      title: "Canada Visitor Visa",
      badge: "Canada • Visitor Visa",
      subtitle:
        "Structured visa support for tourism, family visits, and short personal travel to Canada.",
      heroImage:
        "https://images.unsplash.com/photo-1517935706615-2717063c2225?q=80&w=1200&auto=format&fit=crop",
      icon: Plane,
      eligibility: [
        "Clear short-stay travel purpose for tourism, family visit, or personal travel",
        "Ability to show sufficient funds for travel and stay",
        "Supporting documents that explain travel intent clearly",
        "Prepared documentation and application details",
      ],
      requiredDocs: [
        "Valid passport",
        "Recent passport-size photograph",
        "Application details and travel purpose statement",
        "Financial proof",
        "Travel itinerary if applicable",
        "Invitation letter or accommodation details if applicable",
      ],
      process: [
        "Confirm the visitor visa pathway based on travel intent",
        "Collect travel, identity, and financial documents",
        "Prepare application details carefully",
        "Review the file for completeness and consistency",
        "Submit the application",
        "Track updates and respond to requests if needed",
      ],
      timeline: [
        "Consultation",
        "Document Preparation",
        "Application Review",
        "Submission",
        "Decision Awaited",
      ],
      faqs: [
        {
          question: "What is a Canada visitor visa used for?",
          answer:
            "It is commonly used for tourism, family visits, and short personal travel to Canada.",
        },
        {
          question: "Do I need financial proof?",
          answer:
            "Yes, applicants are generally expected to show enough funds for travel and stay.",
        },
        {
          question: "Can invitation documents help?",
          answer:
            "Yes, when relevant, invitation and accommodation details can help explain your visit clearly.",
        },
        {
          question: "Can you review my visitor visa documents?",
          answer:
            "Yes, we provide structured guidance and document review support where applicable.",
        },
      ],
      ctaTitle: "Ready to Start Your Canada Visitor Visa Application?",
      ctaText:
        "Get practical support for application preparation, documents, and next-step guidance.",
    },
  },

  uk: {
    "standard-visitor": {
      title: "UK Standard Visitor Visa",
      badge: "UK • Standard Visitor Visa",
      subtitle:
        "Support for tourism, family visits, and permitted short-stay travel to the United Kingdom.",
      heroImage:
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop",
      icon: Plane,
      eligibility: [
        "Clear short-stay travel purpose such as tourism or family visit",
        "Ability to show supporting financial and travel documents",
        "Supporting records that explain accommodation and trip intent",
        "Prepared to complete the application carefully",
      ],
      requiredDocs: [
        "Valid passport",
        "Recent passport-size photograph if required",
        "Travel purpose statement",
        "Financial proof",
        "Accommodation details",
        "Invitation letter if applicable",
      ],
      process: [
        "Identify the correct standard visitor visa purpose",
        "Prepare your identity, travel, and financial documents",
        "Complete the application carefully",
        "Review all information for consistency",
        "Submit and complete appointment/biometric steps if required",
        "Track updates and respond to any requests",
      ],
      timeline: [
        "Consultation",
        "Document Preparation",
        "Application Review",
        "Submission / Biometrics",
        "Decision Awaited",
      ],
      faqs: [
        {
          question: "What is the UK Standard Visitor Visa used for?",
          answer:
            "It is commonly used for short visits such as tourism, family visits, and certain permitted travel purposes.",
        },
        {
          question: "Do I need accommodation proof?",
          answer:
            "Yes, accommodation or stay-related details are often important for a clear file.",
        },
        {
          question: "Can financial proof affect the application?",
          answer:
            "Yes, clear financial documents generally help explain travel feasibility and support.",
        },
        {
          question: "Can Visaassist support UK visitor applications?",
          answer:
            "Yes, we can guide document preparation, review, and overall application support.",
        },
      ],
      ctaTitle: "Ready to Start Your UK Standard Visitor Visa Application?",
      ctaText:
        "Get support for documents, application clarity, and smoother next steps.",
    },
  },

  australia: {
    visitor: {
      title: "Australia Visitor Visa",
      badge: "Australia • Visitor Visa",
      subtitle:
        "Professional guidance for short-stay visitor visa applications to Australia.",
      heroImage:
        "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=1200&auto=format&fit=crop",
      icon: Plane,
      eligibility: [
        "Clear short-term visit purpose such as tourism or family travel",
        "Supporting financial and travel records",
        "Organized application details and identity records",
        "Prepared file with relevant documentation",
      ],
      requiredDocs: [
        "Valid passport",
        "Recent passport-size photograph",
        "Travel purpose explanation",
        "Financial proof",
        "Accommodation details",
        "Invitation or supporting documents if applicable",
      ],
      process: [
        "Identify the visitor pathway for your travel purpose",
        "Prepare documents and financial records",
        "Complete application details carefully",
        "Review the file for completeness",
        "Submit the application",
        "Track progress and respond to any document requests",
      ],
      timeline: [
        "Consultation",
        "Document Preparation",
        "Application Review",
        "Submission",
        "Decision Awaited",
      ],
      faqs: [
        {
          question: "What is the Australia Visitor Visa for?",
          answer:
            "It is generally used for tourism, family visits, or short personal travel to Australia.",
        },
        {
          question: "Do I need financial proof for this visa?",
          answer:
            "Yes, clear financial support documents are typically important.",
        },
        {
          question: "Can family invitation details help?",
          answer:
            "Yes, where applicable, invitation and stay details can help explain the purpose of visit.",
        },
        {
          question: "Do you help with document review?",
          answer:
            "Yes, we can help with structured guidance and document review support.",
        },
      ],
      ctaTitle: "Ready to Start Your Australia Visitor Visa Application?",
      ctaText:
        "Get guided support for documents, review, and a smoother visa preparation process.",
    },
  },

  schengen: {
    tourist: {
      title: "Schengen Tourist Visa",
      badge: "Schengen • Tourist Visa",
      subtitle:
        "Visa support for tourism and short leisure travel across Schengen destinations.",
      heroImage:
        "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1200&auto=format&fit=crop",
      icon: Plane,
      eligibility: [
        "Clear tourism or leisure travel purpose",
        "Planned travel itinerary and destination clarity",
        "Supporting financial and accommodation records",
        "Prepared documentation for short-stay travel formalities",
      ],
      requiredDocs: [
        "Valid passport",
        "Recent passport-size photographs",
        "Travel itinerary",
        "Financial proof",
        "Accommodation details",
        "Travel insurance if applicable",
      ],
      process: [
        "Confirm tourist visa suitability for your travel purpose",
        "Prepare identity, itinerary, and financial documents",
        "Complete application details carefully",
        "Review the file for consistency and embassy suitability",
        "Submit and attend biometrics if required",
        "Track updates until decision",
      ],
      timeline: [
        "Consultation",
        "Travel Document Preparation",
        "Application Review",
        "Submission / Biometrics",
        "Decision Awaited",
      ],
      faqs: [
        {
          question: "What is a Schengen Tourist Visa used for?",
          answer:
            "It is generally used for short tourism and leisure travel across Schengen destinations.",
        },
        {
          question: "Do I need travel insurance?",
          answer:
            "For many applications, travel insurance may be an important supporting requirement depending on the route.",
        },
        {
          question: "Is itinerary planning important?",
          answer:
            "Yes, travel dates, stay details, and destination clarity are important for a strong file.",
        },
        {
          question: "Can you help organize embassy-related documents?",
          answer:
            "Yes, we can help guide application readiness and document structure.",
        },
      ],
      ctaTitle: "Ready to Start Your Schengen Tourist Visa Application?",
      ctaText:
        "Get expert help for itinerary clarity, document preparation, and submission readiness.",
    },
  },

  turkey: {
    business: {
      title: "Turkey Tourist Visa",
      badge: "Turkey • tourist Visa",
      subtitle:
        "Structured support for tourist travel, meetings, and professional visits to Turkey.",
      heroImage:
        "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1200&auto=format&fit=crop",
      icon: Briefcase,
      eligibility: [
        "Clear short-term tourist purpose such as meetings or conferences",
        "Supporting company or professional documentation",
        "Prepared travel and financial details",
        "Organized application with relevant supporting records",
      ],
      requiredDocs: [
        "Valid passport",
        "Recent passport-size photograph",
        "Business invitation or meeting support documents",
        "Travel purpose statement",
        "Financial proof",
        "Employment or company supporting records",
      ],
      process: [
        "Confirm tourist visa suitability for your travel purpose",
        "Prepare tourist, travel, and financial documents",
        "Complete application details carefully",
        "Review file for document consistency",
        "Submit through the applicable route",
        "Track progress and respond to any requests",
      ],
      timeline: [
        "Consultation",
        "Tourist Document Preparation",
        "Application Review",
        "Submission",
        "Decision Awaited",
      ],
      faqs: [
        {
          question: "What is the Newzealand Business Visa used for?",
          answer:
            "It is commonly used for short professional trips such as meetings, conferences, and related business activities.",
        },
        {
          question: "Do I need a business invitation letter?",
          answer:
            "In many cases, business support documents help explain the purpose of travel clearly.",
        },
        {
          question: "Is financial proof required?",
          answer:
            "Yes, financial and travel support records are generally important for application clarity.",
        },
        {
          question: "Can you support document review for Newzealand business travel?",
          answer:
            "Yes, we can help structure and review the application file for better readiness.",
        },
      ],
      ctaTitle: "Ready to Start Your Newzealand Business Visa Application?",
      ctaText:
        "Get practical support for business travel documentation and smooth next steps.",
    },
  },

   newZealand: {
    business: {
      title: "newzealand Business Visa",
      badge: "newzealand • Business Visa",
      subtitle:
        "Structured support for tourist travel, meetings, and professional visits to newzealand.",
      heroImage:
        "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1200&auto=format&fit=crop",
      icon: Briefcase,
      eligibility: [
        "Clear short-term tourist purpose such as meetings or conferences",
        "Supporting company or professional documentation",
        "Prepared travel and financial details",
        "Organized application with relevant supporting records",
      ],
      requiredDocs: [
        "Valid passport",
        "Recent passport-size photograph",
        "Business invitation or meeting support documents",
        "Travel purpose statement",
        "Financial proof",
        "Employment or company supporting records",
      ],
      process: [
        "Confirm tourist visa suitability for your travel purpose",
        "Prepare tourist, travel, and financial documents",
        "Complete application details carefully",
        "Review file for document consistency",
        "Submit through the applicable route",
        "Track progress and respond to any requests",
      ],
      timeline: [
        "Consultation",
        "Tourist Document Preparation",
        "Application Review",
        "Submission",
        "Decision Awaited",
      ],
      faqs: [
        {
          question: "What is the newzealand Tourist Visa used for?",
          answer:
            "It is commonly used for short professional trips such as meetings, conferences, and related tourist activities.",
        },
        {
          question: "Do I need a tourist invitation letter?",
          answer:
            "In many cases, tourist support documents help explain the purpose of travel clearly.",
        },
        {
          question: "Is financial proof required?",
          answer:
            "Yes, financial and travel support records are generally important for application clarity.",
        },
        {
          question: "Can you support document review for newzealand tourist travel?",
          answer:
            "Yes, we can help structure and review the application file for better readiness.",
        },
      ],
      ctaTitle: "Ready to Start Your newzealand Tourist Visa Application?",
      ctaText:
        "Get practical support for tourist travel documentation and smooth next steps.",
    },
  },
};

export const getVisaTypeContent = (country, visaType) => {
  return visaTypeData?.[country]?.[visaType] || null;
};