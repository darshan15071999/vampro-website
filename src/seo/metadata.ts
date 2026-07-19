import type { SchemaType } from './schemas';
import {
  organizationSchema, websiteSchema, voiceGeneratorSchema,
  pluginsCollectionSchema, docsCollectionSchema,
  signalScopeSchema, spochSchema, docsSchema,
  privacySchema, termsSchema, licensesSchema
} from './schemas';
import {
  homeBreadcrumb, pluginsBreadcrumb, voiceBreadcrumb, signalScopeBreadcrumb, spochBreadcrumb,
  docsHubBreadcrumb, docsVoiceBreadcrumb, docsSignalScopeBreadcrumb, docsSpochBreadcrumb,
  privacyBreadcrumb, termsBreadcrumb, licensesBreadcrumb, blogBreadcrumb
} from './breadcrumbs';

export interface PageMetadata {
  title: string;
  description: string;
  canonical: string;
  keywords?: string;
  schema?: SchemaType;
  breadcrumbs?: Record<string, any>;
  image?: string;
  type?: string;
  robots?: string;
  noIndex?: boolean;
}

const architectureItemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "url": "https://vampro.in/plugins" },
    { "@type": "ListItem", "position": 2, "url": "https://vampro.in/plugins/voice-generator" },
    { "@type": "ListItem", "position": 3, "url": "https://vampro.in/docs" },
    { "@type": "ListItem", "position": 4, "url": "https://vampro.in/blog" }
  ]
};

export const homeMetadata: PageMetadata = {
  title: 'Vampro | Creative Technology Lab: Professional Plugins for Creators',
  description: "Vampro is a creative technology lab that builds professional software and plugins for creators. Explore our AI Voice Generator for Adobe Premiere Pro and more.",
  canonical: 'https://vampro.in/',
  keywords: 'creative technology lab, professional plugins, creator tools, workflow automation, Adobe Premiere Pro, AI voice generator',
  schema: [organizationSchema, websiteSchema, architectureItemList],
  breadcrumbs: homeBreadcrumb
};

export const pluginsMetadata: PageMetadata = {
  title: 'Professional Creative Plugins | Vampro',
  description: 'Explore professional creative plugins from Vampro. AI-powered tools designed for Adobe Premiere Pro and creative workflows.',
  // /plugins client-redirects to the voice generator — canonical points at the target
  canonical: 'https://vampro.in/plugins/voice-generator',
  keywords: 'Adobe Premiere Pro plugins, AI plugins, creative plugins, professional creative tools, voice generator plugin',
  schema: pluginsCollectionSchema,
  breadcrumbs: pluginsBreadcrumb
};

export const voiceMetadata: PageMetadata = {
  title: 'AI Voice Generator for Adobe Premiere Pro | Vampro',
  description: 'Generate natural AI voiceovers directly inside Adobe Premiere Pro. Write scripts, choose voices, and create professional narration.',
  canonical: 'https://vampro.in/plugins/voice-generator',
  keywords: 'AI voice generator, text to speech, Adobe Premiere Pro plugin, voiceover, narration, creative plugin',
  schema: voiceGeneratorSchema,
  breadcrumbs: voiceBreadcrumb
};

// Preserved for future use — hidden from public sitemap
export const signalScopeMetadata: PageMetadata = {
  title: 'SignalScope | AI Search Visibility & Reddit Intelligence Platform',
  description: 'Track how Reddit conversations influence AI search results across ChatGPT, Gemini, Claude, Perplexity and other AI assistants.',
  canonical: 'https://vampro.in/software/signalscope',
  schema: signalScopeSchema,
  breadcrumbs: signalScopeBreadcrumb,
  noIndex: true
};

// Preserved for future use — hidden from public sitemap
export const spochMetadata: PageMetadata = {
  title: 'Spoch | Open World Survival',
  description: 'An 8-bit Semi 3D Open World Survival Adventure.',
  canonical: 'https://vampro.in/games/spoch',
  schema: spochSchema,
  breadcrumbs: spochBreadcrumb,
  noIndex: true
};

export const docsHubMetadata: PageMetadata = {
  title: 'Plugin Documentation & Guides | Vampro',
  description: 'Browse Vampro plugin documentation, installation guides, tutorials, and technical references.',
  // /docs client-redirects to the voice generator docs — canonical points at the target
  canonical: 'https://vampro.in/docs/plugins/voice-generator',
  keywords: 'plugin documentation, installation guide, tutorials, Adobe Premiere Pro plugin docs',
  schema: docsCollectionSchema,
  breadcrumbs: docsHubBreadcrumb
};

