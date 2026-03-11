"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SpotifySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (embedRef.current) {
        gsap.fromTo(
          embedRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
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
      className="relative w-full overflow-visible"
      style={{
        height: "2000px",
        backgroundColor: "hsl(335, 77%, 9%)",
      }}
    >
      {/* "Presidential radio station" title — Framer: absolute, top 23px, centerX 50% */}
      <h2
        ref={titleRef}
        className="text-display absolute text-center"
        style={{
          top: "23px",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "clamp(48px, 6.1vw, 88px)",
          color: "var(--color-hero-text)",
          letterSpacing: "-6.16px",
          whiteSpace: "nowrap",
        }}
      >
        Presidential radio station
      </h2>

      {/* Spotify embed — Framer: 740x477px frame, absolute, top 446px, centerX 50% */}
      <div
        ref={embedRef}
        className="absolute z-[8]"
        style={{
          width: "740px",
          maxWidth: "90vw",
          top: "446px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <iframe
          src="https://open.spotify.com/embed/playlist/7BpT9kXGxvOxWlEjV23YHl?utm_source=generator"
          width="100%"
          height="352"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="border-0"
          style={{ borderRadius: "12px" }}
          title="Fedor's World President Playlist"
        />
      </div>

      {/* Landscape image at bottom — Framer: 1fr x 679px, z-index 1, with layout stack */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[1]"
        style={{ height: "679px" }}
      >
        <Image
          src="/images/misc/nomination-cta.png"
          alt="Landscape"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
