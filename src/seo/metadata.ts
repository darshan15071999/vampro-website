import type { SchemaType } from './schemas';
import { 
  organizationSchema, websiteSchema, voiceGeneratorSchema, 
  signalScopeSchema, spochSchema, docsSchema, 
  privacySchema, termsSchema, licensesSchema 
} from './schemas';
import {
  homeBreadcrumb, voiceBreadcrumb, signalScopeBreadcrumb, spochBreadcrumb,
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
    { "@type": "ListItem", "position": 1, "url": "https://vampro.in/plugins/voice-generator" },
    { "@type": "ListItem", "position": 2, "url": "https://vampro.in/software/signalscope" },
    { "@type": "ListItem", "position": 3, "url": "https://vampro.in/games/spoch" },
    { "@type": "ListItem", "position": 4, "url": "https://vampro.in/docs" },
    { "@type": "ListItem", "position": 5, "url": "https://vampro.in/blog" }
  ]
};

export const homeMetadata: PageMetadata = {
  title: 'Vampro | Creative Software & AI Tools',
  description: "Discover Vampro's collection of AI-powered creative software, professional plugins, and productivity tools.",
  canonical: 'https://vampro.in/',
  schema: [organizationSchema, websiteSchema, architectureItemList],
  breadcrumbs: homeBreadcrumb
};

export const voiceMetadata: PageMetadata = {
  title: 'AI Voice Generator for Adobe Premiere Pro | Vampro',
  description: 'Generate natural AI voiceovers directly inside Adobe Premiere Pro. Write scripts, choose voices, and create professional narration.',
  canonical: 'https://vampro.in/plugins/voice-generator',
  schema: voiceGeneratorSchema,
  breadcrumbs: voiceBreadcrumb
};

export const signalScopeMetadata: PageMetadata = {
  title: 'SignalScope | AI Search Visibility & Reddit Intelligence Platform',
  description: 'Track how Reddit conversations influence AI search results across ChatGPT, Gemini, Claude, Perplexity and other AI assistants.',
  canonical: 'https://vampro.in/software/signalscope',
  schema: signalScopeSchema,
  breadcrumbs: signalScopeBreadcrumb
};

export const spochMetadata: PageMetadata = {
  title: 'Spoch | Open World Survival',
  description: 'An 8-bit Semi 3D Open World Survival Adventure.',
  canonical: 'https://vampro.in/games/spoch',
  schema: spochSchema,
  breadcrumbs: spochBreadcrumb
};

export const docsHubMetadata: PageMetadata = {
  title: 'Documentation Hub | Vampro',
  description: 'Browse Vampro documentation, guides and technical resources across plugins, software, and games.',
  canonical: 'https://vampro.in/docs',
  breadcrumbs: docsHubBreadcrumb
};

export const docsVoiceMetadata: PageMetadata = {
  title: 'Voice Generator Documentation | Vampro',
  description: 'Documentation for Vampro AI Voice Generator Plugin for Adobe Premiere Pro.',
  canonical: 'https://vampro.in/docs/plugins/voice-generator',
  schema: docsSchema,
  breadcrumbs: docsVoiceBreadcrumb
};

export const docsSignalScopeMetadata: PageMetadata = {
  title: 'SignalScope Documentation | Vampro',
  description: 'Documentation for SignalScope AI Visibility Tracker.',
  canonical: 'https://vampro.in/docs/software/signalscope',
  schema: docsSchema,
  breadcrumbs: docsSignalScopeBreadcrumb
};

export const docsSpochMetadata: PageMetadata = {
  title: 'Spoch Documentation | Vampro',
  description: 'Documentation and guides for Spoch.',
  canonical: 'https://vampro.in/docs/games/spoch',
  schema: docsSchema,
  breadcrumbs: docsSpochBreadcrumb
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
  title: 'Blog | Vampro',
  description: 'Insights, updates, and tutorials from the Vampro team.',
  canonical: 'https://vampro.in/blog',
  breadcrumbs: blogBreadcrumb
};

export const voicePrivacyMetadata: PageMetadata = { ...privacyMetadata, canonical: 'https://vampro.in/plugins/voice-generator/privacy' };
export const voiceTermsMetadata: PageMetadata = { ...termsMetadata, canonical: 'https://vampro.in/plugins/voice-generator/terms' };
export const voiceLicensesMetadata: PageMetadata = { ...licensesMetadata, canonical: 'https://vampro.in/plugins/voice-generator/licenses' };

export const signalScopePrivacyMetadata: PageMetadata = { ...privacyMetadata, canonical: 'https://vampro.in/software/signalscope/privacy' };
export const signalScopeTermsMetadata: PageMetadata = { ...termsMetadata, canonical: 'https://vampro.in/software/signalscope/terms' };

export const spochPrivacyMetadata: PageMetadata = { ...privacyMetadata, canonical: 'https://vampro.in/games/spoch/privacy' };
export const spochTermsMetadata: PageMetadata = { ...termsMetadata, canonical: 'https://vampro.in/games/spoch/terms' };

// Expose an array of all metadata for the postbuild prerendering script
export const allRoutesMetadata = [
  { path: '/', ...homeMetadata },
  { path: '/plugins/voice-generator', ...voiceMetadata },
  { path: '/software/signalscope', ...signalScopeMetadata },
  { path: '/games/spoch', ...spochMetadata },
  { path: '/docs', ...docsHubMetadata },
  { path: '/docs/plugins/voice-generator', ...docsVoiceMetadata },
  { path: '/docs/software/signalscope', ...docsSignalScopeMetadata },
  { path: '/docs/games/spoch', ...docsSpochMetadata },
  { path: '/blog', ...blogMetadata },
  { path: '/privacy', ...privacyMetadata },
  { path: '/terms', ...termsMetadata },
  { path: '/licenses', ...licensesMetadata },
  { path: '/plugins/voice-generator/privacy', ...voicePrivacyMetadata },
  { path: '/plugins/voice-generator/terms', ...voiceTermsMetadata },
  { path: '/plugins/voice-generator/licenses', ...voiceLicensesMetadata },
  { path: '/software/signalscope/privacy', ...signalScopePrivacyMetadata },
  { path: '/software/signalscope/terms', ...signalScopeTermsMetadata },
  { path: '/games/spoch/privacy', ...spochPrivacyMetadata },
  { path: '/games/spoch/terms', ...spochTermsMetadata }
];
