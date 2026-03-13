"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { pastLives } from "@/data/past-lives";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [breakpoint]);
  return isMobile;
}

export default function PastLivesCarousel() {
  const itemCount = pastLives.length;
  const isMobile = useIsMobile();
  const visibleCount = isMobile ? 1 : 3;
  const gap = isMobile ? 16 : 32;

  // Paginated carousel — current is the index of the leftmost visible item
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Tripled items for infinite seamless loop
  const tripled = [...pastLives, ...pastLives, ...pastLives];
  const [offset, setOffset] = useState(itemCount); // Start in middle copy
  const [isTransitioning, setIsTransitioning] = useState(true);

  const goNext = useCallback(() => {
    setIsTransitioning(true);
    setOffset((prev) => prev + 1);
    setCurrent((prev) => (prev + 1) % itemCount);
  }, [itemCount]);

  const goPrev = useCallback(() => {
    setIsTransitioning(true);
    setOffset((prev) => prev - 1);
    setCurrent((prev) => (prev - 1 + itemCount) % itemCount);
  }, [itemCount]);

  const goToPage = useCallback(
    (page: number) => {
      const diff = page - current;
      setIsTransitioning(true);
      setOffset((prev) => prev + diff);
      setCurrent(page);
    },
    [current]
  );

  // Silent jump when reaching edges of tripled array
  useEffect(() => {
    if (!isTransitioning) return;
    const timer = setTimeout(() => {
      if (offset >= itemCount * 2) {
        setIsTransitioning(false);
        setOffset((prev) => prev - itemCount);
      } else if (offset < itemCount) {
        setIsTransitioning(false);
        setOffset((prev) => prev + itemCount);
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [offset, itemCount, isTransitioning]);

  // Re-enable transition after silent jump
  useEffect(() => {
    if (!isTransitioning) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
    }
  }, [isTransitioning]);

  // Auto-play every 2.3s
  useEffect(() => {
    intervalRef.current = setInterval(goNext, 2300);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [goNext]);

  // Reset autoplay on manual interaction
  const resetAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(goNext, 2300);
  }, [goNext]);

  const gapCount = visibleCount - 1;
  const itemWidthCalc = `calc((100% - ${gap * gapCount}px) / ${visibleCount})`;
  const slideOffset = `calc(${offset} * (calc((100% - ${gap * gapCount}px) / ${visibleCount}) + ${gap}px))`;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        minHeight: isMobile ? "auto" : "1273px",
        height: isMobile ? "auto" : "1273px",
        backgroundColor: "#ffffff",
        paddingBottom: isMobile ? "60px" : undefined,
      }}
    >
      {/* Title — centered at top */}
      <h2
        className="text-display text-center z-[1] whitespace-nowrap"
        style={{
          paddingTop: isMobile ? "80px" : "251px",
          paddingBottom: isMobile ? "40px" : undefined,
          position: isMobile ? "relative" : "absolute",
          left: isMobile ? "auto" : "50%",
          top: isMobile ? "auto" : "251px",
          transform: isMobile ? "none" : "translateX(-50%)",
          fontSize: "clamp(32px, 5.6vw, 80px)",
          color: "rgb(20, 25, 50)",
          letterSpacing: "-5.6px",
          lineHeight: 0.9,
        }}
      >
        PAST LIVES OF YOUR
        <br />
        FUTURE PRESIDENT
      </h2>

      {/* Spacer — only needed in absolute layout */}
      {!isMobile && <div style={{ height: "442px" }} />}

      {/* Slideshow */}
      <div
        className="relative overflow-hidden"
        style={{ height: isMobile ? "clamp(400px, 80vw, 600px)" : "800px" }}
      >
        {/* Track */}
        <div
          className="flex h-full"
          style={{
            gap: `${gap}px`,
            transform: `translateX(calc(-1 * ${slideOffset}))`,
            transition:
              isTransitioning
                ? "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
                : "none",
          }}
        >
          {tripled.map((life, i) => (
            <div
              key={`${life.year}-${i}`}
              className="flex-shrink-0 flex flex-col"
              style={{ width: itemWidthCalc, height: "100%" }}
            >
              <div className="relative flex-1 overflow-hidden">
                <Image
                  src={life.image}
                  alt={`Fedor ${life.year} — ${life.label}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <p
                className="text-display"
                style={{
                  fontSize: isMobile ? "32px" : "54px",
                  color: "rgb(0, 0, 0)",
                  letterSpacing: "-3.78px",
                  marginTop: "16px",
                }}
              >
                FEDOR {life.year}
              </p>
            </div>
          ))}
        </div>

        {/* Prev/Next arrows — overlaid on carousel edges */}
        <button
          onClick={() => {
            goPrev();
            resetAutoplay();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-[2] flex items-center justify-center"
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(4px)",
            border: "none",
            cursor: "pointer",
          }}
          aria-label="Previous"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgb(20, 25, 50)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          onClick={() => {
            goNext();
            resetAutoplay();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-[2] flex items-center justify-center"
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(4px)",
            border: "none",
            cursor: "pointer",
          }}
          aria-label="Next"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgb(20, 25, 50)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center items-center gap-3 mt-6">
        {pastLives.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              goToPage(i);
              resetAutoplay();
            }}
            aria-label={`Scroll to page ${i + 1}`}
            style={{
              width: current === i ? "10px" : "8px",
              height: current === i ? "10px" : "8px",
              borderRadius: "50%",
              background:
                current === i
                  ? "rgb(20, 25, 50)"
                  : "rgba(20, 25, 50, 0.25)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
}
