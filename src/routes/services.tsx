import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Code2, Cloud, Brain, Shield, Smartphone, Palette, Compass, Workflow,
  CheckCircle2, ArrowRight, Award, Users, DollarSign, MapPin, Headphones,
} from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { SEO } from "@/components/site/SEO";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
});

const SERVICES = [
  {
    id: "custom-software-development",
    Icon: Code2,
    title: "Custom Software Development",
    desc: "End-to-end software development from concept to deployment. We build scalable, secure, high-performance applications tailored to your business — backed by senior engineers, modern architecture, and rigorous QA.",
    features: ["Agile delivery cycles", "Microservices & APIs", "Domain-driven design", "Automated QA & testing"],
    tech: ["React", "Node.js", "Python", "Java", ".NET", "PostgreSQL", "MongoDB"],
  },
  {
    id: "cloud-solutions",
    Icon: Cloud,
    title: "Cloud Solutions",
    desc: "Cloud migration, architecture, and managed operations across AWS, Azure, and Google Cloud. Reduce costs, improve scalability, and ship faster with infrastructure designed for resilience.",
    features: ["Cloud migration", "DevOps automation", "Cost optimization", "24/7 monitoring"],
    tech: ["AWS", "Azure", "GCP", "Terraform", "Kubernetes", "Docker"],
  },
  {
    id: "ai-machine-learning",
    Icon: Brain,
    title: "AI & Machine Learning",
    desc: "Production-ready ML systems — from custom models to LLM-powered applications. We help you turn data into decisions with rigorous evaluation and responsible deployment.",
    features: ["Predictive analytics", "Computer vision", "NLP & LLMs", "Process automation"],
    tech: ["TensorFlow", "PyTorch", "scikit-learn", "OpenAI", "LangChain"],
  },
  {
    id: "cybersecurity",
    Icon: Shield,
    title: "Cybersecurity",
    desc: "Protect your business from evolving threats with comprehensive security assessments, hardening, and ongoing monitoring. SOC 2, ISO 27001, and GDPR ready.",
    features: ["Vulnerability assessment", "Penetration testing", "Compliance & audits", "SOC services"],
    tech: ["ISO 27001", "SOC 2", "GDPR", "Splunk", "CrowdStrike"],
  },
  {
    id: "mobile-app-development",
    Icon: Smartphone,
    title: "Mobile App Development",
    desc: "Native and cross-platform mobile apps that delight users and scale globally. We handle UX, engineering, store launches, and post-launch growth.",
    features: ["UI/UX design", "App store optimization", "Maintenance & analytics", "Crash & performance monitoring"],
    tech: ["React Native", "Flutter", "Swift", "Kotlin"],
  },
  {
    id: "ui-ux-design",
    Icon: Palette,
    title: "UI/UX Design",
    desc: "User-centered design rooted in research. From discovery and prototyping to high-fidelity visual systems that drive conversion and retention.",
    features: ["User research", "Wireframing & prototyping", "Design systems", "Usability testing"],
    tech: ["Figma", "Adobe XD", "Sketch", "Framer"],
  },
  {
    id: "it-consulting",
    Icon: Compass,
    title: "IT Consulting",
    desc: "Strategic technology advisory aligning IT with business goals. We help leaders evaluate architecture, vendors, and digital transformation roadmaps.",
    features: ["Technology assessment", "Digital strategy", "Architecture review", "Vendor selection"],
    tech: ["Discovery", "Roadmaps", "RFP support", "Org design"],
  },
  {
    id: "devops-infrastructure",
    Icon: Workflow,
    title: "DevOps & Infrastructure",
    desc: "Automated delivery, observable systems, and elastic infrastructure. We accelerate releases while improving reliability and security posture.",
    features: ["CI/CD pipelines", "Infrastructure as Code", "Monitoring & alerting", "Auto-scaling"],
    tech: ["Jenkins", "GitHub Actions", "Terraform", "Prometheus", "Grafana"],
  },
];

