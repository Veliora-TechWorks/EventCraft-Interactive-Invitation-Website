"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import Hero from "../sections/Hero";
import EventsScratch from "../sections/EventsScratch";
import Timeline from "../sections/Timeline";
import Gallery from "../sections/Gallery";
import Venue from "../sections/Venue";
import RSVP from "../sections/RSVP";
import Footer from "../sections/Footer";
import Countdown from "../components/Countdown";

const MusicPlayer = dynamic(() => import("../components/MusicPlayer"), { ssr: false });
const Particles   = dynamic(() => import("../components/Particles"),   { ssr: false });

const Divider = () => <div className="section-divider mx-6 md:mx-20" />;

export default function Home() {
  const [opened, setOpened] = useState(false);
  const handleOpen = useCallback(() => setOpened(true), []);

  return (
    <main className="relative min-h-screen pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
      <Particles />
      {opened && <Navbar />}
      <Hero onOpen={handleOpen} />
      {opened && (
        <>
          <Divider />
          <EventsScratch />
          <Divider />
          <Timeline />
          <Divider />
          <Countdown />
          <Divider />
          <Gallery />
          <Divider />
          <Venue />
          <Divider />
          <RSVP />
          <Footer />
        </>
      )}
      <MusicPlayer autoPlay={opened} />
    </main>
  );
}
