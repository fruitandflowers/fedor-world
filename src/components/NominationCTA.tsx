"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function NominationCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
        },
      });

      if (line1Ref.current) {
        tl.fromTo(
          line1Ref.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
      }

      if (line2Ref.current) {
        tl.fromTo(
          line2Ref.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        );
      }

      if (buttonRef.current) {
        tl.fromTo(
          buttonRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.2"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="portal-section flex flex-col items-center justify-center px-6"
      data-theme="light"
      style={{ background: "#FFFAF5" }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1]"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          <span
            ref={line1Ref}
            className="block text-[#1A1A1A]"
            style={{ opacity: 0 }}
          >
            Every World Counts.
          </span>
          <span
            ref={line2Ref}
            className="block text-[#AB1357] mt-2"
            style={{ opacity: 0 }}
          >
            Add Yours.
          </span>
        </h2>

        <a
          ref={buttonRef}
          href="https://form.typeform.com/to/y2NrRDGp"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-16 bg-[#AB1357] text-white px-12 py-5 text-base tracking-[0.15em] uppercase font-medium hover:bg-[#8a0f46] transition-colors"
          style={{
            fontFamily: "var(--font-ui)",
            opacity: 0,
          }}
        >
          Nominate Your World
        </a>
      </div>
    </section>
  );
}
