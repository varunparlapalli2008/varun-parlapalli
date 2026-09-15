"use client";

import React from "react";
import FullWidthHero from "./FullWidthHero";
import { PortfolioProfile } from "@/types/portfolio";

export default function HeroSection({ profile }: { profile?: PortfolioProfile }) {
  return <FullWidthHero profile={profile} />;
}
