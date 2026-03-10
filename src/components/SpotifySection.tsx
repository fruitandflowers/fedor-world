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
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
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
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 50%",
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
      className="portal-section flex flex-col items-center justify-center px-6"
      data-theme="dark"
      style={{ background: "#0A0A0A" }}
    >
      <div className="max-w-2xl mx-auto w-full text-center">
        <h2
          ref={titleRef}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#FAFAFA] mb-12"
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            opacity: 0,
          }}
        >
          Jam With Your President
        </h2>

        <div ref={embedRef} style={{ opacity: 0 }}>
          <iframe
            src="https://open.spotify.com/embed/playlist/7BpT9kXGxvOxWlEjV23YHl?utm_source=generator&theme=0"
            width="100%"
            height="380"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="border-0"
            title="Fedor's World President Playlist"
          />
        </div>
      </div>
    </section>
  );
}
