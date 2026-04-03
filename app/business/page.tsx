/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import BusinessHero from "@/components/business/BusinessHero";
import BusinessSolutions from "@/components/business/BusinessSolutions";
import IndustryFocus from "@/components/business/IndustryFocus";
import BusinessCTA from "@/components/business/BusinessCTA";

export default function BusinessPage() {
  return (
    <main className="relative bg-warm-white">
      <BusinessHero />
      <BusinessSolutions />
      <IndustryFocus />
      <BusinessCTA />
    </main>
  );
}
