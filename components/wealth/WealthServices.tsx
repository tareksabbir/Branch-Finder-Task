"use client";
import { motion } from "framer-motion";
import { Briefcase, LineChart, Landmark, Scale } from "lucide-react";
import React from "react";

const SERVICES = [
  {
    icon: <Landmark className="w-8 h-8 text-gold" />,
    title: "Private Banking",
    description:
      "Elite, concierge banking services for high-net-worth individuals, offering privacy, security, and global accessibility.",
  },
  {
    icon: <LineChart className="w-8 h-8 text-gold" />,
    title: "Investment Strategy",
    description:
      "Sophisticated asset allocation and portfolio management designed to capitalize on global market opportunities.",
  },
  {
    icon: <Scale className="w-8 h-8 text-gold" />,
    title: "Estate Planning",
    description:
      "Strategic legacy preservation and tax optimization to ensure your wealth is passed down according to your vision.",
  },
  {
    icon: <Briefcase className="w-8 h-8 text-gold" />,
    title: "Family Office Services",
    description:
      "Comprehensive financial management for families, including multi-generational planning and philanthropic advisory.",
  },
];

const WealthServices = () => {
  return (
    <section className="py-24 bg-warm-white overflow-hidden">
      <div className="px-[5%] md:px-0 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-gold font-jost text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
            World-Class Solutions
          </span>
          <h2 className="font-playfair text-[clamp(2.2rem,4vw,3.2rem)] font-bold text-midnight mb-6">
            Mastering the Art of Wealth
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-cream/20 p-10 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 border border-cream group"
            >
              <div className="mb-8 w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:bg-gold/10 transition-colors duration-500 shadow-sm">
                {service.icon}
              </div>
              <h3 className="font-playfair text-[1.4rem] font-bold text-midnight mb-4 group-hover:text-gold transition-colors">
                {service.title}
              </h3>
              <p className="text-slate/80 text-sm leading-relaxed font-light">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WealthServices;
