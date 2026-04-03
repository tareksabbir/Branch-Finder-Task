"use client";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const Newsletter = () => {
  return (
    <section className="py-24 px-[5%] md:px-0 bg-cream text-center">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-[700px] mx-auto"
      >
        <h2 className="font-playfair text-[clamp(2.5rem,_4vw,_3.5rem)] font-bold text-midnight mb-6 tracking-[-1px]">
          Stay Informed
        </h2>
        <p className="text-lg text-slate mb-10 font-light">
          Subscribe to our newsletter for weekly financial insights, market updates, and exclusive banking tips delivered to your inbox.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 max-w-[500px] mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className="flex-1 py-4 px-6 border-2 border-midnight rounded-full outline-none focus:border-gold transition-colors"
            required 
          />
          <Button 
            type="submit"
            variant="primary"
          >
            Subscribe
          </Button>
        </form>
      </motion.div>
    </section>
  );
};

export default Newsletter;