"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  // Portrait entrance — vertical slide-up (not scale)
  const portraitRef = useRef<HTMLDivElement>(null);
  const portraitInView = useInView(portraitRef, { once: true, amount: 0.3 });

  // Earth panorama scale reveal
  const earthRef = useRef<HTMLDivElement>(null);
  const earthInView = useInView(earthRef, { once: true, amount: 0.5 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text entrance — fade up
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.3 }
        );
      }

      // Subtitle entrance
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.8 }
        );
      }

      // Text parallax — moves up at 50% of scroll speed
      if (textRef.current && sectionRef.current) {
        gsap.to(textRef.current, {
          yPercent: -50,
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
      className="relative w-full overflow-hidden"
      style={{
        height: "clamp(100vh, 1400px, 1400px)",
        background: "var(--gradient-hero-bg)",
      }}
    >
      {/* Massive display text — BEHIND the portrait */}
      <div
        ref={textRef}
        className="absolute left-1/2 -translate-x-1/2 text-center z-[1] pointer-events-none"
        style={{
          top: "clamp(100px, 10vw, 160px)",
          opacity: 0,
        }}
      >
        <h1
          className="text-display whitespace-nowrap"
          style={{
            fontSize: "var(--text-hero)",
            color: "var(--color-hero-text)",
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

      {/* Subtitle — positioned below text */}
      <p
        ref={subtitleRef}
        className="absolute left-1/2 -translate-x-1/2 text-center z-[1] pointer-events-none text-accent"
        style={{
          top: "clamp(420px, 42vw, 600px)",
          color: "var(--color-text-muted)",
          opacity: 0,
        }}
      >
        A Creative Project by Fedor Sokolov
      </p>

      {/* Fedor portrait — IN FRONT of text, slides up 80px (spring) */}
      <motion.div
        ref={portraitRef}
        className="absolute left-1/2 -translate-x-1/2 z-[2]"
        initial={{ y: 80 }}
        animate={portraitInView ? { y: 0 } : { y: 80 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 60,
          mass: 1,
        }}
        style={{
          bottom: "clamp(120px, 12vw, 220px)",
          height: "clamp(380px, 55vw, 780px)",
          width: "auto",
          aspectRatio: "955 / 2674",
        }}
      >
        <Image
          src="/images/hero/hero-element.png"
          alt="Fedor Sokolov"
          fill
          className="object-contain"
          priority
        />
      </motion.div>

      {/* Earth panorama with Scale Reveal — scale 0.9 → 1.0 */}
      <div
        ref={earthRef}
        className="absolute bottom-0 left-0 w-full z-[3] overflow-hidden"
        style={{ height: "clamp(180px, 22vw, 320px)" }}
      >
        <motion.div
          className="w-full h-full"
          initial={{ scale: 0.9 }}
          animate={earthInView ? { scale: 1 } : { scale: 0.9 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 60,
            mass: 1,
          }}
        >
          <Image
            src="/images/hero/hero-bg-1.png"
            alt="Earth from space"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
