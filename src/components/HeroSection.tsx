"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background earth image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-bg-1.png"
          alt=""
          fill
          className="object-cover object-center opacity-15"
          priority
        />
        {/* Warm gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFFAF5] via-[#FFFAF5]/80 to-[#FFFAF5]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-accent uppercase tracking-[0.3em] text-sm mb-6"
              style={{ fontFamily: "var(--font-ui)" }}
            >
              Introducing
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[90px] leading-[0.95] font-bold tracking-tight mb-8"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              The First
              <br />
              <span className="text-accent">World</span>
              <br />
              President
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-body text-lg md:text-xl max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              Not a political campaign. A creative project exploring what it
              means to lead with love, humor, and radical imagination.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href="https://form.typeform.com/to/y2NrRDGp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-accent text-white px-8 py-4 rounded-[20px] text-lg font-semibold shadow-[0_4px_14px_rgba(171,19,87,0.35),0_1px_3px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(171,19,87,0.45)] hover:scale-[1.02] transition-all duration-300"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                Nominate Your World
              </a>
              <a
                href="#policies"
                className="inline-block bg-foreground text-white px-8 py-4 rounded-[42px] text-lg font-semibold hover:bg-[#333] transition-all duration-300"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                Explore Policies
              </a>
            </motion.div>
          </div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-shrink-0 relative"
          >
            <div className="relative w-[300px] h-[360px] sm:w-[380px] sm:h-[440px] lg:w-[440px] lg:h-[520px]">
              <Image
                src="/images/hero/hero-element.png"
                alt="Fedor Sokolov — The First World President"
                fill
                className="object-contain object-bottom drop-shadow-2xl"
                priority
              />
            </div>
            {/* Decorative glow behind portrait */}
            <div className="absolute -inset-8 bg-accent/5 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
