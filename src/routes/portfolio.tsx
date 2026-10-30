import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, CheckCircle2, Globe, Sparkles, Utensils, CalendarCheck, Truck } from "lucide-react";
import dollysImg from "@/assets/dollys-tavern.jpg";
import { SiteLayout } from "@/components/site/Layout";
import { SEO } from "@/components/site/SEO";

export const Route = createFileRoute("/portfolio")({
  component: PortfolioPage,
});

const BRAND = "linear-gradient(135deg,#1565C0 0%,#1E88E5 25%,#E53935 55%,#F57C00 78%,#FFB300 100%)";

const PROJECTS = [
  {
    cat: "Web Development & Hospitality UI/UX",
    location: "El Cerrito, California",
    title: "Dolly's — Italian & Cheese Wheel Pasta, Beer & Wine",
    url: "https://dollystavern.com/",
    image: dollysImg,
    desc: "A luxury dark-mode web platform engineered for Dolly's in El Cerrito, CA — showcasing signature table-side cheese wheel pasta, Italian cuisine, craft beer & wine, instant table reservations, catering inquiries, and multi-channel delivery integration.",
    highlights: [
      "Interactive digital menu & visual gallery",
      "Direct online table reservation workflow",
      "Uber Eats, DoorDash, Grubhub & ezCater integration",
      "Mobile-first high-speed performance & Local SEO",
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Responsive UI/UX", "Local SEO"],
  },
];

const PORTFOLIO_SCHEMA = [
  {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://combinenexus.com/" },
      { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://combinenexus.com/portfolio" },
    ],
  },
  {
    "@type": "CollectionPage",
    "@id": "https://combinenexus.com/portfolio#webpage",
    url: "https://combinenexus.com/portfolio",
    name: "Portfolio & Client Case Studies — Dolly's Restaurant Web Platform | Combine Nexus",
    description:
      "Explore our live production work, including Dolly's (dollystavern.com) — Italian & Cheese Wheel Pasta, Beer & Wine in El Cerrito, California.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: PROJECTS.map((p, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        item: {
          "@type": "CreativeWork",
          name: p.title,
          url: p.url,
          image: "https://combinenexus.com/dollys-tavern.jpg",
          description: p.desc,
        },
      })),
    },
  },
];

function PortfolioPage() {
  return (
    <SiteLayout>
      <SEO
        title="Portfolio & Live Client Work — Dolly's (dollystavern.com) | Combine Nexus"
        description="Explore Combine Nexus live client work: Dolly's — Italian & Cheese Wheel Pasta, Beer & Wine (dollystavern.com), featuring interactive menus, reservations, and delivery integration."
        path="/portfolio"
        image="https://combinenexus.com/dollys-tavern.jpg"
        keywords="Combine Nexus portfolio, dollystavern.com, Dolly's Italian Cheese Wheel Pasta website, restaurant web development USA, custom web design case study"
        schema={PORTFOLIO_SCHEMA}
      />
      <section className="bg-hero relative overflow-hidden -mt-20 pt-20">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="container-x py-24 relative">
          <span className="text-primary font-mono text-sm">// Portfolio</span>
          <h1 className="text-5xl md:text-6xl font-bold mt-3">Our Work</h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Real production digital experiences engineered and shipped for our clients.
          </p>
        </div>
      </section>

      {/* FEATURED LIVE PROJECT */}
      <section className="container-x py-20">
        {PROJECTS.map((p) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl overflow-hidden border border-[#E53935]/25 hover:border-[#E53935]/50 transition-all"
          >
            {/* Cropped Live Screenshot */}
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative overflow-hidden bg-black group"
            >
              <img
                src={p.image}
                alt={p.title}
                width={1014}
                height={484}
                decoding="async"
                className="w-full h-auto object-cover group-hover:scale-[1.015] transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-3.5 py-1.5 rounded-full bg-background/85 backdrop-blur text-xs font-semibold border border-white/10">
                  {p.cat}
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-primary/90 text-white text-xs font-semibold inline-flex items-center gap-1.5">
                  <Globe size={13} /> dollystavern.com
                </span>
              </div>
            </a>

            {/* Details */}
            <div className="p-8 md:p-12 grid lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-7 space-y-5">
                <div className="text-xs font-mono text-primary uppercase tracking-wider">
                  {p.location} · Live Client Project
                </div>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight">{p.title}</h2>
                <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                  {p.desc}
                </p>

                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  {p.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2.5 text-sm">
                      <CheckCircle2 size={16} className="text-primary shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-3">
                  {p.tech.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full bg-secondary text-xs font-mono">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white transition hover:scale-105"
                    style={{ background: BRAND }}
                  >
                    Visit dollystavern.com <ExternalLink size={16} />
                  </a>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white/90 hover:text-white hover:border-white/40 text-sm font-semibold transition"
                  >
                    Build a Project Like This <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Project Pillars */}
              <div className="lg:col-span-5 grid sm:grid-cols-2 gap-4">
                {[
                  {
                    Icon: Utensils,
                    title: "Signature Brand Story",
                    desc: "Showcases authentic Italian cuisine & cheese wheel pasta with rich visual storytelling.",
                  },
                  {
                    Icon: CalendarCheck,
                    title: "Table Reservations",
                    desc: "Frictionless reservation & catering booking flows built for high guest conversion.",
                  },
                  {
                    Icon: Truck,
                    title: "Multi-App Delivery",
                    desc: "Direct integration with Uber Eats, DoorDash, Grubhub, and ezCater.",
                  },
                  {
                    Icon: Sparkles,
                    title: "Speed & Local SEO",
                    desc: "Engineered for fast mobile load times and local search visibility in El Cerrito, CA.",
                  },
                ].map(({ Icon, title, desc }) => (
                  <div
                    key={title}
                    className="bg-background/40 rounded-2xl p-5 border border-[#E53935]/20 hover:border-[#E53935]/40 transition-all"
                  >
                    <Icon style={{ color: "#E53935" }} className="mb-3" size={20} />
                    <h3 className="font-semibold text-sm">{title}</h3>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </section>
    </SiteLayout>
  );
}
