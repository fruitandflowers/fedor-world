"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "https://instagram.com/fedor.president", label: "Instagram", external: true },
  { href: "/policies/ourcabulary", label: "Ourcabulary" },
  { href: "/policies/pyramid", label: "Pyramid" },
  { href: "#policies", label: "Policies" },
  { href: "https://form.typeform.com/to/y2NrRDGp", label: "Nominate", external: true },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FFFAF5]/90 backdrop-blur-md border-b border-[#1A1A1A]/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-[var(--font-display)] text-2xl font-bold tracking-wide text-foreground hover:text-accent transition-colors"
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
                className="text-sm font-[var(--font-ui)] tracking-widest uppercase text-muted hover:text-accent transition-colors"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-[var(--font-ui)] tracking-widest uppercase text-muted hover:text-accent transition-colors"
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
            className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-[#FFFAF5] border-b border-[#1A1A1A]/5"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg tracking-widest uppercase text-muted hover:text-accent transition-colors"
                    style={{ fontFamily: "var(--font-ui)" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-lg tracking-widest uppercase text-muted hover:text-accent transition-colors"
                    style={{ fontFamily: "var(--font-ui)" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
