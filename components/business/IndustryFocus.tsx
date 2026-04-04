/* eslint-disable react/no-unescaped-entities */
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const IndustryFocus = () => {
  return (
    <section className="px-[5%] md:px-0 py-40 max-w-7xl mx-auto overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        {/* Content Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-gold font-jost text-xs uppercase tracking-[0.4em] font-bold mb-6 block">
            Industry Expertise
          </span>
          <h2 className="font-playfair text-[clamp(2.5rem,4vw,3.5rem)] font-bold text-midnight leading-[1.2] mb-10">
            Sector-Specific <br />
            <span className="text-deep-teal italic">Strategic Power.</span>
          </h2>
          <p className="text-slate text-lg mb-10 leading-relaxed font-light">
            Every business sector has its own unique challenges. Brightstream
            provides deeper insights and tailored tools for each of them.
          </p>

          <div className="grid grid-cols-2 gap-8">
            <div className="p-6 bg-cream/10 border border-cream rounded-xl">
              <h4 className="font-playfair text-xl font-bold text-midnight mb-3">
                Technology
              </h4>
              <p className="text-slate/60 text-xs font-light">
                Specialized financing solutions for scale-ups and global tech
                conglomerates.
              </p>
            </div>
            <div className="p-6 bg-cream/10 border border-cream rounded-xl">
              <h4 className="font-playfair text-xl font-bold text-midnight mb-3">
                Healthcare
              </h4>
              <p className="text-slate/60 text-xs font-light">
                Advanced equipment leasing and pharmaceutical logistics support.
              </p>
            </div>
            <div className="p-6 bg-cream/10 border border-cream rounded-xl">
              <h4 className="font-playfair text-xl font-bold text-midnight mb-3">
                Global Logistics
              </h4>
              <p className="text-slate/60 text-xs font-light">
                Trade finance and working capital for international freight
                operations.
              </p>
            </div>
            <div className="p-6 bg-cream/10 border border-cream rounded-xl">
              <h4 className="font-playfair text-xl font-bold text-midnight mb-3">
                Sustainable Energy
              </h4>
              <p className="text-slate/60 text-xs font-light">
                ESG-focused capital for renewable infrastructure and green
                transitions.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Imagery Side */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative aspect-4/5 group"
        >
          <div className="absolute inset-0 border-2 border-gold/30 -m-8 z-0 hidden lg:block" />
          <div className="relative z-10 w-full h-full overflow-hidden shadow-2xl rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2670"
              alt="Modern Corporate Architecture"
              fill
              className="object-cover grayscale transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0"
            />
          </div>
          {/* Decorative Overlay */}
          <div className="absolute -bottom-10 -right-10 bg-midnight p-8 text-warm-white rounded-xl shadow-2xl z-20 max-w-xs border border-gold/20">
            <p className="font-playfair text-lg italic mb-2">
              "True scalability requires deep industry insights."
            </p>
            <span className="text-[0.7rem] uppercase tracking-widest font-bold text-gold opacity-80">
              — Head of Commercial Strategy
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IndustryFocus;
