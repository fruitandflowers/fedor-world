"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView } from "framer-motion";
import ScaleReveal, { SPRING_FAST, SPRING_HEAVY } from "./ScaleReveal";

gsap.registerPlugin(ScrollTrigger);

export default function VoteFedorSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayTextRef = useRef<HTMLDivElement>(null);

  // Rock wall horizontal slides — HEAVY spring (animation #3 from MainPage.mjs)
  const leftRockRef = useRef<HTMLDivElement>(null);
  const leftRockInView = useInView(leftRockRef, { once: true, amount: 0.3 });
  const rightRockRef = useRef<HTMLDivElement>(null);
  const rightRockInView = useInView(rightRockRef, { once: true, amount: 0.3 });

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
      {/* Layer 1: Golden sky background — DOMINANT, fills entire section */}
      <ScaleReveal
        className="absolute inset-0"
        spring={SPRING_FAST}
        initialScale={0.9}
        threshold={0.3}
      >
        <Image
          src="/images/hero/hero-photo-3.webp"
          alt="Golden canyon sky"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </ScaleReveal>

      {/* Layer 2: Left rock wall — narrow frame edge only (15% width) */}
      <motion.div
        ref={leftRockRef}
        className="absolute left-0 top-0 bottom-0 z-[1] pointer-events-none"
        style={{ width: "18%" }}
        initial={{ x: -100 }}
        animate={leftRockInView ? { x: 0 } : { x: -100 }}
        transition={{
          type: "spring",
          stiffness: SPRING_HEAVY.stiffness,
          damping: SPRING_HEAVY.damping,
          mass: SPRING_HEAVY.mass,
        }}
      >
        <Image
          src="/images/hero/hero-photo-1.webp"
          alt=""
          fill
          className="object-cover object-right"
          sizes="18vw"
        />
      </motion.div>

      {/* Layer 3: Right rock wall — narrow frame edge only (15% width) */}
      <motion.div
        ref={rightRockRef}
        className="absolute right-0 top-0 bottom-0 z-[1] pointer-events-none"
        style={{ width: "18%" }}
        initial={{ x: 100 }}
        animate={rightRockInView ? { x: 0 } : { x: 100 }}
        transition={{
          type: "spring",
          stiffness: SPRING_HEAVY.stiffness,
          damping: SPRING_HEAVY.damping,
          mass: SPRING_HEAVY.mass,
        }}
      >
        <Image
          src="/images/hero/hero-photo-2.webp"
          alt=""
          fill
          className="object-cover object-left"
          sizes="18vw"
        />
      </motion.div>

      {/* Layer 4: Fedor standing figure — centered */}
      <div
        className="absolute inset-0 z-[2] flex items-end justify-center pointer-events-none"
      >
        <div className="relative" style={{ width: "clamp(200px, 25vw, 400px)", height: "75%" }}>
          <Image
            src="/images/hero/fedor-standing.png"
            alt="Fedor standing"
            fill
            className="object-contain object-bottom"
            sizes="400px"
          />
        </div>
      </div>

      {/* Hashtag text */}
      <div
        ref={textRef}
        className="absolute z-[3]"
        style={{
          top: "15%",
          left: "var(--section-padding-x)",
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
