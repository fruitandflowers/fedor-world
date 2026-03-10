"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pastLives } from "@/data/past-lives";

gsap.registerPlugin(ScrollTrigger);

export default function PastLivesCarousel() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const getVisibleCount = useCallback(() => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }, []);

  const [visible, setVisible] = useState(3);

  useEffect(() => {
    const update = () => setVisible(getVisibleCount());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [getVisibleCount]);

  const maxIndex = Math.max(0, pastLives.length - visible);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (carouselRef.current) {
        gsap.fromTo(
          carouselRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
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
      style={{
        backgroundColor: "#ffffff",
        padding: "var(--section-padding-y) 0",
      }}
    >
      {/* Section heading */}
      <div style={{ padding: "0 var(--section-padding-x)", marginBottom: "clamp(40px, 6vw, 80px)" }}>
        <h2
          ref={headingRef}
          className="text-display"
          style={{
            fontSize: "var(--text-display-lg)",
            color: "var(--color-hero-text)",
            lineHeight: 0.9,
            opacity: 0,
          }}
        >
          PAST LIVES OF YOUR
          <br />
          FUTURE PRESIDENT
        </h2>
      </div>

      {/* Carousel */}
      <div ref={carouselRef} className="relative" style={{ opacity: 0 }}>
        <div className="overflow-hidden" style={{ padding: "0 var(--section-padding-x)" }}>
          <div
            className="flex"
            style={{
              transform: `translateX(-${current * (100 / visible)}%)`,
              transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {pastLives.map((life) => (
              <div
                key={life.year}
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / visible}%` }}
              >
                <div
                  className="relative aspect-[3/4] overflow-hidden"
                  style={{ borderRadius: "4px" }}
                >
                  <Image
                    src={life.image}
                    alt={`Fedor ${life.year} — ${life.label}`}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="mt-6">
                  <p
                    className="text-display"
                    style={{
                      fontSize: "var(--text-display-md)",
                      color: "#000000",
                      letterSpacing: "-3.78px",
                    }}
                  >
                    FEDOR {life.year}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body-stack)",
                      fontSize: "var(--text-caption)",
                      color: "var(--color-text-subtle)",
                      marginTop: "8px",
                      letterSpacing: "var(--ls-caption)",
                      textTransform: "uppercase",
                    }}
                  >
                    {life.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrow buttons */}
        <button
          onClick={() => setCurrent(Math.max(0, current - 1))}
          disabled={current === 0}
          className="absolute left-4 top-[35%] -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer disabled:opacity-20"
          style={{
            background: "rgba(0,0,0,0.08)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(0,0,0,0.08)",
            color: "#000",
            fontSize: "20px",
          }}
          aria-label="Previous"
        >
          &#8249;
        </button>
        <button
          onClick={() => setCurrent(Math.min(maxIndex, current + 1))}
          disabled={current >= maxIndex}
          className="absolute right-4 top-[35%] -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer disabled:opacity-20"
          style={{
            background: "rgba(0,0,0,0.08)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(0,0,0,0.08)",
            color: "#000",
            fontSize: "20px",
          }}
          aria-label="Next"
        >
          &#8250;
        </button>
      </div>

      {/* Dot pagination */}
      <div className="flex justify-center gap-2 mt-10">
        {pastLives.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(Math.min(i, maxIndex))}
            className="cursor-pointer"
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              border: "none",
              backgroundColor: i === current ? "#000" : "rgb(184, 184, 184)",
              transition: "background-color 0.3s ease",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
