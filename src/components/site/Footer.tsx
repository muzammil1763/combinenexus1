import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, ExternalLink, GitFork, Send, AtSign } from "lucide-react";
import logo from "@/assets/combine-nexus-logo.jpeg";

const SOCIAL_LINKS = [
  { Icon: ExternalLink, href: "https://www.linkedin.com/company/combinenexus", label: "Combine Nexus on LinkedIn" },
  { Icon: Send, href: "https://x.com/combinenexus", label: "Combine Nexus on X (Twitter)" },
  { Icon: GitFork, href: "https://github.com/combinenexus", label: "Combine Nexus on GitHub" },
  { Icon: AtSign, href: "mailto:info@combinenexus.com", label: "Email Combine Nexus" },
];

const FOOTER_SERVICES = [
  { label: "Custom Software", hash: "custom-software-development" },
  { label: "Cloud Solutions", hash: "cloud-solutions" },
  { label: "AI & Machine Learning", hash: "ai-machine-learning" },
  { label: "Cybersecurity", hash: "cybersecurity" },
  { label: "Mobile Apps", hash: "mobile-app-development" },
];

export function Footer() {
  return (
    <footer className="border-t border-border mt-32 bg-card/40">
      <div className="container-x py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-3 mb-4">
            <img
              src={logo}
              alt="Combine Nexus Logo"
              width={48}
              height={48}
              loading="lazy"
              decoding="async"
              className="h-12 w-auto object-contain"
            />
            <span className="font-bold">
              Combine{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #1565C0 0%, #1E88E5 25%, #E53935 55%, #F57C00 78%, #FFB300 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Nexus
              </span>
            </span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Where innovation meets execution. Premium IT services for modern enterprises.
          </p>
          <div className="flex gap-3 mt-6">
            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="p-2 rounded-lg glass hover:text-primary transition"
                aria-label={label}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Company</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary transition">About</Link></li>
            <li><Link to="/portfolio" className="hover:text-primary transition">Portfolio</Link></li>
            <li><Link to="/services" className="hover:text-primary transition">Services</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Services</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {FOOTER_SERVICES.map(({ label, hash }) => (
              <li key={hash}>
                <Link to="/services" hash={hash} className="hover:text-primary transition">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Get in touch</h3>
          <address className="not-italic">
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 text-primary shrink-0" />
                <a href="mailto:info@combinenexus.com" className="hover:text-primary transition">
                  info@combinenexus.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 text-primary shrink-0" />
                <a href="tel:+17879784223" className="hover:text-primary transition">
                  +1 (787) 978-4223
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 text-primary shrink-0" />
                <span>30 N Gould St, Suite R, Sheridan, WY 82801, United States</span>
              </li>
            </ul>
          </address>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-x py-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Combine Nexus. All rights reserved.</p>
          <p>Crafted with precision in the USA</p>
        </div>
      </div>
    </footer>
  );
}
