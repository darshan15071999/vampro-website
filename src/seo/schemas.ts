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

export const universalPasteSchema: SchemaType = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Vampro Universal Paste",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Windows 10, Windows 11, macOS",
    "softwareRequirements": "Adobe Premiere Pro 24.0 or higher",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/PreOrder"
    },
    "description": "Adobe Premiere Pro plugin and workflow companion that enables video editors to paste clipboard media, capture application screenshots, record windows, and ingest web media directly onto the sequence timeline.",
    "url": "https://vampro.in/plugins/universal-paste",
    "image": "https://vampro.in/assets/universal-paste/superhero.png",
    "screenshot": "https://vampro.in/assets/universal-paste/superhero.png",
    "publisher": {
      "@type": "Organization",
      "name": "Vampro"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Vampro Universal Paste for Adobe Premiere Pro",
    "description": "The essential Premiere Pro plugin for editors. Paste clipboard media, grab URLs, capture window recordings, and drop assets directly into your timeline without desktop clutter.",
    "brand": {
      "@type": "Brand",
      "name": "Vampro"
    },
    "category": "Video Editing Software Plugin",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/PreOrder"
    },
    "url": "https://vampro.in/plugins/universal-paste"
  }
];

export const universalPasteFaqSchema: SchemaType = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Vampro Universal Paste?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vampro Universal Paste is an Adobe Premiere Pro extension (UXP) and native desktop companion that turns clipboard content, screenshots, window recordings, URLs, GIFs, images, and videos into timeline-ready assets with a single click."
      }
    },
    {
      "@type": "Question",
      "name": "How do I paste clipboard images directly into Adobe Premiere Pro?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "With Vampro Universal Paste installed, simply copy any image or GIF from your web browser or desktop (Ctrl+C), switch to Premiere Pro, open the Universal Paste panel, preview the detected asset, and click 'Paste to Timeline' or 'Import to Bin'. It places the asset directly at the playhead without requiring manual saving to your desktop."
      }
    },
    {
      "@type": "Question",
      "name": "Can I take screenshots or record screen videos directly into Premiere Pro?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The integrated companion app includes region screenshot snipping and screen recording tools. Captured media is automatically encoded, saved into dedicated project media bins, and placed directly onto your timeline sequence."
      }
    },
    {
      "@type": "Question",
      "name": "How does 1-click timeline clip replacement work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Select any clip on your Premiere Pro timeline, copy a new asset (image, GIF, or video) to your clipboard, and click 'Replace Clip'. Universal Paste instantly swaps the media while preserving the original clip duration, timeline position, scale, and applied keyframe effects."
      }
    },
    {
      "@type": "Question",
      "name": "Does Universal Paste require saving files to my desktop first?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Universal Paste eliminates desktop clutter by automatically reading the system clipboard or downloading web media in the background, saving assets into an organized project folder, and importing them straight into Premiere Pro."
      }
    },
    {
      "@type": "Question",
      "name": "Does Universal Paste work offline without external servers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, 100%. All clipboard processing, screenshot snipping, screen recordings, and Premiere Pro timeline insertions execute completely offline on your local machine. Your assets, footage, and project files never leave your system."
      }
    },
    {
      "@type": "Question",
      "name": "What media formats are supported by Universal Paste?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Universal Paste supports PNG, JPG, JPEG, WebP, animated GIFs, MP4, WebM, clipboard bitmap buffers, and direct video/media URLs."
      }
    },
    {
      "@type": "Question",
      "name": "Which versions of Adobe Premiere Pro are compatible with Universal Paste?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vampro Universal Paste is compatible with Adobe Premiere Pro 24.0 (2024), 25.0+ (2025), and later releases on Windows 10/11 64-bit (with macOS support planned)."
      }
    }
  ]
};

export const universalPasteHowToSchema: SchemaType = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Paste Media Directly into Adobe Premiere Pro with Universal Paste",
  "description": "Learn how to instantly paste web images, clipboard captures, screenshots, and URLs into your Adobe Premiere Pro sequence timeline without saving files to your desktop.",
  "totalTime": "PT1M",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Copy Media or Capture Region",
      "text": "Copy an image, GIF, file, or URL to your clipboard (Ctrl+C), or use the companion screen capture tool to snip a region."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Open Universal Paste in Premiere Pro",
      "text": "Switch to Adobe Premiere Pro and access the Universal Paste panel (Window > Extensions > Vampro Universal Paste)."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Preview Detected Asset",
      "text": "The panel immediately displays the clipboard asset with resolution, format, and playback controls."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Paste to Timeline or Import to Bin",
      "text": "Click 'Paste to Timeline' to insert at your playhead position or 'Import to Bin' to add it to organized project folders."
    }
  ]
};

