"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactConfetti from "react-confetti";

const SCRATCH_THRESHOLD = 20;

export default function ScratchCard({ event, compact = false }) {
  const canvasRef  = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [percent,  setPercent]  = useState(0); // eslint-disable-line
  const [confetti, setConfetti] = useState(false);
  const drawing  = useRef(false);
  const lastPos  = useRef(null);

  const getPos = (e, canvas) => {
    const r = canvas.getBoundingClientRect();
    const sx = canvas.width  / r.width;
    const sy = canvas.height / r.height;
    const src = e.touches ? e.touches[0] : e;
    return { x: (src.clientX - r.left) * sx, y: (src.clientY - r.top) * sy };
  };

  const calcPercent = useCallback((ctx, w, h) => {
    const d = ctx.getImageData(0, 0, w, h).data;
    let t = 0;
    for (let i = 3; i < d.length; i += 4) if (d[i] < 128) t++;
    return Math.round((t / (w * h)) * 100);
  }, []);

  const doScratch = useCallback((ctx, x, y) => {
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fill();
    const canvas = canvasRef.current;
    const p = calcPercent(ctx, canvas.width, canvas.height);
    if (p >= SCRATCH_THRESHOLD && !revealed) {
      setRevealed(true);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setConfetti(true);
      setTimeout(() => setConfetti(false), 3200);
    }
  }, [calcPercent, revealed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    g.addColorStop(0,   "#6b1a2a");
    g.addColorStop(0.3, "#c0415a");
    g.addColorStop(0.6, "#e8748a");
    g.addColorStop(1,   "#b5294a");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // diagonal texture
    ctx.strokeStyle = "rgba(255,255,255,0.10)";
    ctx.lineWidth = 1;
    for (let i = -canvas.height; i < canvas.width + canvas.height; i += 10) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + canvas.height, canvas.height); ctx.stroke();
    }

    // emoji + hint
    const fs = Math.max(28, canvas.width * 0.13);
    ctx.font = `${fs}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(event.emoji, canvas.width / 2, canvas.height / 2 - fs * 0.8);

    ctx.fillStyle = "rgba(255,255,255,0.80)";
    ctx.font = `600 ${Math.max(11, canvas.width * 0.045)}px Poppins, sans-serif`;
    ctx.fillText("♥ Scratch to Reveal ♥", canvas.width / 2, canvas.height / 2 + fs * 0.5);
  }, [event.emoji]);

  const onStart = (e) => { e.preventDefault(); drawing.current = true; const canvas = canvasRef.current; const ctx = canvas.getContext("2d"); const p = getPos(e, canvas); lastPos.current = p; doScratch(ctx, p.x, p.y); };
  const onMove  = (e) => {
    e.preventDefault();
    if (!drawing.current) return;
    const canvas = canvasRef.current; const ctx = canvas.getContext("2d");
    const p = getPos(e, canvas);
    if (lastPos.current) {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath(); ctx.moveTo(lastPos.current.x, lastPos.current.y); ctx.lineTo(p.x, p.y);
      ctx.lineWidth = 60; ctx.lineCap = "round"; ctx.stroke();
    }
    lastPos.current = p;
    doScratch(ctx, p.x, p.y);
  };
  const onEnd = () => { drawing.current = false; lastPos.current = null; };

  const minH = compact ? 300 : 360;

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ minHeight: minH }}>
      {confetti && (
        <ReactConfetti width={400} height={minH} recycle={false} numberOfPieces={140}
          colors={["#D4AF37","#E5989B","#8B5E3C","#F8EDE3","#fff"]}
          style={{ position:"absolute", zIndex:50, pointerEvents:"none" }} />
      )}

      {/* ── Revealed content ── */}
      <div className={`absolute inset-0 flex flex-col bg-gradient-to-br ${event.bg}`}>
        {/* Coloured header band */}
        <div className="flex items-center gap-3 px-5 py-4" style={{ background: event.accent }}>
          <span className="text-3xl">{event.emoji}</span>
          <div>
            <p className="font-poppins text-white/70 text-[9px] uppercase tracking-[0.25em]">{event.theme}</p>
            <h3 className="font-playfair text-white text-lg font-bold leading-tight">{event.name}</h3>
          </div>
          {revealed && (
            <motion.div initial={{ scale:0 }} animate={{ scale:1 }}
              className="ml-auto bg-white/20 rounded-full px-2.5 py-0.5 font-poppins text-white text-[10px] font-semibold">
              ✓ Revealed
            </motion.div>
          )}
        </div>

        {/* Info rows */}
        <div className="flex-1 px-5 py-4 flex flex-col gap-2.5">
          {[
            { icon:"📅", label:"Date",  val: event.date  },
            { icon:"🕐", label:"Time",  val: event.time  },
            { icon:"📍", label:"Venue", val: event.venue },
          ].map(({ icon, label, val }) => (
            <div key={label} className="flex items-start gap-2.5">
              <span className="text-sm mt-0.5">{icon}</span>
              <div>
                <p className="font-poppins text-[9px] uppercase tracking-widest text-dark/40">{label}</p>
                <p className="font-poppins text-xs text-dark/80 font-medium">{val}</p>
              </div>
            </div>
          ))}

          {/* Dress code */}
          {event.dresscode && (
            <div className="mt-1 rounded-2xl px-3 py-2.5"
              style={{ background:`${event.accent}18`, border:`1px solid ${event.accent}35` }}>
              <p className="font-poppins text-[9px] uppercase tracking-widest font-semibold mb-1.5" style={{ color: event.accent }}>
                👗 Dress Code
              </p>
              {event.dresscode.split("\n").map((line, i) => (
                <p key={i} className="font-poppins text-[11px] text-dark/70 leading-snug">{line}</p>
              ))}
            </div>
          )}

          {/* Message */}
          <p className="font-vibes text-xl text-brown italic mt-auto pt-1">{event.message}</p>
        </div>
      </div>

      {/* ── Scratch overlay ── */}
      <AnimatePresence>
        {!revealed && (
          <motion.canvas ref={canvasRef} exit={{ opacity:0, transition:{ duration:0.4 } }}
            className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
            onMouseDown={onStart} onMouseMove={onMove} onMouseUp={onEnd} onMouseLeave={onEnd}
            onTouchStart={onStart} onTouchMove={onMove} onTouchEnd={onEnd} />
        )}
      </AnimatePresence>


    </div>
  );
}
