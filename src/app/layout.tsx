import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ParticleBackground } from "@/components/ParticleBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const baseUrl = "https://ypinchuck.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Yehuda Pinchuck | Tech Professional & AI Specialist | USA & Israel",
    template: "%s | Yehuda Pinchuck",
  },
  description: "Yehuda Pinchuck is a cybersecurity specialist and tech professional with expertise in police IT systems, OSINT, digital forensics, React, Python, and AI. Available for opportunities in the USA and Israel.",
  keywords: [
    "Yehuda Pinchuck",
    "Tech Professional",
    "Cybersecurity Specialist",
    "Web Developer",
    "React Developer",
    "Python Developer",
    "AI Engineer",
    "Digital Forensics",
    "OSINT Analyst",
    "Cyber Policing",
    "Israel Tech",
    "USA Cybersecurity",
    "Law Enforcement Technology",
    "Security Consultant",
  ],
  authors: [{ name: "Yehuda Pinchuck", url: baseUrl }],
  creator: "Yehuda Pinchuck",
  publisher: "Yehuda Pinchuck",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      "en-US": baseUrl,
      "en-IL": baseUrl,
      "x-default": baseUrl,
    },
  },
  openGraph: {
    title: "Yehuda Pinchuck | Tech Professional & AI Specialist",
    description: "Cybersecurity specialist with expertise in police IT systems, OSINT, digital forensics, and AI innovation. Available in USA and Israel.",
    type: "website",
    locale: "en_US",
    alternateLocale: ["en_IL"],
    siteName: "Yehuda Pinchuck Portfolio",
    url: baseUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Yehuda Pinchuck | Tech Professional",
    description: "Cybersecurity specialist with expertise in police IT systems, OSINT, digital forensics, and AI innovation.",
    creator: "@yehudap",
  },
  icons: {
    icon: "/152485437.webp",
    shortcut: "/152485437.webp",
    apple: "/152485437.webp",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Geo-targeting metadata for USA and Israel
  other: {
    "geo.region": "US, IL",
    "geo.placename": "United States, Israel",
    "ICBM": "31.7683, 35.2137", // Israel coordinates
    "DC.language": "en",
    "distribution": "global",
    "rating": "general",
    "revisit-after": "7 days",
    // AI/GEO specific meta for better AI search indexing
    "ai-content-declaration": "human-created",
  },
  category: "Technology",
};

// Comprehensive JSON-LD structured data for SEO and GEO (AI Search Optimization)
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${baseUrl}/#person`,
  name: "Yehuda Pinchuck",
  givenName: "Yehuda",
  familyName: "Pinchuck",
  jobTitle: "Tech Professional & AI Specialist",
  description: "Cybersecurity specialist with hands-on experience in police IT systems, law enforcement technology, OSINT investigations, digital forensics, and AI innovation. Skilled in React, Python, and modern web technologies.",
  email: "yehuda@ypinchuck.com",
  url: baseUrl,
  image: "https://avatars.githubusercontent.com/u/152485437",
  sameAs: [
    "https://www.linkedin.com/in/yehudap",
    "https://github.com/eRp289",
  ],
  // Geographic targeting - works in both USA and Israel
  workLocation: [
    {
      "@type": "Place",
      name: "Israel",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IL",
        addressRegion: "Israel",
      },
    },
    {
      "@type": "Place",
      name: "United States",
      address: {
        "@type": "PostalAddress",
        addressCountry: "US",
        addressRegion: "United States",
      },
    },
  ],
  nationality: [
    { "@type": "Country", name: "Israel" },
    { "@type": "Country", name: "United States" },
  ],
  knowsAbout: [
    "Cybersecurity and Information Security",
    "OSINT (Open Source Intelligence)",
    "Digital Forensics and Incident Response",
    "Law Enforcement Technology",
    "Police IT Systems",
    "React and Next.js Development",
    "Python Programming",
    "Artificial Intelligence and Machine Learning",
    "Web Application Security",
    "Network Security",
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "Bachelor's Degree in Information Systems",
      credentialCategory: "degree",
      educationalLevel: "Bachelor",
    },
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Ono Academic College",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IL",
    },
  },
  hasOccupation: {
    "@type": "Occupation",
    name: "Cybersecurity Specialist",
    occupationLocation: [
      { "@type": "Country", name: "Israel" },
      { "@type": "Country", name: "United States" },
    ],
    skills: "Cybersecurity, OSINT, Digital Forensics, React, Python, AI",
  },
};

