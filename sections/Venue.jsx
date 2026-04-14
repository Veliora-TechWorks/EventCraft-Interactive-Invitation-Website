"use client";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaDirections, FaWhatsapp, FaCalendarAlt } from "react-icons/fa";

const MAP = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.5!2d73.7828!3d20.0059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeba1b4e5b1c7%3A0x1!2sSwami+Narayan+Banquet+Hall%2C+Adgaon+Naka%2C+Vaishnavi+Park%2C+Nashik%2C+Maharashtra+422003!5e0!3m2!1sen!2sin!4v1234567890";

export default function Venue() {
  const calendar = () => window.open(
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Shubham+%26+Apurva+Wedding&dates=20260514T043000Z/20260514T083000Z&details=Lagna+Ceremony&location=Swami+Narayan+Banquet+Hall%2C+Adgaon+Naka%2C+Vaishnavi+Park%2C+Nashik%2C+Maharashtra+422003",
    "_blank"
  );
  const whatsapp = () => window.open(
    "https://wa.me/919876543210?text=Hi!+I+would+like+to+RSVP+for+Shubham+%26+Apurva's+wedding+on+14+May+2026+%F0%9F%8E%89",
    "_blank"
  );

  const Buttons = ({ col }) => (
    <div className={`flex ${col ? "flex-col" : "flex-row flex-wrap"} gap-3`}>
      <motion.a whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
        href="https://maps.google.com/?q=Swami+Narayan+Banquet+Hall,Adgaon+Naka,Vaishnavi+Park,Nashik,Maharashtra+422003" target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 gold-shimmer text-white font-poppins text-xs font-semibold px-5 py-2.5 rounded-full shadow-md">
        <FaDirections /> Get Directions
      </motion.a>
      <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }} onClick={calendar}
        className="flex items-center justify-center gap-2 bg-brown text-cream font-poppins text-xs font-semibold px-5 py-2.5 rounded-full shadow-md">
        <FaCalendarAlt /> Add to Calendar
      </motion.button>
      <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }} onClick={whatsapp}
        className="flex items-center justify-center gap-2 bg-green-500 text-white font-poppins text-xs font-semibold px-5 py-2.5 rounded-full shadow-md">
        <FaWhatsapp /> WhatsApp RSVP
      </motion.button>
    </div>
  );

  const Info = () => (
    <div>
      <span className="font-poppins text-xs text-gold uppercase tracking-widest">Lagna — Wedding</span>
      <h3 className="font-playfair text-xl md:text-2xl text-brown mt-1 mb-2">Swami Narayan Banquet Hall</h3>
      <div className="flex items-start gap-2 text-dark/60 mb-4">
        <FaMapMarkerAlt className="text-gold mt-0.5 flex-shrink-0" />
        <p className="font-poppins text-sm">Adgaon Naka, Vaishnavi Park, Nashik, Maharashtra 422003</p>
      </div>
      <div className="flex flex-wrap gap-3 mb-1 text-xs font-poppins text-dark/50">
        <span className="bg-gold/10 border border-gold/20 rounded-full px-3 py-1">📅 14 May 2026</span>
        <span className="bg-gold/10 border border-gold/20 rounded-full px-3 py-1">🕙 10:00 AM onwards</span>
        <span className="bg-gold/10 border border-gold/20 rounded-full px-3 py-1">📍 Nashik, MH</span>
      </div>
    </div>
  );

  return (
    <section id="venue" className="py-16 md:py-20 px-4">
      <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
        className="text-center mb-10">
        <p className="font-poppins text-brown/60 uppercase tracking-widest text-xs mb-2">Find Us</p>
        <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-brown mb-4">Venue 📍</h2>
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gold/40" /><span className="text-gold">✦</span><div className="h-px w-12 bg-gold/40" />
        </div>
      </motion.div>

      {/* ── MOBILE: map on top, info + buttons below ── */}
      <div className="md:hidden max-w-sm mx-auto glass rounded-3xl overflow-hidden shadow-xl">
        <div className="h-52">
          <iframe src={MAP} width="100%" height="100%" style={{ border:0 }} allowFullScreen loading="lazy" title="Venue" />
        </div>
        <div className="p-5 space-y-4">
          <Info />
          <Buttons col />
        </div>
      </div>

      {/* ── TABLET: full-width map + info row below ── */}
      <div className="hidden md:block lg:hidden max-w-2xl mx-auto glass rounded-3xl overflow-hidden shadow-xl">
        <div className="h-64">
          <iframe src={MAP} width="100%" height="100%" style={{ border:0 }} allowFullScreen loading="lazy" title="Venue" />
        </div>
        <div className="p-6">
          <Info />
          <div className="mt-5">
            <Buttons col={false} />
          </div>
        </div>
      </div>

      {/* ── DESKTOP: side-by-side ── */}
      <div className="hidden lg:flex max-w-5xl mx-auto glass rounded-3xl overflow-hidden shadow-xl">
        <div className="w-3/5 h-96">
          <iframe src={MAP} width="100%" height="100%" style={{ border:0 }} allowFullScreen loading="lazy" title="Venue" />
        </div>
        <div className="w-2/5 p-8 flex flex-col justify-between">
          <Info />
          <Buttons col />
        </div>
      </div>
    </section>
  );
}
