"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function NominationCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFFAF5] via-accent/5 to-[#FFFAF5]" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Every World Counts.
          <br />
          <span className="text-accent">Add Yours.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-body text-lg md:text-xl mb-10 leading-relaxed"
        >
          This isn&apos;t about voting for Fedor. It&apos;s about imagining the
          world you&apos;d want to live in and adding your voice to the
          conversation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="https://form.typeform.com/to/y2NrRDGp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-accent text-white px-10 py-5 rounded-[20px] text-xl font-semibold shadow-[0_4px_14px_rgba(171,19,87,0.35),0_1px_3px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_28px_rgba(171,19,87,0.5)] hover:scale-[1.03] transition-all duration-300"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            Nominate Your World
          </a>
        </motion.div>

        {/* Decorative accent dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-12 flex justify-center gap-2"
        >
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-accent/30"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
