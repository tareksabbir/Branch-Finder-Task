"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const MissionSection = () => {
  return (
    <section className="px-[5%] md:px-0 py-40 max-w-7xl mx-auto overflow-hidden">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Image Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative aspect-square group"
        >
          <div className="absolute inset-0 border-2 border-gold/30 -m-6 z-0 hidden lg:block" />
          <div className="relative z-10 w-full h-full overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1709050939155-78bb8f4c9fef?q=80&w=3606&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Brightstream Collaboration"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          {/* Decorative Elements */}
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gold/10 -z-10 blur-3xl" />
        </motion.div>

        {/* Text Side */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <span className="text-gold font-jost text-xs uppercase tracking-[0.4em] font-bold mb-6 block">
            Our Mission
          </span>
          <h2 className="font-playfair text-[clamp(2rem,3.5vw,2.8rem)] font-bold text-midnight leading-[1.2] mb-8">
            Redefining Wealth <br />
            <span className="text-deep-teal">Through Integrity.</span>
          </h2>
          <p className="text-slate text-lg mb-8 leading-relaxed font-light">
            For over fifty years, Brightstream Bank has stood as a beacon of
            financial stability and visionary thinking. We combine the wisdom of
            traditional banking with the agility of modern innovation.
          </p>
          <p className="text-slate text-lg mb-12 leading-relaxed font-light">
            Our goal is simple: to provide our clients with the tools, the
            expertise, and the absolute security they need to navigate an
            ever-changing world. At the heart of everything we do is a
            commitment to transparency and personalized service.
          </p>

          {/* Stats or Highlights */}
          <div className="grid grid-cols-2 gap-8 border-t border-cream pt-10">
            <div>
              <span className="block text-3xl font-playfair font-bold text-gold mb-1">
                50+
              </span>
              <span className="text-xs uppercase tracking-widest text-slate/60 font-medium">
                Years of Excellence
              </span>
            </div>
            <div>
              <span className="block text-3xl font-playfair font-bold text-gold mb-1">
                1,000+
              </span>
              <span className="text-xs uppercase tracking-widest text-slate/60 font-medium">
                Global Branches
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionSection;
