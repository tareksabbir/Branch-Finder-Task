"use client";
import { motion } from "framer-motion";

const ImageBanner = () => {
  return (
    <section
      className="h-[70vh] bg-cover bg-center bg-fixed flex items-center justify-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=90')",
      }}
    >
      <div className="banner-overlay absolute inset-0" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center text-warm-white max-w-200 px-8 relative z-10"
      >
        <h2 className="font-playfair text-[clamp(2.5rem,5vw,4rem)] font-bold mb-6 tracking-[-1px]">
          Your Financial Future, Elevated
        </h2>
        <p className="text-[1.3rem] font-light opacity-95">
          Join over 2 million customers who trust Brightstream with their
          financial journey
        </p>
      </motion.div>
    </section>
  );
};

export default ImageBanner;
