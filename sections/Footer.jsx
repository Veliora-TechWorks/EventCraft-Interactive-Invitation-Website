"use client";
import { motion } from "framer-motion";
import { FaInstagram, FaFacebook, FaYoutube, FaHeart, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const SCHEDULE = [
  { date: "12 May", event: "Mehendi Ceremony", time: "6:30 PM", emoji: "🌿" },
  { date: "13 May", event: "Seemant Pujan",    time: "12:30 PM", emoji: "🪔" },
  { date: "13 May", event: "Haldi Ceremony",   time: "3:30 PM", emoji: "🌼" },
  { date: "13 May", event: "Sangeet Night",    time: "7:00 PM", emoji: "✨" },
  { date: "14 May", event: "Lagna — Wedding",  time: "10:25 AM", emoji: "💍" },
];

const SOCIALS = [
  { icon: FaInstagram, href: "#", label: "Instagram", color: "#E1306C" },
  { icon: FaFacebook,  href: "#", label: "Facebook",  color: "#1877F2" },
  { icon: FaYoutube,   href: "#", label: "YouTube",   color: "#FF0000" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">

      {/* ── Rich layered background ── */}
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, #1a0a04 0%, #2e1208 30%, #4a1e0e 60%, #1a0a04 100%)" }} />
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,175,55,0.18) 0%, transparent 70%)" }} />
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(229,152,155,0.12) 0%, transparent 60%)" }} />

      {/* ── Decorative top border ── */}
      <div className="relative h-1 gold-shimmer" />

      {/* ── Top ornament ── */}
      <div className="relative z-10 flex justify-center -mt-0 pt-12">
        <div className="flex items-center gap-4">
          <div className="h-px w-16 md:w-32" style={{ background: "linear-gradient(to right, transparent, #D4AF37)" }} />
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-10 h-10 rounded-full gold-shimmer flex items-center justify-center shadow-lg"
            style={{ boxShadow: "0 0 20px rgba(212,175,55,0.5)" }}
          >
            <FaHeart className="text-white text-sm" />
          </motion.div>
          <div className="h-px w-16 md:w-32" style={{ background: "linear-gradient(to left, transparent, #D4AF37)" }} />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">

        {/* ── Couple names ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-poppins text-gold/50 text-[10px] uppercase tracking-[0.4em] mb-3">
            Celebrating the union of
          </p>
          <h2 className="font-vibes text-cream leading-none mb-1"
            style={{ fontSize: "clamp(3rem, 10vw, 6rem)", textShadow: "0 0 40px rgba(212,175,55,0.3)" }}>
            Apurva
          </h2>
          <div className="flex items-center justify-center gap-3 my-2">
            <div className="h-px w-12 bg-gold/40" />
            <span className="text-gold/60 text-sm">✦</span>
            <div className="h-px w-12 bg-gold/40" />
          </div>
          <h2 className="font-vibes text-cream leading-none"
            style={{ fontSize: "clamp(3rem, 10vw, 6rem)", textShadow: "0 0 40px rgba(212,175,55,0.3)" }}>
            Shubham
          </h2>
          <p className="font-playfair italic text-gold/80 text-lg mt-4">May 14, 2026 · Nashik</p>
        </motion.div>

        {/* ── 3-column grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Col 1 — Event schedule */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-playfair text-gold text-lg mb-5 flex items-center gap-2">
              <span className="w-6 h-px bg-gold/40" /> Schedule
            </h4>
            <ul className="space-y-3">
              {SCHEDULE.map((s, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-base">{s.emoji}</span>
                  <div>
                    <p className="font-poppins text-cream/80 text-xs font-medium">{s.event}</p>
                    <p className="font-poppins text-cream/35 text-[10px]">{s.date} · {s.time}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Col 2 — Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center flex flex-col items-center justify-center"
          >
            {/* Decorative ring */}
            <div className="relative w-28 h-28 mb-5">
              <div className="absolute inset-0 rounded-full border border-gold/20" />
              <div className="absolute inset-2 rounded-full border border-gold/15" />
              <div className="absolute inset-4 rounded-full gold-shimmer opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl">💍</span>
              </div>
            </div>
            <p className="font-poppins text-cream/50 text-xs leading-relaxed max-w-[200px]">
              Thank you for being a part of our most cherished celebration. Your love and blessings mean everything to us.
            </p>
            <p className="font-vibes text-gold/70 text-2xl mt-4">With love & gratitude</p>
          </motion.div>

          {/* Col 3 — Contact */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:text-right"
          >
            <h4 className="font-playfair text-gold text-lg mb-5 flex items-center gap-2 md:justify-end">
              Contact <span className="w-6 h-px bg-gold/40" />
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+918805549435"
                  className="flex items-center gap-3 md:justify-end group">
                  <div className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center group-hover:border-gold transition-colors">
                    <FaPhone className="text-gold text-xs" />
                  </div>
                  <span className="font-poppins text-cream/60 text-xs group-hover:text-gold transition-colors">+91 88055 49435</span>
                </a>
              </li>
              <li>
                <a href="mailto:apurvaShubham2026@gmail.com"
                  className="flex items-center gap-3 md:justify-end group">
                  <div className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center group-hover:border-gold transition-colors">
                    <FaEnvelope className="text-gold text-xs" />
                  </div>
                  <span className="font-poppins text-cream/60 text-xs group-hover:text-gold transition-colors">apurvaShubham2026@gmail.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 md:justify-end">
                  <div className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center">
                    <FaMapMarkerAlt className="text-gold text-xs" />
                  </div>
                  <span className="font-poppins text-cream/60 text-xs">Nashik, Maharashtra</span>
                </div>
              </li>
            </ul>

            {/* Socials */}
            <div className="flex gap-3 mt-6 md:justify-end">
              {SOCIALS.map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.15, y: -3 }}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-cream/40 hover:text-white transition-colors"
                  style={{ "--hover-color": color }}
                >
                  <Icon className="text-sm" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-gold/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-poppins text-cream/20 text-[10px] tracking-widest uppercase">
            © 2026 Apurva & Shubham Wedding
          </p>
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <FaHeart key={i} className="text-blush text-[8px]" style={{ opacity: 0.4, animation: `pulse 2s ease-in-out ${i * 0.3}s infinite` }} />
            ))}
          </div>
          <p className="font-poppins text-cream/20 text-[10px] tracking-widest uppercase">
            Made with love · Pune
          </p>
        </div>
      </div>
    </footer>
  );
}
