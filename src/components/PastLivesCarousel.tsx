"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { pastLives } from "@/data/past-lives";

export default function PastLivesCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Past Lives of Your
          <br />
          <span className="text-accent">Future President</span>
        </motion.h2>
      </div>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="carousel-scroll flex gap-6 overflow-x-auto px-6 pb-6 snap-x snap-mandatory"
        style={{ scrollbarWidth: "thin" }}
      >
        {/* Leading spacer for centering on wide screens */}
        <div className="flex-shrink-0 w-[calc((100vw-1280px)/2)] hidden xl:block" />

        {pastLives.map((life, index) => (
          <motion.div
            key={life.year}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 * index + 0.3 }}
            className="flex-shrink-0 w-[260px] sm:w-[300px] snap-center group"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <Image
                src={life.image}
                alt={`Fedor in ${life.year} — ${life.label}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Year overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p
                  className="text-white/70 text-sm uppercase tracking-[0.2em] mb-1"
                  style={{ fontFamily: "var(--font-ui)" }}
                >
                  {life.label}
                </p>
                <p
                  className="text-white text-3xl font-bold"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  {life.year}
                </p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Trailing spacer */}
        <div className="flex-shrink-0 w-6" />
      </motion.div>
    </section>
  );
}
