"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/policies/ourcabulary", label: "Ourcabulary" },
  { href: "/policies/pyramid", label: "Pyramid" },
  { href: "https://instagram.com/fedor.president", label: "Instagram", external: true },
  { href: "https://form.typeform.com/to/y2NrRDGp", label: "Nominate", external: true },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    setScrolled(y > 60);
    setHidden(y > 200);

    // Detect which section we're over to set text color
    const sections = document.querySelectorAll(".portal-section");
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 80 && rect.bottom > 80) {
        const bg = section.getAttribute("data-theme");
        setIsDark(bg === "dark");
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Handle scroll up to show nav
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < lastY - 5) {
        setHidden(false);
      } else if (y > lastY + 5 && y > 200) {
        setHidden(true);
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const textColor = isDark ? "text-white" : "text-[#1A1A1A]";
  const mutedColor = isDark ? "text-white/50" : "text-[#1A1A1A]/50";

  return (
    <nav
      className={`ghost-nav fixed top-0 left-0 right-0 z-50 ${
        hidden ? "opacity-0 pointer-events-none" : scrolled ? "opacity-70 hover:opacity-100" : "opacity-100"
      }`}
      style={{
        backgroundColor: scrolled
          ? isDark
            ? "rgba(10,10,10,0.5)"
            : "rgba(255,250,245,0.5)"
          : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Wordmark */}
        <Link
          href="/"
          className={`text-sm tracking-[0.35em] uppercase ${textColor} hover:opacity-60`}
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          FEDOR
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-[11px] tracking-[0.2em] uppercase ${mutedColor} hover:opacity-100 transition-opacity`}
                style={{ fontFamily: "var(--font-ui)" }}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={`text-[11px] tracking-[0.2em] uppercase ${mutedColor} hover:opacity-100 transition-opacity`}
                style={{ fontFamily: "var(--font-ui)" }}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-[1px] transition-all duration-300 ${
              isDark ? "bg-white" : "bg-[#1A1A1A]"
            } ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`}
          />
          <span
            className={`block w-5 h-[1px] transition-all duration-300 ${
              isDark ? "bg-white" : "bg-[#1A1A1A]"
            } ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-[1px] transition-all duration-300 ${
              isDark ? "bg-white" : "bg-[#1A1A1A]"
            } ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden"
          style={{
            backgroundColor: isDark ? "rgba(10,10,10,0.95)" : "rgba(255,250,245,0.95)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="px-6 py-8 flex flex-col gap-5">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm tracking-[0.2em] uppercase ${mutedColor} hover:opacity-100`}
                  style={{ fontFamily: "var(--font-ui)" }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm tracking-[0.2em] uppercase ${mutedColor} hover:opacity-100`}
                  style={{ fontFamily: "var(--font-ui)" }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
