import type { ElementType } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight, Code2, Cloud, Brain, Shield, Smartphone, Palette,
  Compass, Workflow, Star, CheckCircle2, Sparkles,
  Database, Globe, GitBranch, Layers, Terminal,
} from "lucide-react";
import logo from "@/assets/combine-nexus-logo.jpeg";
import { Counter } from "@/components/site/Counter";
import { SiteLayout } from "@/components/site/Layout";
import { SEO } from "@/components/site/SEO";

export const Route = createFileRoute("/")({
  component: HomePage,
});

/* ── Brand gradient ── */
const BRAND = "linear-gradient(135deg,#1565C0 0%,#1E88E5 25%,#E53935 55%,#F57C00 78%,#FFB300 100%)";

/* ── Orbit rings config ── */
const ORBIT_RINGS: {
  radius: number;
  duration: number;   /* seconds, negative = reverse */
  items: { Icon: ElementType; label: string }[];
}[] = [
  {
    radius: 110,
    duration: 18,
    items: [
      { Icon: Code2,   label: "React"    },
      { Icon: Cloud,   label: "AWS"      },
      { Icon: Brain,   label: "AI/ML"    },
      { Icon: Shield,  label: "Security" },
    ],
  },
  {
    radius: 175,
    duration: -28,
    items: [
      { Icon: Database,  label: "Postgres"  },
      { Icon: Globe,     label: "Node.js"   },
      { Icon: Terminal,  label: "Python"    },
      { Icon: GitBranch, label: "DevOps"    },
      { Icon: Layers,    label: "Docker"    },
      { Icon: Terminal,  label: "Terraform" },
    ],
  },
  {
    radius: 240,
    duration: 40,
    items: [
      { Icon: Smartphone, label: "Mobile"     },
      { Icon: Palette,    label: "UI/UX"      },
      { Icon: Compass,    label: "Consulting" },
      { Icon: Workflow,   label: "CI/CD"      },
      { Icon: Cloud,      label: "Azure"      },
      { Icon: Brain,      label: "LLMs"       },
      { Icon: Code2,      label: "Go"         },
      { Icon: Database,   label: "MongoDB"    },
    ],
  },
];

/* ── CSS keyframes injected once ── */
const ORBIT_STYLE = `
  @keyframes orbit-cw  { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
  @keyframes orbit-ccw { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }
  @keyframes counter-cw  { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }
  @keyframes counter-ccw { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
`;

