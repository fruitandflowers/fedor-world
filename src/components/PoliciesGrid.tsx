"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { policies } from "@/data/policies";

gsap.registerPlugin(ScrollTrigger);

export default function PoliciesGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // Label
      if (labelRef.current) {
        gsap.fromTo(
          labelRef.current,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );
      }

      // Stagger cards
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".policy-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 75%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // First 2 policies (Ourcabulary, Pyramid) are featured — larger
  const featured = policies.slice(0, 2);
  const rest = policies.slice(2);

  return (
    <section
      ref={sectionRef}
      id="policies"
      className="relative py-24 md:py-32 px-6"
      data-theme="light"
      style={{ background: "#FFFAF5", minHeight: "100vh" }}
    >
      {/* Gallery label */}
      <p
        ref={labelRef}
        className="text-[11px] tracking-[0.3em] uppercase text-[#1A1A1A]/40 mb-16 max-w-7xl mx-auto"
        style={{ fontFamily: "var(--font-ui)", opacity: 0 }}
      >
        Policies
      </p>

      <div ref={gridRef} className="max-w-7xl mx-auto">
        {/* Featured row — 2 large cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {featured.map((policy) => (
            <Link
              key={policy.slug}
              href={`/policies/${policy.slug}`}
              className="policy-card block group"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={policy.image}
                  alt={policy.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Dark gradient at bottom for text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3
                    className="text-white text-xl md:text-2xl font-bold"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    {policy.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Remaining cards — asymmetric grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {rest.map((policy, index) => {
            // Make some cards span 2 columns for asymmetry
            const isWide = index === 2 || index === 7;
            return (
              <Link
                key={policy.slug}
                href={`/policies/${policy.slug}`}
                className={`policy-card block group ${
                  isWide ? "col-span-2" : "col-span-1"
                }`}
              >
                <div
                  className={`relative overflow-hidden ${
                    isWide ? "aspect-[16/9]" : "aspect-square"
                  }`}
                >
                  <Image
                    src={policy.image}
                    alt={policy.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3
                      className="text-white text-sm md:text-base font-bold leading-tight"
                      style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                    >
                      {policy.title}
                    </h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
