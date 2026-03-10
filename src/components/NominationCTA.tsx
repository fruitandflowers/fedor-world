"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScaleReveal from "./ScaleReveal";

gsap.registerPlugin(ScrollTrigger);

export default function NominationCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });

      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
      }

      if (buttonRef.current) {
        tl.fromTo(
          buttonRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex flex-col items-center justify-center"
      style={{ minHeight: "100vh" }}
    >
      {/* Background landscape with Scale Reveal — deeper scale for drama */}
      <ScaleReveal
        className="absolute inset-0"
        initialScale={0.8}
        stiffness={400}
        threshold={0.3}
      >
        <div className="relative w-full h-full">
          <Image
            src="/images/misc/nomination-cta.png"
            alt="Cosmic landscape"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </ScaleReveal>

      {/* Dark overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h2
          ref={headingRef}
          className="text-display text-white mb-16"
          style={{
            fontSize: "var(--text-display-lg)",
            opacity: 0,
          }}
        >
          Every World Counts.
          <br />
          Add Yours.
        </h2>

        <a
          ref={buttonRef}
          href="https://form.typeform.com/to/y2NrRDGp"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center text-white no-underline hover:brightness-110 hover:scale-[1.02]"
          style={{
            width: "clamp(280px, 45vw, 700px)",
            height: "clamp(72px, 10vw, 160px)",
            background: "var(--color-accent-pink)",
            borderRadius: "10px",
            fontFamily: "var(--font-body-stack)",
            fontSize: "clamp(16px, 2.2vw, 26px)",
            fontWeight: 700,
            letterSpacing: "-0.3px",
            opacity: 0,
            transition: "transform 0.4s var(--ease-out), filter 0.4s ease",
          }}
        >
          Nominate Your World
        </a>
      </div>
    </section>
  );
}
