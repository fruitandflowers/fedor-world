"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Four spring presets from MainPage.mjs (DEFINITIVE):
 * STANDARD: stiffness 400, damping 60, mass 1 — most section images, Earth, footer
 * HEAVY:    stiffness 400, damping 60, mass 2 — large landscapes, canyon panels
 * FAST:     stiffness 500, damping 60, mass 1 — canyon scale reveal, nominate scroll
 * NAV:      stiffness 600, damping 60, mass 1 — portrait entrance, navigation
 */
export const SPRING_STANDARD = { stiffness: 400, damping: 60, mass: 1 };
export const SPRING_HEAVY = { stiffness: 400, damping: 60, mass: 2 };
export const SPRING_FAST = { stiffness: 500, damping: 60, mass: 1 };
export const SPRING_NAV = { stiffness: 600, damping: 60, mass: 1 };

interface ScaleRevealProps {
  children: React.ReactNode;
  className?: string;
  initialScale?: number;
  spring?: { stiffness: number; damping: number; mass: number };
  /** Additional initial properties (e.g. { y: 60 } for compound animations) */
  initialExtra?: Record<string, number>;
  /** Additional final properties (e.g. { y: 0 }) */
  finalExtra?: Record<string, number>;
  threshold?: number;
}

/**
 * Scale Reveal — The signature scroll effect from fedor.world.
 *
 * An image starts at scale(0.9) inside an overflow:hidden container.
 * When in viewport, it springs to scale(1.0).
 * The overflow:hidden clips the edges during the 0.9 state, creating
 * the illusion of the image EXPANDING to fill the screen.
 *
 * Without overflow:hidden, the effect is invisible.
 *
 * Source: MainPage.mjs — 4 spring configs (see exports above).
 */
export default function ScaleReveal({
  children,
  className = "",
  initialScale = 0.9,
  spring = SPRING_STANDARD,
  initialExtra = {},
  finalExtra = {},
  threshold = 0.5,
}: ScaleRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: threshold,
  });

  const initialState = { scale: initialScale, ...initialExtra };
  const finalState = { scale: 1, ...finalExtra };

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={initialState}
        animate={isInView ? finalState : initialState}
        transition={{
          type: "spring",
          stiffness: spring.stiffness,
          damping: spring.damping,
          mass: spring.mass,
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
