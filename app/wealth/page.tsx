/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import WealthHero from "@/components/wealth/WealthHero";
import WealthServices from "@/components/wealth/WealthServices";
import AdvisorySection from "@/components/wealth/AdvisorySection";
import WealthCTA from "@/components/wealth/WealthCTA";

export default function WealthPage() {
  return (
    <main className="relative bg-warm-white">
      <WealthHero />
      <WealthServices />
      <AdvisorySection />
      <WealthCTA />
    </main>
  );
}
