"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaCalendarAlt, FaImages } from "react-icons/fa";

const LINKS = [
  { label: "Home",    id: "home",    icon: FaHome },
  { label: "Events",  id: "events",  icon: FaCalendarAlt },
  { label: "Gallery", id: "gallery", icon: FaImages },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [active, setActive]       = useState("home");
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      // update active section
      for (const l of [...LINKS].reverse()) {
        const el = document.getElementById(l.id);
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(l.id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <>
      {/* ══════════════════════════════════════════
          DESKTOP (lg+): classic glass top bar
      ══════════════════════════════════════════ */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`hidden lg:flex fixed top-0 left-0 right-0 z-50 items-center justify-between px-10 transition-all duration-300 ${
          scrolled ? "py-3 glass shadow-lg" : "py-5"
        }`}
      >
        <span className="font-vibes text-3xl text-brown drop-shadow">A & S</span>
        <ul className="flex gap-8">
          {LINKS.map(({ label, id }) => (
            <li key={id}>
              <button
                onClick={() => go(id)}
                className={`font-poppins text-sm transition-colors duration-200 relative pb-0.5 ${
                  active === id ? "text-gold" : "text-dark/60 hover:text-gold"
                }`}
              >
                {label}
                {active === id && (
                  <motion.div layoutId="desktop-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-gold" />
                )}
              </button>
            </li>
          ))}
        </ul>

      </motion.nav>

      {/* ══════════════════════════════════════════
          TABLET (md–lg): floating pill nav top-center
      ══════════════════════════════════════════ */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="hidden md:flex lg:hidden fixed top-4 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="flex items-center gap-1 glass rounded-full px-3 py-2 shadow-xl border border-gold/20">
          <span className="font-vibes text-xl text-brown mr-2 pl-1">A&S</span>
          {LINKS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => go(id)}
              className={`font-poppins text-xs px-3 py-1.5 rounded-full transition-all duration-200 ${
                active === id
                  ? "gold-shimmer text-white shadow-sm"
                  : "text-dark/60 hover:text-brown"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </motion.nav>

      {/* ══════════════════════════════════════════
          MOBILE (< md): bottom tab bar
      ══════════════════════════════════════════ */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="glass border-t border-gold/20 shadow-2xl px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] flex items-center justify-around">
          {LINKS.map(({ label, id, icon: Icon }) => (
            <button
              key={id}
              onClick={() => go(id)}
              className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all duration-200"
            >
              <motion.div
                animate={active === id ? { scale: 1.2 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Icon className={`text-lg ${active === id ? "text-gold" : "text-dark/40"}`} />
              </motion.div>
              <span className={`font-poppins text-[9px] font-medium ${active === id ? "text-gold" : "text-dark/40"}`}>
                {label}
              </span>
              {active === id && (
                <motion.div layoutId="mobile-dot"
                  className="w-1 h-1 rounded-full bg-gold" />
              )}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
