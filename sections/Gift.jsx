"use client";
import { motion } from "framer-motion";
import { FaGift, FaCopy, FaCheck } from "react-icons/fa";
import { useState } from "react";

const UPI_ID = "shubhamapurva2025@upi";

export default function Gift() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 px-4 max-w-2xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="font-poppins text-brown/60 uppercase tracking-widest text-xs mb-2">Blessings Welcome</p>
        <h2 className="font-playfair text-4xl md:text-5xl text-brown mb-4">Gift 🎁</h2>
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="h-px w-16 bg-gold/40" />
          <span className="text-gold">✦</span>
          <div className="h-px w-16 bg-gold/40" />
        </div>

        <div className="glass rounded-3xl p-8 shadow-xl">
          <FaGift className="text-gold text-4xl mx-auto mb-4" />
          <p className="font-poppins text-dark/60 text-sm mb-6 max-w-sm mx-auto">
            Your presence is our greatest gift. If you wish to bless us digitally, you can use the UPI below.
          </p>

          {/* QR placeholder */}
          <div className="w-40 h-40 mx-auto mb-6 rounded-2xl bg-white shadow-inner flex items-center justify-center border-2 border-gold/30">
            <div className="text-center">
              <div className="grid grid-cols-3 gap-1 mb-2">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-sm"
                    style={{ background: i % 3 === 0 ? "#D4AF37" : i % 2 === 0 ? "#8B5E3C" : "#F8EDE3" }}
                  />
                ))}
              </div>
              <p className="font-poppins text-xs text-dark/40">Scan QR</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 bg-white/50 rounded-xl px-4 py-3 border border-gold/30 max-w-xs mx-auto">
            <span className="font-poppins text-sm text-dark font-medium">{UPI_ID}</span>
            <button onClick={copy} className="text-gold hover:text-brown transition-colors">
              {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
            </button>
          </div>
          {copied && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-poppins text-xs text-green-500 mt-2"
            >
              Copied to clipboard!
            </motion.p>
          )}
        </div>
      </motion.div>
    </section>
  );
}
