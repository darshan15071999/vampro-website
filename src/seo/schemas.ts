export type SchemaType = Record<string, any> | Record<string, any>[];

export const organizationSchema: SchemaType = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Vampro",
  "alternateName": "VAMPRO",
  "url": "https://vampro.in",
  "logo": "https://vampro.in/favicon.png",
  "image": "https://vampro.in/thumbnail.jpg",
  "foundingDate": "2020",
  "description": "Vampro develops AI-powered creative software, professional plugins, developer tools and digital products.",
  "sameAs": [
    "https://www.youtube.com/@vampro"
  ],
  "brand": {
    "@type": "Brand",
    "name": "Vampro"
  },
  "knowsAbout": [
    "Artificial Intelligence",
    "Creative Software",
    "Adobe Premiere Pro",
    "Developer Tools",
    "Knowledge Management",
    "AI Search",
    "Content Creation"
  ]
};

export const websiteSchema: SchemaType = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Vampro",
  "url": "https://vampro.in",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://vampro.in/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export const voiceGeneratorSchema: SchemaType = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Vampro AI Voice Generator",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "Windows",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Generate natural AI voiceovers directly inside Adobe Premiere Pro.",
  "url": "https://vampro.in/plugins/voice-generator",
  "image": "https://vampro.in/thumbnail.jpg",
  "publisher": {
    "@type": "Organization",
    "name": "Vampro"
  }
};

export const signalScopeSchema: SchemaType = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "SignalScope",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "Track how Reddit conversations influence AI search visibility across ChatGPT, Gemini, Claude and Perplexity.",
  "url": "https://vampro.in/software/signalscope",
  "image": "https://vampro.in/thumbnail.jpg",
  "publisher": {
    "@type": "Organization",
    "name": "Vampro"
  }
};

export const spochSchema: SchemaType = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Spoch",
  "url": "https://vampro.in/games/spoch",
  "description": "Open World Survival.",
  "gamePlatform": [
    "Windows",
    "Web"
  ],
  "publisher": {
    "@type": "Organization",
    "name": "Vampro"
  },
  "image": "https://vampro.in/thumbnail.jpg"
};

export const docsSchema: SchemaType = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Vampro Documentation",
  "about": "Documentation for Vampro products.",
  "publisher": {
    "@type": "Organization",
    "name": "Vampro"
  },
  "url": "https://vampro.in/docs"
};

export const privacySchema: SchemaType = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Privacy Policy",
  "url": "https://vampro.in/privacy",
  "publisher": {
    "@type": "Organization",
    "name": "Vampro"
  }
};

export const termsSchema: SchemaType = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Terms of Service",
  "url": "https://vampro.in/terms",
  "publisher": {
    "@type": "Organization",
    "name": "Vampro"
  }
};

export const licensesSchema: SchemaType = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Open Source Licenses",
  "url": "https://vampro.in/licenses",
  "publisher": {
    "@type": "Organization",
    "name": "Vampro"
  }
};
