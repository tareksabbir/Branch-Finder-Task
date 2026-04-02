/* eslint-disable react/no-unescaped-entities */
"use client";
import Features from "@/components/home/features";
import Hero from "@/components/home/hero";
import ImageBanner from "@/components/home/imageBanner";
import Modal from "@/components/home/modal";
import Products from "@/components/home/products";
import Trust from "@/components/home/trust";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { useState } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Features />
      <ImageBanner />
      <Products />
      <Trust />

      {/* CTA Section (inline for simplicity) */}
      <section className="py-32 px-[5%] bg-linear-to-br from-midnight to-deep-teal text-center relative overflow-hidden cta-radial">
        <div className="relative z-10 max-w-200 mx-auto">
          <h2 className="font-playfair text-[clamp(2.5rem,5vw,4rem)] font-bold text-warm-white mb-6">
            Ready to Join Brightstream?
          </h2>
          <p className="text-[1.3rem] text-cream mb-12 font-light">
            Join us today and experience banking that's truly designed for your
            success.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="py-4 px-10 rounded-full font-medium text-midnight bg-gold shadow-lg hover:-translate-y-1 transition-all duration-400"
          >
            Open Your Account
          </button>
        </div>
      </section>

      <Footer />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
