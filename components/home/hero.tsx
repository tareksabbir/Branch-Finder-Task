"use client";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background with Zoom Animation */}
      <motion.div
        animate={{ scale: 1.1 }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1600&q=90')" }}
      >
        <div className="hero-overlay absolute inset-0" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-225 px-8">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="font-playfair text-[clamp(3rem,7vw,6rem)] font-bold text-warm-white leading-tight mb-6 tracking-[-2px]"
        >
          Banking Reimagined
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          className="text-[clamp(1.1rem,2vw,1.4rem)] text-cream mb-12 font-light tracking-wide"
        >
          Experience financial excellence crafted for the way you live, work, and dream. Where innovation meets unparalleled service.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.7 }}
          className="flex gap-6 justify-center flex-wrap"
        >
          <button className="py-4 px-10 rounded-full font-medium text-midnight bg-gold shadow-lg hover:-translate-y-1 transition-all duration-400">
            Open Account
          </button>
          <button className="py-4 px-10 rounded-full font-medium text-warm-white border-2 border-warm-white hover:bg-warm-white hover:text-midnight hover:-translate-y-1 transition-all duration-400">
            Explore Services
          </button>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-cream text-sm"
      >
        ↓
      </motion.div>
    </section>
  );
};

export default Hero;