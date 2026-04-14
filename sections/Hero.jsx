"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaHeart, FaChevronDown, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const PETALS = [
  { left: "5%",  delay: 0,   dur: 12, size: 16 },
  { left: "20%", delay: 2,   dur: 14, size: 11 },
  { left: "38%", delay: 1,   dur: 10, size: 20 },
  { left: "55%", delay: 3.5, dur: 13, size: 13 },
  { left: "70%", delay: 0.5, dur: 11, size: 18 },
  { left: "85%", delay: 2.5, dur: 15, size: 10 },
  { left: "94%", delay: 4,   dur: 12, size: 14 },
];

export default function Hero({ onOpen }) {
  const [phase, setPhase]     = useState("envelope");
  const [mounted, setMounted] = useState(false);
  const onOpenRef = useRef(onOpen);
  useEffect(() => { onOpenRef.current = onOpen; }, [onOpen]);
  useEffect(() => setMounted(true), []);

  const open = () => {
    setPhase("opening");
    setTimeout(() => { setPhase("hero"); onOpenRef.current?.(); }, 1400);
  };
  const scrollDown = () => document.getElementById("events")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">

      {/* ══ FULL-SCREEN DOOR ══ */}
      <AnimatePresence>
        {phase !== "hero" && (
          <motion.div key="door"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 select-none"
            style={{ perspective: "2000px" }}>

            {/* Left panel */}
            <motion.div
              className="absolute top-0 left-0 w-1/2 h-full cursor-pointer overflow-hidden"
              style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
              animate={phase === "opening" ? { rotateY: -110 } : { rotateY: 0 }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              onClick={phase === "envelope" ? open : undefined}>
              <div className="relative w-full h-full" style={{ background: "linear-gradient(160deg,#2a1204,#4a2010)" }}>
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(90deg,transparent,transparent 28px,rgba(212,175,55,0.12) 28px,rgba(212,175,55,0.12) 29px)" }} />
                <div className="absolute inset-6 border border-gold/20" />
                <div className="absolute inset-14 border border-gold/10" />
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-28 h-px gold-shimmer opacity-50" />
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-28 h-px gold-shimmer opacity-50" />
                <div className="absolute top-0 right-0 w-px h-full" style={{ background: "linear-gradient(to bottom,transparent,rgba(212,175,55,0.5) 50%,transparent)" }} />
                <div className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full gold-shimmer shadow-lg" />
              </div>
            </motion.div>

            {/* Right panel */}
            <motion.div
              className="absolute top-0 right-0 w-1/2 h-full cursor-pointer overflow-hidden"
              style={{ transformOrigin: "right center", transformStyle: "preserve-3d" }}
              animate={phase === "opening" ? { rotateY: 110 } : { rotateY: 0 }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              onClick={phase === "envelope" ? open : undefined}>
              <div className="relative w-full h-full" style={{ background: "linear-gradient(200deg,#4a2010,#2a1204)" }}>
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(90deg,transparent,transparent 28px,rgba(212,175,55,0.12) 28px,rgba(212,175,55,0.12) 29px)" }} />
                <div className="absolute inset-6 border border-gold/20" />
                <div className="absolute inset-14 border border-gold/10" />
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-28 h-px gold-shimmer opacity-50" />
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-28 h-px gold-shimmer opacity-50" />
                <div className="absolute top-0 left-0 w-px h-full" style={{ background: "linear-gradient(to bottom,transparent,rgba(212,175,55,0.5) 50%,transparent)" }} />
                <div className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full gold-shimmer shadow-lg" />
              </div>
            </motion.div>

            {/* Wax Seal */}
            <motion.div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
              <motion.div
                className="flex flex-col items-center gap-5 pointer-events-auto cursor-pointer"
                animate={phase === "opening" ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.35 }}
                onClick={phase === "envelope" ? open : undefined}>
                <motion.p animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }}
                  className="font-poppins text-gold/80 text-[10px] uppercase tracking-[0.45em] whitespace-nowrap">
                  You are cordially invited
                </motion.p>
                <div className="relative w-28 h-28 sm:w-32 sm:h-32">
                  <div className="absolute inset-0 rounded-full blur-xl opacity-60" style={{ background: "rgba(192,57,43,0.5)" }} />
                  <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle at 35% 35%,#c0392b,#7b1a12)", boxShadow: "0 0 28px rgba(192,57,43,0.7),0 6px 20px rgba(0,0,0,0.7)" }} />
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                    <polygon points="50,2 61,10 73,6 79,18 92,20 92,33 102,40 97,53 104,64 94,71 95,84 82,87 77,99 64,96 53,103 42,96 29,99 24,87 11,84 12,71 2,64 9,53 4,40 14,33 14,20 27,18 33,6 45,10"
                      fill="none" stroke="rgba(212,175,55,0.55)" strokeWidth="1.5"
                      style={{ transform: "scale(0.92) translate(4px,4px)" }} />
                  </svg>
                  <div className="absolute inset-3 rounded-full border border-gold/35" style={{ background: "radial-gradient(circle at 40% 40%,rgba(212,175,55,0.12),transparent)" }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-vibes text-gold" style={{ fontSize: "clamp(1.1rem,3.5vw,1.6rem)", textShadow: "0 1px 6px rgba(0,0,0,0.7)" }}>S & A</span>
                  </div>
                </div>
                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.2, repeat: Infinity }}
                  className="flex flex-col items-center gap-1.5">
                  <span className="font-poppins text-cream/70 text-[11px] tracking-[0.35em] uppercase">Tap to open</span>
                  <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <FaChevronDown className="text-gold/60 text-sm" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ HERO CONTENT ══ */}
      {phase === "hero" && (
        <motion.div key="hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
          className="relative w-full min-h-screen">

          {/* petals — all screens */}
          {mounted && PETALS.map((p, i) => (
            <motion.div key={i} className="absolute pointer-events-none text-blush/60 select-none z-20"
              style={{ left: p.left, top: "-30px", fontSize: p.size }}
              animate={{ y: ["0vh", "110vh"], rotate: [0, 360], x: [0, 25, -15, 8, 0] }}
              transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "linear" }}>
              ✿
            </motion.div>
          ))}

          {/* corner ornaments */}
          {["top-4 left-4 border-t-2 border-l-2", "top-4 right-4 border-t-2 border-r-2",
            "bottom-8 left-4 border-b-2 border-l-2", "bottom-8 right-4 border-b-2 border-r-2"
          ].map((cls, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className={`absolute w-7 h-7 sm:w-10 sm:h-10 border-gold/40 z-20 ${cls}`} />
          ))}

          {/* ─────────────────────────────────────────
              MOBILE (<md):
              Top 62% = photo (portrait, faces visible)
              Bottom 38% = dark text block
          ───────────────────────────────────────── */}
          <div className="md:hidden flex flex-col min-h-screen">
            {/* Photo */}
            <div className="relative w-full" style={{ height: "62vh" }}>
              <Image
                src="/images/Hero Section Mobile.jpeg"
                alt="Shubham & Apurva"
                fill
                priority
                className="object-cover object-top"
              />
              {/* subtle bottom fade into text block */}
              <div className="absolute bottom-0 left-0 right-0 h-24"
                style={{ background: "linear-gradient(to top,#0e0704,transparent)" }} />
              {/* side vignette */}
              <div className="absolute inset-0"
                style={{ background: "radial-gradient(ellipse 100% 100% at 50% 50%,transparent 55%,rgba(8,4,2,0.45) 100%)" }} />
            </div>

            {/* Text block */}
            <div className="flex-1 flex flex-col items-center text-center px-6 pt-5 pb-10"
              style={{ background: "#0e0704" }}>
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="font-poppins text-gold/60 text-[9px] uppercase tracking-[0.4em] mb-4">
                Together with their families
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
                className="mb-4">
                <h1 className="font-vibes text-cream leading-none" style={{ fontSize: "clamp(3.4rem,16vw,5rem)", textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}>
                  Shubham
                </h1>
                <div className="flex items-center justify-center gap-2 my-1.5">
                  <div className="h-px w-8 bg-gold/50" />
                  <FaHeart className="text-blush text-xs animate-pulse" />
                  <div className="h-px w-8 bg-gold/50" />
                </div>
                <h1 className="font-vibes text-cream leading-none" style={{ fontSize: "clamp(3.4rem,16vw,5rem)", textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}>
                  Apurva
                </h1>
              </motion.div>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
                className="font-playfair italic text-gold text-base mb-0.5">May 14, 2026</motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
                className="font-poppins text-cream/40 text-[10px] tracking-widest mb-5">NASHIK, MAHARASHTRA</motion.p>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
                className="flex gap-2 mb-6 flex-wrap justify-center">
                {[
                  { icon: FaCalendarAlt, text: "14 May 2026" },
                  { icon: FaMapMarkerAlt, text: "Nashik" },
                ].map(({ icon: Icon, text }) => (
                  <span key={text} className="flex items-center gap-1.5 bg-white/8 backdrop-blur-sm border border-gold/20 rounded-full px-4 py-1.5"
                    style={{ background: "rgba(255,255,255,0.07)" }}>
                    <Icon className="text-gold text-xs" />
                    <span className="font-poppins text-cream/70 text-xs">{text}</span>
                  </span>
                ))}
              </motion.div>

              <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={scrollDown}
                className="gold-shimmer text-white font-poppins font-semibold px-8 py-3 rounded-full shadow-xl text-xs tracking-[0.2em] uppercase">
                View Invitation ✦
              </motion.button>
            </div>
          </div>

          {/* ─────────────────────────────────────────
              TABLET (md–lg):
              Left 52% = photo panel (landscape, faces center)
              Right 48% = dark text panel
          ───────────────────────────────────────── */}
          <div className="hidden md:flex lg:hidden min-h-screen w-full">
            {/* Photo panel */}
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }}
              className="relative w-[52%] overflow-hidden">
              <Image
                src="/images/Hero Section Tablet and Desktop.jpeg"
                alt="Shubham & Apurva"
                fill
                priority
                className="object-cover object-center"
              />
              {/* right-edge fade into text panel */}
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to right,transparent 50%,rgba(8,4,2,0.85) 100%)" }} />
              {/* top/bottom vignette */}
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(180deg,rgba(8,4,2,0.35) 0%,transparent 25%,transparent 75%,rgba(8,4,2,0.35) 100%)" }} />
            </motion.div>

            {/* Text panel */}
            <div className="w-[48%] flex flex-col justify-center px-10 pt-20 pb-10"
              style={{ background: "linear-gradient(135deg,rgba(8,4,2,0.97) 0%,rgba(20,10,4,0.95) 100%)" }}>
              <motion.p initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
                className="font-poppins text-gold/60 text-[9px] uppercase tracking-[0.35em] mb-6">
                Together with their families
              </motion.p>
              <motion.h1 initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.8 }}
                className="font-vibes text-cream leading-none mb-2"
                style={{ fontSize: "clamp(3.2rem,7vw,5rem)", textShadow: "0 4px 24px rgba(0,0,0,0.5)" }}>
                Shubham
              </motion.h1>
              <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 0.4 }}
                className="flex items-center gap-2 mb-2">
                <div className="h-px w-10" style={{ background: "linear-gradient(to right,transparent,#D4AF37)" }} />
                <FaHeart className="text-blush text-sm animate-pulse" />
                <div className="h-px w-10" style={{ background: "linear-gradient(to left,transparent,#D4AF37)" }} />
              </motion.div>
              <motion.h1 initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
                className="font-vibes text-cream leading-none mb-6"
                style={{ fontSize: "clamp(3.2rem,7vw,5rem)", textShadow: "0 4px 24px rgba(0,0,0,0.5)" }}>
                Apurva
              </motion.h1>

              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.65, duration: 0.7 }}
                className="h-px w-full mb-6" style={{ background: "linear-gradient(to right,#D4AF37,transparent)" }} />

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                className="font-playfair italic text-gold text-xl mb-1">May 14, 2026</motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                className="font-poppins text-cream/50 text-xs tracking-widest mb-8">NASHIK, MAHARASHTRA</motion.p>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
                className="flex flex-col gap-3 mb-8">
                {[
                  { icon: FaCalendarAlt, label: "Wedding Date", val: "14 May 2026 · Thursday" },
                  { icon: FaMapMarkerAlt, label: "Venue", val: "Swami Narayan Banquet Hall, Nashik" },
                ].map(({ icon: Icon, label, val }) => (
                  <div key={label} className="flex items-center gap-3 rounded-xl px-4 py-2.5 border border-gold/15"
                    style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(10px)" }}>
                    <Icon className="text-gold text-sm flex-shrink-0" />
                    <div>
                      <p className="font-poppins text-gold/60 text-[9px] uppercase tracking-widest">{label}</p>
                      <p className="font-poppins text-cream/80 text-xs">{val}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.button initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={scrollDown}
                className="gold-shimmer text-white font-poppins font-semibold px-7 py-3 rounded-full shadow-xl text-xs tracking-[0.2em] uppercase self-start">
                View Invitation ✦
              </motion.button>
            </div>
          </div>

          {/* ─────────────────────────────────────────
              DESKTOP (lg+):
              Full-bleed landscape photo — faces visible center
              Light vignette only at left/right edges
              Names overlay bottom-left, info cards bottom-right
          ───────────────────────────────────────── */}
          <div className="hidden lg:block relative min-h-screen w-full">
            {/* Full-bleed photo */}
            <Image
              src="/images/Hero Section Tablet and Desktop.jpeg"
              alt="Shubham & Apurva"
              fill
              priority
              className="object-cover object-center"
            />

            {/* Edge vignettes only — keep center clear for faces */}
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to right,rgba(8,4,2,0.82) 0%,rgba(8,4,2,0.15) 30%,rgba(8,4,2,0.15) 70%,rgba(8,4,2,0.82) 100%)" }} />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(180deg,rgba(8,4,2,0.5) 0%,transparent 18%,transparent 72%,rgba(8,4,2,0.75) 100%)" }} />

            {/* Bottom content row */}
            <div className="absolute bottom-0 left-0 right-0 px-14 pb-12 flex items-end justify-between">

              {/* Names — bottom left */}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
                <p className="font-poppins text-gold/60 text-[9px] uppercase tracking-[0.4em] mb-3">
                  Together with their families
                </p>
                <h1 className="font-vibes text-cream leading-none"
                  style={{ fontSize: "clamp(4.5rem,8vw,7.5rem)", textShadow: "0 4px 28px rgba(0,0,0,0.7)" }}>
                  Shubham
                </h1>
                <div className="flex items-center gap-2 my-2">
                  <div className="h-px w-16" style={{ background: "linear-gradient(to right,#D4AF37,transparent)" }} />
                  <FaHeart className="text-blush text-sm animate-pulse" />
                  <div className="h-px w-16" style={{ background: "linear-gradient(to left,#D4AF37,transparent)" }} />
                </div>
                <h1 className="font-vibes text-cream leading-none"
                  style={{ fontSize: "clamp(4.5rem,8vw,7.5rem)", textShadow: "0 4px 28px rgba(0,0,0,0.7)" }}>
                  Apurva
                </h1>
              </motion.div>

              {/* Info cards — bottom right */}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
                className="flex flex-col items-end gap-4">
                <div className="flex flex-col gap-3">
                  {[
                    { icon: FaCalendarAlt, label: "Wedding Date", main: "May 14, 2026", sub: "Thursday · 10:00 AM onwards" },
                    { icon: FaMapMarkerAlt, label: "Venue", main: "Swami Narayan Banquet Hall", sub: "Adgaon Naka, Vaishnavi Park, Nashik 422003" },
                  ].map(({ icon: Icon, label, main, sub }) => (
                    <div key={label} className="rounded-2xl px-5 py-3.5 border border-gold/20 shadow-xl text-right"
                      style={{ background: "rgba(8,4,2,0.55)", backdropFilter: "blur(18px)", minWidth: "260px" }}>
                      <div className="flex items-center justify-end gap-2 mb-1">
                        <span className="font-poppins text-gold/70 text-[9px] uppercase tracking-[0.2em]">{label}</span>
                        <Icon className="text-gold text-xs" />
                      </div>
                      <p className="font-playfair italic text-cream text-lg leading-tight">{main}</p>
                      <p className="font-poppins text-cream/50 text-xs mt-0.5">{sub}</p>
                    </div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 32px rgba(212,175,55,0.55)" }} whileTap={{ scale: 0.96 }}
                  onClick={scrollDown}
                  className="gold-shimmer text-white font-poppins font-semibold px-8 py-3 rounded-full shadow-xl text-xs tracking-[0.25em] uppercase">
                  View Invitation ✦
                </motion.button>
              </motion.div>
            </div>

            {/* Top label */}
            <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="absolute top-8 left-1/2 -translate-x-1/2 font-poppins text-gold/50 text-[9px] uppercase tracking-[0.5em] whitespace-nowrap">
              You are cordially invited
            </motion.p>
          </div>

          {/* Scroll cue */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20 md:hidden">
            <span className="font-poppins text-cream/25 text-[9px] tracking-[0.3em] uppercase">Scroll</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
              <FaChevronDown className="text-gold/30 text-base" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
