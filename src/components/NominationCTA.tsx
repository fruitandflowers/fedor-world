"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function NominationCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

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
              start: "top 60%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (buttonRef.current) {
        gsap.fromTo(
          buttonRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 50%",
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Lovey image — Framer: 537x812px, absolute, bottom -10px, left 895.5px, z-index 2 */}
      <div
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
          className="object-cover"
          sizes="537px"
        />
      </div>

      {/* Clouds section — Framer: 100% x 947px, black bg, z-index 1, overflow visible */}
      <div
        className="w-full relative z-[1]"
        style={{
          height: "947px",
          backgroundColor: "hsl(0, 0%, 0%)",
        }}
      >
        {/* "Every World Counts. Add Yours." — Framer: absolute, top 830px, centerX 35% */}
        <h2
          ref={headingRef}
          className="text-display text-white absolute"
          style={{
            top: "830px",
            left: "35%",
            transform: "translateX(-50%)",
            fontSize: "clamp(50px, 6.2vw, 90px)",
            letterSpacing: "-2.6px",
            lineHeight: 0.9,
          }}
        >
          Every World
          <br />
          Counts.
          <br />
          Add Yours.
        </h2>

        {/* "Nominate Your World" button — Framer: absolute, bottom -332px, left 285.5px */}
        <a
          ref={buttonRef}
          href="https://form.typeform.com/to/y2NrRDGp"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute z-[3] inline-flex items-center justify-center text-white no-underline hover:brightness-110"
          style={{
            bottom: "-332px",
            left: "285.5px",
            padding: "20px 100px",
            backgroundColor: "rgb(255, 36, 186)",
            borderRadius: "10px",
            fontFamily: "'DM Sans', var(--font-body-stack)",
            fontSize: "var(--text-body-md)",
            fontWeight: 600,
          }}
        >
          Nominate Your World
        </a>
      </div>
    </section>
  );
}
