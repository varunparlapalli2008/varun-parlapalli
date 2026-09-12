import React from "react";

export default function Monogram({ className = "w-12 h-14" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="PV Monogram"
    >
      {/* P Letter - Classical high contrast Bodoni serif */}
      <path
        d="M 12 10 L 30 10 C 40 10 44 14 44 23 C 44 32 38 36 28 36 L 20 36 L 20 62 L 12 62 Z"
        fill="#AC9062"
      />
      <path
        d="M 20 16 L 28 16 C 34 16 36 19 36 23 C 36 28 34 30 28 30 L 20 30 Z"
        fill="#F7F4EE"
      />
      {/* Top and bottom serifs on P */}
      <path d="M 8 10 L 22 10 L 22 12 L 8 12 Z" fill="#AC9062" />
      <path d="M 8 60 L 24 60 L 24 62 L 8 62 Z" fill="#AC9062" />

      {/* V Letter - Interlocking gracefully with P */}
      <path
        d="M 27 24 L 38 62 L 44 62 L 58 24 L 50 24 L 41 53 L 33 24 Z"
        fill="#AC9062"
      />
      {/* V left and right top serifs */}
      <path d="M 24 24 L 35 24 L 35 26 L 24 26 Z" fill="#AC9062" />
      <path d="M 46 24 L 60 24 L 60 26 L 46 26 Z" fill="#AC9062" />
    </svg>
  );
}
