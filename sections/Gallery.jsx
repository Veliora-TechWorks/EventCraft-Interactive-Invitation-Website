"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand, FaHeart } from "react-icons/fa";

const PHOTOS = [
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",  alt: "Couple Portrait",   label: "Us ♥" },
  { src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80",  alt: "Wedding Flowers",   label: "In Bloom" },
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80",  alt: "Couple Candid",     label: "Candid" },
  { src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80",  alt: "Wedding Rings",     label: "The Rings" },
  { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80",  alt: "Couple Walk",       label: "Together" },
  { src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&q=80",  alt: "Venue Decor",       label: "Decor" },
  { src: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=600&q=80",  alt: "Romantic Moment",   label: "Romance" },
  { src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80",  alt: "Wedding Ceremony",  label: "Ceremony" },
];

/* ── Lightbox ── */
function Lightbox({ lb, setLb }) {
  const prev = () => setLb(l => (l > 0 ? l - 1 : PHOTOS.length - 1));
  const next = () => setLb(l => (l < PHOTOS.length - 1 ? l + 1 : 0));

  return (
    <AnimatePresence>
      {lb !== null && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLb(null)}
        >
          <button className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={() => setLb(null)}><FaTimes /></button>
          <button className="absolute left-3 md:left-8 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={e => { e.stopPropagation(); prev(); }}><FaChevronLeft /></button>
          <motion.img key={lb}
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            src={PHOTOS[lb].src} alt={PHOTOS[lb].alt}
            className="max-h-[85vh] max-w-[90vw] rounded-2xl shadow-2xl object-contain"
            onClick={e => e.stopPropagation()} />
          <button className="absolute right-3 md:right-8 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={e => { e.stopPropagation(); next(); }}><FaChevronRight /></button>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <p className="font-poppins text-white/50 text-xs">{PHOTOS[lb].label} · {lb + 1} / {PHOTOS.length}</p>
            <div className="flex gap-1.5">
              {PHOTOS.map((_, i) => (
                <button key={i} onClick={e => { e.stopPropagation(); setLb(i); }}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === lb ? "bg-gold w-4" : "bg-white/30"}`} />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const Header = () => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
    className="text-center mb-10 px-4">
    <p className="font-poppins text-brown/60 uppercase tracking-widest text-xs mb-2">Memories</p>
    <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-brown mb-4">Our Gallery 📸</h2>
    <div className="flex items-center justify-center gap-3">
      <div className="h-px w-12 bg-gold/40" /><span className="text-gold">✦</span><div className="h-px w-12 bg-gold/40" />
    </div>
  </motion.div>
);

export default function Gallery() {
  const [lb, setLb] = useState(null);

  return (
    <section id="gallery" className="py-16 md:py-20">
      <Header />

      {/* ══ MOBILE (<md): full-width stacked cards with caption ══ */}
      <div className="md:hidden flex flex-col gap-3 px-4">
        {PHOTOS.map((p, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.05 }}
            className="relative overflow-hidden rounded-2xl cursor-pointer group shadow-md"
            style={{ height: i === 0 ? 260 : 180 }}
            onClick={() => setLb(i)}
          >
            <img src={p.src} alt={p.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            {/* gradient overlay */}
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)" }} />
            {/* caption row */}
            <div className="absolute bottom-0 left-0 right-0 px-4 py-3 flex items-center justify-between">
              <div>
                <p className="font-poppins text-white/50 text-[9px] uppercase tracking-widest">Photo {i + 1}</p>
                <p className="font-playfair text-white text-sm font-semibold">{p.label}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <FaExpand className="text-white text-xs" />
              </div>
            </div>
            {/* heart on first */}
            {i === 0 && (
              <div className="absolute top-3 right-3">
                <FaHeart className="text-blush text-lg drop-shadow animate-pulse" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* ══ TABLET (md–lg): 2-col Pinterest masonry ══ */}
      <div className="hidden md:block lg:hidden px-6">
        <div className="columns-2 gap-4 space-y-4">
          {PHOTOS.map((p, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="break-inside-avoid relative overflow-hidden rounded-2xl cursor-pointer group shadow-lg mb-4"
              onClick={() => setLb(i)}
            >
              <img src={p.src} alt={p.alt}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ height: [260, 180, 200, 160, 220, 170, 190, 210][i] }} />
              {/* overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(to top, rgba(139,94,60,0.75) 0%, transparent 60%)" }} />
              <div className="absolute bottom-0 left-0 right-0 px-3 py-3 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="font-playfair text-white text-sm font-semibold">{p.label}</p>
                <p className="font-poppins text-white/60 text-[10px]">{p.alt}</p>
              </div>
              {/* expand icon */}
              <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <FaExpand className="text-white text-[10px]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ══ DESKTOP (lg+): bento grid ══ */}
      <div className="hidden lg:block px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-4 grid-rows-3 gap-4" style={{ height: 640 }}>

          {/* Large feature — col 1-2, row 1-2 */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.05 }}
            className="col-span-2 row-span-2 relative overflow-hidden rounded-3xl cursor-pointer group shadow-xl"
            onClick={() => setLb(0)}>
            <img src={PHOTOS[0].src} alt={PHOTOS[0].alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)" }} />
            <div className="absolute bottom-5 left-5">
              <p className="font-poppins text-white/60 text-[10px] uppercase tracking-widest mb-1">Featured</p>
              <p className="font-playfair text-white text-2xl font-semibold">{PHOTOS[0].label}</p>
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <FaExpand className="text-white text-sm" />
              </div>
            </div>
          </motion.div>

          {/* Col 3, row 1 */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="col-span-1 row-span-1 relative overflow-hidden rounded-2xl cursor-pointer group shadow-md"
            onClick={() => setLb(1)}>
            <img src={PHOTOS[1].src} alt={PHOTOS[1].alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <span className="font-poppins text-white text-xs">{PHOTOS[1].label}</span>
            </div>
          </motion.div>

          {/* Col 4, row 1 */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.15 }}
            className="col-span-1 row-span-1 relative overflow-hidden rounded-2xl cursor-pointer group shadow-md"
            onClick={() => setLb(2)}>
            <img src={PHOTOS[2].src} alt={PHOTOS[2].alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <span className="font-poppins text-white text-xs">{PHOTOS[2].label}</span>
            </div>
          </motion.div>

          {/* Col 3-4, row 2 (wide) */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="col-span-2 row-span-1 relative overflow-hidden rounded-2xl cursor-pointer group shadow-md"
            onClick={() => setLb(3)}>
            <img src={PHOTOS[3].src} alt={PHOTOS[3].alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)" }} />
            <div className="absolute bottom-3 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="font-playfair text-white text-base font-semibold">{PHOTOS[3].label}</p>
            </div>
          </motion.div>

          {/* Row 3 — 4 equal cells */}
          {PHOTOS.slice(4).map((p, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.25 + i * 0.05 }}
              className="col-span-1 row-span-1 relative overflow-hidden rounded-2xl cursor-pointer group shadow-md"
              onClick={() => setLb(i + 4)}>
              <img src={p.src} alt={p.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="font-poppins text-white text-xs">{p.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Lightbox lb={lb} setLb={setLb} />
    </section>
  );
}
