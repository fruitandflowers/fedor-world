"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { pastLives } from "@/data/past-lives";

export default function PastLivesCarousel() {
  const itemCount = pastLives.length;
  const visibleCount = 3;
  const gap = 32;

  // Start in the middle copy for seamless looping
  const [current, setCurrent] = useState(itemCount + 2);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const dragStartX = useRef(0);
  const dragCurrentX = useRef(0);

  // Triple the items for infinite loop: [...items, ...items, ...items]
  const tripled = [...pastLives, ...pastLives, ...pastLives];

  // When we reach the edges of the tripled array, silently jump to the middle copy
  useEffect(() => {
    if (!isTransitioning) return;
    const timer = setTimeout(() => {
      // If we've scrolled past the middle copy, jump back
      if (current >= itemCount * 2) {
        setIsTransitioning(false);
        setCurrent(current - itemCount);
      } else if (current < itemCount) {
        setIsTransitioning(false);
        setCurrent(current + itemCount);
      }
    }, 600); // Match transition duration
    return () => clearTimeout(timer);
  }, [current, itemCount, isTransitioning]);

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
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => prev + 1);
    }, 2300);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

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
      setCurrent((prev) => diff > 0 ? prev + 1 : prev - 1);
    }
    // Restart autoplay
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => prev + 1);
    }, 2300);
  }, [isDragging]);

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
          color: "rgb(20, 25, 50)",
          letterSpacing: "-5.6px",
          lineHeight: 0.9,
        }}
      >
        PAST LIVES OF YOUR
        <br />
        FUTURE PRESIDENT
      </h2>

      {/* Spacer */}
      <div style={{ height: "442px" }} />

      {/* Slideshow — 800px height, 3 items, gap 32, auto-play, INFINITE LOOP */}
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
          ref={trackRef}
          className="flex h-full"
          style={{
            gap: `${gap}px`,
            transform: `translateX(calc(-1 * ${slideOffset}))`,
            transition: isTransitioning && !isDragging
              ? "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
              : "none",
            cursor: isDragging ? "grabbing" : "grab",
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
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
              <p
                className="text-display"
                style={{
                  fontSize: "45px",
                  color: "rgb(20, 25, 50)",
                  letterSpacing: "-3.15px",
                  marginTop: "16px",
                }}
              >
                FEDOR {life.year}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
