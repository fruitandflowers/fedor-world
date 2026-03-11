"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { pastLives } from "@/data/past-lives";

export default function PastLivesCarousel() {
  // Framer startFrom="4" appears to be 1-based, centering on item 4.
  // With alignment="center" and 3 visible, this shows items 2,3,4 (indices in 0-based)
  const [current, setCurrent] = useState(2);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragCurrentX = useRef(0);

  const itemCount = pastLives.length;
  const visibleCount = 3;
  const gap = 32;

  // Auto-play every 2.3s (from Framer: intervalControl="2.3")
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % itemCount);
    }, 2300);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [itemCount]);

  // Drag support
  const handleDragStart = useCallback((clientX: number) => {
    setIsDragging(true);
    dragStartX.current = clientX;
    dragCurrentX.current = clientX;
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const handleDragMove = useCallback((clientX: number) => {
    if (!isDragging) return;
    dragCurrentX.current = clientX;
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = dragStartX.current - dragCurrentX.current;
    if (Math.abs(diff) > 50) {
      setCurrent((prev) => {
        if (diff > 0) return (prev + 1) % itemCount;
        return (prev - 1 + itemCount) % itemCount;
      });
    }
    // Restart autoplay
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % itemCount);
    }, 2300);
  }, [isDragging, itemCount]);

  // Each item takes 1/3 of container minus gaps
  // Using calc() for responsive sizing
  const itemWidthCalc = `calc((100% - ${gap * (visibleCount - 1)}px) / ${visibleCount})`;
  const slideOffset = `calc(${current} * (calc((100% - ${gap * (visibleCount - 1)}px) / ${visibleCount}) + ${gap}px))`;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        height: "1273px",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Title — overlaid at top, absolute positioned */}
      <h2
        className="text-display absolute left-1/2 -translate-x-1/2 text-center z-[1] whitespace-nowrap"
        style={{
          top: "251px",
          fontSize: "clamp(40px, 5.6vw, 80px)",
          color: "var(--color-hero-text)",
          letterSpacing: "-5.6px",
          lineHeight: 0.9,
        }}
      >
        PAST LIVES OF YOUR
        <br />
        FUTURE PRESIDENT
      </h2>

      {/* Spacer frames from Framer (186px + 256px = 442px before slideshow) */}
      <div style={{ height: "442px" }} />

      {/* Slideshow — 800px height, 3 items, gap 32, auto-play */}
      <div
        className="relative overflow-hidden"
        style={{ height: "800px" }}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
      >
        <div
          className="flex h-full"
          style={{
            gap: `${gap}px`,
            transform: `translateX(calc(-1 * ${slideOffset}))`,
            transition: isDragging ? "none" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          {pastLives.map((life) => (
            <div
              key={life.year}
              className="flex-shrink-0 h-full"
              style={{ width: itemWidthCalc }}
            >
              <div className="relative h-full overflow-hidden">
                <Image
                  src={life.image}
                  alt={`Fedor ${life.year} — ${life.label}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                {/* Year label overlaid on image bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p
                    className="text-display"
                    style={{
                      fontSize: "54px",
                      color: "#000000",
                      letterSpacing: "-3.78px",
                      textShadow: "0 0 20px rgba(255,255,255,0.5)",
                    }}
                  >
                    FEDOR {life.year}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
