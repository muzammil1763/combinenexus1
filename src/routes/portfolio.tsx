import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { SEO } from "@/components/site/SEO";

export const Route = createFileRoute("/portfolio")({
  component: PortfolioPage,
});

const FILTERS = ["All", "Web Development", "Mobile Apps", "Cloud Solutions", "AI/ML", "Enterprise Software"] as const;

const PROJECTS = [
  { cat: "Web Development", title: "Atlas Banking Analytics", desc: "Enterprise banking analytics platform processing 4M+ daily transactions in real time.", tech: ["React", "Node.js", "Postgres", "Kafka"] },
  { cat: "AI/ML", title: "MedSight Diagnostics", desc: "Patient diagnosis prediction system improving radiologist accuracy by 38%.", tech: ["Python", "PyTorch", "AWS", "FastAPI"] },
  { cat: "Cloud Solutions", title: "NorthRetail Cloud Migration", desc: "Re-platformed legacy monolith to scale to 1M+ concurrent shoppers.", tech: ["AWS", "Kubernetes", "Terraform"] },
  { cat: "Enterprise Software", title: "VertexShield Security Suite", desc: "Real-time threat detection with sub-second response across 12K endpoints.", tech: ["Go", "ClickHouse", "Kafka"] },
  { cat: "Mobile Apps", title: "Brightline Mobile Banking", desc: "Cross-platform banking app with 500K+ downloads and 4.8★ store rating.", tech: ["React Native", "GraphQL"] },
  { cat: "AI/ML", title: "QuantaFlow Logistics AI", desc: "Route optimization platform cutting delivery costs by 22% across 18 cities.", tech: ["Python", "TensorFlow", "GCP"] },
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
    name: "Case Studies & Enterprise Software Portfolio | Combine Nexus",
    description:
      "Explore Combine Nexus case studies across FinTech, Healthcare AI, E-Commerce Cloud Migration, Cybersecurity, and Mobile Banking.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: PROJECTS.map((p, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: p.title,
        description: p.desc,
      })),
    },
  },
];

function PortfolioPage() {
  const [filter, setFilter] = useState<typeof FILTERS[number]>("All");
  const visible = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.cat === filter);

  return (
    <SiteLayout>
      <SEO
        title="Portfolio & Client Case Studies — FinTech, Cloud & AI | Combine Nexus"
        description="Discover how Combine Nexus engineered real-time banking analytics, healthcare AI diagnostics, and 1M+ concurrent user cloud migrations for enterprise clients."
        path="/portfolio"
        keywords="IT case studies, software development portfolio, cloud migration case study, healthcare AI project, fintech analytics platform, Combine Nexus work"
        schema={PORTFOLIO_SCHEMA}
      />
      <section className="bg-hero relative overflow-hidden -mt-20 pt-20">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="container-x py-24 relative">
          <span className="text-primary font-mono text-sm">// Portfolio</span>
          <h1 className="text-5xl md:text-6xl font-bold mt-3">Our Work</h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Projects that showcase our expertise — and the client success they unlocked.
          </p>
        </div>
      </section>

      <section className="container-x py-16">
        <div className="flex flex-wrap gap-2 mb-12" role="group" aria-label="Filter projects by category">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition border ${
                filter === f
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group glass rounded-2xl overflow-hidden hover:border-[#E53935]/40 transition"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              <div className="aspect-[4/3] bg-brand-gradient relative">
                <div className="absolute inset-0 bg-background/30 group-hover:bg-background/10 transition" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/70 backdrop-blur text-xs font-semibold">
                  {p.cat}
                </span>
              </div>
              <div className="p-6">
                <h2 className="font-semibold text-lg">{p.title}</h2>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {p.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-secondary text-xs font-mono">
                      {t}
                    </span>
                  ))}
                </div>
                <Link to="/contact" className="mt-5 inline-flex items-center gap-1 text-primary text-sm font-semibold">
                  Discuss a similar project <ArrowRight size={14} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="container-x py-24">
        <div className="glass rounded-3xl p-10 md:p-14 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-primary font-mono text-sm">// Featured case study</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">NorthRetail: from monolith to 1M+ users</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              We re-architected NorthRetail's commerce platform onto a Kubernetes-native stack on AWS,
              cut infrastructure spend by 41%, and unlocked Black Friday traffic 6× their previous peak —
              with zero downtime during cutover.
            </p>
            <blockquote className="mt-6 border-l-2 border-primary pl-4 italic text-foreground/90">
              "Combine Nexus delivered six weeks ahead of schedule. Quality, communication, and engineering rigor were exceptional."
              <footer className="not-italic mt-2 text-sm text-muted-foreground">— Sarah Mitchell, VP Engineering, NorthRetail</footer>
            </blockquote>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { v: "1M+", l: "Concurrent shoppers" },
              { v: "41%", l: "Infrastructure savings" },
              { v: "6×", l: "Peak traffic capacity" },
              { v: "0", l: "Minutes of downtime" },
            ].map((s) => (
              <div key={s.l} className="bg-background/40 rounded-2xl p-6 border border-[#E53935]/20 hover:border-[#E53935]/40 transition-all">
                <TrendingUp style={{ color: "#E53935" }} className="mb-3" size={20} />
                <div className="text-3xl font-bold text-brand-gradient">{s.v}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
