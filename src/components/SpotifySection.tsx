"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

export default function SpotifySection() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // Title flies up from below the Spotify player
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 200 },
          {
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "top 20%",
              scrub: true,
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

      // Floating petals — drift and rotate slightly on scroll
      const petals = sectionRef.current.querySelectorAll(".floating-petal");
      petals.forEach((petal, i) => {
        gsap.to(petal, {
          y: -30 + i * 15,
          rotation: `+=${10 + i * 8}`,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "center bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-visible"
      style={{
        height: isMobile ? "1533px" : "2000px",
        backgroundColor: "hsl(335, 77%, 9%)",
      }}
    >
      {/* "Presidential radio station" title — Original: 88px GAQIRE, dusty rose, centered */}
      <h2
        ref={titleRef}
        className="text-display absolute text-center"
        style={{
          top: "160px",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "clamp(32px, 6.1vw, 88px)",
          color: "var(--color-hero-text)",
          letterSpacing: "-6.16px",
          whiteSpace: "nowrap",
          textTransform: "capitalize",
        }}
      >
        Presidential radio station
      </h2>

      {/* Spotify embed — Framer: 740x477px frame, absolute, top 446px, centerX 50%, z-index 8 */}
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

      {/* Floating gem — hidden on mobile */}
      <div
        className="absolute z-[1] pointer-events-none hidden md:block"
        style={{
          width: "102px",
          height: "99px",
          left: "51%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Image src="/images/misc/floating-gem-1.png" alt="" fill className="object-contain" sizes="102px" />
      </div>

      {/* Floating bottle — hidden on mobile */}
      <div
        className="absolute z-0 pointer-events-none hidden md:block"
        style={{
          width: "89px",
          height: "151px",
          left: "592px",
          top: "51%",
          transform: "translateY(-50%) rotate(-42deg)",
        }}
      >
        <Image src="/images/misc/floating-bottle.png" alt="" fill className="object-contain" sizes="89px" />
      </div>

      {/* Floating logo — hidden on mobile */}
      <div
        className="absolute z-[1] pointer-events-none hidden md:block"
        style={{
          width: "175px",
          height: "87px",
          bottom: "815px",
          left: "899px",
        }}
      >
        <Image src="/images/misc/floating-logo.png" alt="" fill className="object-contain" sizes="175px" />
      </div>

      {/* Stone — hidden on mobile (off-screen anyway at right: -671px) */}
      <div
        className="absolute z-[1] pointer-events-none hidden md:block"
        style={{
          width: "349px",
          height: "382px",
          right: "-671px",
          top: "45%",
          transform: "translateY(-50%) rotate(-17deg)",
        }}
      >
        <Image src="/images/misc/floating-stone.png" alt="" fill className="object-contain" sizes="349px" />
      </div>

      {/* Small gem rotated — hidden on mobile */}
      <div
        className="absolute z-[1] pointer-events-none hidden md:block"
        style={{
          width: "58px",
          height: "57px",
          top: "869px",
          left: "853px",
          transform: "rotate(308deg)",
        }}
      >
        <Image src="/images/misc/floating-gem-1.png" alt="" fill className="object-contain" sizes="58px" />
      </div>

      {/* Landscape image at bottom — Framer: 1fr x 679px, z-index 1, with floating elements on top */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[1]"
        style={{ height: "679px" }}
      >
        <Image
          src="/images/misc/landscape-bottom.png"
          alt="Landscape"
          fill
          className="object-cover"
          sizes="100vw"
        />

        {/* Floating petals — hidden on mobile */}
        {/* Floating petal 1 — Framer: 148x307px, rotation 35, top -280px, left 734px, z-index -1 */}
        <div
          className="absolute pointer-events-none floating-petal hidden md:block"
          style={{
            width: "148px",
            height: "307px",
            top: "-280px",
            left: "734px",
            transform: "rotate(35deg)",
            zIndex: -1,
          }}
        >
          <Image src="/images/misc/floating-petal-1.png" alt="" fill className="object-contain" sizes="148px" />
        </div>

        {/* Floating petal 2 — Framer: 107x142px, top -44px, centerX 49%, z-index -1 */}
        <div
          className="absolute pointer-events-none floating-petal hidden md:block"
          style={{
            width: "107px",
            height: "142px",
            top: "-44px",
            left: "49%",
            transform: "translateX(-50%)",
            zIndex: -1,
          }}
        >
          <Image src="/images/misc/floating-petal-2.png" alt="" fill className="object-contain" sizes="107px" />
        </div>

        {/* Floating petal 3 — Framer: 176x124px, top 0px, left 478px, z-index -1 */}
        <div
          className="absolute pointer-events-none floating-petal hidden md:block"
          style={{
            width: "176px",
            height: "124px",
            top: "0px",
            left: "478px",
            zIndex: -1,
          }}
        >
          <Image src="/images/misc/floating-petal-3.png" alt="" fill className="object-contain" sizes="176px" />
        </div>

        {/* Floating petal 4 — Framer: 91x160px, rotation -45, top -90px, left 804px, z-index -1 */}
        <div
          className="absolute pointer-events-none floating-petal hidden md:block"
          style={{
            width: "91px",
            height: "160px",
            top: "-90px",
            left: "804px",
            transform: "rotate(-45deg)",
            zIndex: -1,
          }}
        >
          <Image src="/images/misc/floating-petal-4.png" alt="" fill className="object-contain" sizes="91px" />
        </div>
      </div>
    </section>
  );
}
