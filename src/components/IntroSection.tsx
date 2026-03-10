"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScaleReveal from "./ScaleReveal";

gsap.registerPlugin(ScrollTrigger);

export default function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      if (labelRef.current) {
        tl.fromTo(
          labelRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
        );
      }

      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.3"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: "#ffffff",
        padding: "var(--section-padding-y) var(--section-padding-x)",
      }}
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div>
          <p
            ref={labelRef}
            className="text-accent"
            style={{
              color: "var(--color-accent-magenta)",
              marginBottom: "24px",
              opacity: 0,
            }}
          >
            The Mission
          </p>
          <h2
            ref={headingRef}
            className="text-display"
            style={{
              fontSize: "clamp(40px, 5vw, 65px)",
              color: "rgb(7, 5, 66)",
              lineHeight: 0.95,
              opacity: 0,
            }}
          >
            CREATING A NEW CHAPTER OF HUMAN EVOLUTION: ONE WORLD AT A TIME
          </h2>
        </div>

        <div className="flex justify-end">
          <ScaleReveal
            className="relative w-full max-w-[500px] aspect-[884/1440]"
            stiffness={500}
            threshold={0.4}
          >
            <Image
              src="/images/hero/fedor-portrait.png"
              alt="Fedor at podium"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </ScaleReveal>
        </div>
      </div>
    </section>
  );
}
