"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useScrollProgress, useMagnetic, FOCUS_RING } from "@/lib/motion";

const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Floating return-to-top control with a gold progress ring.
 *
 * Sits bottom-left so it never collides with the AI launcher, and only
 * appears once the reader is more than a screen deep — before that it would
 * be noise.
 */
export default function ScrollToTop() {
  const progress = useScrollProgress();
  const [visible, setVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const {
    ref: buttonRef,
    onMouseMove: onButtonMove,
    onMouseLeave: onButtonLeave,
  } = useMagnetic<HTMLButtonElement>(0.18, 5);

  useEffect(() => {
    let raf: number | null = null;

    const measure = () => {
      raf = null;
      setVisible(window.scrollY > window.innerHeight * 0.9);
    };

    const onScroll = () => {
      if (raf === null) raf = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (raf !== null) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 14 }}
          transition={{
            duration: shouldReduceMotion ? 0.05 : 0.28,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed bottom-5 left-5 sm:bottom-7 sm:left-7 z-40"
        >
          <button
            ref={buttonRef}
            onMouseMove={onButtonMove}
            onMouseLeave={onButtonLeave}
            onClick={scrollToTop}
            aria-label="Return to the top of the page"
            className={`group relative grid h-12 w-12 place-items-center rounded-full border border-[#D9CCB8] bg-[#F7F4EE]/90 text-[#590B20] shadow-[0_8px_26px_rgba(89,11,32,0.12)] backdrop-blur-md transition-colors duration-200 hover:border-[#AC9062] hover:bg-white cursor-pointer ${FOCUS_RING}`}
          >
            {/* Reading-progress ring */}
            <svg
              className="ring-origin-top pointer-events-none absolute inset-0 -rotate-90"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <circle
                cx="24"
                cy="24"
                r={RADIUS}
                fill="none"
                stroke="#E8DFD1"
                strokeWidth="1.5"
              />
              <circle
                cx="24"
                cy="24"
                r={RADIUS}
                fill="none"
                stroke="#AC9062"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={CIRCUMFERENCE * (1 - progress / 100)}
                style={{ transition: "stroke-dashoffset 120ms linear" }}
              />
            </svg>

            <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
