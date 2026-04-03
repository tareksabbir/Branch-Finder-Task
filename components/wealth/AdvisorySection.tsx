"use client";
import { motion } from "framer-motion";
import React from "react";

const AdvisorySection = () => {
  return (
    <section className="py-40 px-[5%] md:px-0 max-w-7xl mx-auto overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        {/* Content Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-gold font-jost text-xs uppercase tracking-[0.4em] font-bold mb-6 block">
            Elite Advisory
          </span>
          <h2 className="font-playfair text-[clamp(2.5rem,4vw,3.5rem)] font-bold text-midnight leading-[1.2] mb-10">
            Strategic Minds <br />
            <span className="text-deep-teal italic">For Your Capital.</span>
          </h2>
          <p className="text-slate text-lg mb-10 leading-relaxed font-light">
            At Brightstream Bank, our advisors aren't just experts—they're your
            life partners in financial success. Every decision, transition, and
            generational growth plan is crafted with high-end precision.
          </p>

          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-linear-to-br from-gold to-deep-teal rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold">
                1
              </div>
              <div>
                <h4 className="font-playfair text-xl font-bold text-midnight mb-2">
                  Private Wealth Portfolios
                </h4>
                <p className="text-slate text-sm font-light">
                  Bespoke investment strategies precisely aligned with your
                  unique goals and risk tolerance.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-linear-to-br from-gold to-deep-teal rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold">
                2
              </div>
              <div>
                <h4 className="font-playfair text-xl font-bold text-midnight mb-2">
                  Global Market Intelligence
                </h4>
                <p className="text-slate text-sm font-light">
                  Real-time analysis and exclusive insights from top
                  international experts to capture elite opportunities.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Imagery Side */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative aspect-[4/5] group"
        >
          <div className="absolute inset-0 border-2 border-gold/30 -m-8 z-0 hidden lg:block" />
          <div className="relative z-10 w-full h-full overflow-hidden shadow-2xl rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=2670"
              alt="Wealth Advisory Presentation"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-midnight/20 hover:bg-midnight/10 transition-colors" />
          </div>
          {/* Decorative Card */}
          <div className="absolute -bottom-10 -left-10 bg-midnight p-8 text-warm-white rounded-xl shadow-2xl z-20 max-w-xs border border-gold/20">
            <p className="font-playfair text-lg italic mb-2">
              "Wealth is the result of focused strategic action."
            </p>
            <span className="text-[0.7rem] uppercase tracking-widest font-bold text-gold opacity-80">
              — Chief Investment Officer
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AdvisorySection;
