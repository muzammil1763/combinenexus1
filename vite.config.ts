import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";

const SITE_URL = "https://combinenexus.com";

const STATIC_ROUTES: {
  route: string;
  title: string;
  description: string;
  keywords: string;
}[] = [
  {
    route: "services",
    title: "Enterprise IT Services — Software, Cloud, AI & Cybersecurity | Combine Nexus",
    description:
      "Explore Combine Nexus IT services: Custom Software Development, AWS/Azure/GCP Cloud Solutions, AI & Machine Learning, Cybersecurity (SOC 2, ISO 27001), Mobile Apps, UI/UX, and DevOps.",
    keywords:
      "IT services, custom software development, cloud migration AWS Azure GCP, AI ML engineering, cybersecurity consulting, mobile app development, DevOps automation, Combine Nexus",
  },
  {
    route: "portfolio",
    title: "Portfolio & Live Client Work — Dolly's (dollystavern.com) | Combine Nexus",
    description:
      "Explore Combine Nexus live client work: Dolly's — Italian & Cheese Wheel Pasta, Beer & Wine (dollystavern.com), featuring interactive menus, reservations, and delivery integration.",
    keywords:
      "Combine Nexus portfolio, dollystavern.com, Dolly's Italian Cheese Wheel Pasta website, restaurant web development USA, custom web design case study",
  },
  {
    route: "about",
    title: "About Combine Nexus — US Enterprise IT Partner & Leadership Team",
    description:
      "Founded in 2018 and headquartered in Sheridan, WY, Combine Nexus is a 50+ senior engineer technology partner delivering cloud, AI, and custom software with 95% client retention.",
    keywords:
      "About Combine Nexus, US IT consulting company, enterprise software engineering team, Sheridan Wyoming tech company, AWS Microsoft Google Cloud partner",
  },
  {
    route: "contact",
    title: "Contact Combine Nexus — Start Your Software, Cloud or AI Project",
    description:
      "Contact Combine Nexus at info@combinenexus.com or +1 (787) 978-4223. Schedule a discovery call or request a quote for custom software, cloud, or AI solutions.",
    keywords:
      "contact Combine Nexus, hire software developers USA, request IT consultation, cloud consulting quote, AI development inquiry",
  },
];

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function seoStaticRoutesPlugin(): Plugin {
  return {
    name: "seo-static-routes-html",
    closeBundle() {
      const distDir = path.resolve(process.cwd(), "dist");
      const baseHtmlPath = path.join(distDir, "index.html");
      if (!fs.existsSync(baseHtmlPath)) return;

      const baseHtml = fs.readFileSync(baseHtmlPath, "utf-8");

      for (const { route, title, description, keywords } of STATIC_ROUTES) {
        const canonical = `${SITE_URL}/${route}`;
        const safeTitle = escapeHtml(title);
        const safeDesc = escapeHtml(description);
        const safeKeywords = escapeHtml(keywords);

        let html = baseHtml
          .replace(/<title>[\s\S]*?<\/title>/, `<title>${safeTitle}</title>`)
          .replace(
            /<link rel="canonical" href="[^"]*"\s*\/?>/,
            `<link rel="canonical" href="${canonical}" />`
          )
          .replace(
            /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
            `<meta name="description" content="${safeDesc}" />`
          )
          .replace(
            /<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/,
            `<meta name="keywords" content="${safeKeywords}" />`
          )
          .replace(
            /<meta property="og:url" content="[^"]*"\s*\/?>/,
            `<meta property="og:url" content="${canonical}" />`
          )
          .replace(
            /<meta property="og:title" content="[^"]*"\s*\/?>/,
            `<meta property="og:title" content="${safeTitle}" />`
          )
          .replace(
            /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
            `<meta property="og:description" content="${safeDesc}" />`
          )
          .replace(
            /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
            `<meta name="twitter:title" content="${safeTitle}" />`
          )
          .replace(
            /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
            `<meta name="twitter:description" content="${safeDesc}" />`
          );

        const routeDir = path.join(distDir, route);
        fs.mkdirSync(routeDir, { recursive: true });
        fs.writeFileSync(path.join(routeDir, "index.html"), html, "utf-8");
      }
    },
  };
}

export default defineConfig({
  plugins: [
    TanStackRouterVite({
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
    seoStaticRoutesPlugin(),
  ],
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-query"],
          motion: ["framer-motion"],
          icons: ["lucide-react"],
        },
      },
    },
  },
});
