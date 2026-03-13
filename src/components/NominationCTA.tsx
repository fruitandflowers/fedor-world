"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

export default function NominationCTA() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const loveyRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // Subtle parallax on Lovey — rises slightly as section scrolls in
      if (loveyRef.current) {
        gsap.fromTo(
          loveyRef.current,
          { y: 40 },
          {
            y: -20,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // Heading + button: ~2x scroll speed parallax
      // Range: "top bottom" to "top top" = animation completes when section top hits viewport top
      // This way at 100% scroll (section top at viewport top), heading is at 130px and button at ~580px
      // Matching the original's "hero state" where both are visible
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const parallaxDistance = isMobile ? -350 : -700;

      const textTargets = [headingRef.current, buttonRef.current].filter(Boolean);
      textTargets.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 0 },
          {
            y: parallaxDistance,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{
        height: "947px",
        backgroundColor: "hsl(0, 0%, 0%)",
        overflow: "visible",
        zIndex: 1,
      }}
    >
      {/* Lovey image — Framer: 537x812px, absolute, bottom=-10px, left=895.5px, z-index 2
          Lovey bridges into the Spotify section below — same pattern as intro portrait
          Hidden on mobile (would be off-screen) */}
      <div
        ref={loveyRef}
        className="absolute z-[2]"
        style={{
          width: isMobile ? "300px" : "537px",
          height: isMobile ? "454px" : "812px",
          bottom: isMobile ? "-10px" : "-10px",
          left: isMobile ? "50%" : "895.5px",
          transform: isMobile ? "translateX(-50%)" : undefined,
        }}
      >
        <Image
          src="/images/hero/lovey.png"
          alt=""
          fill
          className="object-contain"
          sizes="537px"
        />
      </div>

      {/* Clouds wrapper — matches Framer structure: 100% x 947px black bg, overflow visible
          Heading and button are inside this, positioned near/below bottom, scroll parallax moves them up */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ overflow: "visible" }}
      >
        {/* "Every World Counts. Add Yours." — starts at top:830px (near bottom of 947px section),
            scroll parallax moves it up into the viewport as you scroll through the section */}
        <h2
          ref={headingRef}
          className="text-display text-white absolute"
          style={{
            top: "830px",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "clamp(36px, 6.2vw, 90px)",
            letterSpacing: "-2.6px",
            lineHeight: 0.9,
            textAlign: "center",
            width: "max-content",
            maxWidth: "90vw",
          }}
        >
          Every World Counts.
          <br />
          Add Yours.
        </h2>

        {/* "Nominate Your World" button — starts at bottom:-332px of the Clouds wrapper (below the section),
            scroll parallax moves it up to appear below the heading */}
        <a
          ref={buttonRef}
          href="https://form.typeform.com/to/y2NrRDGp"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inline-flex items-center justify-center text-white no-underline hover:brightness-110"
          style={{
            top: "1279px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "20px clamp(40px, 6.9vw, 100px)",
            background: "rgb(255, 36, 186)",
            borderRadius: "10px",
            fontFamily: "'DM Sans', var(--font-body-stack)",
            fontSize: "var(--text-body-md)",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          Nominate Your World
        </a>
      </div>
    </section>
  );
}
