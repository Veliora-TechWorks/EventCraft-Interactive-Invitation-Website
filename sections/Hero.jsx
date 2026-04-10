"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const BG = "url('https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1920&q=90')";

export default function Hero({ onOpen }) {
  const [phase, setPhase]     = useState("envelope");
  const [mounted, setMounted] = useState(false);
  const onOpenRef = useRef(onOpen);
  useEffect(() => { onOpenRef.current = onOpen; }, [onOpen]);

  useEffect(() => setMounted(true), []);

  const open = () => {
    setPhase("opening");
    setTimeout(() => {
      setPhase("hero");
      onOpenRef.current?.();
    }, 1000);
  };
  const scrollDown = () => document.getElementById("events")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative min-h-screen overflow-hidden flex items-center justify-center">

      {/* ── BG image ── */}
      <div className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: BG }} />

      {/* overlays */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(8,4,2,.70) 0%,rgba(8,4,2,.22) 45%,rgba(8,4,2,.78) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 100% 90% at 50% 50%,transparent 30%,rgba(30,12,4,.55) 100%)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: "linear-gradient(to top,rgba(139,94,60,.3),transparent)" }} />

      {/* petals */}
      {mounted && PETALS.map((p, i) => (
        <motion.div key={i} className="absolute pointer-events-none text-blush/60 select-none"
          style={{ left: p.left, top: "-30px", fontSize: p.size }}
          animate={{ y: ["0vh","110vh"], rotate: [0,360], x: [0,25,-15,8,0] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "linear" }}>
          ✿
        </motion.div>
      ))}

      {/* corner ornaments */}
      {["top-4 left-4 border-t-2 border-l-2","top-4 right-4 border-t-2 border-r-2",
        "bottom-16 left-4 border-b-2 border-l-2 md:bottom-4","bottom-16 right-4 border-b-2 border-r-2 md:bottom-4"
      ].map((cls, i) => (
        <motion.div key={i} initial={{ opacity:0, scale:0.5 }} animate={{ opacity:1, scale:1 }}
          transition={{ delay: 0.3+i*0.1 }}
          className={`absolute w-7 h-7 sm:w-10 sm:h-10 border-gold/40 ${cls}`} />
      ))}

      <AnimatePresence mode="wait">

        {/* ══ ENVELOPE ══ */}
        {phase !== "hero" && (
          <motion.div key="env"
            initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
            exit={{ opacity:0, y:-80, scale:0.9 }} transition={{ duration:0.7 }}
            className="relative z-10 flex flex-col items-center gap-6 cursor-pointer select-none px-4"
            onClick={phase === "envelope" ? open : undefined}>

            <motion.p animate={{ opacity:[0.5,1,0.5] }} transition={{ duration:3, repeat:Infinity }}
              className="font-poppins text-gold/70 text-[10px] uppercase tracking-[0.4em]">
              You are cordially invited
            </motion.p>

            {/* envelope scales with screen */}
            <div className="relative w-64 h-44 sm:w-80 sm:h-56 md:w-[420px] md:h-[270px]">
              <div className="absolute inset-0 rounded-3xl blur-2xl opacity-25"
                style={{ background:"linear-gradient(135deg,#D4AF37,#E5989B)" }} />
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl"
                style={{ background:"linear-gradient(145deg,#FDF6EE,#F0D9C5)" }}>
                <div className="absolute inset-2 rounded-2xl border border-gold/20" />
                <div className="absolute top-0 left-0 right-0 h-1 gold-shimmer" />
              </div>
              <motion.div className="absolute top-0 left-0 right-0 z-10 overflow-hidden rounded-t-3xl"
                style={{ height:"50%", transformOrigin:"top center" }}
                animate={phase==="opening" ? { rotateX:-175, opacity:0 } : { rotateX:0, opacity:1 }}
                transition={{ duration:0.8 }}>
                <div className="w-full h-full"
                  style={{ background:"linear-gradient(160deg,#EDD5C0,#E2BBA8)", clipPath:"polygon(0 0,100% 0,50% 100%)" }} />
              </motion.div>
              <div className="absolute bottom-0 left-0 w-1/2 h-1/2 rounded-bl-3xl"
                style={{ background:"#E8CCBA", clipPath:"polygon(0 100%,100% 0,0 0)" }} />
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2 rounded-br-3xl"
                style={{ background:"#DFC0A8", clipPath:"polygon(100% 100%,0 0,100% 0)" }} />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <motion.div whileHover={{ scale:1.1, rotate:8 }} whileTap={{ scale:0.92 }}
                  animate={phase==="opening" ? { scale:[1,1.3,0], opacity:[1,1,0] } : {}}
                  className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full gold-shimmer flex flex-col items-center justify-center shadow-2xl"
                  style={{ boxShadow:"0 0 24px rgba(212,175,55,0.6)" }}>
                  <FaHeart className="text-white text-base md:text-xl" />
                  <span className="font-vibes text-white/90 text-xs leading-none mt-0.5">S & A</span>
                </motion.div>
              </div>
            </div>

            <motion.div animate={{ opacity:[0.4,1,0.4] }} transition={{ duration:2.2, repeat:Infinity }}
              className="flex flex-col items-center gap-1">
              <span className="font-poppins text-cream/60 text-[11px] tracking-[0.3em] uppercase">Tap to open</span>
              <motion.div animate={{ y:[0,6,0] }} transition={{ duration:1.5, repeat:Infinity }}>
                <FaChevronDown className="text-gold/50 text-sm" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* ══ HERO CONTENT ══ */}
        {phase === "hero" && (
          <motion.div key="hero" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.5 }}
            className="relative z-10 w-full">

            {/* ─────────────────────────────────────────
                MOBILE  (<md): fullscreen centered stack
            ───────────────────────────────────────── */}
            <div className="md:hidden flex flex-col items-center text-center px-6 pb-24">
              <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
                className="font-poppins text-gold/70 text-[9px] uppercase tracking-[0.4em] mb-5">
                Together with their families
              </motion.p>

              {/* Names in a decorative box */}
              <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.2, duration:0.8 }}
                className="relative mb-6">
                <div className="absolute -inset-3 rounded-3xl border border-gold/20" />
                <div className="absolute -inset-6 rounded-3xl border border-gold/10" />
                <h1 className="font-vibes text-cream leading-none" style={{ fontSize:"clamp(3.8rem,18vw,5.5rem)", textShadow:"0 4px 20px rgba(0,0,0,0.6)" }}>
                  Shubham
                </h1>
                <div className="flex items-center justify-center gap-2 my-2">
                  <div className="h-px w-8 bg-gold/50" />
                  <FaHeart className="text-blush text-sm animate-pulse" />
                  <div className="h-px w-8 bg-gold/50" />
                </div>
                <h1 className="font-vibes text-cream leading-none" style={{ fontSize:"clamp(3.8rem,18vw,5.5rem)", textShadow:"0 4px 20px rgba(0,0,0,0.6)" }}>
                  Apurva
                </h1>
              </motion.div>

              <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}
                className="font-playfair italic text-gold text-lg mb-1">May 14, 2026</motion.p>
              <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6 }}
                className="font-poppins text-cream/50 text-xs tracking-widest mb-6">PUNE, MAHARASHTRA</motion.p>

              {/* Info pills */}
              <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.7 }}
                className="flex gap-3 mb-8 flex-wrap justify-center">
                {[
                  { icon: FaCalendarAlt, text: "14 May 2026" },
                  { icon: FaMapMarkerAlt, text: "Pune" },
                ].map(({ icon: Icon, text }) => (
                  <span key={text} className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-gold/20 rounded-full px-4 py-1.5">
                    <Icon className="text-gold text-xs" />
                    <span className="font-poppins text-cream/70 text-xs">{text}</span>
                  </span>
                ))}
              </motion.div>

              <motion.button initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.9 }}
                whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                onClick={scrollDown}
                className="gold-shimmer text-white font-poppins font-semibold px-8 py-3 rounded-full shadow-xl text-xs tracking-[0.2em] uppercase">
                View Invitation ✦
              </motion.button>
            </div>

            {/* ─────────────────────────────────────────
                TABLET  (md–lg): diagonal split
                Left half = dark overlay + text
                Right half = image panel revealed
            ───────────────────────────────────────── */}
            <div className="hidden md:flex lg:hidden min-h-screen w-full">
              {/* Left text panel */}
              <div className="w-1/2 flex flex-col justify-center px-10 pt-20 pb-10"
                style={{ background:"linear-gradient(135deg,rgba(8,4,2,0.85) 0%,rgba(30,12,4,0.70) 100%)" }}>
                <motion.p initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.1 }}
                  className="font-poppins text-gold/60 text-[9px] uppercase tracking-[0.35em] mb-6">
                  Together with their families
                </motion.p>
                <motion.h1 initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.2, duration:0.8 }}
                  className="font-vibes text-cream leading-none mb-2"
                  style={{ fontSize:"clamp(3.5rem,8vw,5.5rem)", textShadow:"0 4px 24px rgba(0,0,0,0.5)" }}>
                  Shubham
                </motion.h1>
                <motion.div initial={{ opacity:0, scaleX:0 }} animate={{ opacity:1, scaleX:1 }} transition={{ delay:0.4 }}
                  className="flex items-center gap-2 mb-2">
                  <div className="h-px w-10" style={{ background:"linear-gradient(to right,transparent,#D4AF37)" }} />
                  <FaHeart className="text-blush text-sm animate-pulse" />
                  <div className="h-px w-10" style={{ background:"linear-gradient(to left,transparent,#D4AF37)" }} />
                </motion.div>
                <motion.h1 initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.5, duration:0.8 }}
                  className="font-vibes text-cream leading-none mb-6"
                  style={{ fontSize:"clamp(3.5rem,8vw,5.5rem)", textShadow:"0 4px 24px rgba(0,0,0,0.5)" }}>
                  Apurva
                </motion.h1>

                {/* Diagonal accent line */}
                <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ delay:0.65, duration:0.7 }}
                  className="h-px w-full mb-6" style={{ background:"linear-gradient(to right,#D4AF37,transparent)" }} />

                <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.7 }}
                  className="font-playfair italic text-gold text-xl mb-1">May 14, 2026</motion.p>
                <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.8 }}
                  className="font-poppins text-cream/50 text-xs tracking-widest mb-8">PUNE, MAHARASHTRA</motion.p>

                <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.9 }}
                  className="flex flex-col gap-3 mb-8">
                  {[
                    { icon: FaCalendarAlt, label:"Wedding Date", val:"14 May 2026 · Thursday" },
                    { icon: FaMapMarkerAlt, label:"Venue", val:"TBD — Pune, Maharashtra" },
                  ].map(({ icon:Icon, label, val }) => (
                    <div key={label} className="flex items-center gap-3 bg-white/8 rounded-xl px-4 py-2.5 border border-gold/15"
                      style={{ background:"rgba(255,255,255,0.07)", backdropFilter:"blur(10px)" }}>
                      <Icon className="text-gold text-sm flex-shrink-0" />
                      <div>
                        <p className="font-poppins text-gold/60 text-[9px] uppercase tracking-widest">{label}</p>
                        <p className="font-poppins text-cream/80 text-xs">{val}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>

                <motion.button initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.1 }}
                  whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                  onClick={scrollDown}
                  className="gold-shimmer text-white font-poppins font-semibold px-7 py-3 rounded-full shadow-xl text-xs tracking-[0.2em] uppercase self-start">
                  View Invitation ✦
                </motion.button>
              </div>

              {/* Right image panel — clipped diagonal */}
              <motion.div initial={{ opacity:0, x:60 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3, duration:1 }}
                className="w-1/2 relative overflow-hidden"
                style={{ clipPath:"polygon(8% 0,100% 0,100% 100%,0% 100%)" }}>
                <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage:BG }} />
                <div className="absolute inset-0" style={{ background:"linear-gradient(to right,rgba(8,4,2,0.5),transparent 60%)" }} />
                {/* Floating date badge */}
                <motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.8 }}
                  className="absolute bottom-12 right-8 glass rounded-2xl px-5 py-4 border border-gold/25 text-center"
                  style={{ background:"rgba(255,255,255,0.1)", backdropFilter:"blur(16px)" }}>
                  <p className="font-poppins text-gold/70 text-[9px] uppercase tracking-widest mb-1">Save the Date</p>
                  <p className="font-playfair text-cream text-2xl font-bold">14</p>
                  <p className="font-poppins text-cream/70 text-xs">May 2026</p>
                </motion.div>
              </motion.div>
            </div>

            {/* ─────────────────────────────────────────
                DESKTOP (lg+): two-column with info cards
            ───────────────────────────────────────── */}
            <div className="hidden lg:flex max-w-6xl mx-auto px-10 items-center justify-center gap-16 min-h-screen pt-20">
              {/* Left — names */}
              <div className="flex flex-col items-end text-right">
                <motion.p initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.1 }}
                  className="font-poppins text-gold/70 text-[10px] uppercase tracking-[0.35em] mb-5">
                  Together with their families
                </motion.p>
                <motion.h1 initial={{ opacity:0, x:-40 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.25, duration:0.8 }}
                  className="font-vibes text-cream leading-none drop-shadow-2xl"
                  style={{ fontSize:"clamp(5rem,9vw,8rem)", textShadow:"0 4px 24px rgba(0,0,0,0.5)" }}>
                  Shubham
                </motion.h1>
                <motion.div initial={{ opacity:0, scaleX:0 }} animate={{ opacity:1, scaleX:1 }} transition={{ delay:0.5 }}
                  className="flex items-center gap-2 my-3 justify-end">
                  <div className="h-px w-20" style={{ background:"linear-gradient(to right,transparent,#D4AF37)" }} />
                  <span className="text-gold/60 text-xs">✦</span>
                  <div className="h-px w-20" style={{ background:"linear-gradient(to left,transparent,#D4AF37)" }} />
                </motion.div>
                <motion.h1 initial={{ opacity:0, x:-40 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.6, duration:0.8 }}
                  className="font-vibes text-cream leading-none drop-shadow-2xl"
                  style={{ fontSize:"clamp(5rem,9vw,8rem)", textShadow:"0 4px 24px rgba(0,0,0,0.5)" }}>
                  Apurva
                </motion.h1>
              </div>

              {/* Center divider */}
              <motion.div initial={{ opacity:0, scaleY:0 }} animate={{ opacity:1, scaleY:1 }} transition={{ delay:0.75, duration:0.8 }}
                className="flex flex-col items-center gap-3" style={{ transformOrigin:"center" }}>
                <div className="w-px h-28" style={{ background:"linear-gradient(to bottom,transparent,#D4AF37)" }} />
                <div className="w-11 h-11 rounded-full gold-shimmer flex items-center justify-center shadow-lg"
                  style={{ boxShadow:"0 0 20px rgba(212,175,55,0.5)" }}>
                  <FaHeart className="text-white text-sm" />
                </div>
                <div className="w-px h-28" style={{ background:"linear-gradient(to top,transparent,#D4AF37)" }} />
              </motion.div>

              {/* Right — info cards */}
              <div className="flex flex-col items-start gap-5">
                {[
                  { icon:FaCalendarAlt, label:"Wedding Date", main:"May 14, 2026", sub:"Thursday · 10:00 AM onwards", delay:0.85 },
                  { icon:FaMapMarkerAlt, label:"Venue", main:"TBD — Pune", sub:"Pune, Maharashtra", delay:1.0 },
                ].map(({ icon:Icon, label, main, sub, delay }) => (
                  <motion.div key={label} initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} transition={{ delay, duration:0.7 }}
                    className="rounded-2xl px-6 py-4 border border-gold/20 shadow-xl min-w-[220px]"
                    style={{ background:"rgba(255,255,255,0.08)", backdropFilter:"blur(16px)" }}>
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="text-gold text-xs" />
                      <span className="font-poppins text-gold/70 text-[10px] uppercase tracking-[0.2em]">{label}</span>
                    </div>
                    <p className="font-playfair italic text-cream text-xl">{main}</p>
                    <p className="font-poppins text-cream/50 text-xs mt-1">{sub}</p>
                  </motion.div>
                ))}
                <motion.button initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.2 }}
                  whileHover={{ scale:1.05, boxShadow:"0 0 32px rgba(212,175,55,0.55)" }} whileTap={{ scale:0.96 }}
                  onClick={scrollDown}
                  className="gold-shimmer text-white font-poppins font-semibold px-8 py-3 rounded-full shadow-xl text-xs tracking-[0.25em] uppercase w-full">
                  View Invitation ✦
                </motion.button>
              </div>
            </div>

            {/* scroll cue — all screens */}
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.5 }}
              className="absolute bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
              <span className="font-poppins text-cream/25 text-[9px] tracking-[0.3em] uppercase">Scroll</span>
              <motion.div animate={{ y:[0,8,0] }} transition={{ duration:1.8, repeat:Infinity }}>
                <FaChevronDown className="text-gold/30 text-base" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
