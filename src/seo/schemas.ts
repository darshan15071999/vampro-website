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
  "description": "A creative technology lab that builds professional software and plugins for creators.",
  "sameAs": [
    "https://www.youtube.com/@vampro"
  ],
  "brand": {
    "@type": "Brand",
    "name": "Vampro"
  },
  "knowsAbout": [
    "Creative Plugins",
    "Adobe Premiere Pro",
    "AI Voice Generation",
    "Creative Software",
    "Workflow Automation",
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

export const pluginsCollectionSchema: SchemaType = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Vampro Plugins",
  "description": "Professional creative plugins for Adobe Premiere Pro and other creative tools.",
  "url": "https://vampro.in/plugins",
  "publisher": {
    "@type": "Organization",
    "name": "Vampro"
  }
};

export const docsCollectionSchema: SchemaType = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Vampro Documentation",
  "description": "Documentation, installation guides, and tutorials for Vampro plugins.",
  "url": "https://vampro.in/docs",
  "publisher": {
    "@type": "Organization",
    "name": "Vampro"
  }
};

export const voiceGeneratorSchema: SchemaType = [
  {
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
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Vampro AI Voice Generator",
    "description": "AI-powered text-to-speech plugin for Adobe Premiere Pro. Generate natural voiceovers directly inside your timeline.",
    "brand": {
      "@type": "Brand",
      "name": "Vampro"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "url": "https://vampro.in/plugins/voice-generator"
  }
];

// Preserved for future use — not publicly referenced
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

// Preserved for future use — not publicly referenced
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
  "about": "Documentation for Vampro plugins.",
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