const WHY = [
  { Icon: Award, title: "Expert team", desc: "Senior engineers with 10+ years average experience." },
  { Icon: CheckCircle2, title: "Proven track record", desc: "100+ projects across 25+ industries." },
  { Icon: Users, title: "Transparent process", desc: "Weekly demos, shared backlogs, no surprises." },
  { Icon: Headphones, title: "Ongoing support", desc: "24/7 monitoring and on-call coverage." },
  { Icon: DollarSign, title: "Competitive pricing", desc: "Flexible engagement models for every stage." },
  { Icon: MapPin, title: "US-based", desc: "Headquartered in the USA with global delivery." },
];

const SERVICES_SCHEMA = [
  {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://combinenexus.com/" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://combinenexus.com/services" },
    ],
  },
  {
    "@type": "ItemList",
    name: "Combine Nexus Enterprise IT Services",
    itemListElement: SERVICES.map((s, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.desc,
        url: `https://combinenexus.com/services#${s.id}`,
        provider: { "@id": "https://combinenexus.com/#organization" },
      },
    })),
  },
];

function ServicesPage() {
  return (
    <SiteLayout>
      <SEO
        title="Enterprise IT Services — Software, Cloud, AI & Cybersecurity | Combine Nexus"
        description="Explore Combine Nexus IT services: Custom Software Development, AWS/Azure/GCP Cloud Solutions, AI & Machine Learning, Cybersecurity (SOC 2, ISO 27001), Mobile Apps, UI/UX, and DevOps."
        path="/services"
        keywords="IT services, custom software development, cloud migration AWS Azure GCP, AI ML engineering, cybersecurity consulting, mobile app development, DevOps automation, Combine Nexus"
        schema={SERVICES_SCHEMA}
      />
      <section className="bg-hero relative overflow-hidden -mt-20 pt-20">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="container-x py-24 relative">
          <div>
            <span className="text-primary font-mono text-sm">// Services</span>
            <h1 className="text-5xl md:text-6xl font-bold mt-3">Our Services</h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              Comprehensive IT solutions tailored to your business needs — from strategy and design through engineering and operations.
            </p>
          </div>
        </div>
      </section>

      <section className="container-x py-24 space-y-8">
        {SERVICES.map(({ id, Icon, title, desc, features, tech }, i) => (
          <motion.article
            id={id}
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="scroll-mt-28 glass rounded-3xl p-8 md:p-10 grid lg:grid-cols-3 gap-8 border border-[#E53935]/15 hover:border-[#E53935]/35 transition-all"
          >
            <div>
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: "linear-gradient(135deg,rgba(30,136,229,0.18),rgba(229,57,53,0.18))", color: "#E53935" }}
              >
                <Icon size={26} />
              </div>
              <div className="text-xs font-mono text-muted-foreground">0{i + 1}</div>
              <h2 className="text-2xl font-bold mt-2">{title}</h2>
            </div>
            <div className="lg:col-span-2 space-y-6">
              <p className="text-muted-foreground leading-relaxed">{desc}</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 size={16} className="text-primary flex-shrink-0" /> {f}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {tech.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full bg-secondary text-xs font-mono">
                    {t}
                  </span>
                ))}
              </div>
              <Link to="/contact" className="inline-flex items-center gap-2 text-primary font-semibold">
                Request a quote for {title} <ArrowRight size={16} />
              </Link>
            </div>
          </motion.article>
        ))}
      </section>

      <section className="container-x py-24">
        <div className="text-center mb-14">
          <span className="text-primary font-mono text-sm">// Why Combine Nexus</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">Built for enterprise trust</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY.map(({ Icon, title, desc }) => (
            <div key={title} className="glass rounded-2xl p-6 border border-[#E53935]/15 hover:border-[#E53935]/35 transition-all">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "linear-gradient(135deg,rgba(30,136,229,0.18),rgba(229,57,53,0.18))", color: "#E53935" }}
              >
                <Icon size={20} />
              </div>
              <h3 className="font-semibold mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
