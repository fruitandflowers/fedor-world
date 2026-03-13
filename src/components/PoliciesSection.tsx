"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { policies } from "@/data/policies";

gsap.registerPlugin(ScrollTrigger);

export default function PoliciesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // L→R emerge animation on scroll (matches original's subtle horizontal reveal)
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, x: -60 },
          {
            opacity: 1,
            x: 0,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "top 30%",
              scrub: true,
            },
          }
        );
      }

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".policy-card");
        // Cards emerge from left offset into center as you scroll — scrub-linked
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, x: -60 - i * 5 },
            {
              opacity: 1,
              x: 0,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 95%",
                end: "top 60%",
                scrub: true,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: "rgb(0, 0, 0)",
        padding: "100px var(--section-padding-x)",
        overflow: "hidden",
      }}
    >
      {/* Content row — Framer: 1fr width, 521px height, centered */}
      <div
        ref={contentRef}
        className="flex items-center justify-center"
        style={{ minHeight: "clamp(300px, 36.2vw, 521px)" }}
      >
        <div
          className="flex flex-col items-center gap-[13px] text-center"
          style={{ width: "1277px", maxWidth: "100%" }}
        >
          <h2
            className="text-display text-white"
            style={{
              fontSize: "var(--text-display-xl)",
              letterSpacing: "-2px",
              lineHeight: 1,
              overflow: "visible",
            }}
          >
            Policies And Worlds
            <br />
            IN ACTION:
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body-stack)",
              fontSize: "clamp(16px, 1.7vw, 24px)",
              fontWeight: 400,
              color: "var(--color-text-muted)",
              letterSpacing: "-0.5px",
              lineHeight: 1.4,
            }}
          >
            Calling All Beings to Craft Our Collective Future
          </p>

          <div style={{ marginTop: "15px" }}>
            <Link
              href="/policies"
              className="inline-flex items-center gap-3 text-white no-underline hover:brightness-110"
              style={{
                padding: "clamp(14px, 1.4vw, 20px) clamp(24px, 2.8vw, 40px)",
                height: "auto",
                minHeight: "clamp(56px, 5.6vw, 80px)",
                background: "linear-gradient(135deg, rgb(255, 36, 186) 0%, rgb(171, 19, 87) 100%)",
                borderRadius: "20px",
                fontFamily: "var(--font-body-stack)",
                fontSize: "clamp(16px, 1.7vw, 24px)",
                fontWeight: 700,
              }}
            >
              All Policies & Worlds
              <span style={{ fontSize: "36px", transform: "rotate(-45deg)", display: "inline-block" }}>
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Policy cards — Framer: 753px wide, gap 21px, vertical stack */}
      <div
        ref={cardsRef}
        className="flex flex-col"
        style={{ width: "753px", maxWidth: "100%", gap: "21px", margin: "0 auto" }}
      >
        {policies.map((policy) => (
          <Link
            key={policy.slug}
            href={`/policies/${policy.slug}`}
            className="policy-card flex items-center no-underline group"
            style={{
              gap: "clamp(16px, 2.8vw, 40px)",
              padding: "clamp(10px, 1vw, 15px)",
              borderRadius: "clamp(24px, 2.9vw, 42px)",
              background: "var(--gradient-cta-btn)",
              flexWrap: "wrap",
            }}
          >
            {/* Thumbnail — Framer: 150x150px, borderRadius 30px */}
            <div
              className="relative flex-shrink-0 overflow-hidden"
              style={{
                width: "clamp(80px, 10.4vw, 150px)",
                height: "clamp(80px, 10.4vw, 150px)",
                borderRadius: "clamp(16px, 2.1vw, 30px)",
              }}
            >
              <Image
                src={policy.image}
                alt={policy.title}
                fill
                className="object-cover"
                sizes="150px"
              />
            </div>

            {/* Title — Framer: Neue Montreal Regular, inline text style /Heading 2 */}
            <h3
              className="flex-1"
              style={{
                fontFamily: "var(--font-body-stack)",
                fontSize: "clamp(16px, 1.6vw, 23px)",
                fontWeight: 400,
                color: "#ffffff",
                letterSpacing: "-0.5px",
                lineHeight: 1.4,
                minWidth: "120px",
              }}
            >
              {policy.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
