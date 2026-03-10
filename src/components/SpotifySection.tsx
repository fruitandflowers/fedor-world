"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function SpotifySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-foreground text-white"
    >
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Jam With Your{" "}
          <span className="text-accent">President</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-white/60 text-center text-lg mb-12"
        >
          The official soundtrack to a world worth living in.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-2xl overflow-hidden shadow-2xl"
        >
          <iframe
            src="https://open.spotify.com/embed/playlist/7BpT9kXGxvOxWlEjV23YHl?utm_source=generator&theme=0"
            width="100%"
            height="380"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="border-0"
            title="Fedor's World President Playlist"
          />
        </motion.div>
      </div>
    </section>
  );
}
