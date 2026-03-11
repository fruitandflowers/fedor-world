"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { policies } from "@/data/policies";

gsap.registerPlugin(ScrollTrigger);

export default function WorldsList() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!cardsRef.current) return;

      const cards = cardsRef.current.querySelectorAll(".world-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: "#000000",
        padding: "0 var(--section-padding-x) var(--section-padding-y)",
      }}
    >
      <div ref={cardsRef} className="max-w-[1440px] mx-auto flex flex-col gap-3">
        {policies.map((policy) => (
          <Link
            key={policy.slug}
            href={`/policies/${policy.slug}`}
            className="world-card flex items-center gap-8 no-underline overflow-hidden group"
            style={{
              background: "var(--gradient-cta-btn)",
              padding: "clamp(16px, 1.5vw, 20px) clamp(20px, 3vw, 40px)",
              minHeight: "clamp(100px, 14vw, 180px)",
              borderRadius: "var(--radius-pill)",
            }}
          >
            {/* Thumbnail */}
            <div className="relative flex-shrink-0 w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] rounded-[20px] overflow-hidden">
              <Image
                src={policy.image}
                alt={policy.title}
                fill
                className="object-cover"
                sizes="110px"
              />
            </div>

            {/* Title */}
            <h3
              className="flex-1"
              style={{
                fontFamily: "var(--font-body-stack)",
                fontSize: "clamp(16px, 1.8vw, 23px)",
                fontWeight: 400,
                color: "#ffffff",
                letterSpacing: "-0.3px",
                lineHeight: 1.3,
              }}
            >
              {policy.title}
            </h3>

            {/* Arrow */}
            <span
              className="flex-shrink-0 group-hover:translate-x-1"
              style={{
                fontSize: "20px",
                color: "rgba(255,255,255,0.3)",
                transition: "transform 0.3s ease, color 0.3s ease",
              }}
            >
              &rarr;
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
