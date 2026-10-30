import { useEffect } from "react";

const SITE_URL = "https://combinenexus.com";
const DEFAULT_IMAGE = `${SITE_URL}/logo.jpeg`;

export interface SEOProps {
  title: string;
  description: string;
  path?: string;
  keywords?: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  schema?: Record<string, unknown> | Record<string, unknown>[];
}

function setMetaTag(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonicalLink(url: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

export function SEO({
  title,
  description,
  path = "/",
  keywords,
  image = DEFAULT_IMAGE,
  type = "website",
  noindex = false,
  schema,
}: SEOProps) {
  useEffect(() => {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    const canonicalUrl = `${SITE_URL}${cleanPath === "/" ? "/" : cleanPath}`;

    document.title = title;

    setMetaTag("name", "description", description);
    if (keywords) {
      setMetaTag("name", "keywords", keywords);
    }
    setMetaTag(
      "name",
      "robots",
      noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    );

    setCanonicalLink(canonicalUrl);

    // Open Graph
    setMetaTag("property", "og:type", type);
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("property", "og:image", image);

    // Twitter Card
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", image);

    // Route-specific JSON-LD schema
    let scriptEl = document.head.querySelector<HTMLScriptElement>("#route-jsonld");
    if (schema) {
      if (!scriptEl) {
        scriptEl = document.createElement("script");
        scriptEl.id = "route-jsonld";
        scriptEl.type = "application/ld+json";
        document.head.appendChild(scriptEl);
      }
      const payload = Array.isArray(schema)
        ? { "@context": "https://schema.org", "@graph": schema }
        : { "@context": "https://schema.org", ...schema };
      scriptEl.textContent = JSON.stringify(payload);
    } else if (scriptEl) {
      scriptEl.remove();
    }
  }, [title, description, path, keywords, image, type, noindex, schema]);

  return null;
}

