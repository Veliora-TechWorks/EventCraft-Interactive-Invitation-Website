"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";

export default function MusicPlayer({ autoPlay = false }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("/music/Music.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
    return () => { audioRef.current?.pause(); };
  }, []);

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play().catch(() => {});
      setPlaying(true);
    }
  }, [autoPlay]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); } else { audioRef.current.play().catch(() => {}); }
    setPlaying(!playing);
  };

  if (!autoPlay) return null;

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-20 md:bottom-6 right-6 z-50 w-14 h-14 rounded-full gold-shimmer shadow-lg flex items-center justify-center"
      aria-label="Toggle music"
    >
      {playing ? (
        <div className="flex items-end gap-0.5 h-5">
          {[1, 2, 3].map((i) => (
            <motion.div key={i} className="w-1 bg-white rounded-full"
              animate={{ scaleY: [0.3, 1, 0.3] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
              style={{ height: "100%", transformOrigin: "bottom" }} />
          ))}
        </div>
      ) : (
        <FaPlay className="text-white text-lg ml-1" />
      )}
    </motion.button>
  );
}
