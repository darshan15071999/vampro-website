import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { allRoutesMetadata } from './src/seo/metadata';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(process.cwd(), 'dist');
const indexPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('dist/index.html not found! Run build first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexPath, 'utf-8');
const regex = /<!-- Fallback SEO for SPA[\s\S]*?(?=<!-- Remove fallback tags)/;

allRoutesMetadata.forEach(route => {
  const metaTitle = route.title;
  const description = route.description;
  const canonical = route.canonical;
  const keywords = route.keywords || '';
  const author = 'Vampro';
  const robots = route.robots || 'index,follow';
  const themeColor = '#0F1640';
  const ogType = route.type || 'website';
  const ogTitle = route.title;
  const ogDescription = route.description;
  const ogImage = route.image || 'https://vampro.in/thumbnail.jpg';
  const twitterCard = 'summary_large_image';

  // Handle schemas
  const schemaMarkup = route.schema
    ? Array.isArray(route.schema)
      ? route.schema.map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n  ')
      : `<script type="application/ld+json">${JSON.stringify(route.schema)}</script>`
    : '';

  const metaBlock = `<!-- Fallback SEO for SPA (Managed by react-helmet-async) -->
  <title data-rh="true">${metaTitle}</title>
  <meta data-rh="true" name="title" content="${metaTitle}" />
  <meta data-rh="true" name="description" content="${description}" />
  <meta data-rh="true" name="author" content="${author}" />
  ${keywords ? `<meta data-rh="true" name="keywords" content="${keywords}" />` : ''}
  <meta data-rh="true" name="theme-color" content="${themeColor}" />
  <meta data-rh="true" name="robots" content="${robots}" />
  <link data-rh="true" rel="canonical" href="${canonical}" />
  <meta data-rh="true" property="og:type" content="${ogType}" />
  <meta data-rh="true" property="og:url" content="${canonical}" />
  <meta data-rh="true" property="og:title" content="${ogTitle}" />
  <meta data-rh="true" property="og:description" content="${ogDescription}" />
  <meta data-rh="true" property="og:image" content="${ogImage}" />
  <meta data-rh="true" name="twitter:card" content="${twitterCard}" />
  <meta data-rh="true" name="twitter:url" content="${canonical}" />
  <meta data-rh="true" name="twitter:title" content="${ogTitle}" />
  <meta data-rh="true" name="twitter:description" content="${ogDescription}" />
  <meta data-rh="true" name="twitter:image" content="${ogImage}" />
  ${schemaMarkup}
  `;

  const newHtml = baseHtml.replace(regex, metaBlock);

  if (route.path === '/') {
    fs.writeFileSync(indexPath, newHtml);
    console.log('Updated metadata for homepage');
  } else {
    // Generate both folder/index.html AND file.html for maximum compatibility
    const routeName = route.path.substring(1);
    
    // 1. Generate file.html
    const htmlFilePath = path.join(distDir, `${routeName}.html`);
    const htmlFileDir = path.dirname(htmlFilePath);
    if (!fs.existsSync(htmlFileDir)) {
      fs.mkdirSync(htmlFileDir, { recursive: true });
    }
    fs.writeFileSync(htmlFilePath, newHtml);
    
    // 2. Generate folder/index.html
    const routeDir = path.join(distDir, routeName);
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }
    fs.writeFileSync(path.join(routeDir, 'index.html'), newHtml);
    
    console.log(`Generated HTML for ${route.path}`);
  }
});

console.log('SEO Prerendering complete!');