function TechOrbit() {
  const SIZE = 520;
  const CENTER = SIZE / 2;

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      <style>{ORBIT_STYLE}</style>

      {/* background glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 480, height: 480,
          background: "radial-gradient(circle, rgba(30,136,229,0.18) 0%, rgba(229,57,53,0.10) 40%, transparent 70%)",
        }}
      />

      {/* rings + chips */}
      <div className="relative" style={{ width: SIZE, height: SIZE }}>

        {ORBIT_RINGS.map(({ radius, duration, items }) => {
          const isReverse = duration < 0;
          const absDur = Math.abs(duration);
          const ringAnim = isReverse ? "orbit-ccw" : "orbit-cw";
          const chipAnim = isReverse ? "counter-ccw" : "counter-cw";
          const count = items.length;

          return (
            /* ring track */
            <div
              key={radius}
              className="absolute rounded-full border border-white/[0.07]"
              style={{
                width: radius * 2,
                height: radius * 2,
                top: CENTER - radius,
                left: CENTER - radius,
              }}
            >
              {/* spinning wrapper */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  animation: `${ringAnim} ${absDur}s linear infinite`,
                }}
              >
                {items.map(({ Icon, label }, i) => {
                  const angleDeg = (360 / count) * i;
                  const angleRad = (angleDeg * Math.PI) / 180;
                  const x = CENTER + Math.cos(angleRad) * radius - 22;
                  const y = CENTER + Math.sin(angleRad) * radius - 22;
                  /* position relative to the ring div (which is radius*2 square) */
                  const rx = Math.cos(angleRad) * radius + radius - 22;
                  const ry = Math.sin(angleRad) * radius + radius - 22;

                  return (
                    <div
                      key={`${label}-${i}`}
                      className="absolute"
                      style={{ left: rx, top: ry, width: 44, height: 44 }}
                    >
                      {/* counter-rotate so chip stays upright */}
                      <div
                        style={{
                          width: 44, height: 44,
                          animation: `${chipAnim} ${absDur}s linear infinite`,
                          borderRadius: 12,
                          background: "rgba(8,8,18,0.88)",
                          border: "1px solid rgba(255,255,255,0.10)",
                          backdropFilter: "blur(8px)",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 2,
                        }}
                      >
                        <Icon size={15} style={{ color: "#1E88E5" }} />
                        <span style={{
                          fontSize: 7,
                          color: "rgba(255,255,255,0.5)",
                          fontFamily: "monospace",
                          lineHeight: 1,
                          whiteSpace: "nowrap",
                        }}>
                          {label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* centre logo */}
        <div
          className="absolute"
          style={{
            width: 104, height: 104,
            top: CENTER - 52,
            left: CENTER - 52,
            borderRadius: 24,
            padding: 3,
            background: BRAND,
            boxShadow: "0 0 40px rgba(30,136,229,0.55), 0 0 20px rgba(229,57,53,0.35)",
          }}
        >
          <img
            src={logo}
            alt="Combine Nexus Enterprise Technology Orbit"
            width={98}
            height={98}
            decoding="async"
            style={{
              width: "100%", height: "100%",
              objectFit: "contain",
              borderRadius: 21,
              background: "#000",
              display: "block",
            }}
          />
        </div>

      </div>
    </div>
  );
}

const SERVICES = [
  { Icon: Code2, title: "Custom Software Development", desc: "Tailored enterprise applications built for scale, security, and performance." },
  { Icon: Cloud, title: "Cloud Solutions", desc: "AWS, Azure, and GCP architecture, migration, and 24/7 managed operations." },
  { Icon: Brain, title: "AI & Machine Learning", desc: "Predictive models, NLP, and intelligent automation that move the needle." },
  { Icon: Shield, title: "Cybersecurity", desc: "Threat detection, compliance, and continuous security monitoring." },
  { Icon: Smartphone, title: "Mobile App Development", desc: "iOS, Android, and cross-platform apps with delightful UX." },
  { Icon: Palette, title: "UI/UX Design", desc: "Research-led product design that converts and retains users." },
  { Icon: Compass, title: "IT Consulting", desc: "Strategic technology advisory and digital transformation roadmaps." },
  { Icon: Workflow, title: "DevOps & Infrastructure", desc: "CI/CD, IaC, observability, and elastic infrastructure done right." },
];

const PROJECTS = [
  { tag: "FinTech", title: "Atlas Banking Analytics", desc: "Real-time analytics platform processing 4M+ daily transactions." },
  { tag: "Healthcare AI", title: "MedSight Diagnostics", desc: "ML platform helping radiologists detect anomalies 38% faster." },
  { tag: "E-commerce", title: "NorthRetail Cloud Migration", desc: "Re-platformed monolith to scale to 1M+ concurrent shoppers." },
];

const TESTIMONIALS = [
  { q: "Combine Nexus delivered our platform 6 weeks ahead of schedule. Quality, communication, and engineering rigor were exceptional.", n: "Sarah Mitchell", t: "VP Engineering, NorthRetail" },
  { q: "From cloud migration to a brand-new ML pipeline, they've been the most reliable partner we've worked with in a decade.", n: "David Chen", t: "CTO, Atlas Capital" },
  { q: "True consultants — not just coders. They challenged our assumptions and delivered a product our customers love.", n: "Priya Raman", t: "Chief Product Officer, MedSight" },
];

const TECH = ["React", "Next.js", "Node.js", "Python", "Go", "Java", "AWS", "Azure", "GCP", "Docker", "Kubernetes", "TensorFlow", "PyTorch", "Postgres", "MongoDB", "Terraform"];

const HOME_SCHEMA = [
  {
    "@type": "WebPage",
    "@id": "https://combinenexus.com/#webpage",
    url: "https://combinenexus.com/",
    name: "Combine Nexus — Premium Enterprise IT Services, Cloud & AI Solutions",
    description:
      "Combine Nexus is a US-based enterprise IT services company delivering custom software development, cloud migration (AWS, Azure, GCP), AI & ML, cybersecurity, mobile apps, and DevOps.",
    isPartOf: { "@id": "https://combinenexus.com/#website" },
    about: { "@id": "https://combinenexus.com/#organization" },
  },
  {
    "@type": "ItemList",
    name: "Combine Nexus Core IT Services",
    itemListElement: SERVICES.map((s, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: s.title,
      description: s.desc,
      url: "https://combinenexus.com/services",
    })),
  },
];

function HomePage() {
  return (
    <SiteLayout>
      <SEO
        title="Combine Nexus — Premium Enterprise IT Services, Cloud & AI Solutions"
        description="Combine Nexus is a US-based enterprise IT services company delivering custom software development, cloud migration (AWS, Azure, GCP), AI & ML, cybersecurity, mobile apps, and DevOps."
        path="/"
        keywords="Combine Nexus, enterprise IT services, custom software development, cloud solutions AWS Azure GCP, AI machine learning consulting, cybersecurity, mobile app development, DevOps USA"
        schema={HOME_SCHEMA}
      />
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero min-h-[100dvh] flex items-center -mt-20 pt-20">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="container-x relative py-24 md:py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-6 items-center">

            {/* ── Left: content ── */}
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border border-primary/40 text-primary bg-primary/10">
                <Sparkles size={14} /> Premium IT Services
              </span>

              <h1 className="mt-6 text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.05]">
                We build digital solutions that{" "}
                <span
                  style={{
                    background: BRAND,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  transform businesses
                </span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Combine Nexus delivers enterprise-grade software development, cloud
                infrastructure, and AI services tailored to your business — engineered in the USA.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-semibold transition-all hover:scale-105 hover:shadow-[0_0_24px_rgba(30,136,229,0.45)] active:scale-95"
                  style={{ background: BRAND }}
                >
                  Start a Project <ArrowRight size={18} />
                </Link>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/40 font-semibold transition"
                >
                  View Our Work
                </Link>
              </div>

              <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary" /> Trusted by 100+ companies
                </span>
                <span className="flex items-center gap-2">
                  <Star size={16} className="text-accent" /> 4.9 average client rating
                </span>
                <span className="flex items-center gap-2">
                  <Shield size={16} className="text-primary" /> 24/7 enterprise support
                </span>
              </div>
            </div>

            {/* ── Right: tech orbit ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.9, ease: "easeOut" }}
              className="hidden lg:flex items-center justify-center h-[520px]"
            >
              <TechOrbit />
            </motion.div>

          </div>
        </div>
      </section>

      {/* LOGOS */}
      <section className="border-y border-border bg-card/30">
        <div className="container-x py-10 flex flex-wrap items-center justify-around gap-x-10 gap-y-4 opacity-60">
          {["NORTHRETAIL", "ATLAS CAPITAL", "MEDSIGHT", "VERTEX LABS", "QUANTAFLOW", "BRIGHTBOX"].map(n => (
            <span key={n} className="font-mono text-sm tracking-widest">{n}</span>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="container-x py-24">
        <div className="max-w-2xl mb-14">
          <span className="text-primary font-mono text-sm">// What we do</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">Services built to scale your business</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map(({ Icon, title, desc }, i) => (
            <motion.div key={title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group glass rounded-2xl p-6 hover:border-[#E53935]/40 hover:-translate-y-1 transition-all" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition" style={{ background: "linear-gradient(135deg,rgba(30,136,229,0.18),rgba(229,57,53,0.18))", color: "#E53935" }}>
                <Icon size={22} />
              </div>
              <h3 className="font-semibold text-lg mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              <Link to="/services" className="mt-4 inline-flex items-center gap-1 text-primary text-sm font-semibold opacity-80 group-hover:opacity-100 transition">
                Explore {title} <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="container-x py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-primary font-mono text-sm">// About Combine Nexus</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 leading-tight">
              We're on a mission to redefine IT excellence
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Combine Nexus is a US-based IT services company delivering cutting-edge technology
              to businesses worldwide. Our team of senior engineers, designers, and strategists
              partner with you from discovery through long-term operations.
            </p>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-primary font-semibold">
              Learn more about us <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {[
              { v: 100, s: "+", l: "Projects delivered" },
              { v: 50, s: "+", l: "Expert engineers" },
              { v: 95, s: "%", l: "Client retention" },
              { v: 49, s: "★", l: "Average rating", divide: true },
            ].map(({ v, s, l, divide }) => (
              <div key={l} className="glass rounded-2xl p-6">
                <div className="text-4xl font-bold text-brand-gradient">
                  <Counter to={divide ? 4 : v} />{divide ? ".9" : ""}{s}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section className="container-x py-24">
        <div className="flex flex-wrap items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-primary font-mono text-sm">// Featured work</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3">Projects we're proud of</h2>
          </div>
          <Link to="/portfolio" className="text-primary font-semibold inline-flex items-center gap-2">
            View all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group glass rounded-2xl overflow-hidden hover:border-[#E53935]/40 transition" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <div className="aspect-[4/3] bg-brand-gradient relative">
                <div className="absolute inset-0 bg-background/30 group-hover:bg-background/10 transition" />
                <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-background/60 backdrop-blur text-xs font-semibold">
                  {p.tag}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container-x py-24">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="text-primary font-mono text-sm">// Client love</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">What our clients say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-7 border border-[#E53935]/20 hover:border-[#E53935]/40 transition-all">
              <div className="flex gap-1 mb-4 text-accent">
                {Array.from({ length: 5 }).map((_, k) => <Star key={k} size={16} fill="currentColor" />)}
              </div>
              <p className="text-foreground/90 leading-relaxed">"{t.q}"</p>
              <div className="mt-6 pt-6 border-t border-border">
                <div className="font-semibold">{t.n}</div>
                <div className="text-sm text-muted-foreground">{t.t}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TECH */}
      <section className="container-x py-24">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="text-primary font-mono text-sm">// Technology stack</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">Modern tools, proven results</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {TECH.map(t => (
            <span key={t} className="px-5 py-2.5 rounded-full glass font-mono text-sm hover:border-primary/50 hover:text-primary transition">
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-x py-24">
        <div className="relative overflow-hidden rounded-3xl bg-brand-gradient p-12 md:p-20 text-center">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-bold text-background">Ready to transform your business?</h2>
            <p className="mt-4 text-lg text-background/80">Let's discuss your next project — no commitment, just clarity.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="px-7 py-3.5 rounded-full bg-background text-foreground font-semibold hover:opacity-90 transition">
                Start a Project
              </Link>
              <Link to="/contact" className="px-7 py-3.5 rounded-full border border-background/40 text-background font-semibold hover:bg-background/10 transition">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
