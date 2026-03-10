"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function LenisGSAPBridge() {
  useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    // Connect Lenis to GSAP ticker for smooth ScrollTrigger sync
    const update = (time: number) => {
      const lenisRoot = document.querySelector("[data-lenis-root]") as HTMLElement & { __lenis?: { raf: (t: number) => void } };
      if (lenisRoot?.__lenis) {
        lenisRoot.__lenis.raf(time * 1000);
      }
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return null;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      <LenisGSAPBridge />
      {children}
    </ReactLenis>
  );
}
