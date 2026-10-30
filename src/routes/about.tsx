import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Target, Eye, Heart, Zap, Users, Award } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { Counter } from "@/components/site/Counter";
import { SEO } from "@/components/site/SEO";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

const TIMELINE = [
  { y: "2018", t: "Combine Nexus founded" },
  { y: "2019", t: "First 10 enterprise clients" },
  { y: "2020", t: "Launched cloud practice" },
  { y: "2021", t: "AI/ML services introduced" },
  { y: "2022", t: "Grew to 50+ team members" },
  { y: "2023", t: "Global delivery footprint" },
  { y: "2024", t: "100+ projects delivered" },
];

const TEAM = [
  { n: "Marcus Reyes", t: "CEO & Founder", b: "20+ years scaling enterprise platforms." },
  { n: "Linda Park", t: "Chief Technology Officer", b: "Ex-AWS principal engineer; cloud architecture lead." },
  { n: "Dr. Imran Habib", t: "Head of AI", b: "PhD in ML; published in NeurIPS and ICML." },
  { n: "Sophia Alvarez", t: "Head of Cloud", b: "AWS, Azure, and GCP certified architect." },
  { n: "Daniel Kwon", t: "Head of Design", b: "Product designer for fintech and healthcare." },
  { n: "Rachel Stewart", t: "Head of Sales", b: "Builds long-term enterprise partnerships." },
];

const VALUES = [
  { Icon: Zap, t: "Innovation first", d: "We bring fresh thinking to every challenge." },
  { Icon: Heart, t: "Client success", d: "Your outcomes are how we measure ourselves." },
  { Icon: Eye, t: "Transparency", d: "Open backlogs, clear pricing, honest updates." },
  { Icon: Award, t: "Quality focus", d: "Engineering rigor and craft, never shortcuts." },
  { Icon: Users, t: "Continuous learning", d: "We invest in our team and the craft." },
  { Icon: Target, t: "Work-life balance", d: "Sustainable teams ship better software." },
];

const ABOUT_SCHEMA = [
  {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://combinenexus.com/" },
      { "@type": "ListItem", position: 2, name: "About", item: "https://combinenexus.com/about" },
    ],
  },
  {
    "@type": "AboutPage",
    "@id": "https://combinenexus.com/about#webpage",
    url: "https://combinenexus.com/about",
    name: "About Combine Nexus — Leadership, Mission & Engineering Excellence",
    description:
      "Founded in 2018 and headquartered in Sheridan, Wyoming, USA, Combine Nexus is a 50+ engineer IT services partner with 100+ delivered enterprise projects.",
    mainEntity: { "@id": "https://combinenexus.com/#organization" },
  },
];

