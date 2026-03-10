"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScaleReveal from "./ScaleReveal";

gsap.registerPlugin(ScrollTrigger);

export default function VoteFedorSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // Hashtag text reveal
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 40 },
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

      // "What's the Big Galactic Idea?" overlay text
      if (overlayTextRef.current) {
        gsap.fromTo(
          overlayTextRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: overlayTextRef.current,
              start: "top 85%",
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
      className="relative w-full"
      style={{ minHeight: "100vh" }}
    >
      {/* Canyon background with Scale Reveal */}
      <ScaleReveal
        className="absolute inset-0"
        stiffness={400}
        initialScale={0.9}
        threshold={0.3}
      >
        <Image
          src="/images/hero/canyon-wide.webp"
          alt="Golden canyon sky"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </ScaleReveal>

      {/* Fedor standing in canyon — centered, emerging from bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[2] pointer-events-none"
        style={{
          height: "75%",
          width: "auto",
          aspectRatio: "1559 / 1468",
        }}
      >
        <Image
          src="/images/hero/fedor-standing.png"
          alt="Fedor standing in canyon"
          fill
          className="object-contain object-bottom"
          sizes="80vw"
        />
      </div>

      {/* Hashtag text */}
      <div
        ref={textRef}
        className="absolute z-[3]"
        style={{
          top: "15%",
          left: "var(--section-padding-x)",
          opacity: 0,
        }}
      >
        <p
          className="text-display text-white"
          style={{
            fontSize: "var(--text-display-sm)",
            letterSpacing: "-3.15px",
            textShadow: "0 2px 40px rgba(0,0,0,0.5)",
          }}
        >
          #VOTEFEDOR2025
        </p>
      </div>

      {/* Dark overlay at bottom with "What's the Big Galactic Idea?" */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[4]"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)",
          padding: "var(--section-padding-y) var(--section-padding-x)",
          paddingTop: "clamp(160px, 20vw, 280px)",
        }}
      >
        <div
          ref={overlayTextRef}
          className="max-w-3xl mx-auto text-center"
          style={{ opacity: 0 }}
        >
          <h2
            className="text-display text-white mb-8"
            style={{
              fontSize: "var(--text-display-md)",
            }}
          >
            What&apos;s The Big Galactic Idea?
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body-stack)",
              fontSize: "var(--text-body-md)",
              color: "var(--color-text-muted)",
              letterSpacing: "-0.3px",
              lineHeight: 1.6,
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            You can invite me to lead transformation in your world. Together, our
            worlds weave into a planetary movement of abundance,
            interconnectedness, and universal compassion.
          </p>
        </div>
      </div>
    </section>
  );
}
