"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { Transition, Variants } from "framer-motion";

// Reusable Easing curves
export const EASE_EDITORIAL = [0.22, 1, 0.36, 1] as const;
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_SMOOTH = [0.4, 0, 0.2, 1] as const;

// Reusable Durations (seconds)
export const DURATION_FAST = 0.18;
export const DURATION_NORMAL = 0.28;
export const DURATION_REVEAL = 0.45;
export const DURATION_SLOW = 0.6;

// Reusable Stagger timings
export const STAGGER_FAST = 0.04;
export const STAGGER_NORMAL = 0.08;
export const STAGGER_SLOW = 0.12;

// Standard Framer Motion transitions
export const transitionEditorial: Transition = {
  duration: DURATION_REVEAL,
  ease: EASE_EDITORIAL
};

export const transitionFast: Transition = {
  duration: DURATION_FAST,
  ease: EASE_OUT
};

export const transitionNormal: Transition = {
  duration: DURATION_NORMAL,
  ease: EASE_OUT
};

// Section & Item Reveal Variants (One-time viewport reveals)
export const revealFadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION_REVEAL, ease: EASE_EDITORIAL }
  }
};

export const revealFadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION_NORMAL, ease: EASE_OUT }
  }
};

export const staggerContainer = (staggerDelay = STAGGER_NORMAL, delayChildren = 0.05): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren
    }
  }
});

// Reusable button & card micro-interactions
export const buttonPressVariants: Variants = {
  hover: { y: -1, transition: { duration: DURATION_FAST, ease: EASE_OUT } },
  tap: { scale: 0.98, y: 0, transition: { duration: 0.1 } }
};

export const cardHoverVariants: Variants = {
  initial: { y: 0, borderColor: "#D9CCB8" },
  hover: {
    y: -3,
    borderColor: "#AC9062",
    transition: { duration: DURATION_NORMAL, ease: EASE_OUT }
  },
  tap: { scale: 0.99, transition: { duration: 0.1 } }
};

// Standard accessible keyboard focus ring classes
export const FOCUS_RING = "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#590B20] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F4EE]";

/**
 * Hook to pause continuous ambient effects when browser tab is hidden (visibilitychange)
 * or when user prefers reduced motion.
 */
export function useAmbientAnimation(enabled: boolean = true) {
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!enabled) {
      setIsPlaying(false);
      return;
    }

    const checkReducedMotion = () => {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    };

    if (checkReducedMotion()) {
      setIsPlaying(false);
      return;
    }

    const handleVisibilityChange = () => {
      setIsPlaying(!document.hidden && !checkReducedMotion());
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [enabled]);

  return isPlaying;
}

/**
 * Hook for subtle 1–2 degree desktop card tilt (active only on fine-pointer desktop devices).
 * Strictly clamped to [-1.8, 1.8] degrees.
 */
export function useFinePointerTilt() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const isFinePointer = useRef(false);

  useEffect(() => {
    isFinePointer.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isFinePointer.current || !cardRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Maximum 1.5 degrees tilt
    const maxTilt = 1.5;
    const rotateY = ((x - centerX) / centerX) * maxTilt;
    const rotateX = -((y - centerY) / centerY) * maxTilt;

    setTilt({
      rotateX: Math.max(-maxTilt, Math.min(maxTilt, rotateX)),
      rotateY: Math.max(-maxTilt, Math.min(maxTilt, rotateY))
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  return {
    ref: cardRef,
    style: {
      transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
      transition: tilt.rotateX === 0 && tilt.rotateY === 0 ? "transform 0.3s ease-out" : "none"
    },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave
  };
}