function AboutPage() {
  return (
    <SiteLayout>
      <SEO
        title="About Combine Nexus — US Enterprise IT Partner & Leadership Team"
        description="Founded in 2018 and headquartered in Sheridan, WY, Combine Nexus is a 50+ senior engineer technology partner delivering cloud, AI, and custom software with 95% client retention."
        path="/about"
        keywords="About Combine Nexus, US IT consulting company, enterprise software engineering team, Sheridan Wyoming tech company, AWS Microsoft Google Cloud partner"
        schema={ABOUT_SCHEMA}
      />
      <section className="bg-hero relative overflow-hidden -mt-20 pt-20">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="container-x py-24 relative">
          <span className="text-primary font-mono text-sm">// About us</span>
          <h1 className="text-5xl md:text-6xl font-bold mt-3">About Combine Nexus</h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Technology partners committed to your success. Founded in 2018, headquartered in Sheridan, Wyoming, USA.
          </p>
        </div>
      </section>

      <section className="container-x py-24 grid lg:grid-cols-2 gap-14 items-start">
        <div>
          <h2 className="text-4xl font-bold">Our story</h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Combine Nexus was founded in 2018 by a small group of engineers who believed enterprise
            software didn't have to feel enterprise. Six years later, we've grown into a 50+ person
            team serving clients in fintech, healthcare, retail, logistics, and beyond — and we're
            still obsessed with shipping work that actually moves the business forward.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            From cloud migrations and ML systems to mobile apps and full design programs,
            we bring senior expertise to every engagement.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="glass rounded-2xl p-6 border border-[#E53935]/15 hover:border-[#E53935]/35 transition-all">
            <Target style={{ color: "#E53935" }} className="mb-3" />
            <h3 className="font-semibold">Our mission</h3>
            <p className="mt-2 text-sm text-muted-foreground">Empower businesses through innovative technology solutions.</p>
          </div>
          <div className="glass rounded-2xl p-6 border border-[#E53935]/15 hover:border-[#E53935]/35 transition-all">
            <Eye style={{ color: "#E53935" }} className="mb-3" />
            <h3 className="font-semibold">Our vision</h3>
            <p className="mt-2 text-sm text-muted-foreground">Become the most trusted technology partner for growing enterprises.</p>
          </div>
          <div className="glass rounded-2xl p-6 sm:col-span-2 border border-[#E53935]/15 hover:border-[#E53935]/35 transition-all">
            <Heart style={{ color: "#E53935" }} className="mb-3" />
            <h3 className="font-semibold">Core values</h3>
            <p className="mt-2 text-sm text-muted-foreground">Innovation, integrity, excellence, and collaboration in everything we ship.</p>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="container-x py-24">
        <h2 className="text-4xl font-bold text-center mb-14">Our journey</h2>
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-8">
            {TIMELINE.map((m, i) => (
              <motion.div
                key={m.y}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-10 ${i % 2 ? "md:rtl" : ""}`}
              >
                <div className={`md:ltr ${i % 2 ? "md:text-left" : "md:text-right"}`}>
                  <div className="glass rounded-2xl p-5 inline-block">
                    <div className="text-primary font-mono text-sm">{m.y}</div>
                    <div className="font-semibold mt-1">{m.t}</div>
                  </div>
                </div>
                <div className="absolute left-2.5 md:left-1/2 md:-translate-x-1/2 top-5 w-3 h-3 rounded-full bg-primary glow-cyan" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="container-x py-24">
        <h2 className="text-4xl font-bold text-center mb-14">Leadership team</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <div className="w-24 h-24 rounded-full bg-brand-gradient mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-background">
                {p.n.split(" ").map((s) => s[0]).join("")}
              </div>
              <h3 className="font-semibold">{p.n}</h3>
              <div className="text-sm text-primary">{p.t}</div>
              <p className="mt-3 text-sm text-muted-foreground">{p.b}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="container-x py-24">
        <div className="glass rounded-3xl p-10 md:p-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { v: 100, s: "+", l: "Projects delivered" },
            { v: 50, s: "+", l: "Team members" },
            { v: 25, s: "+", l: "Industries served" },
            { v: 95, s: "%", l: "Client retention" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="text-5xl font-bold text-brand-gradient">
                <Counter to={s.v} />{s.s}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="container-x py-24">
        <h2 className="text-4xl font-bold text-center mb-14">Culture & values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map(({ Icon, t, d }) => (
            <div key={t} className="glass rounded-2xl p-6 border border-[#E53935]/15 hover:border-[#E53935]/35 transition-all">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "linear-gradient(135deg,rgba(30,136,229,0.18),rgba(229,57,53,0.18))", color: "#E53935" }}
              >
                <Icon size={20} />
              </div>
              <h3 className="font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PARTNERS */}
      <section className="container-x py-16">
        <h2 className="text-2xl font-bold text-center mb-8 text-muted-foreground">Certifications & partnerships</h2>
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4 opacity-70">
          {["AWS Partner", "Microsoft Partner", "Google Cloud Partner", "ISO 27001", "SOC 2", "GDPR Compliant"].map((p) => (
            <span key={p} className="font-mono text-sm tracking-wide">
              {p}
            </span>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
