"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaHeart, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const STORY = [
  {
    year: "2018",
    title: "First Meeting",
    desc: "Two strangers met at a college fest in Mumbai. A glance turned into a conversation that lasted all night.",
    image: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=600&q=80",
    accent: "#E5989B",
    tag: "Where it all began",
    rotate: -2,
    position: "top",
  },
  {
    year: "2019",
    title: "First Date",
    desc: "A coffee date at Marine Drive that turned into a sunset walk. We knew something special had begun.",
    image: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=600&q=80",
    accent: "#D4AF37",
    tag: "The spark ignited",
    rotate: 1.5,
    position: "bottom",
  },
  {
    year: "2021",
    title: "Through the Storm",
    desc: "The pandemic brought us closer. Late night calls, shared playlists, and virtual movie nights.",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=80",
    accent: "#8B5E3C",
    tag: "Love grew stronger",
    rotate: -1,
    position: "top",
  },
  {
    year: "2023",
    title: "The Proposal",
    desc: "Under the stars at Lonavala, with a ring and a heart full of promises, he asked — she said yes.",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&q=80",
    accent: "#D4AF37",
    tag: "She said YES!",
    rotate: 2,
    position: "bottom",
  },
  {
    year: "2026",
    title: "Forever Begins",
    desc: "And now, we invite you to witness the beginning of our forever. May 14, 2026.",
    image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80",
    accent: "#8B5E3C",
    tag: "The forever chapter",
    rotate: -1.5,
    position: "top",
  },
];

/* ── Polaroid card — desktop only ── */
function PolaroidCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: item.position === "top" ? -50 : 50, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: item.rotate }}
      whileHover={{ rotate: 0, scale: 1.06, zIndex: 20 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 90 }}
      className="relative w-52 flex-shrink-0 cursor-pointer"
      style={{ transformOrigin: "center center" }}
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-white group"
        style={{ boxShadow: `0 8px 30px ${item.accent}35, 0 2px 8px rgba(0,0,0,0.08)` }}>
        <div className="relative h-40 overflow-hidden">
          <img src={item.image} alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.45) 100%)" }} />
          <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full text-white font-poppins text-[10px] font-bold shadow-lg"
            style={{ background: item.accent }}>{item.year}</div>
          <p className="absolute bottom-2 left-3 font-poppins text-[9px] uppercase tracking-[0.15em] text-white/80">{item.tag}</p>
        </div>
        <div className="px-4 pt-3 pb-4">
          <h3 className="font-playfair text-base text-dark font-bold mb-1.5 leading-tight">{item.title}</h3>
          <p className="font-poppins text-[11px] text-dark/55 leading-relaxed">{item.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Vertical alternating card — mobile ── */
function VerticalCard({ item, index }) {
  const isLeft = index % 2 === 0;
  return (
    <div className="relative flex items-start">
      {/* Left side */}
      <div className="w-[calc(50%-20px)]">
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.08 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg mr-2"
            style={{ boxShadow: `0 4px 20px ${item.accent}30` }}>
            <div className="relative h-28 overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom,transparent 40%,rgba(0,0,0,0.5))" }} />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-white font-poppins text-[9px] font-bold"
                style={{ background: item.accent }}>{item.year}</div>
            </div>
            <div className="px-3 py-2.5">
              <h3 className="font-playfair text-sm text-dark font-bold leading-tight">{item.title}</h3>
              <p className="font-poppins text-[10px] text-dark/50 mt-1 leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Center dot */}
      <div className="flex flex-col items-center flex-shrink-0" style={{ width: 40 }}>
        <motion.div
          initial={{ scale: 0 }} whileInView={{ scale: 1 }}
          viewport={{ once: true }} transition={{ delay: index * 0.08 + 0.2, type: "spring" }}
          className="w-8 h-8 rounded-full flex items-center justify-center shadow-md border-2 border-white z-10"
          style={{ background: item.accent }}>
          <FaStar className="text-white text-[8px]" />
        </motion.div>
      </div>

      {/* Right side */}
      <div className="w-[calc(50%-20px)]">
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.08 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg ml-2"
            style={{ boxShadow: `0 4px 20px ${item.accent}30` }}>
            <div className="relative h-28 overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom,transparent 40%,rgba(0,0,0,0.5))" }} />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-white font-poppins text-[9px] font-bold"
                style={{ background: item.accent }}>{item.year}</div>
            </div>
            <div className="px-3 py-2.5">
              <h3 className="font-playfair text-sm text-dark font-bold leading-tight">{item.title}</h3>
              <p className="font-poppins text-[10px] text-dark/50 mt-1 leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ── Horizontal card — tablet ── */
function TabletCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.07 }}
      className="flex rounded-3xl overflow-hidden shadow-xl bg-white"
      style={{ boxShadow: `0 8px 32px ${item.accent}25` }}>
      <div className="relative w-44 flex-shrink-0">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right,transparent 60%,rgba(255,255,255,0.9))" }} />
        <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-white font-poppins text-[10px] font-bold shadow"
          style={{ background: item.accent }}>{item.year}</div>
      </div>
      <div className="flex-1 px-5 py-4 flex flex-col justify-center">
        <span className="font-poppins text-[9px] uppercase tracking-widest mb-1" style={{ color: item.accent }}>{item.tag}</span>
        <h3 className="font-playfair text-lg text-dark font-bold mb-2 leading-tight">{item.title}</h3>
        <p className="font-poppins text-xs text-dark/55 leading-relaxed">{item.desc}</p>
      </div>
      <div className="w-1 flex-shrink-0" style={{ background: item.accent }} />
    </motion.div>
  );
}

