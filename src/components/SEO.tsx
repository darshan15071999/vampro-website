import { Helmet } from 'react-helmet-async';
import type { SchemaType } from '../seo/schemas';

export interface SEOProps {
  title: string;
  description: string;
  canonical: string;
  keywords?: string;
  image?: string;
  schema?: SchemaType;
  breadcrumbs?: Record<string, any>;
  robots?: string;
  type?: string;
  themeColor?: string;
  author?: string;
  twitterCard?: string;
  noIndex?: boolean;
}

export default function SEO({ 
  title, 
  description, 
  canonical, 
  keywords,
  image = 'https://vampro.in/thumbnail.jpg',
  schema,
  breadcrumbs,
  robots = 'index,follow',
  type = 'website',
  themeColor = '#07060F',
  author = 'Vampro',
  twitterCard = 'summary_large_image',
  noIndex = false
}: SEOProps) {

  // Handle multiple schemas (array) vs single schema
  let schemaMarkup = schema 
    ? Array.isArray(schema) 
      ? schema.map(s => JSON.stringify(s)) 
      : [JSON.stringify(schema)]
    : [];
    
  if (breadcrumbs) {
    schemaMarkup.push(JSON.stringify(breadcrumbs));
  }

  const finalRobots = noIndex ? 'noindex,nofollow' : robots;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="theme-color" content={themeColor} />
      <meta name="robots" content={finalRobots} />

      {/* Icons */}
      <link rel="icon" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/favicon.png" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Schema */}
      {schemaMarkup.map((s, index) => (
        <script key={index} type="application/ld+json">
          {s}
        </script>
      ))}
    </Helmet>
  );
}