// FAQ Schema for GEO - AI search engines prioritize FAQ content
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${baseUrl}/#faq`,
  mainEntity: [
    {
      "@type": "Question",
      name: "What services does Yehuda Pinchuck offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yehuda Pinchuck offers cybersecurity consulting, OSINT investigations, digital forensics, web development with React and Next.js, Python development, AI/ML solutions, and law enforcement technology consulting. Services are available in both the United States and Israel.",
      },
    },
    {
      "@type": "Question",
      name: "What is Yehuda Pinchuck's cybersecurity experience?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yehuda has hands-on experience working with police IT systems, conducting OSINT investigations, performing digital forensics, and implementing security solutions for law enforcement agencies. He specializes in cyber policing and security infrastructure.",
      },
    },
    {
      "@type": "Question",
      name: "Does Yehuda Pinchuck work internationally?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Yehuda Pinchuck is available for work in both the United States and Israel. He has experience working with international clients and can provide remote cybersecurity and development services globally.",
      },
    },
    {
      "@type": "Question",
      name: "What programming languages and technologies does Yehuda know?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yehuda is proficient in React, Next.js, TypeScript, Python, and various AI/ML technologies. He also has expertise in cybersecurity tools, OSINT platforms, and digital forensics software.",
      },
    },
    {
      "@type": "Question",
      name: "How can I contact Yehuda Pinchuck for a project?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can contact Yehuda Pinchuck via email at yehuda@ypinchuck.com or through LinkedIn at linkedin.com/in/yehudap. He is open to cybersecurity consulting, development projects, and collaboration opportunities.",
      },
    },
  ],
};

// WebSite Schema for search features
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${baseUrl}/#website`,
  name: "Yehuda Pinchuck - Tech Professional Portfolio",
  url: baseUrl,
  description: "Professional portfolio of Yehuda Pinchuck, showcasing cybersecurity expertise, tech projects, and professional experience.",
  publisher: {
    "@id": `${baseUrl}/#person`,
  },
  inLanguage: "en",
  copyrightYear: new Date().getFullYear(),
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${baseUrl}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// Professional Service Schema for GEO
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${baseUrl}/#service`,
  name: "Yehuda Pinchuck - Cybersecurity & Development Services",
  description: "Professional cybersecurity consulting, OSINT investigations, digital forensics, and full-stack web development services.",
  url: baseUrl,
  provider: {
    "@id": `${baseUrl}/#person`,
  },
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "Israel" },
    { "@type": "GeoCircle", geoMidpoint: { "@type": "GeoCoordinates", latitude: 31.7683, longitude: 35.2137 }, geoRadius: "5000" },
  ],
  serviceType: [
    "Cybersecurity Consulting",
    "OSINT Investigation",
    "Digital Forensics",
    "Web Development",
    "React Development",
    "Python Development",
    "AI/ML Solutions",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Professional Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cybersecurity Consulting",
          description: "Security assessments, penetration testing, and security infrastructure design.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Web Development",
          description: "Full-stack web development using React, Next.js, and Python.",
        },
      },
    ],
  },
};

// Combine all schemas
const jsonLdSchemas = [personSchema, faqSchema, websiteSchema, serviceSchema];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Multiple JSON-LD schemas for comprehensive SEO and GEO optimization */}
        {jsonLdSchemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {/* Skip to main content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-lg focus:outline-none"
          >
            Skip to main content
          </a>
          <ParticleBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

