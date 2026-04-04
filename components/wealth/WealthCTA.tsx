"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Modal from "@/components/home/modal";

const WealthCTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="px-[5%] md:px-0 py-40 bg-linear-to-br from-midnight to-deep-teal text-center relative overflow-hidden cta-radial">
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold font-jost text-xs uppercase tracking-[0.6em] font-bold mb-6 block">
            Elite Access
          </span>
          <h2 className="font-playfair text-[clamp(2rem,5vw,3.5rem)] font-bold text-warm-white mb-8">
            Secure Your Private Consultation
          </h2>
          <p className="text-[1.2rem] text-cream mb-12 font-light max-w-2xl mx-auto leading-relaxed">
            Join our exclusive network of high-net-worth clients and experience
            a level of financial strategy reserved for the top 1%.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="py-5 px-14 rounded-full font-medium text-midnight bg-gold shadow-2xl hover:bg-warm-white hover:-translate-y-1.5 transition-all duration-400 cursor-pointer text-lg tracking-wide uppercase"
          >
            Inquire Now
          </button>
        </motion.div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Decorative Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-midnight/20 to-transparent pointer-events-none" />
    </section>
  );
};

export default WealthCTA;
