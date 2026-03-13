"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const desktopLinks = [
  { href: "https://instagram.com/fedor.president", label: "Instagram", external: true },
  { href: "/policies/ourcabulary", label: "Ourcabulary" },
  { href: "/policies/pyramid", label: "Pyramid" },
  { href: "/policies", label: "Policies" },
];

const menuLinks = [
  { href: "/", label: "Home" },
  { href: "https://relevant.ws/fedor", label: "Support Fedor", external: true },
  { href: "https://instagram.com/fedor.president", label: "Instagram", external: true },
  { href: "https://tiktok.com/@fedor.president", label: "TikTok", external: true },
  { href: "https://youtube.com/@fedor.president", label: "Youtube", external: true },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 100);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav
        className="ghost-nav fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
        style={{
          width: "100%",
          height: "var(--nav-height)",
          padding: "0 var(--section-padding-x)",
          backgroundColor: scrolled ? "rgba(0, 0, 0, 0.8)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
        }}
      >
        {/* Wordmark */}
        <Link
          href="/"
          className="text-display text-white hover:opacity-70"
          style={{ fontSize: "32px", letterSpacing: "-0.06em", lineHeight: "64px", fontStyle: "italic" }}
        >
          FEDOR
        </Link>

        {/* Desktop links — horizontal nav matching original Framer */}
        <div className="hidden md:flex items-center gap-6">
          {desktopLinks.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-body-stack)",
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.7)",
                  textDecoration: "none",
                }}
                className="hover:opacity-100 transition-opacity"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: "var(--font-body-stack)",
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.7)",
                  textDecoration: "none",
                }}
                className="hover:opacity-100 transition-opacity"
              >
                {link.label}
              </Link>
            )
          )}

          {/* "Nominate Your World" CTA button — outlined style matching original */}
          <a
            href="https://form.typeform.com/to/y2NrRDGp"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-body-stack)",
              fontSize: "14px",
              fontWeight: 500,
              color: "rgb(171, 19, 87)",
              backgroundColor: "transparent",
              padding: "8px 20px",
              borderRadius: "8px",
              textDecoration: "none",
              border: "1px solid rgba(171, 19, 87, 0.5)",
            }}
            className="hover:border-[rgb(171,19,87)] transition-colors"
          >
            Nominate Your World
          </a>
        </div>

        {/* Hamburger — mobile only */}
        <button
          onClick={() => setMenuOpen(true)}
          className="p-2 cursor-pointer md:hidden"
          aria-label="Open menu"
          style={{ background: "none", border: "none" }}
        >
          <div className="flex flex-col gap-[6px]">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: "24px",
                  height: "2px",
                  backgroundColor: "rgb(153, 153, 153)",
                }}
              />
            ))}
          </div>
        </button>
      </nav>

      {/* Full-screen menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.95)" }}
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-8 text-white text-3xl cursor-pointer hover:opacity-70"
              style={{ background: "none", border: "none" }}
              aria-label="Close menu"
            >
              &times;
            </button>

            {menuLinks.map((link) => {
              const className = "text-display text-white hover:opacity-70";
              const style = { fontSize: "clamp(32px, 5vw, 48px)" };

              return link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                  style={style}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={className}
                  style={style}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
