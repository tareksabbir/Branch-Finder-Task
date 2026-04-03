/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import AboutHero from "@/components/about/AboutHero";
import MissionSection from "@/components/about/MissionSection";
import ValueGrid from "@/components/about/ValueGrid";
import StorySection from "@/components/about/StorySection";
import Modal from "@/components/home/modal";
import { motion } from "framer-motion";

export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="relative bg-warm-white">
      <AboutHero />
      <MissionSection />
      <ValueGrid />
      <StorySection />

      {/* CTA Section (consistent with home page) */}
      <section className="py-32 px-[5%] bg-linear-to-br from-midnight to-deep-teal text-center relative overflow-hidden cta-radial">
        <div className="relative z-10 max-w-200 mx-auto">
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
          >
            <h2 className="font-playfair text-[clamp(2rem,4vw,3.5rem)] font-bold text-warm-white mb-6">
                Ready to Join Brightstream?
            </h2>
            <p className="text-[1.3rem] text-cream mb-12 font-light">
                Experience excellence in banking. Join us today and secure your future.
            </p>
            <button
                onClick={() => setIsModalOpen(true)}
                className="py-4 px-10 rounded-full font-medium text-midnight bg-gold shadow-lg hover:-translate-y-1 transition-all duration-400 cursor-pointer"
            >
                Open Your Account
            </button>
          </motion.div>
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