export const docsVoiceMetadata: PageMetadata = {
  title: 'Voice Generator Documentation | Vampro',
  description: 'Documentation for Vampro AI Voice Generator Plugin for Adobe Premiere Pro. Installation, usage, and troubleshooting.',
  canonical: 'https://vampro.in/docs/plugins/voice-generator',
  keywords: 'voice generator documentation, plugin installation, troubleshooting, tutorial',
  schema: docsSchema,
  breadcrumbs: docsVoiceBreadcrumb
};

// Preserved for future use — hidden from public sitemap
export const docsSignalScopeMetadata: PageMetadata = {
  title: 'SignalScope Documentation | Vampro',
  description: 'Documentation for SignalScope AI Visibility Tracker.',
  canonical: 'https://vampro.in/docs/software/signalscope',
  schema: docsSchema,
  breadcrumbs: docsSignalScopeBreadcrumb,
  noIndex: true
};

// Preserved for future use — hidden from public sitemap
export const docsSpochMetadata: PageMetadata = {
  title: 'Spoch Documentation | Vampro',
  description: 'Documentation and guides for Spoch.',
  canonical: 'https://vampro.in/docs/games/spoch',
  schema: docsSchema,
  breadcrumbs: docsSpochBreadcrumb,
  noIndex: true
};

export const privacyMetadata: PageMetadata = {
  title: 'Privacy Policy | Vampro',
  description: 'Read how Vampro collects, stores and protects your data.',
  canonical: 'https://vampro.in/privacy',
  schema: privacySchema,
  breadcrumbs: privacyBreadcrumb
};

export const termsMetadata: PageMetadata = {
  title: 'Terms of Service | Vampro',
  description: 'Review the terms governing the use of Vampro software and services.',
  canonical: 'https://vampro.in/terms',
  schema: termsSchema,
  breadcrumbs: termsBreadcrumb
};

export const licensesMetadata: PageMetadata = {
  title: 'Open Source Licenses | Vampro',
  description: 'View the open source software licenses used throughout Vampro products.',
  canonical: 'https://vampro.in/licenses',
  schema: licensesSchema,
  breadcrumbs: licensesBreadcrumb
};

export const blogMetadata: PageMetadata = {
  title: 'Blog: Editing Tips, AI Workflows & Creative Automation | Vampro',
  description: 'Tutorials, editing tips, AI workflow guides, and creative automation insights from the Vampro team.',
  canonical: 'https://vampro.in/blog',
  keywords: 'editing tips, AI workflows, creative automation, Premiere Pro tutorials, voice generation tips',
  breadcrumbs: blogBreadcrumb
};

export const voicePrivacyMetadata: PageMetadata = { ...privacyMetadata, canonical: 'https://vampro.in/plugins/voice-generator/privacy' };
export const voiceTermsMetadata: PageMetadata = { ...termsMetadata, canonical: 'https://vampro.in/plugins/voice-generator/terms' };
export const voiceLicensesMetadata: PageMetadata = { ...licensesMetadata, canonical: 'https://vampro.in/plugins/voice-generator/licenses' };

// Preserved for future use — noIndex applied
export const signalScopePrivacyMetadata: PageMetadata = { ...privacyMetadata, canonical: 'https://vampro.in/software/signalscope/privacy', noIndex: true };
export const signalScopeTermsMetadata: PageMetadata = { ...termsMetadata, canonical: 'https://vampro.in/software/signalscope/terms', noIndex: true };

// Preserved for future use — noIndex applied
export const spochPrivacyMetadata: PageMetadata = { ...privacyMetadata, canonical: 'https://vampro.in/games/spoch/privacy', noIndex: true };
export const spochTermsMetadata: PageMetadata = { ...termsMetadata, canonical: 'https://vampro.in/games/spoch/terms', noIndex: true };

// Only include PUBLIC pages in allRoutesMetadata (used for sitemap and prerendering)
export const allRoutesMetadata = [
  { path: '/', ...homeMetadata },
  { path: '/plugins', ...pluginsMetadata },
  { path: '/plugins/voice-generator', ...voiceMetadata },
  { path: '/docs', ...docsHubMetadata },
  { path: '/docs/plugins/voice-generator', ...docsVoiceMetadata },
  { path: '/blog', ...blogMetadata },
  { path: '/privacy', ...privacyMetadata },
  { path: '/terms', ...termsMetadata },
  { path: '/plugins/voice-generator/privacy', ...voicePrivacyMetadata },
  { path: '/plugins/voice-generator/terms', ...voiceTermsMetadata },
  { path: '/plugins/voice-generator/licenses', ...voiceLicensesMetadata },
];
