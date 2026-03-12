"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const sandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // Text entrance — fade in
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.5, ease: "power2.out", delay: 0.3 }
        );
      }

      // 3-LAYER PARALLAX — the soul of the hero
      // As user scrolls, all three layers move UP but at different speeds:
      // Text: slowest (stays longer), Portrait: medium (rises through text), Earth: fastest (emerges from below)

      // Layer 1: Text moves up slowly (parallax factor ~30%)
      if (textRef.current) {
        gsap.to(textRef.current, {
          yPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Layer 2: Portrait moves up faster (parallax factor ~60%) — rises through the text
      if (portraitRef.current) {
        gsap.to(portraitRef.current, {
          y: -300,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Layer 3: Earth/sand — minimal movement to keep it flush at bottom
      if (sandRef.current) {
        gsap.to(sandRef.current, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{
        height: "1400px",
        background: "var(--gradient-hero-bg)",
        clipPath: "inset(0 0 -50px 0)",
      }}
    >
      {/* Title text — Framer: absolute, 1138px wide, centerX 50%, centerY 31%, z-index 1 */}
      <div
        ref={textRef}
        className="absolute z-[1] pointer-events-none text-center"
        style={{
          width: "1138px",
          maxWidth: "90vw",
          left: "50%",
          top: "31%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <h1
          className="text-display text-gradient-fade"
          style={{
            fontSize: "var(--text-hero)",
            lineHeight: 0.9,
            letterSpacing: "var(--ls-hero)",
          }}
        >
          THE FIRST
          <br />
          WORLD
          <br />
          PRESIDENT
        </h1>
      </div>

      {/* Portrait — Framer: 276x461px container, absolute, centerX 50%, bottom 290px, z-index 2 */}
      {/* Inner image: 529x1017px (wider than container, overflows visible) */}
      <div
        ref={portraitRef}
        className="absolute z-[2] overflow-visible"
        style={{
          width: "276px",
          height: "461px",
          bottom: "290px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <div
          className="absolute"
          style={{
            width: "529px",
            height: "1017px",
            top: "-336.5px",
            left: "-127.5px",
          }}
        >
          <Image
            src="/images/hero/hero-element.png"
            alt="Fedor Sokolov"
            fill
            className="object-contain"
            priority
            sizes="529px"
          />
        </div>
      </div>

      {/* Sand/earth panorama — Framer: 1507x466px, absolute, bottom -31px, centerX 50%, z-index 3 */}
      <div
        ref={sandRef}
        className="absolute z-[3]"
        style={{
          width: "max(1507px, 100vw)",
          height: "466px",
          bottom: "-31px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Image
          src="/images/hero/hero-bg-1.png"
          alt="Earth from space"
          fill
          className="object-cover"
          priority
          sizes="1507px"
        />
      </div>
    </section>
  );
}
