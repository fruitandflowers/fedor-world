"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!quoteRef.current || !sectionRef.current) return;

      // Split into words and wrap
      const text = quoteRef.current.innerText;
      quoteRef.current.innerHTML = "";
      const words = text.split(" ").map((word) => {
        const span = document.createElement("span");
        span.textContent = word;
        span.className = "word";
        span.style.display = "inline-block";
        span.style.opacity = "0";
        span.style.transform = "translateY(30px)";
        span.style.marginRight = "0.35em";
        quoteRef.current!.appendChild(span);
        return span;
      });

      gsap.to(words, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "center center",
          scrub: 1,
        },
      });

      // Links fade in
      if (linksRef.current) {
        gsap.fromTo(
          linksRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "center center",
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
      <div className="max-w-4xl mx-auto text-center">
        <h2
          ref={quoteRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.2] font-normal text-[#FAFAFA]"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Creating a new chapter of human evolution through love, humor, and radical imagination.
        </h2>

        <div
          ref={linksRef}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8"
          style={{ opacity: 0 }}
        >
          <Link
            href="/policies/ourcabulary"
            className="text-[12px] tracking-[0.25em] uppercase text-white/40 hover:text-white/80 transition-colors"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            Explore the Ourcabulary &rarr;
          </Link>
          <Link
            href="/policies/pyramid"
            className="text-[12px] tracking-[0.25em] uppercase text-white/40 hover:text-white/80 transition-colors"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            The Pyramid &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
