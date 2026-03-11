"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PoliciesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      if (labelRef.current) {
        tl.fromTo(
          labelRef.current,
          { opacity: 0, y: 15 },
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

      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        );
      }

      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" },
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
        backgroundColor: "#000000",
        padding: "var(--section-padding-y) var(--section-padding-x)",
        textAlign: "center",
      }}
    >
      <p
        ref={labelRef}
        className="text-accent"
        style={{
          color: "var(--color-accent-magenta)",
          marginBottom: "32px",
        }}
      >
        Explore the Vision
      </p>

      <h2
        ref={headingRef}
        className="text-display"
        style={{
          fontSize: "var(--text-display-xl)",
          color: "#ffffff",
          letterSpacing: "-2px",
          lineHeight: 1.2,
          marginBottom: "32px",
        }}
      >
        Policies And Worlds
        <br />
        IN ACTION:
      </h2>

      <p
        ref={subtitleRef}
        style={{
          fontFamily: "var(--font-body-stack)",
          fontSize: "var(--text-body-lg)",
          fontWeight: 400,
          color: "var(--color-text-muted)",
          letterSpacing: "-0.5px",
          lineHeight: 1.5,
          marginBottom: "48px",
        }}
      >
        Calling All Beings to Craft Our Collective Future
      </p>

      <Link
        ref={ctaRef}
        href="/policies"
        className="inline-flex items-center gap-3 text-white no-underline hover:brightness-110"
        style={{
          padding: "0 48px",
          height: "80px",
          background: "var(--gradient-cta-btn)",
          borderRadius: "var(--radius-pill)",
          fontFamily: "var(--font-body-stack)",
          fontSize: "var(--text-body-md)",
          fontWeight: 700,
          letterSpacing: "-0.3px",
        }}
      >
        All Policies & Worlds
        <span style={{ fontSize: "20px" }}>&#8599;</span>
      </Link>
    </section>
  );
}
