"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // Heading entrance
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // COUNTER-SCROLL: Portrait drifts RIGHT as you scroll
      if (portraitRef.current) {
        gsap.to(portraitRef.current, {
          x: 80,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // COUNTER-SCROLL: Heading drifts LEFT as you scroll
      if (headingRef.current) {
        gsap.to(headingRef.current, {
          x: -60,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
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
      className="relative w-full overflow-hidden"
      style={{
        height: "1200px",
        backgroundColor: "hsl(0, 0%, 100%)",
        marginTop: "-31px",
      }}
    >
      {/* Portrait — Framer: 1244x1552px, absolute, centerX 79%, bottom -180px, z-index 1 */}
      {/* Adjusted: bottom -320px so head sits on white bg (not clipped by hero earth) */}
      {/* and shoulder extends naturally to bottom edge without harsh cut */}
      <div
        ref={portraitRef}
        className="absolute z-[1]"
        style={{
          width: "1244px",
          height: "1552px",
          bottom: "-320px",
          left: "79%",
          transform: "translateX(-50%)",
        }}
      >
        <Image
          src="/images/hero/fedor-portrait.png"
          alt="Fedor at podium"
          fill
          className="object-cover"
          sizes="1244px"
        />
      </div>

      {/* Heading — Framer: absolute, top 240px, left 89px, GAQIRE, z-index 1 */}
      <h2
        ref={headingRef}
        className="text-display absolute z-[1]"
        style={{
          top: "240px",
          left: "89px",
          fontSize: "clamp(50px, 5.5vw, 79px)",
          color: "rgb(7, 5, 66)",
          letterSpacing: "-4.83px",
          lineHeight: 0.9,
        }}
      >
        Creating a New
        <br />
        Chapter of Human
        <br />
        Evolution:
        <br />
        One World at a Time
      </h2>
    </section>
  );
}
