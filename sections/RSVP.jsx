"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaCheck, FaUser, FaPhone, FaCommentAlt } from "react-icons/fa";

const INPUT = "w-full bg-white/60 border border-gold/30 rounded-xl px-4 py-3 font-poppins text-sm text-dark placeholder-dark/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition";

export default function RSVP() {
  const [form, setForm]       = useState({ name:"", phone:"", guests:"1", attending:"yes", message:"" });
  const [submitted, setSubmit] = useState(false);
  const [loading, setLoading]  = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    const prev = JSON.parse(localStorage.getItem("rsvps") || "[]");
    localStorage.setItem("rsvps", JSON.stringify([...prev, { ...form, ts: new Date().toISOString() }]));
    setLoading(false);
    setSubmit(true);
  };

  const Success = () => (
    <motion.div key="ok" initial={{ opacity:0, scale:0.85 }} animate={{ opacity:1, scale:1 }}
      className="flex flex-col items-center text-center py-8 px-4">
      <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:"spring", stiffness:200 }}
        className="w-20 h-20 rounded-full gold-shimmer flex items-center justify-center mb-5 shadow-xl">
        <FaCheck className="text-white text-2xl" />
      </motion.div>
      <h3 className="font-playfair text-2xl md:text-3xl text-brown mb-2">Thank You, {form.name}!</h3>
      <p className="font-poppins text-dark/60 text-sm mb-6">
        {form.attending === "yes" ? "We're so excited to celebrate with you! 🎉" : "We'll miss you, but thank you for letting us know. 💕"}
      </p>
      <button onClick={() => setSubmit(false)} className="font-poppins text-sm text-gold underline">Submit another response</button>
    </motion.div>
  );

  const Form = () => (
    <motion.form key="form" initial={{ opacity:0 }} animate={{ opacity:1 }} onSubmit={submit} className="space-y-4 p-1">
      {/* Name */}
      <div className="relative">
        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60 text-xs" />
        <input name="name" value={form.name} onChange={e => set("name", e.target.value)}
          placeholder="Your full name" required
          className={INPUT + " pl-10"} />
      </div>
      {/* Phone */}
      <div className="relative">
        <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60 text-xs" />
        <input name="phone" value={form.phone} onChange={e => set("phone", e.target.value)}
          placeholder="+91 98765 43210" type="tel"
          className={INPUT + " pl-10"} />
      </div>
      {/* Guests + Attending */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="font-poppins text-xs text-brown/70 font-medium block mb-1.5">Guests</label>
          <select value={form.guests} onChange={e => set("guests", e.target.value)} className={INPUT}>
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} {n===1?"Guest":"Guests"}</option>)}
          </select>
        </div>
        <div>
          <label className="font-poppins text-xs text-brown/70 font-medium block mb-1.5">Attending?</label>
          <div className="flex gap-2">
            {["yes","no"].map(v => (
              <button key={v} type="button" onClick={() => set("attending", v)}
                className={`flex-1 py-3 rounded-xl font-poppins text-xs font-semibold transition-all ${
                  form.attending === v ? "gold-shimmer text-white shadow" : "bg-white/60 border border-gold/30 text-dark/60"
                }`}>
                {v === "yes" ? "✓ Yes" : "✗ No"}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Message */}
      <div className="relative">
        <FaCommentAlt className="absolute left-4 top-4 text-gold/60 text-xs" />
        <textarea value={form.message} onChange={e => set("message", e.target.value)}
          placeholder="Share your wishes..." rows={3}
          className={INPUT + " pl-10 resize-none"} />
      </div>
      <motion.button type="submit" disabled={loading}
        whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
        className="w-full gold-shimmer text-white font-poppins font-semibold py-3.5 rounded-xl shadow-lg text-sm tracking-widest uppercase disabled:opacity-70">
        {loading
          ? <span className="flex items-center justify-center gap-2">
              <motion.div animate={{ rotate:360 }} transition={{ duration:1, repeat:Infinity, ease:"linear" }}
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
              Sending...
            </span>
          : "Send RSVP 💌"}
      </motion.button>
    </motion.form>
  );

  return (
    <section id="rsvp" className="py-16 md:py-20 px-4">
      <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
        className="text-center mb-10">
        <p className="font-poppins text-brown/60 uppercase tracking-widest text-xs mb-2">Kindly Reply</p>
        <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-brown mb-4">RSVP 📝</h2>
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gold/40" /><FaHeart className="text-blush" /><div className="h-px w-12 bg-gold/40" />
        </div>
      </motion.div>

      {/* ── MOBILE: bottom-sheet style card ── */}
      <div className="md:hidden max-w-sm mx-auto">
        <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          className="glass rounded-3xl rounded-b-none shadow-2xl p-6 border-t-4 border-gold/40">
          <AnimatePresence mode="wait">
            {submitted ? <Success /> : <Form />}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── TABLET: image left + form right ── */}
      <div className="hidden md:flex lg:hidden max-w-3xl mx-auto gap-0 rounded-3xl overflow-hidden shadow-2xl glass">
        {/* Left image panel */}
        <div className="w-2/5 relative">
          <img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&q=80"
            alt="RSVP" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background:"linear-gradient(to right,transparent,rgba(255,255,255,0.15))" }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
            style={{ background:"rgba(44,24,16,0.45)", backdropFilter:"blur(2px)" }}>
            <FaHeart className="text-gold text-2xl mb-3 animate-pulse" />
            <h3 className="font-vibes text-cream text-3xl mb-1">Join Us</h3>
            <p className="font-poppins text-cream/60 text-xs">May 12–14, 2026</p>
            <p className="font-poppins text-cream/60 text-xs">Pune, Maharashtra</p>
          </div>
        </div>
        {/* Right form */}
        <div className="w-3/5 p-7">
          <AnimatePresence mode="wait">
            {submitted ? <Success /> : <Form />}
          </AnimatePresence>
        </div>
      </div>

      {/* ── DESKTOP: wide centered two-column card ── */}
      <div className="hidden lg:block max-w-4xl mx-auto">
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          className="glass rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex">
            {/* Decorative left panel */}
            <div className="w-2/5 relative min-h-[500px]">
              <img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80"
                alt="RSVP" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background:"linear-gradient(135deg,rgba(44,24,16,0.7),rgba(139,94,60,0.5))" }} />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-full gold-shimmer flex items-center justify-center mb-4 shadow-xl">
                  <FaHeart className="text-white text-xl" />
                </div>
                <h3 className="font-vibes text-cream text-4xl mb-2">Join Us</h3>
                <div className="h-px w-16 bg-gold/40 mb-3" />
                <p className="font-poppins text-cream/70 text-xs leading-relaxed">
                  We would be honoured<br />by your presence at our<br />wedding celebrations
                </p>
                <p className="font-playfair italic text-gold text-sm mt-4">May 12–14, 2026</p>
                <p className="font-poppins text-cream/50 text-xs mt-1">Pune, Maharashtra</p>
              </div>
            </div>
            {/* Right form */}
            <div className="w-3/5 p-10">
              <h3 className="font-playfair text-2xl text-brown mb-6">Kindly Reply</h3>
              <AnimatePresence mode="wait">
                {submitted ? <Success /> : <Form />}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
