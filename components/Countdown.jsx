"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart } from "react-icons/fa";

const WEDDING_DATE = new Date("2026-05-14T10:00:00").getTime();

function pad(n) { return String(Math.max(0, n)).padStart(2, "0"); }

function getTimeLeft() {
  const diff = WEDDING_DATE - Date.now();
  if (diff <= 0) return { days:0, hours:0, minutes:0, seconds:0 };
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000)  / 60000),
    seconds: Math.floor((diff % 60000)    / 1000),
  };
}

function FlipTile({ value, label, large }) {
  return (
    <div className="flex flex-col items-center">
      <div className={`relative glass rounded-2xl shadow-xl overflow-hidden ${large ? "w-32 h-32 sm:w-36 sm:h-36" : "w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"}`}>
        <div className="absolute top-0 left-0 right-0 h-0.5 gold-shimmer" />
        <AnimatePresence mode="popLayout">
          <motion.div key={value}
            initial={{ y: large ? -40 : -28, opacity:0 }}
            animate={{ y:0, opacity:1 }}
            exit={{ y: large ? 40 : 28, opacity:0 }}
            transition={{ duration:0.3, ease:"easeOut" }}
            className="absolute inset-0 flex items-center justify-center">
            <span className="font-playfair font-bold"
              style={{
                fontSize: large ? "clamp(2.2rem,8vw,3rem)" : "clamp(1.4rem,4vw,2.2rem)",
                background:"linear-gradient(135deg,#c9a227,#f5e17a,#d4af37)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
              }}>
              {pad(value)}
            </span>
          </motion.div>
        </AnimatePresence>
        <div className="absolute top-1/2 left-3 right-3 h-px bg-gold/15" />
      </div>
      <p className={`font-poppins text-brown/60 uppercase tracking-[0.2em] mt-2 ${large ? "text-[11px]" : "text-[9px]"}`}>
        {label}
      </p>
    </div>
  );
}

export default function Countdown() {
  const [time, setTime] = useState({ days:0, hours:0, minutes:0, seconds:0 });

  useEffect(() => {
    setTime(getTimeLeft());
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label:"Days",    value:time.days    },
    { label:"Hours",   value:time.hours   },
    { label:"Minutes", value:time.minutes },
    { label:"Seconds", value:time.seconds },
  ];

  return (
    <section className="py-16 md:py-20 px-4 text-center relative">
      <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }} transition={{ duration:0.7 }}>
        <p className="font-poppins text-brown/60 uppercase tracking-[0.25em] text-xs mb-2">Counting Down To</p>
        <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-brown mb-2">The Big Day</h2>
        <p className="font-vibes text-2xl text-blush mb-10">May 14, 2026 ⏳</p>

        {/* ── MOBILE: 2×2 grid with large tiles ── */}
        <div className="sm:hidden grid grid-cols-2 gap-4 max-w-xs mx-auto">
          {units.map(({ label, value }, i) => (
            <motion.div key={label} initial={{ opacity:0, scale:0.8 }} whileInView={{ opacity:1, scale:1 }}
              viewport={{ once:true }} transition={{ delay:i*0.1 }}>
              <FlipTile value={value} label={label} large />
            </motion.div>
          ))}
        </div>

        {/* ── TABLET: row with decorative separators ── */}
        <div className="hidden sm:flex lg:hidden items-center justify-center gap-0">
          {units.map(({ label, value }, i) => (
            <div key={label} className="flex items-center">
              <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.1 }}>
                <FlipTile value={value} label={label} />
              </motion.div>
              {i < units.length - 1 && (
                <div className="flex flex-col items-center gap-1 mx-3">
                  <FaHeart className="text-blush/60 text-xs animate-pulse" />
                  <FaHeart className="text-blush/30 text-[8px]" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── DESKTOP: row with gaps ── */}
        <div className="hidden lg:flex items-start justify-center gap-6">
          {units.map(({ label, value }, i) => (
            <motion.div key={label} initial={{ opacity:0, scale:0.8 }} whileInView={{ opacity:1, scale:1 }}
              viewport={{ once:true }} transition={{ delay:i*0.1 }}>
              <FlipTile value={value} label={label} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
