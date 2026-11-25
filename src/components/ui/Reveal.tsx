"use client";

import React from "react";
import { motion, useReducedMotion, type Variants, type Transition } from "framer-motion";
import { EASE_EDITORIAL, STAGGER_NORMAL } from "@/lib/motion";

/**
 * Shared scroll-reveal primitives.
 *
 * Every section on the site uses these instead of hand-rolling `whileInView`,
 * so entrance timing, easing and the reduced-motion escape hatch stay
 * identical everywhere. All reveals fire once; nothing re-animates when the
 * reader scrolls back up.
 */

export type RevealVariant =
  | "up"
  | "down"
  | "left"
  | "right"
  | "fade"
  | "scale"
  | "blur";

type MotionTag =
  | "div"
  | "section"
  | "article"
  | "ul"
  | "ol"
  | "li"
  | "span"
  | "aside"
  | "header"
  | "p";

const HIDDEN_STATE: Record<RevealVariant, Record<string, number | string>> = {
  up: { opacity: 0, y: 24 },
  down: { opacity: 0, y: -24 },
  left: { opacity: 0, x: -28 },
  right: { opacity: 0, x: 28 },
  fade: { opacity: 0 },
  scale: { opacity: 0, scale: 0.965 },
  blur: { opacity: 0, y: 16, filter: "blur(8px)" },
};

const SHOWN_STATE: Record<RevealVariant, Record<string, number | string>> = {
  up: { opacity: 1, y: 0 },
  down: { opacity: 1, y: 0 },
  left: { opacity: 1, x: 0 },
  right: { opacity: 1, x: 0 },
  fade: { opacity: 1 },
  scale: { opacity: 1, scale: 1 },
  blur: { opacity: 1, y: 0, filter: "blur(0px)" },
};

interface RevealProps {
  children: React.ReactNode;
  /** Direction / character of the entrance. Defaults to a short rise. */
  variant?: RevealVariant;
  /** Seconds to wait after the element enters the viewport. */
  delay?: number;
  duration?: number;
  /** How far past the viewport edge the element must travel before firing. */
  margin?: string;
  className?: string;
  style?: React.CSSProperties;
  as?: MotionTag;
  id?: string;
}

/** A single element that rises into place the first time it is scrolled into view. */
export function Reveal({
  children,
  variant = "up",
  delay = 0,
  duration = 0.55,
  margin = "-70px",
  className,
  style,
  as = "div",
  id,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;

  if (shouldReduceMotion) {
    const Plain = as as React.ElementType;
    return (
      <Plain className={className} style={style} id={id}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag
      id={id}
      data-reveal=""
      className={className}
      style={style}
      initial={HIDDEN_STATE[variant]}
      whileInView={SHOWN_STATE[variant]}
      viewport={{ once: true, margin }}
      transition={{ duration, delay, ease: EASE_EDITORIAL }}
    >
      {children}
    </Tag>
  );
}

interface RevealGroupProps {
  children: React.ReactNode;
  /** Gap between each child's entrance. */
  stagger?: number;
  /** Pause before the first child begins. */
  delayChildren?: number;
  margin?: string;
  className?: string;
  as?: MotionTag;
  id?: string;
}

/**
 * Wraps a list or grid so its `RevealItem` children cascade in sequence.
 * The container itself stays visible — only the children animate — which
 * keeps layout stable and avoids a flash of an empty grid.
 */
export function RevealGroup({
  children,
  stagger = STAGGER_NORMAL,
  delayChildren = 0.04,
  margin = "-70px",
  className,
  as = "div",
  id,
}: RevealGroupProps) {
  const shouldReduceMotion = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;

  if (shouldReduceMotion) {
    const Plain = as as React.ElementType;
    return (
      <Plain className={className} id={id}>
        {children}
      </Plain>
    );
  }

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };

  return (
    <Tag
      id={id}
      data-reveal=""
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin }}
    >
      {children}
    </Tag>
  );
}

interface RevealItemProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: MotionTag;
}

/** A child of `RevealGroup`. Inherits its turn in the cascade from the parent. */
export function RevealItem({
  children,
  variant = "up",
  duration = 0.5,
  className,
  style,
  as = "div",
}: RevealItemProps) {
  const shouldReduceMotion = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;

  if (shouldReduceMotion) {
    const Plain = as as React.ElementType;
    return (
      <Plain className={className} style={style}>
        {children}
      </Plain>
    );
  }

  const transition: Transition = { duration, ease: EASE_EDITORIAL };

  const item: Variants = {
    hidden: HIDDEN_STATE[variant],
    visible: { ...SHOWN_STATE[variant], transition },
  };

  return (
    <Tag data-reveal="" className={className} style={style} variants={item}>
      {children}
    </Tag>
  );
}

interface RevealHeadingProps {
  /** Plain text only — it is split on whitespace so each word can rise alone. */
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  stagger?: number;
  delay?: number;
}

/**
 * Editorial headline that assembles itself word by word. The visible text is
 * unchanged — the words are simply wrapped so each can carry its own
 * transform, and the whole phrase stays selectable and readable to
 * screen readers as one string.
 */
export function RevealHeading({
  text,
  className,
  as = "h2",
  stagger = 0.045,
  delay = 0,
}: RevealHeadingProps) {
  const shouldReduceMotion = useReducedMotion();
  const Heading = as;

  if (shouldReduceMotion) {
    return <Heading className={className}>{text}</Heading>;
  }

  const words = text.split(" ");
  const MotionHeading = motion[as] as typeof motion.h2;

  return (
    <MotionHeading
      data-reveal=""
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <React.Fragment key={`${word}-${i}`}>
          <motion.span
            data-reveal=""
            // No overflow mask here on purpose: these headings run at
            // leading-[1.05], which would clip descenders on words like
            // "Engineering". A short rise plus a blur reads the same.
            className="inline-block"
            aria-hidden="true"
            variants={{
              hidden: { y: "0.35em", opacity: 0, filter: "blur(6px)" },
              visible: {
                y: "0em",
                opacity: 1,
                filter: "blur(0px)",
                transition: { duration: 0.6, ease: EASE_EDITORIAL },
              },
            }}
          >
            {word}
          </motion.span>
          {/* Real whitespace between the words, so the heading still wraps */}
          {i < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </MotionHeading>
  );
}

export default Reveal;
