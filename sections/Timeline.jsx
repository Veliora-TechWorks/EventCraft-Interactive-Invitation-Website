"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaHeart, FaTimes } from "react-icons/fa";

const STORY = [
  { image: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800&q=80", alt: "First Meeting" },
  { image: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800&q=80", alt: "First Date" },
  { image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80", alt: "Through the Storm" },
  { image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80", alt: "The Proposal" },
  { image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80", alt: "Forever Begins" },
];

/* ── Lightbox ── */
function Lightbox({ index, onClose, onPrev, onNext, onDotClick }) {
  if (index === null) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
        onClick={onClose}>
        <button onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-10">
          <FaTimes />
        </button>
        <button onClick={e => { e.stopPropagation(); onPrev(); }}
          className="absolute left-3 md:left-8 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-10">
          <FaChevronLeft />
        </button>
        <motion.img key={index}
          initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          src={STORY[index].image.replace("w=800", "w=1600")}
          alt={STORY[index].alt}
          className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl object-contain"
          onClick={e => e.stopPropagation()} />
        <button onClick={e => { e.stopPropagation(); onNext(); }}
          className="absolute right-3 md:right-8 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-10">
          <FaChevronRight />
        </button>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {STORY.map((_, i) => (
            <button key={i} onClick={e => { e.stopPropagation(); onDotClick(i); }}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-gold" : "w-1.5 bg-white/30"}`} />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Mobile: Playing Card Stack ── */
function CardStack({ onOpen }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [dragging, setDragging] = useState(false);

  const swipeLeft = () => {
    if (current < STORY.length - 1) {
      setDirection(1);
      setCurrent(i => i + 1);
    }
  };
  const swipeRight = () => {
    if (current > 0) {
      setDirection(-1);
      setCurrent(i => i - 1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 px-6 py-4">

      {/* card stack area */}
      <div className="relative w-full" style={{ height: 420 }}>

        {/* background stacked cards (peek effect) */}
        {STORY.slice(current + 1, current + 3).map((item, offset) => (
          <div
            key={current + offset + 1}
            className="absolute inset-x-0 mx-auto rounded-3xl overflow-hidden shadow-xl"
            style={{
              width: `${100 - (offset + 1) * 6}%`,
              height: "100%",
              top: (offset + 1) * 10,
              left: "50%",
              transform: `translateX(-50%) rotate(${(offset + 1) * (offset % 2 === 0 ? 2 : -2)}deg)`,
              zIndex: 10 - offset,
              background: "#2a1204",
            }}>
            <img src={item.image} alt={item.alt} className="w-full h-full object-cover opacity-60" />
            {/* card back pattern */}
            <div className="absolute inset-0"
              style={{
                backgroundImage: "repeating-linear-gradient(45deg,rgba(212,175,55,0.06) 0px,rgba(212,175,55,0.06) 1px,transparent 1px,transparent 12px),repeating-linear-gradient(-45deg,rgba(212,175,55,0.06) 0px,rgba(212,175,55,0.06) 1px,transparent 1px,transparent 12px)",
              }} />
          </div>
        ))}

        {/* active top card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="absolute inset-x-0 mx-auto rounded-3xl overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing"
            style={{
              width: "100%",
              height: "100%",
              zIndex: 20,
              border: "3px solid rgba(212,175,55,0.35)",
              background: "#1a0e06",
            }}
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            exit={{
              opacity: 0,
              x: direction > 0 ? -320 : 320,
              rotate: direction > 0 ? -18 : 18,
              scale: 0.85,
            }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragStart={() => setDragging(true)}
            onDragEnd={(_, info) => {
              setDragging(false);
              if (info.offset.x < -60) swipeLeft();
              else if (info.offset.x > 60) swipeRight();
            }}
            onClick={() => { if (!dragging) onOpen(current); }}
          >
            {/* card corner suit — top-left */}
            <div className="absolute top-3 left-4 z-10 flex flex-col items-center leading-none">
              <span className="font-playfair text-gold text-lg font-bold">{current + 1}</span>
              <FaHeart className="text-blush text-xs mt-0.5" />
            </div>
            {/* card corner suit — bottom-right (rotated) */}
            <div className="absolute bottom-3 right-4 z-10 flex flex-col items-center leading-none rotate-180">
              <span className="font-playfair text-gold text-lg font-bold">{current + 1}</span>
              <FaHeart className="text-blush text-xs mt-0.5" />
            </div>

            {/* photo */}
            <img
              src={STORY[current].image}
              alt={STORY[current].alt}
              className="w-full h-full object-cover"
              draggable={false}
            />

            {/* gold frame overlay */}
            <div className="absolute inset-0 rounded-3xl"
              style={{ boxShadow: "inset 0 0 0 2px rgba(212,175,55,0.2), inset 0 0 60px rgba(0,0,0,0.35)" }} />

            {/* swipe hint on first card */}
            {current === 0 && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, delay: 1, repeat: 2 }}
                className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-4 py-1.5">
                <FaChevronLeft className="text-gold/70 text-xs" />
                <span className="font-poppins text-white/70 text-[10px] tracking-widest uppercase">swipe</span>
                <FaChevronRight className="text-gold/70 text-xs" />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* dot indicators */}
      <div className="flex items-center gap-2">
        {STORY.map((_, i) => (
          <button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-gold" : "w-1.5 bg-gold/25"}`} />
        ))}
      </div>

      {/* prev / next buttons */}
      <div className="flex items-center gap-6">
        <button onClick={swipeRight} disabled={current === 0}
          className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold/60 disabled:opacity-20 transition-opacity">
          <FaChevronLeft className="text-sm" />
        </button>
        <FaHeart className="text-blush animate-pulse" />
        <button onClick={swipeLeft} disabled={current === STORY.length - 1}
          className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold/60 disabled:opacity-20 transition-opacity">
          <FaChevronRight className="text-sm" />
        </button>
      </div>
    </div>
  );
}

/* ── Desktop: Horizontal Scrollable Playing Cards ── */
function DesktopScroll({ onOpen }) {
  const trackRef = useRef(null);
  const { scrollXProgress } = useScroll({ container: trackRef });
  const progressWidth = useTransform(scrollXProgress, [0, 1], ["0%", "100%"]);

  const scroll = (dir) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* arrows */}
      {[{ dir: -1, cls: "left-4" }, { dir: 1, cls: "right-4" }].map(({ dir, cls }) => (
        <button key={dir} onClick={() => scroll(dir)}
          className={`absolute top-1/2 -translate-y-1/2 z-20 ${cls} w-10 h-10 rounded-full gold-shimmer text-white shadow-lg flex items-center justify-center`}>
          {dir === -1 ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      ))}

      {/* track */}
      <div ref={trackRef}
        className="overflow-x-auto overflow-y-visible px-20"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        <div className="flex items-end gap-6" style={{ width: "max-content", padding: "40px 20px 40px" }}>
          {STORY.map((item, i) => {
            const rotate = [-4, 2, -2, 3, -3][i];
            const isCenter = i === 2;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -20, rotate: 0, scale: 1.05, zIndex: 30 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, type: "spring", stiffness: 120 }}
                className="relative flex-shrink-0 rounded-3xl overflow-hidden cursor-pointer shadow-2xl"
                style={{
                  width: isCenter ? 300 : 240,
                  height: isCenter ? 420 : 340,
                  rotate: `${rotate}deg`,
                  border: "3px solid rgba(212,175,55,0.3)",
                  background: "#1a0e06",
                  zIndex: isCenter ? 10 : 5,
                  transformOrigin: "bottom center",
                }}
                onClick={() => onOpen(i)}>

                {/* card corner — top-left */}
                <div className="absolute top-3 left-4 z-10 flex flex-col items-center leading-none">
                  <span className="font-playfair text-gold text-base font-bold">{i + 1}</span>
                  <FaHeart className="text-blush text-[10px] mt-0.5" />
                </div>
                {/* card corner — bottom-right */}
                <div className="absolute bottom-3 right-4 z-10 flex flex-col items-center leading-none rotate-180">
                  <span className="font-playfair text-gold text-base font-bold">{i + 1}</span>
                  <FaHeart className="text-blush text-[10px] mt-0.5" />
                </div>

                {/* photo */}
                <img src={item.image} alt={item.alt} className="w-full h-full object-cover" />

                {/* gold frame */}
                <div className="absolute inset-0"
                  style={{ boxShadow: "inset 0 0 0 2px rgba(212,175,55,0.18), inset 0 0 50px rgba(0,0,0,0.4)" }} />

                {/* center card badge */}
                {isCenter && (
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-gold/90 rounded-full px-3 py-0.5 z-10">
                    <span className="font-poppins text-white text-[9px] uppercase tracking-widest">♥ Featured</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* progress bar */}
      <div className="mx-auto mt-2 max-w-xs h-0.5 bg-gold/15 rounded-full overflow-hidden">
        <motion.div className="h-full rounded-full gold-shimmer" style={{ width: progressWidth }} />
      </div>

      {/* hearts */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {[...Array(5)].map((_, i) => (
          <motion.div key={i}
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}>
            <FaHeart className="text-blush text-sm" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Timeline() {
  const [lb, setLb] = useState(null);
  const prev = () => setLb(i => (i > 0 ? i - 1 : STORY.length - 1));
  const next = () => setLb(i => (i < STORY.length - 1 ? i + 1 : 0));

  return (
    <section id="story" className="py-16 overflow-hidden relative">
      <Lightbox index={lb} onClose={() => setLb(null)} onPrev={prev} onNext={next} onDotClick={setLb} />

      {/* mobile + tablet (<lg) */}
      <div className="lg:hidden">
        <CardStack onOpen={setLb} />
      </div>

      {/* desktop (lg+) */}
      <div className="hidden lg:block">
        <DesktopScroll onOpen={setLb} />
      </div>
    </section>
  );
}
