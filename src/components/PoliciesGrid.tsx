"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { policies } from "@/data/policies";

export default function PoliciesGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} id="policies" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Policies And Worlds
          <br />
          <span className="text-accent">In Action</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-body text-center text-lg max-w-2xl mx-auto mb-16"
        >
          Each policy is an invitation to reimagine how we live together.
          Explore the ideas shaping a world worth presiding over.
        </motion.p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {policies.map((policy, index) => (
            <motion.div
              key={policy.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 * index + 0.2 }}
            >
              <Link
                href={`/policies/${policy.slug}`}
                className="policy-card group block rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={policy.image}
                    alt={policy.title}
                    fill
                    className="object-cover"
                  />
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300" />
                </div>
                <div className="p-5">
                  <h3
                    className="text-lg font-bold mb-1 group-hover:text-accent transition-colors duration-300"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    {policy.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {policy.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
