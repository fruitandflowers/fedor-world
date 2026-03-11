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

  // Portrait entrance — vertical slide-up (NAV spring)
  const portraitRef = useRef<HTMLDivElement>(null);
  const portraitInView = useInView(portraitRef, { once: true, amount: 0.3 });

  // Sand panorama scale reveal (STANDARD spring)
  const sandRef = useRef<HTMLDivElement>(null);
  const sandInView = useInView(sandRef, { once: true, amount: 0.5 });

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
        height: "1400px",
        background: "var(--gradient-hero-bg)",
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
          opacity: 0,
        }}
      >
        <h1
          className="text-display text-gradient-fade"
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

      {/* Portrait bottle — Framer: 276x461px container, absolute, centerX 50%, bottom 290px, z-index 1 */}
      {/* Inner image: 529x1017px (wider than container, overflows visible) */}
      <motion.div
        ref={portraitRef}
        className="absolute z-[1] overflow-visible"
        style={{
          width: "276px",
          height: "461px",
          bottom: "290px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        initial={{ y: 80 }}
        animate={portraitInView ? { y: 0 } : { y: 80 }}
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 60,
          mass: 1,
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
      </motion.div>

      {/* Sand/earth panorama — Framer: 1507x466px, absolute, bottom -31px, centerX 50%, z-index 1 */}
      <motion.div
        ref={sandRef}
        className="absolute z-[1]"
        style={{
          width: "1507px",
          height: "466px",
          bottom: "-31px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        initial={{ scale: 0.9 }}
        animate={sandInView ? { scale: 1 } : { scale: 0.9 }}
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
          sizes="1507px"
        />
      </motion.div>
    </section>
  );
}
