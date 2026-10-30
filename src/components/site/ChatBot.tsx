import { useState, useRef, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Sparkles, ChevronDown } from "lucide-react";

/* ── Brand gradient (matches navbar/footer) ── */
const BRAND_GRADIENT =
  "linear-gradient(135deg, #1565C0 0%, #1E88E5 25%, #E53935 55%, #F57C00 78%, #FFB300 100%)";

type Message = {
  id: number;
  from: "bot" | "user";
  text: string;
};

/* ── Canned responses ── */
const BOT_REPLIES: Record<string, string> = {
  default:
    "Thanks for reaching out! Our team will get back to you shortly. You can also email us at info@combinenexus.com.",
  hello:
    "Hey there! 👋 I'm the Combine Nexus assistant. Ask me about our services, pricing, or how to start a project.",
  hi: "Hey there! 👋 I'm the Combine Nexus assistant. Ask me about our services, pricing, or how to start a project.",
  services:
    "We offer Custom Software, Cloud Solutions, AI & ML, Cybersecurity, Mobile Apps, UI/UX Design, IT Consulting, and DevOps. Which one interests you?",
  pricing:
    "Our engagements start at $25K. We offer fixed-price, time & materials, and dedicated team models. Want a custom quote?",
  contact:
    "You can reach us at info@combinenexus.com or +1 (787) 978-4223. Or fill out the contact form on our Contact page!",
  cloud:
    "Our Cloud practice covers AWS, Azure, and GCP — migrations, architecture, cost optimization, and 24/7 managed ops.",
  ai: "We build production-ready ML systems, LLM-powered apps, computer vision, and NLP solutions. What's your use case?",
  mobile:
    "We build iOS, Android, and cross-platform apps with React Native and Flutter. 500K+ downloads across our client apps.",
  security:
    "Our cybersecurity team handles vulnerability assessments, pen testing, SOC 2 / ISO 27001 compliance, and continuous monitoring.",
};

function getBotReply(input: string): string {
  const lower = input.toLowerCase();
  for (const key of Object.keys(BOT_REPLIES)) {
    if (key !== "default" && lower.includes(key)) return BOT_REPLIES[key];
  }
  return BOT_REPLIES.default;
}

const QUICK_REPLIES = ["Services", "Pricing", "Contact", "Cloud", "AI"];

const INITIAL_MESSAGES: Message[] = [
  {
    id: 0,
    from: "bot",
    text: "Hi! 👋 I'm the Combine Nexus assistant. How can I help you today?",
  },
];

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);

  /* scroll to bottom on new message */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  /* focus input when opened */
  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = { id: nextId.current++, from: "user", text: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const reply = getBotReply(trimmed);
      setTyping(false);
      setMessages((m) => [...m, { id: nextId.current++, from: "bot", text: reply }]);
      if (!open) setUnread((n) => n + 1);
    }, 900 + Math.random() * 400);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* ── Chat panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="fixed bottom-24 right-5 z-50 w-[340px] sm:w-[380px] flex flex-col rounded-2xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.7)] border border-white/10"
            style={{ maxHeight: "min(560px, calc(100dvh - 120px))" }}
          >
            {/* header */}
            <div
              className="flex items-center justify-between px-4 py-3.5 shrink-0"
              style={{ background: BRAND_GRADIENT }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-none">Nexus Assistant</p>
                  <p className="text-white/70 text-xs mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                    Online · typically replies instantly
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition"
                aria-label="Close chat"
              >
                <ChevronDown size={16} />
              </button>
            </div>

            {/* messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#07070D]">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-end gap-2 ${msg.from === "user" ? "flex-row-reverse" : ""}`}
                >
                  {/* avatar */}
                  <div
                    className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center"
                    style={
                      msg.from === "bot"
                        ? { background: BRAND_GRADIENT }
                        : { background: "rgba(255,255,255,0.1)" }
                    }
                  >
                    {msg.from === "bot" ? (
                      <Bot size={13} className="text-white" />
                    ) : (
                      <User size={13} className="text-white/70" />
                    )}
                  </div>

                  {/* bubble */}
                  <div
                    className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.from === "bot"
                        ? "bg-white/8 text-white/90 rounded-bl-sm"
                        : "text-white rounded-br-sm"
                    }`}
                    style={
                      msg.from === "user"
                        ? { background: BRAND_GRADIENT }
                        : {}
                    }
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* typing indicator */}
              <AnimatePresence>
                {typing && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-end gap-2"
                  >
                    <div
                      className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center"
                      style={{ background: BRAND_GRADIENT }}
                    >
                      <Bot size={13} className="text-white" />
                    </div>
                    <div className="bg-white/8 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-white/40"
                          style={{
                            animation: "bounce 1.2s infinite",
                            animationDelay: `${i * 0.2}s`,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </div>

            {/* quick replies */}
            <div className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-none bg-[#07070D] border-t border-white/[0.06] shrink-0">
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="shrink-0 px-3 py-1.5 rounded-full border border-white/15 text-xs text-white/60 hover:text-white hover:border-white/30 transition whitespace-nowrap"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* input */}
            <form
              onSubmit={onSubmit}
              className="flex items-center gap-2 px-3 py-3 bg-[#0A0A0F] border-t border-white/[0.06] shrink-0"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message…"
                aria-label="Message Nexus Assistant"
                maxLength={500}
                className="flex-1 bg-white/6 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/25 transition"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition disabled:opacity-30 hover:scale-105 active:scale-95"
                style={{ background: BRAND_GRADIENT }}
                aria-label="Send"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB trigger ── */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all"
        style={{ background: BRAND_GRADIENT }}
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X size={22} className="text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <Bot size={22} className="text-white" />
            </motion.span>
          )}
        </AnimatePresence>

        {/* unread badge */}
        <AnimatePresence>
          {!open && unread > 0 && (
            <motion.span
              key="badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#E53935] text-white text-[10px] font-bold flex items-center justify-center border-2 border-black"
            >
              {unread}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* bounce keyframe for typing dots */}
      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
      `}</style>
    </>
  );
}
