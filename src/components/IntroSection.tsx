"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

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
        padding: "40px",
      }}
    >
      {/* Portrait — Framer: 1244x1552px, absolute, centerX 79%, bottom -180px, z-index 1 */}
      <div
        className="absolute z-[1]"
        style={{
          width: "1244px",
          height: "1552px",
          bottom: "-180px",
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
          fontSize: "clamp(40px, 4.8vw, 69px)",
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
