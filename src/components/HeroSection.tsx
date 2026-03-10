"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Word-by-word reveal for the title (preserves natural line breaks)
      if (titleRef.current) {
        const text = titleRef.current.innerText;
        titleRef.current.innerHTML = "";
        const words = text.split(" ").map((word, i, arr) => {
          const wordSpan = document.createElement("span");
          wordSpan.style.display = "inline-block";
          wordSpan.style.overflow = "hidden";
          wordSpan.style.verticalAlign = "top";

          const inner = document.createElement("span");
          inner.textContent = word;
          inner.style.display = "inline-block";
          inner.style.opacity = "0";
          inner.style.transform = "translateY(100%)";
          wordSpan.appendChild(inner);

          titleRef.current!.appendChild(wordSpan);
          // Add a real space between words (not inside the span, so wrapping works)
          if (i < arr.length - 1) {
            titleRef.current!.appendChild(document.createTextNode(" "));
          }
          return inner;
        });

        gsap.to(words, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.3,
        });
      }

      // Tagline fade in
      if (taglineRef.current) {
        gsap.fromTo(
          taglineRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, delay: 1.5, ease: "power2.out" }
        );
      }

      // Portrait parallax on scroll
      if (portraitRef.current && sectionRef.current) {
        gsap.to(portraitRef.current, {
          y: -80,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Arrow pulse
      if (arrowRef.current) {
        gsap.fromTo(
          arrowRef.current,
          { opacity: 0 },
          { opacity: 0.3, duration: 1.5, delay: 2.5, ease: "power2.out" }
        );
        gsap.to(arrowRef.current, {
          y: 8,
          repeat: -1,
          yoyo: true,
          duration: 1.5,
          ease: "power1.inOut",
          delay: 2.5,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="portal-section flex flex-col items-center justify-center relative"
      data-theme="dark"
      style={{ background: "#0A0A0A" }}
    >
      {/* Background earth at very low opacity */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-bg-1.png"
          alt=""
          fill
          className="object-cover object-center"
          style={{ opacity: 0.06 }}
          priority
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-center min-h-screen">
        {/* Text — left-aligned on desktop, centered on mobile */}
        <div className="flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left py-20 lg:py-0 lg:max-w-[60%]">
          <h1
            ref={titleRef}
            className="text-[clamp(3rem,8vw,7.5rem)] leading-[0.88] font-bold tracking-[-0.02em] text-[#FAFAFA]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            THE FIRST WORLD PRESIDENT
          </h1>

          <p
            ref={taglineRef}
            className="mt-8 text-[13px] tracking-[0.3em] uppercase text-[#888] max-w-md"
            style={{
              fontFamily: "var(--font-ui)",
              opacity: 0,
            }}
          >
            Not a political campaign. A creative project.
          </p>
        </div>

        {/* Portrait — asymmetric, bleeding right on desktop */}
        <div
          ref={portraitRef}
          className="relative flex-shrink-0 lg:absolute lg:right-[-40px] lg:bottom-0"
        >
          <div className="relative w-[280px] h-[380px] sm:w-[340px] sm:h-[460px] lg:w-[420px] lg:h-[560px] xl:w-[480px] xl:h-[640px]">
            <Image
              src="/images/hero/hero-element.png"
              alt="Fedor Sokolov"
              fill
              className="object-contain object-bottom"
              priority
            />
          </div>
        </div>
      </div>

      {/* Scroll hint — barely visible thin line + arrow */}
      <div
        ref={arrowRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0 }}
      >
        <div className="w-[1px] h-8 bg-white/20" />
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className="text-white/20"
        >
          <path
            d="M1 4L6 9L11 4"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>
    </section>
  );
}