const Flourish = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }} className="text-center mt-12">
    <div className="inline-flex flex-col items-center gap-3">
      <div className="flex items-center gap-2">
        {[...Array(5)].map((_, i) => (
          <motion.div key={i} animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}>
            <FaHeart className="text-blush text-sm" />
          </motion.div>
        ))}
      </div>
      <p className="font-vibes text-2xl text-brown">…and the best chapter is yet to come</p>
    </div>
  </motion.div>
);

export default function Timeline() {
  const trackRef = useRef(null);
  const { scrollXProgress } = useScroll({ container: trackRef });
  const progressWidth = useTransform(scrollXProgress, [0, 1], ["0%", "100%"]);

  const scroll = (dir) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: dir * 280, behavior: "smooth" });
  };

  const Header = () => (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} className="text-center mb-12 px-4">
      <p className="font-poppins text-brown/60 uppercase tracking-[0.3em] text-xs mb-3">A tale of two hearts</p>
      <h2 className="font-playfair text-4xl md:text-5xl text-brown mb-2">Our Journey</h2>
      <p className="font-vibes text-3xl text-blush mb-6">written in the stars ✨</p>
      <div className="flex items-center justify-center gap-4">
        <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold/50" />
        <FaHeart className="text-blush text-lg animate-pulse" />
        <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold/50" />
      </div>
    </motion.div>
  );

  return (
    <section id="story" className="py-24 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 70%)" }} />

      <Header />

      {/* ══ MOBILE (<md): vertical alternating timeline ══ */}
      <div className="md:hidden px-4">
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, transparent, #D4AF37 8%, #E5989B 50%, #D4AF37 92%, transparent)" }} />
          <div className="flex flex-col gap-8">
            {STORY.map((item, i) => <VerticalCard key={i} item={item} index={i} />)}
          </div>
        </div>
        <Flourish />
      </div>

      {/* ══ TABLET (md–lg): stacked horizontal cards ══ */}
      <div className="hidden md:flex lg:hidden flex-col gap-5 px-8 max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-px flex-1" style={{ background: "linear-gradient(to right,transparent,#D4AF37)" }} />
          <FaHeart className="text-blush animate-pulse" />
          <div className="h-px flex-1" style={{ background: "linear-gradient(to left,transparent,#D4AF37)" }} />
        </div>
        {STORY.map((item, i) => <TabletCard key={i} item={item} index={i} />)}
        <Flourish />
      </div>

      {/* ══ DESKTOP (lg+): horizontal polaroid track ══ */}
      <div className="hidden lg:block">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-center font-poppins text-xs text-brown/40 tracking-widest mb-6 flex items-center justify-center gap-2">
          <FaChevronLeft className="text-gold/40" /> scroll to explore <FaChevronRight className="text-gold/40" />
        </motion.p>

        <div className="relative">
          {[{ dir: -1, side: "left-6", icon: <FaChevronLeft /> }, { dir: 1, side: "right-6", icon: <FaChevronRight /> }]
            .map(({ dir, side, icon }) => (
              <button key={dir} onClick={() => scroll(dir)}
                className={`absolute top-1/2 -translate-y-1/2 z-20 ${side} w-9 h-9 rounded-full gold-shimmer text-white shadow-lg flex items-center justify-center text-sm`}>
                {icon}
              </button>
            ))}

          <div ref={trackRef} className="overflow-x-auto overflow-y-visible scrollbar-hide px-24"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            <div className="relative flex items-center" style={{ minWidth: `${STORY.length * 240 + 120}px`, height: 480 }}>
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5"
                style={{ background: "linear-gradient(to right, transparent, #D4AF37 8%, #E5989B 50%, #D4AF37 92%, transparent)" }} />
              <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                className="absolute left-8 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full gold-shimmer flex items-center justify-center shadow-md z-10">
                <FaHeart className="text-white text-[10px]" />
              </motion.div>
              <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
                className="absolute right-8 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full gold-shimmer flex items-center justify-center shadow-md z-10">
                <FaHeart className="text-white text-[10px]" />
              </motion.div>

              {STORY.map((item, i) => {
                const isTop = item.position === "top";
                const leftPos = 80 + i * 240;
                return (
                  <div key={i} className="absolute flex flex-col items-center"
                    style={{ left: leftPos, top: "50%", transform: "translateY(-50%)" }}>
                    {isTop && <div style={{ marginBottom: 28 }}><PolaroidCard item={item} index={i} /></div>}
                    <div className="flex flex-col items-center">
                      {isTop && <div className="w-px bg-gradient-to-b from-transparent to-gold/60" style={{ height: 28 }} />}
                      <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                        transition={{ delay: i * 0.12 + 0.2, type: "spring" }}
                        className="w-5 h-5 rounded-full border-4 border-white shadow-lg z-10 flex items-center justify-center"
                        style={{ background: item.accent }}>
                        <FaStar className="text-white text-[6px]" />
                      </motion.div>
                      {!isTop && <div className="w-px bg-gradient-to-b from-gold/60 to-transparent" style={{ height: 28 }} />}
                    </div>
                    {!isTop && <div style={{ marginTop: 28 }}><PolaroidCard item={item} index={i} /></div>}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-xs h-0.5 bg-gold/15 rounded-full overflow-hidden">
            <motion.div className="h-full rounded-full gold-shimmer" style={{ width: progressWidth }} />
          </div>
        </div>
        <Flourish />
      </div>
    </section>
  );
}
