import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import logo from "@/assets/combine-nexus-logo.jpeg";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

/* ── Brand gradient: blue → red → orange → amber (full logo spectrum) ── */
const BRAND_GRADIENT =
  "linear-gradient(135deg, #1565C0 0%, #1E88E5 25%, #E53935 55%, #F57C00 78%, #FFB300 100%)";

/* Glow uses the red-orange midpoint */
const CTA_GLOW = "0 0 28px rgba(229,57,53,0.45), 0 0 12px rgba(30,136,229,0.35)";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { location } = useRouterState();

  const navRef = useRef<HTMLElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!navRef.current) return;
    const active = navRef.current.querySelector<HTMLElement>("[data-active='true']");
    if (active) {
      const navRect = navRef.current.getBoundingClientRect();
      const rect = active.getBoundingClientRect();
      setIndicator({ left: rect.left - navRect.left, width: rect.width, opacity: 1 });
    } else {
      setIndicator((p) => ({ ...p, opacity: 0 }));
    }
  }, [location.pathname]);

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div
          className={`transition-all duration-300 ${
            scrolled ? "max-w-6xl mx-auto px-4" : "max-w-7xl mx-auto px-6 lg:px-10"
          }`}
        >
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              scrolled
                ? "backdrop-blur-2xl border border-white/10 rounded-2xl px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                : "bg-transparent px-0 py-2"
            }`}
          >
            {/* ── Logo ── */}
            <Link to="/" className="flex items-center gap-3 shrink-0 group">
              <div className="relative">
                {/* hover glow uses red from palette */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-50 blur-md transition-opacity duration-300"
                  style={{ background: BRAND_GRADIENT }}
                />
                <img
                  src={logo}
                  alt="Combine Nexus — Enterprise IT Services Logo"
                  width={64}
                  height={64}
                  decoding="async"
                  className="relative h-16 w-auto object-contain"
                />
              </div>
              <span className="font-bold text-base tracking-tight hidden sm:block">
                Combine{" "}
                <span
                  style={{
                    background: BRAND_GRADIENT,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Nexus
                </span>
              </span>
            </Link>

            {/* ── Desktop nav ── */}
            <nav
              ref={navRef}
              aria-label="Main navigation"
              className="hidden md:flex items-center relative rounded-full px-1.5 py-1.5"
            >
              {/* sliding active pill */}
              <span
                className="absolute top-1.5 bottom-1.5 rounded-full transition-all duration-300 ease-out pointer-events-none"
                style={{
                  left: indicator.left,
                  width: indicator.width,
                  opacity: indicator.opacity,
                  background:
                    "linear-gradient(135deg, rgba(30,136,229,0.25) 0%, rgba(229,57,53,0.20) 50%, rgba(245,124,0,0.20) 100%)",
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
                }}
              />

              {NAV.map((n) => {
                const active = isActive(n.to);
                return (
                  <Link
                    key={n.to}
                    to={n.to}
                    data-active={active}
                    className={`relative z-10 px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                      active ? "text-white" : "text-white/50 hover:text-white/90"
                    }`}
                  >
                    {/* active: gradient underline dot */}
                    {active && (
                      <span
                        className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{ background: BRAND_GRADIENT }}
                      />
                    )}
                    {n.label}
                  </Link>
                );
              })}
            </nav>

            {/* ── CTA + hamburger ── */}
            <div className="flex items-center gap-3">
              <Link
                to="/contact"
                className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: BRAND_GRADIENT,
                  boxShadow: "0 0 0 rgba(0,0,0,0)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = CTA_GLOW)}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 0 0 rgba(0,0,0,0)")}
              >
                Start a Project
                <ArrowRight size={14} />
              </Link>

              <button
                onClick={() => setOpen((o) => !o)}
                className="md:hidden relative w-9 h-9 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-white/70 hover:text-white hover:bg-white/10 transition-all"
                aria-label="Toggle menu"
              >
                <span
                  className={`absolute transition-all duration-200 ${
                    open ? "opacity-100 rotate-0" : "opacity-0 rotate-90"
                  }`}
                >
                  <X size={18} />
                </span>
                <span
                  className={`absolute transition-all duration-200 ${
                    open ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"
                  }`}
                >
                  <Menu size={18} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* panel */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-[#07070D]/95 backdrop-blur-2xl border-l border-white/[0.08] flex flex-col transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* thin gradient line at top of panel */}
          <div className="h-px w-full" style={{ background: BRAND_GRADIENT }} />

          {/* panel header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Combine Nexus Logo"
                width={32}
                height={32}
                decoding="async"
                className="h-8 w-8 rounded-lg object-cover"
              />
              <span className="font-bold text-sm">Combine Nexus</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close navigation menu"
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
            >
              <X size={16} />
            </button>
          </div>

          {/* nav links */}
          <nav aria-label="Mobile navigation" className="flex-1 px-4 py-6 flex flex-col gap-1">
            {NAV.map((n, i) => {
              const active = isActive(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  style={{ transitionDelay: open ? `${i * 45}ms` : "0ms" }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    active
                      ? "text-white"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  } ${open ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"}`}
                >
                  {/* active row: left gradient bar */}
                  {active ? (
                    <>
                      <span
                        className="absolute left-4 w-0.5 h-5 rounded-full"
                        style={{ background: BRAND_GRADIENT }}
                      />
                      <span
                        className="absolute inset-0 rounded-xl opacity-10"
                        style={{ background: BRAND_GRADIENT }}
                      />
                    </>
                  ) : null}
                  <span className="relative">{n.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="px-4 pb-8 space-y-3">
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: BRAND_GRADIENT }}
            >
              Start a Project
              <ArrowRight size={14} />
            </Link>
            <p className="text-center text-[11px] text-white/25">
              info@combinenexus.com
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
