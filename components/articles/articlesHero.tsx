"use client";
import { motion } from "framer-motion";

const ArticlesHero = () => {
  return (
    <section className="bg-linear-to-br from-midnight to-deep-teal text-center relative overflow-hidden cta-radial relative overflow-hidden">
      {/* Gradient overlay to keep text legible and preserve brand colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-teal/85 via-midnight/70 to-deep-teal/80" />
      {/* Subtle vignette for depth */}
      <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.45)_100%)]" />

      <div className="relative w-full max-w-7xl mx-auto text-center px-4 md:px-6 pt-52 pb-28">
        <div className="max-w-3xl mx-auto">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="h-px w-7 bg-gold/40" />
            <span className="text-[0.85rem] font-semibold text-white uppercase tracking-[0.16em]">
              Insights & Articles
            </span>
            <span className="h-px w-7 bg-gold/40" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-warm-white leading-[1.15] mb-4 font-playfair"
          >
            Financial Resources
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-warm-white/50 font-light text-[1.15rem] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Expert insights, guides, and analysis to help you make smarter
            financial decisions.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default ArticlesHero;
