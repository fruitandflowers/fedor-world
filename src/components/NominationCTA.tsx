"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function NominationCTA() {
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
              end: "center center",
              scrub: true,
            },
          }
        );
      }

      // Heading + button scroll up with parallax (1.875x speed over 400px)
      // Heading passes through "above Fedor's head" ~70% in, button arrives at nav level at end
      const parallaxTargets = [headingRef.current, buttonRef.current].filter(Boolean);
      parallaxTargets.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 0 },
          {
            y: -750,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=400",
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
      {/* Lovey image — Framer: 537x812px, absolute, bottom=-10px, left=895.5px, z-index 2 */}
      <div
        ref={loveyRef}
        className="absolute z-[2]"
        style={{
          width: "537px",
          height: "812px",
          bottom: "-10px",
          left: "895.5px",
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

      {/* "Every World Counts. Add Yours." — scroll-linked parallax, ends above Fedor's head */}
      <h2
        ref={headingRef}
        className="text-display text-white absolute z-[1]"
        style={{
          top: "830px",
          left: "35%",
          transform: "translateX(-50%)",
          fontSize: "clamp(50px, 6.2vw, 90px)",
          letterSpacing: "-2.6px",
          lineHeight: 0.9,
        }}
      >
        Every World Counts.
        <br />
        Add Yours.
      </h2>

      {/* "Nominate Your World" button — scroll-linked parallax, ends at nav level */}
      <a
        ref={buttonRef}
        href="https://form.typeform.com/to/y2NrRDGp"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute z-[3] inline-flex items-center justify-center text-white no-underline hover:brightness-110"
        style={{
          top: "1215px",
          left: "285.5px",
          padding: "20px 100px",
          background: "rgb(255, 36, 186)",
          borderRadius: "10px",
          fontFamily: "'DM Sans', var(--font-body-stack)",
          fontSize: "var(--text-body-md)",
          fontWeight: 600,
        }}
      >
        Nominate Your World
      </a>
    </section>
  );
}
