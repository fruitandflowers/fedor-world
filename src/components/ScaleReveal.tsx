"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ScaleRevealProps {
  children: React.ReactNode;
  className?: string;
  initialScale?: number;
  stiffness?: number;
  threshold?: number;
}

/**
 * Scale Reveal — The signature scroll effect from fedor.world.
 *
 * An image starts at scale(0.9) inside an overflow:hidden container.
 * When fully in viewport, it springs to scale(1.0).
 * The overflow:hidden clips the edges during the 0.9 state, creating
 * the illusion of the image EXPANDING to fill the screen — the "rocks
 * opening" sensation.
 *
 * Without overflow:hidden, the effect is invisible.
 *
 * Source: Framer compiled JS — spring stiffness 400, damping 60, mass 1.
 */
export default function ScaleReveal({
  children,
  className = "",
  initialScale = 0.9,
  stiffness = 400,
  threshold = 0.5,
}: ScaleRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: threshold,
  });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ scale: initialScale }}
        animate={isInView ? { scale: 1 } : { scale: initialScale }}
        transition={{
          type: "spring",
          stiffness,
          damping: 60,
          mass: 1,
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
