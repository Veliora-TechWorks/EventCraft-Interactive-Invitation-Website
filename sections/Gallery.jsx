"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand, FaPlay, FaPause } from "react-icons/fa";

// 01,02,05,06,07,08,09 = portrait | 03,04 = landscape
const PHOTOS = [
  { src: "/images/01.jpeg", alt: "Memory 1", label: "Us ♥",      portrait: true  },
  { src: "/images/02.jpeg", alt: "Memory 2", label: "Together",  portrait: true  },
  { src: "/images/03.jpeg", alt: "Memory 3", label: "Candid",    portrait: false },
  { src: "/images/04.jpeg", alt: "Memory 4", label: "Moments",   portrait: false },
  { src: "/images/05.jpeg", alt: "Memory 5", label: "Romance",   portrait: true  },
  { src: "/images/06.jpeg", alt: "Memory 6", label: "Forever",   portrait: true  },
  { src: "/images/07.jpeg", alt: "Memory 7", label: "Joy",       portrait: true  },
  { src: "/images/08.jpeg", alt: "Memory 8", label: "Love",      portrait: true  },
  { src: "/images/09.jpeg", alt: "Memory 9", label: "Always",    portrait: true  },
];

/* ── Lightbox ── */
function Lightbox({ lb, setLb, slideshow, setSlideshow }) {
  const prev = () => setLb(l => (l > 0 ? l - 1 : PHOTOS.length - 1));
  const next = () => setLb(l => (l < PHOTOS.length - 1 ? l + 1 : 0));

  useEffect(() => {
    if (!slideshow || lb === null) return;
    const id = setInterval(() => setLb(l => (l < PHOTOS.length - 1 ? l + 1 : 0)), 3000);
    return () => clearInterval(id);
  }, [slideshow, lb]);

  return (
    <AnimatePresence>
      {lb !== null && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => { setLb(null); setSlideshow(false); }}>
          <button className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
            onClick={() => { setLb(null); setSlideshow(false); }}><FaTimes /></button>
          <button className="absolute top-5 right-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
            onClick={e => { e.stopPropagation(); setSlideshow(s => !s); }}>
            {slideshow ? <FaPause className="text-sm" /> : <FaPlay className="text-sm" />}
          </button>
          <button className="absolute left-3 md:left-8 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
            onClick={e => { e.stopPropagation(); prev(); }}><FaChevronLeft /></button>
          <Image key={lb}
            src={PHOTOS[lb].src} alt={PHOTOS[lb].alt}
            width={1200} height={900}
            quality={85} sizes="90vw"
            className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl object-contain"
            onClick={e => e.stopPropagation()} />
          <button className="absolute right-3 md:right-8 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
            onClick={e => { e.stopPropagation(); next(); }}><FaChevronRight /></button>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <p className="font-poppins text-white/50 text-xs">{PHOTOS[lb].label} · {lb + 1} / {PHOTOS.length}</p>
            <div className="flex gap-1.5">
              {PHOTOS.map((_, i) => (
                <button key={i} onClick={e => { e.stopPropagation(); setLb(i); }}
                  className={`h-1.5 rounded-full transition-all ${i === lb ? "w-4 bg-gold" : "w-1.5 bg-white/30"}`} />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Cell({ photo, index, onClick, className, style }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`relative overflow-hidden rounded-2xl cursor-pointer group shadow-lg ${className}`}
      style={style}
      onClick={onClick}>
      <Image src={photo.src} alt={photo.alt}
        fill sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        quality={75}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoH BwYIDAoMCwsKCwsNCxAQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/wAAR CAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUEA//EACIQA AIBBAIDAQAAAAAAAAAAAAECAwQREiExBRNBUf/EABUBAQEAAAAAAAAAAAAAAA AAAEC/8QAFhEBAQEAAAAAAAAAAAAAAAAAABEB/9oADAMBAAIRAxEAPwCw1bnF a3lSGGNpJHOFVRkk1Wt7W4uZBHBE8jnoqjJqxoumXF7qUUUcTlN2WbHQD1 NFFAHbW2mWlnGI4IEjUdlGKKKKAP/Z" />
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(to top,rgba(0,0,0,0.6) 0%,transparent 50%)" }} />
      <div className="absolute bottom-3 left-3">
        <span className="font-playfair text-white text-sm font-semibold drop-shadow">{photo.label}</span>
      </div>
      <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <FaExpand className="text-white text-[10px]" />
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [lb, setLb] = useState(null);
  const [slideshow, setSlideshow] = useState(false);
  const P = PHOTOS;

  return (
    <section id="gallery" className="py-16 md:py-20">

      {/* header */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} className="text-center mb-10 px-4">
        <p className="font-poppins text-brown/60 uppercase tracking-widest text-xs mb-2">Memories</p>
        <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-brown mb-4">Our Gallery 📸</h2>
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-12 bg-gold/40" /><span className="text-gold">✦</span><div className="h-px w-12 bg-gold/40" />
        </div>
        <button
          onClick={() => { setLb(0); setSlideshow(true); }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gold/50 text-gold font-poppins text-xs uppercase tracking-widest hover:bg-gold/10 transition-colors">
          <FaPlay className="text-[10px]" /> Slideshow
        </button>
      </motion.div>

      {/* ══ MOBILE (<md) ══
          Row 1: [01 portrait] [02 portrait]          — 2 equal tall
          Row 2: [03 landscape full-width]             — 1 wide
          Row 3: [04 landscape full-width]             — 1 wide
          Row 4: [05 portrait] [06 portrait]           — 2 equal tall
          Row 5: [07 portrait] [08 portrait]           — 2 equal tall
          Row 6: [09 portrait full-width]              — 1 tall centered
      ══ */}
      <div className="md:hidden px-4 flex flex-col gap-3">

        {/* row 1: 01 + 02 portrait pair */}
        <div className="flex gap-3" style={{ height: 280 }}>
          <Cell photo={P[0]} index={0} onClick={() => setLb(0)} className="flex-1" />
          <Cell photo={P[1]} index={1} onClick={() => setLb(1)} className="flex-1" />
        </div>

        {/* row 2: 03 landscape full */}
        <Cell photo={P[2]} index={2} onClick={() => setLb(2)} className="w-full" style={{ height: 200 }} />

        {/* row 3: 04 landscape full */}
        <Cell photo={P[3]} index={3} onClick={() => setLb(3)} className="w-full" style={{ height: 200 }} />

        {/* row 4: 05 + 06 portrait pair */}
        <div className="flex gap-3" style={{ height: 280 }}>
          <Cell photo={P[4]} index={4} onClick={() => setLb(4)} className="flex-1" />
          <Cell photo={P[5]} index={5} onClick={() => setLb(5)} className="flex-1" />
        </div>

        {/* row 5: 07 + 08 portrait pair */}
        <div className="flex gap-3" style={{ height: 280 }}>
          <Cell photo={P[6]} index={6} onClick={() => setLb(6)} className="flex-1" />
          <Cell photo={P[7]} index={7} onClick={() => setLb(7)} className="flex-1" />
        </div>

        {/* row 6: 09 portrait full */}
        <Cell photo={P[8]} index={8} onClick={() => setLb(8)} className="w-full" style={{ height: 320 }} />
      </div>

      {/* ══ TABLET (md–lg) ══
          Row 1: [01 portrait 33%] [02 portrait 33%] [03 landscape 34% — 2 rows tall]
                 [04 landscape spans full row 2]
          Row 2: [04 landscape full]
          Row 3: [05 portrait] [06 portrait] [07 portrait]  — 3 equal
          Row 4: [08 portrait 40%] [09 portrait 60%]        — 2 unequal
      ══ */}
      <div className="hidden md:flex lg:hidden flex-col gap-4 px-6">

        {/* row 1: 01 + 02 portrait + 03 landscape */}
        <div className="flex gap-4" style={{ height: 300 }}>
          <Cell photo={P[0]} index={0} onClick={() => setLb(0)} style={{ width: "32%" }} />
          <Cell photo={P[1]} index={1} onClick={() => setLb(1)} style={{ width: "32%" }} />
          <Cell photo={P[2]} index={2} onClick={() => setLb(2)} className="flex-1" />
        </div>

        {/* row 2: 04 landscape full */}
        <Cell photo={P[3]} index={3} onClick={() => setLb(3)} className="w-full" style={{ height: 220 }} />

        {/* row 3: 05 + 06 + 07 portrait trio */}
        <div className="flex gap-4" style={{ height: 300 }}>
          <Cell photo={P[4]} index={4} onClick={() => setLb(4)} className="flex-1" />
          <Cell photo={P[5]} index={5} onClick={() => setLb(5)} className="flex-1" />
          <Cell photo={P[6]} index={6} onClick={() => setLb(6)} className="flex-1" />
        </div>

        {/* row 4: 08 + 09 portrait unequal */}
        <div className="flex gap-4" style={{ height: 300 }}>
          <Cell photo={P[7]} index={7} onClick={() => setLb(7)} style={{ width: "42%" }} />
          <Cell photo={P[8]} index={8} onClick={() => setLb(8)} className="flex-1" />
        </div>
      </div>

      {/* ══ DESKTOP (lg+) ══
          Bento grid 4-col × 3-row, height 680px
          [01 portrait  col1 row1-2] [02 portrait col2 row1] [03 landscape col3-4 row1]
                                     [04 landscape col2-3 row2] [06 portrait col4 row2]
          [05 portrait col1 row3] [07 portrait col2 row3] [08 portrait col3 row3] [09 portrait col4 row3]
      ══ */}
      <div className="hidden lg:block px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-4 gap-4" style={{ gridTemplateRows: "280px 220px 240px" }}>

          {/* 01 — col1, row 1-2 tall */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.05 }}
            className="col-span-1 row-span-2 relative overflow-hidden rounded-3xl cursor-pointer group shadow-xl"
            onClick={() => setLb(0)}>
          <Image src={P[0].src} alt={P[0].alt}
            fill sizes="25vw" quality={75}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoH BwYIDAoMCwsKCwsNCxAQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/wAAR CAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUEA//EACIQA AIBBAIDAQAAAAAAAAAAAAECAwQREiExBRNBUf/EABUBAQEAAAAAAAAAAAAAAA AAAEC/8QAFhEBAQEAAAAAAAAAAAAAAAAAABEB/9oADAMBAAIRAxEAPwCw1bnF a3lSGGNpJHOFVRkk1Wt7W4uZBHBE8jnoqjJqxoumXF7qUUUcTlN2WbHQD1 NFFAHbW2mWlnGI4IEjUdlGKKKKAP/Z" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(0,0,0,0.6) 0%,transparent 50%)" }} />
            <div className="absolute bottom-5 left-4">
              <p className="font-poppins text-white/60 text-[9px] uppercase tracking-widest mb-0.5">Featured</p>
              <p className="font-playfair text-white text-xl font-semibold">{P[0].label}</p>
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <FaExpand className="text-white text-xs" />
              </div>
            </div>
          </motion.div>

          {/* 02 — col2, row1 portrait */}
          <Cell photo={P[1]} index={1} onClick={() => setLb(1)} className="col-span-1 row-span-1" />

          {/* 03 — col3-4, row1 landscape wide */}
          <Cell photo={P[2]} index={2} onClick={() => setLb(2)} className="col-span-2 row-span-1" />

          {/* 04 — col2-3, row2 landscape */}
          <Cell photo={P[3]} index={3} onClick={() => setLb(3)} className="col-span-2 row-span-1" />

          {/* 06 — col4, row2 portrait */}
          <Cell photo={P[5]} index={5} onClick={() => setLb(5)} className="col-span-1 row-span-1" />

          {/* 05, 07, 08, 09 — row3 four equal portraits */}
          {[P[4], P[6], P[7], P[8]].map((p, i) => (
            <Cell key={i} photo={p} index={i + 6} onClick={() => setLb([4,6,7,8][i])} className="col-span-1 row-span-1" />
          ))}
        </div>
      </div>

      <Lightbox lb={lb} setLb={setLb} slideshow={slideshow} setSlideshow={setSlideshow} />
    </section>
  );
}
