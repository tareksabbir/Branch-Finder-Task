"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Wallet, ShieldCheck, Mail } from "lucide-react";

const PersonalHero = () => {
  return (
    <section className="bg-linear-to-br from-midnight to-deep-teal relative pt-32 pb-20 overflow-hidden cta-radial">
      {/* Gradient overlay to keep text legible and preserve brand colors */}
      <div className="absolute inset-0 bg-linear-to-br from-deep-teal/85 via-midnight/70 to-deep-teal/80" />
      {/* Subtle vignette for depth */}
      <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.45)_100%)]" />

      <div className="container relative z-10 px-[5%] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8"
        >
          <div className="text-center md:text-left">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/20 text-gold text-sm font-medium mb-6 uppercase tracking-widest"
            >
              <ShieldCheck className="w-4 h-4" />
              Elite Membership
            </motion.div>

            <h1 className="font-playfair text-[3.5rem] md:text-[5rem] leading-[1.1] font-bold text-warm-white mb-4">
              Welcome back, <br />
              <span className="text-gold">Sebastian.</span>
            </h1>
            <p className="text-cream/60 text-lg md:text-xl font-light tracking-wide max-w-lg">
              Explore your wealth, manage your assets, and reimagining your
              future with Brightstream.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex items-center gap-4 bg-navy/50 backdrop-blur-md p-4 rounded-2xl border border-white/5">
              <div className="w-16 h-16 rounded-full bg-linear-to-tr from-gold to-sage p-0.5">
                <div className="w-full h-full rounded-full bg-midnight flex items-center justify-center overflow-hidden">
                  <User className="w-8 h-8 text-gold" />
                </div>
              </div>
              <div>
                <h4 className="text-warm-white font-medium text-lg leading-tight">
                  Sebastian Thorne
                </h4>
                <p className="text-cream/40 text-sm">
                  sebastian.t@brightstream.com
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <motion.div
                whileHover={{ y: -2 }}
                className="p-3 rounded-full bg-navy/40 border border-white/5 text-cream/70 hover:text-gold transition-colors cursor-pointer"
              >
                <Mail className="w-5 h-5" />
              </motion.div>
              <motion.div
                whileHover={{ y: -2 }}
                className="p-3 rounded-full bg-navy/40 border border-white/5 text-cream/70 hover:text-gold transition-colors cursor-pointer"
              >
                <Wallet className="w-5 h-5" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PersonalHero;
