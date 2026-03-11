"use client";

import { useEffect, useRef } from "react";
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
      style={{
        backgroundColor: "var(--color-section-burgundy)",
        padding: "var(--section-padding-y) var(--section-padding-x)",
      }}
    >
      <div className="max-w-3xl mx-auto w-full text-center">
        <h2
          ref={titleRef}
          className="text-display"
          style={{
            fontSize: "clamp(48px, 7vw, 88px)",
            color: "var(--color-hero-text)",
            marginBottom: "clamp(40px, 5vw, 64px)",
          }}
        >
          Presidential radio station
        </h2>

        <div ref={embedRef}>
          <iframe
            src="https://open.spotify.com/embed/playlist/7BpT9kXGxvOxWlEjV23YHl?utm_source=generator&theme=0"
            width="100%"
            height="380"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="border-0"
            style={{ borderRadius: "12px" }}
            title="Fedor's World President Playlist"
          />
        </div>
      </div>
    </section>
  );
}
