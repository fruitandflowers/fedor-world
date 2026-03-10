"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pastLives } from "@/data/past-lives";

gsap.registerPlugin(ScrollTrigger);

export default function PastLivesCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // Label fade in
      if (labelRef.current) {
        gsap.fromTo(
          labelRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Pin the section and cycle through images on scroll
      const totalSlides = pastLives.length;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${totalSlides * 100}%`,
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const idx = Math.min(
            Math.floor(self.progress * totalSlides),
            totalSlides - 1
          );
          setActiveIndex(idx);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="portal-section relative"
      data-theme="light"
      style={{ background: "#FFFAF5", minHeight: "100vh" }}
    >
      {/* Gallery room label */}
      <p
        ref={labelRef}
        className="absolute top-8 left-8 text-[11px] tracking-[0.3em] uppercase text-[#1A1A1A]/40 z-20"
        style={{ fontFamily: "var(--font-ui)", opacity: 0 }}
      >
        Past Lives
      </p>

      {/* Image gallery — full viewport, one at a time */}
      <div className="absolute inset-0 z-10">
        {pastLives.map((life, index) => (
          <div
            key={life.year}
            className={`past-life-slide flex items-center justify-center ${
              index === activeIndex ? "active" : ""
            }`}
          >
            {/* Image */}
            <div className="relative w-[55vw] max-w-[700px] aspect-[3/4] mx-auto">
              <Image
                src={life.image}
                alt={`Fedor in ${life.year} — ${life.label}`}
                fill
                className="object-cover"
                style={{ objectPosition: "center top" }}
                sizes="(max-width: 768px) 80vw, 55vw"
              />
            </div>

            {/* Year — large typography */}
            <div className="absolute bottom-16 left-8 md:left-16 z-20">
              <p
                className="text-[100px] sm:text-[140px] md:text-[180px] font-bold leading-none text-[#1A1A1A]/10"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                {life.year}
              </p>
              <p
                className="text-[12px] tracking-[0.25em] uppercase text-[#1A1A1A]/50 mt-2"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                {life.label}
              </p>
            </div>

            {/* Slide counter */}
            <div className="absolute bottom-16 right-8 md:right-16 z-20">
              <p
                className="text-[12px] tracking-[0.15em] text-[#1A1A1A]/30"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                {String(index + 1).padStart(2, "0")} / {String(pastLives.length).padStart(2, "0")}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Progress dots */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
        {pastLives.map((_, index) => (
          <div
            key={index}
            className="w-[3px] h-6 transition-all duration-500"
            style={{
              backgroundColor:
                index === activeIndex
                  ? "#1A1A1A"
                  : "rgba(26,26,26,0.15)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
