"use client";

import React, { useRef, useEffect } from "react";
import { ReactLenis } from "lenis/react"; 

import LoadingScreen from '@/components/loading';

import HeroSection from "@/components/hero";
import HowItWorksSection from "@/components/howItWorks";
import RulesSection from "@/components/rules";
import FAQSection from "@/components/faq";

export default function Home() {
  const lenisRef= useRef(null);

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;

    function raf(time) {

      lenis.raf(time);
      
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy?.();
  }, []);

  const lenisOptions = {
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.5,
  };

  return (
    <LoadingScreen>
      <ReactLenis root options={lenisOptions} ref={lenisRef}>
        <main className="animate-fade-in" style={{ animation: 'fade-in 1s ease-out forwards' }}>
          <HeroSection />
          <HowItWorksSection />
          <RulesSection />
          <FAQSection />
        </main>
      </ReactLenis>
    </LoadingScreen>
  );
}