export type BreadcrumbItem = {
  name: string;
  item: string;
};

export const generateBreadcrumbSchema = (items: BreadcrumbItem[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item
    }))
  };
};

export const homeBreadcrumb = [];

export const pluginsBreadcrumb = generateBreadcrumbSchema([
  { name: 'Home', item: 'https://vampro.in' },
  { name: 'Plugins', item: 'https://vampro.in/plugins' }
]);

export const voiceBreadcrumb = generateBreadcrumbSchema([
  { name: 'Home', item: 'https://vampro.in' },
  { name: 'Plugins', item: 'https://vampro.in/plugins' },
  { name: 'Voice Generator', item: 'https://vampro.in/plugins/voice-generator' }
]);

export const universalPasteBreadcrumb = generateBreadcrumbSchema([
  { name: 'Home', item: 'https://vampro.in' },
  { name: 'Plugins', item: 'https://vampro.in/plugins' },
  { name: 'Universal Paste', item: 'https://vampro.in/plugins/universal-paste' }
]);

export const signalScopeBreadcrumb = generateBreadcrumbSchema([
  { name: 'Home', item: 'https://vampro.in' },
  { name: 'Software', item: 'https://vampro.in/software' },
  { name: 'SignalScope', item: 'https://vampro.in/software/signalscope' }
]);

export const spochBreadcrumb = generateBreadcrumbSchema([
  { name: 'Home', item: 'https://vampro.in' },
  { name: 'Games', item: 'https://vampro.in/games' },
  { name: 'Spoch', item: 'https://vampro.in/games/spoch' }
]);

export const docsHubBreadcrumb = generateBreadcrumbSchema([
  { name: 'Home', item: 'https://vampro.in' },
  { name: 'Documentation', item: 'https://vampro.in/docs' }
]);

export const docsVoiceBreadcrumb = generateBreadcrumbSchema([
  { name: 'Home', item: 'https://vampro.in' },
  { name: 'Documentation', item: 'https://vampro.in/docs' },
  { name: 'Plugins', item: 'https://vampro.in/docs/plugins' },
  { name: 'Voice Generator Docs', item: 'https://vampro.in/docs/plugins/voice-generator' }
]);

export const docsUniversalPasteBreadcrumb = generateBreadcrumbSchema([
  { name: 'Home', item: 'https://vampro.in' },
  { name: 'Documentation', item: 'https://vampro.in/docs' },
  { name: 'Plugins', item: 'https://vampro.in/docs/plugins' },
  { name: 'Universal Paste Docs', item: 'https://vampro.in/docs/plugins/universal-paste' }
]);

export const docsSignalScopeBreadcrumb = generateBreadcrumbSchema([
  { name: 'Home', item: 'https://vampro.in' },
  { name: 'Documentation', item: 'https://vampro.in/docs' },
  { name: 'Software', item: 'https://vampro.in/docs/software' },
  { name: 'SignalScope Docs', item: 'https://vampro.in/docs/software/signalscope' }
]);

export const docsSpochBreadcrumb = generateBreadcrumbSchema([
  { name: 'Home', item: 'https://vampro.in' },
  { name: 'Documentation', item: 'https://vampro.in/docs' },
  { name: 'Games', item: 'https://vampro.in/docs/games' },
  { name: 'Spoch Docs', item: 'https://vampro.in/docs/games/spoch' }
]);

export const blogBreadcrumb = generateBreadcrumbSchema([
  { name: 'Home', item: 'https://vampro.in' },
  { name: 'Blog', item: 'https://vampro.in/blog' }
]);

export const privacyBreadcrumb = generateBreadcrumbSchema([
  { name: 'Home', item: 'https://vampro.in' },
  { name: 'Privacy Policy', item: 'https://vampro.in/privacy' }
]);

export const termsBreadcrumb = generateBreadcrumbSchema([
  { name: 'Home', item: 'https://vampro.in' },
  { name: 'Terms of Service', item: 'https://vampro.in/terms' }
]);

export const licensesBreadcrumb = generateBreadcrumbSchema([
  { name: 'Home', item: 'https://vampro.in' },
  { name: 'Licenses', item: 'https://vampro.in/licenses' }
]);
