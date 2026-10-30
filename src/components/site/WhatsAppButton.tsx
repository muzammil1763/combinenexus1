import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

/* +17879784223 — no spaces/dashes for wa.me */
const WA_NUMBER = "17879784223";
const WA_MESSAGE = encodeURIComponent("Hi! I'd like to know more about Combine Nexus services.");
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [pulse, setPulse] = useState(true);

  /* stop pulse after first interaction */
  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 6000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="fixed z-50"
      /* sits just above the ChatBot FAB (bottom-5 = 20px, h-14 = 56px, gap 12px → 88px) */
      style={{ bottom: "88px", right: "20px" }}
    >
      {/* tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 8, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap"
          >
            <div className="bg-[#128C7E] text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg">
              Chat on WhatsApp
              {/* arrow */}
              <span
                className="absolute right-[-6px] top-1/2 -translate-y-1/2 border-4 border-transparent"
                style={{ borderLeftColor: "#128C7E" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* pulse ring */}
      {pulse && (
        <span className="absolute inset-0 rounded-full animate-ping opacity-40"
          style={{ background: "#25D366" }} />
      )}

      {/* button */}
      <motion.a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-[0_4px_24px_rgba(37,211,102,0.45)] transition-shadow hover:shadow-[0_4px_32px_rgba(37,211,102,0.65)]"
        style={{ background: "#25D366" }}
      >
        {/* Official WhatsApp SVG icon */}
        <svg
          viewBox="0 0 48 48"
          className="w-8 h-8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24 4C13 4 4 13 4 24c0 3.6 1 7 2.7 9.9L4 44l10.4-2.7A19.9 19.9 0 0 0 24 44c11 0 20-9 20-20S35 4 24 4zm0 36.4a16.3 16.3 0 0 1-8.3-2.3l-.6-.4-6.2 1.6 1.7-6-.4-.6A16.4 16.4 0 1 1 24 40.4z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M32.8 27.6c-.4-.2-2.5-1.2-2.9-1.4-.4-.1-.7-.2-1 .2-.3.4-1.1 1.4-1.4 1.7-.2.3-.5.3-.9.1-.4-.2-1.8-.7-3.4-2.1a12.7 12.7 0 0 1-2.4-2.9c-.2-.4 0-.6.2-.8l.6-.7.4-.6.1-.6-.1-.5-1.3-3.1c-.3-.8-.7-.7-1-.7h-.8c-.3 0-.8.1-1.2.5-.4.5-1.6 1.5-1.6 3.7s1.6 4.3 1.9 4.6c.2.3 3.2 4.9 7.7 6.8 1.1.5 1.9.7 2.6.9 1.1.3 2 .3 2.8.2.9-.1 2.7-1.1 3.1-2.2.4-1 .4-2 .3-2.2-.2-.2-.5-.3-.9-.5z"
            fill="white"
          />
        </svg>
      </motion.a>
    </div>
  );
}
