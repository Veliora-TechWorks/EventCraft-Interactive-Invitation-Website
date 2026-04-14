"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import ScratchCard from "../components/ScratchCard";

const EVENTS = [
  { emoji:"🌿", name:"Mehendi Ceremony",  date:"12 May 2026 · Tuesday",   time:"5:00 PM – 10:00 PM",  venue:"Avalon Heights, Opp. Nirmala Convent High School, Chaitanya Nagar, Gangapur Road, Nashik 422013", message:"Let the henna paint our love story",      dresscode:"🎨 Mehendi greens & earthy tones",                                         theme:"Mehendi / Green Shades",    bg:"from-green-100 via-emerald-50 to-lime-100",   accent:"#4a7c59" },
  { emoji:"🪔", name:"Seemant Pujan",      date:"13 May 2026 · Wednesday", time:"9:00 AM – 12:00 PM",  venue:"Swami Narayan Banquet Hall, Adgaon Naka, Vaishnavi Park, Nashik 422003", message:"Bless us with your love & prayers",       dresscode:"🧡 Traditional Maharashtrian attire",                                      theme:"Maharashtrian Traditional", bg:"from-orange-100 via-amber-50 to-red-100",     accent:"#c2410c" },
  { emoji:"🌼", name:"Haldi Ceremony",     date:"13 May 2026 · Wednesday", time:"1:00 PM – 4:00 PM",   venue:"Swami Narayan Banquet Hall, Adgaon Naka, Vaishnavi Park, Nashik 422003", message:"Come, bless us with turmeric & love",     dresscode:"💛 Yellow & bright shades only",                                           theme:"Yellow Theme",              bg:"from-yellow-100 via-amber-50 to-yellow-200",  accent:"#d97706" },
  { emoji:"✨", name:"Sangeet Night",      date:"13 May 2026 · Wednesday", time:"7:00 PM – 11:00 PM",  venue:"Swami Narayan Banquet Hall, Adgaon Naka, Vaishnavi Park, Nashik 422003", message:"Dance, sing & celebrate with us!",        dresscode:"👗 Girls: Indo-western / Shimmery dress\n👔 Boys: Formals / Shimmery kurta", theme:"Indo-Western / Shimmery",   bg:"from-purple-100 via-fuchsia-50 to-pink-100",  accent:"#9333ea" },
  { emoji:"💍", name:"Lagna — Wedding",    date:"14 May 2026 · Thursday",  time:"10:00 AM – 2:00 PM",  venue:"Swami Narayan Banquet Hall, Adgaon Naka, Vaishnavi Park, Nashik 422003", message:"Two souls, one eternal bond 🙏",          dresscode:"👰 Girls: Lehenga / Banarasi saree\n🤵 Boys: Kurta (groom-side) / Formals", theme:"Grand Wedding",             bg:"from-rose-100 via-pink-50 to-red-100",        accent:"#be123c" },
];

const Header = () => (
  <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
    transition={{ duration:0.7 }} className="text-center mb-10 px-4">
    <p className="font-poppins text-brown/60 uppercase tracking-widest text-xs mb-2">Scratch to Reveal</p>
    <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-brown mb-3">Wedding Celebrations 🎟️</h2>
    <p className="font-poppins text-dark/50 text-sm max-w-sm mx-auto">
      Scratch each golden card to reveal your invitation & dress code.
    </p>
    <div className="flex items-center justify-center gap-3 mt-4">
      <div className="h-px w-12 bg-gold/40" />
      <FaHeart className="text-blush animate-pulse" />
      <div className="h-px w-12 bg-gold/40" />
    </div>
  </motion.div>
);

export default function EventsScratch() {
  return (
    <section id="events" className="py-16 md:py-20">
      <Header />

      {/* ══ MOBILE (<md): full-width vertical stack with step indicators ══ */}
      <div className="md:hidden px-4 pb-6">
        <div className="relative">
          {/* vertical connector line */}
          <div className="absolute left-5 top-0 bottom-0 w-px"
            style={{ background:"linear-gradient(to bottom,transparent,#D4AF37 10%,#E5989B 50%,#D4AF37 90%,transparent)" }} />

          <div className="flex flex-col gap-6">
            {EVENTS.map((ev, i) => (
              <motion.div key={ev.name}
                initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.07, duration:0.5 }}
                className="flex gap-4 items-start">
                {/* Step dot */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white z-10 mt-2"
                  style={{ background: ev.accent }}>
                  <span className="text-base">{ev.emoji}</span>
                </div>
                {/* Card */}
                <div className="flex-1">
                  <ScratchCard event={ev} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ TABLET (md–lg): 2-col grid with accent number badges ══ */}
      <div className="hidden md:block lg:hidden px-6">
        <div className="grid grid-cols-2 gap-5">
          {EVENTS.map((ev, i) => (
            <motion.div key={ev.name}
              initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:i*0.08, duration:0.5 }}
              className={i === EVENTS.length - 1 && EVENTS.length % 2 !== 0 ? "col-span-2 max-w-sm mx-auto w-full" : ""}>
              {/* Event number badge */}
              <div className="flex items-center gap-2 mb-2 px-1">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-poppins text-[10px] font-bold shadow"
                  style={{ background: ev.accent }}>{i + 1}</div>
                <p className="font-poppins text-xs text-dark/50 uppercase tracking-widest">{ev.theme}</p>
              </div>
              <ScratchCard event={ev} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ══ DESKTOP (lg+): bento — row1: 3 cards, row2: 2 wide cards ══ */}
      <div className="hidden lg:block max-w-6xl mx-auto px-8">

        {/* Row 1 — 3 equal cards */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {EVENTS.slice(0, 3).map((ev, i) => (
            <motion.div key={ev.name}
              initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:i*0.1, duration:0.5 }}>
              {/* Floating label above card */}
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-poppins text-xs font-bold shadow-md"
                  style={{ background: ev.accent }}>{i + 1}</div>
                <span className="font-poppins text-xs text-dark/50 uppercase tracking-widest">{ev.theme}</span>
              </div>
              <ScratchCard event={ev} />
            </motion.div>
          ))}
        </div>

        {/* Row 2 — 2 wide cards */}
        <div className="grid grid-cols-2 gap-6">
          {EVENTS.slice(3).map((ev, i) => (
            <motion.div key={ev.name}
              initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:(i+3)*0.1, duration:0.5 }}>
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-poppins text-xs font-bold shadow-md"
                  style={{ background: ev.accent }}>{i + 4}</div>
                <span className="font-poppins text-xs text-dark/50 uppercase tracking-widest">{ev.theme}</span>
              </div>
              <ScratchCard event={ev} compact />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
