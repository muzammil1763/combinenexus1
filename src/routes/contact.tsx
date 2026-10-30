import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, Clock, CheckCircle2, Send } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { SEO } from "@/components/site/SEO";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

const CONTACT_SCHEMA = [
  {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://combinenexus.com/" },
      { "@type": "ListItem", position: 2, name: "Contact", item: "https://combinenexus.com/contact" },
    ],
  },
  {
    "@type": "ContactPage",
    "@id": "https://combinenexus.com/contact#webpage",
    url: "https://combinenexus.com/contact",
    name: "Contact Combine Nexus — Request an Enterprise IT Consultation",
    description:
      "Get in touch with Combine Nexus for custom software development, cloud migration, AI/ML engineering, cybersecurity, and DevOps consulting.",
    mainEntity: { "@id": "https://combinenexus.com/#organization" },
  },
];

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const errs: Record<string, string> = {};
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();
    if (!name) errs.name = "Name is required";
    if (name.length > 100) errs.name = "Max 100 characters";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Valid email required";
    if (!message) errs.message = "Tell us about your project";
    if (message.length > 2000) errs.message = "Max 2000 characters";
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSent(true);
      e.currentTarget.reset();
    }
  };

  return (
    <SiteLayout>
      <SEO
        title="Contact Combine Nexus — Start Your Software, Cloud or AI Project"
        description="Contact Combine Nexus at info@combinenexus.com or +1 (787) 978-4223. Schedule a discovery call or request a quote for custom software, cloud, or AI solutions."
        path="/contact"
        keywords="contact Combine Nexus, hire software developers USA, request IT consultation, cloud consulting quote, AI development inquiry"
        schema={CONTACT_SCHEMA}
      />
      <section className="bg-hero relative overflow-hidden -mt-20 pt-20">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="container-x py-24 relative">
          <span className="text-primary font-mono text-sm">// Contact</span>
          <h1 className="text-5xl md:text-6xl font-bold mt-3">Let's Talk</h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Ready to start your next project? Reach out — we usually reply within one business day.
          </p>
        </div>
      </section>

      <section className="container-x py-20 grid lg:grid-cols-5 gap-10">
        <div id="contact-form" className="lg:col-span-3 glass rounded-3xl p-8 md:p-10">
          {sent ? (
            <div className="text-center py-12">
              <CheckCircle2 className="mx-auto text-primary mb-4" size={48} />
              <h2 className="text-2xl font-bold">Message sent</h2>
              <p className="mt-3 text-muted-foreground">Thanks for reaching out. We'll get back to you shortly.</p>
              <button
                onClick={() => setSent(false)}
                className="mt-6 px-6 py-2.5 rounded-full border border-border hover:border-primary/50 text-sm font-semibold"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5" noValidate>
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Full name *" name="name" autoComplete="name" error={errors.name} />
                <Field label="Email address *" name="email" type="email" autoComplete="email" error={errors.email} />
                <Field label="Phone number" name="phone" type="tel" autoComplete="tel" />
                <Field label="Company name" name="company" autoComplete="organization" />
                <Select
                  label="Service interested in"
                  name="service"
                  options={["Custom Software", "Cloud Solutions", "AI & ML", "Cybersecurity", "Mobile Apps", "UI/UX Design", "IT Consulting", "DevOps"]}
                />
                <Select
                  label="Budget range"
                  name="budget"
                  options={["< $25K", "$25K – $75K", "$75K – $200K", "$200K+"]}
                />
              </div>
              <div>
                <label htmlFor="field-message" className="text-sm font-semibold mb-2 block">
                  Project description *
                </label>
                <textarea
                  id="field-message"
                  name="message"
                  rows={5}
                  maxLength={2000}
                  className="w-full bg-background/60 border border-border rounded-xl px-4 py-3 focus:border-primary outline-none transition"
                />
                {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
              </div>
              <Select
                label="How did you hear about us?"
                name="source"
                options={["Search engine", "Referral", "Social media", "Event", "Other"]}
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 glow-cyan transition"
              >
                <Send size={16} /> Send message
              </button>
            </form>
          )}
        </div>

        <div className="lg:col-span-2 space-y-5">
          {[
            { Icon: Mail, label: "Email", value: "info@combinenexus.com", href: "mailto:info@combinenexus.com" },
            { Icon: Phone, label: "Phone", value: "+1 (787) 978-4223", href: "tel:+17879784223" },
            { Icon: MapPin, label: "Address", value: "30 N Gould St, Suite R, Sheridan, WY 82801, United States" },
            { Icon: Clock, label: "Working hours", value: "Mon – Fri, 9am – 6pm EST" },
          ].map(({ Icon, label, value, href }) => (
            <div key={label} className="glass rounded-2xl p-5 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center text-primary flex-shrink-0">
                <Icon size={20} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
                {href ? (
                  <a href={href} className="font-semibold mt-0.5 block hover:text-primary transition">
                    {value}
                  </a>
                ) : (
                  <div className="font-semibold mt-0.5">{value}</div>
                )}
              </div>
            </div>
          ))}
          <div className="glass rounded-2xl overflow-hidden aspect-video">
            <iframe
              title="Combine Nexus Office Location — Sheridan, Wyoming"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-106.968%2C44.790%2C-106.945%2C44.805&layer=mapnik&marker=44.7978%2C-106.9562"
              className="w-full h-full"
              loading="lazy"
            />
          </div>
          <div className="glass rounded-2xl p-5">
            <h2 className="font-semibold text-base">Prefer to talk?</h2>
            <p className="text-sm text-muted-foreground mt-1">Schedule a 30-minute discovery call with our engineering leads.</p>
            <a href="tel:+17879784223" className="mt-3 inline-flex text-primary text-sm font-semibold hover:underline">
              Call +1 (787) 978-4223 →
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  error?: string;
}) {
  const id = `field-${name}`;
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold mb-2 block">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        maxLength={255}
        className="w-full bg-background/60 border border-border rounded-xl px-4 py-3 focus:border-primary outline-none transition"
      />
      {error && <p className="text-destructive text-xs mt-1">{error}</p>}
    </div>
  );
}

function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  const id = `field-${name}`;
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold mb-2 block">
        {label}
      </label>
      <select
        id={id}
        name={name}
        className="w-full bg-background/60 border border-border rounded-xl px-4 py-3 focus:border-primary outline-none transition"
      >
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
