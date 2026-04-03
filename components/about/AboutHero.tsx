"use client";
import { motion } from "framer-motion";
import React from "react";

const AboutHero = () => {
  return (
    <section className="bg-linear-to-br from-midnight to-deep-teal text-center relative overflow-hidden cta-radial pt-52 pb-28">
      {/* Gradient overlay to keep text legible and preserve brand colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-teal/85 via-midnight/70 to-deep-teal/80" />
      {/* Subtle vignette for depth */}
      <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.45)_100%)]" />

      <div className="relative w-full max-w-7xl mx-auto text-center px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="h-px w-7 bg-gold/40" />
            <span className="text-[0.85rem] font-semibold text-white uppercase tracking-[0.16em]">
              Our Legacy
            </span>
            <span className="h-px w-7 bg-gold/40" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-warm-white leading-[1.15] mb-8 font-playfair"
          >
            Banking Crafted for <br />
            <span className="text-gold italic">Generations.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-warm-white/50 font-light text-[1.15rem] max-w-2xl mx-auto leading-relaxed"
          >
            At Brightstream Bank, we believe that true wealth is more than just
            numbers. It's the freedom to dream, the security to build, and the
            legacy you leave behind.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
