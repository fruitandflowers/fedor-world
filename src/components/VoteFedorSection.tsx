"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VoteFedorSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rightRockRef = useRef<HTMLDivElement>(null);
  const leftRockRef = useRef<HTMLDivElement>(null);
  const fedorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // ROCK OPENING ANIMATION — rocks slide apart as user scrolls, revealing Fedor
      // Right rock moves RIGHT
      if (rightRockRef.current) {
        gsap.fromTo(
          rightRockRef.current,
          { x: 0 },
          {
            x: 200,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "center center",
              scrub: true,
            },
          }
        );
      }

      // Left rock moves LEFT
      if (leftRockRef.current) {
        gsap.fromTo(
          leftRockRef.current,
          { x: 0 },
          {
            x: -200,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "center center",
              scrub: true,
            },
          }
        );
      }

      // Fedor scales up slightly as rocks open (emergence feeling)
      if (fedorRef.current) {
        gsap.fromTo(
          fedorRef.current,
          { scale: 0.85, opacity: 0.7 },
          {
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "center center",
              scrub: true,
            },
          }
        );
      }

      // Bottom text reveal
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
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
      className="relative w-full overflow-hidden"
      style={{ height: "1183px" }}
    >
      {/* Layer 0: Golden sky background — fills entire section */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-photo-3.webp"
          alt="Golden canyon sky"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* Layer 1: Right rock wall — Framer: 2123px wide, right: -1446px, z-index 2 */}
      <div
        ref={rightRockRef}
        className="absolute top-0 bottom-0 z-[2] pointer-events-none"
        style={{
          width: "2123px",
          right: "-1446px",
        }}
      >
        <Image
          src="/images/hero/hero-photo-1.webp"
          alt=""
          fill
          className="object-cover"
          sizes="2123px"
        />
      </div>

      {/* Layer 2: Left rock wall — Framer: 2478px wide, left: -1642px, z-index 2 */}
      <div
        ref={leftRockRef}
        className="absolute top-0 bottom-0 z-[2] pointer-events-none"
        style={{
          width: "2478px",
          left: "-1642px",
        }}
      >
        <Image
          src="/images/hero/hero-photo-2.webp"
          alt=""
          fill
          className="object-cover"
          sizes="2478px"
        />
      </div>

      {/* Layer 3: Fedor standing — Framer: 290x558px, centered, z-index 1 */}
      <div
        ref={fedorRef}
        className="absolute z-[1] pointer-events-none"
        style={{
          width: "290px",
          height: "558px",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Image
          src="/images/hero/fedor-standing.png"
          alt="Fedor standing"
          fill
          className="object-contain"
          sizes="290px"
        />
      </div>

      {/* Layer 4: Text overlay — #votefedor2025 at top */}
      <div
        className="absolute z-[3]"
        style={{
          top: "299px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <p
          className="text-display text-white whitespace-nowrap"
          style={{
            fontSize: "45px",
            letterSpacing: "-3.15px",
          }}
        >
          #votefedor2025
        </p>
      </div>

      {/* Layer 5: Bottom text area — "What's the Big Galactic Idea?" */}
      <div
        ref={textRef}
        className="absolute bottom-0 left-0 right-0 z-[3]"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)",
          paddingBottom: "134px",
          paddingTop: "200px",
        }}
      >
        <div className="text-center">
          <h2
            className="text-display text-white mb-8"
            style={{
              fontSize: "40px",
              letterSpacing: "-2.8px",
            }}
          >
            What&apos;s The Big Galactic Idea?
          </h2>
          <p
            className="mx-auto text-center"
            style={{
              fontFamily: "var(--font-accent-stack)",
              fontSize: "var(--text-body-md)",
              color: "var(--color-text-muted)",
              letterSpacing: "-0.3px",
              lineHeight: 1.6,
              maxWidth: "561px",
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
