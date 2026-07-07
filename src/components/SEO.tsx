import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  metaTitle?: string;
  description: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
}

export default function SEO({ title, metaTitle, description, canonicalUrl, ogTitle, ogDescription }: SEOProps) {
  const finalTitle = metaTitle || title;
  const finalOgTitle = ogTitle || finalTitle;
  const finalOgDesc = ogDescription || description;

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={description} />
      
      {/* Canonical */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Robots */}
      <meta name="robots" content="index,follow" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDesc} />
      <meta property="og:image" content="https://vampro.in/thumbnail.jpg" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalOgTitle} />
      <meta name="twitter:description" content={finalOgDesc} />
      <meta name="twitter:image" content="https://vampro.in/thumbnail.jpg" />
    </Helmet>
  );
}
