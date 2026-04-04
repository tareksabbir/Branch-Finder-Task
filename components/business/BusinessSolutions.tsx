"use client";
import { motion } from "framer-motion";
import { Landmark, CreditCard, PieChart, Globe } from "lucide-react";
import React from "react";

const SOLUTIONS = [
  {
    icon: <Landmark className="w-8 h-8 text-gold" />,
    title: "Enterprise Banking",
    description:
      "Sophisticated corporate accounts designed for high-volume transactions and seamless liquidity management.",
  },
  {
    icon: <CreditCard className="w-8 h-8 text-gold" />,
    title: "Commercial Credit",
    description:
      "Tailored financing solutions, including credit lines up to $5M and equipment leasing with competitive rates.",
  },
  {
    icon: <PieChart className="w-8 h-8 text-gold" />,
    title: "Cash Management",
    description:
      "Optimized payment processing and real-time treasury insights to help you maintain absolute financial control.",
  },
  {
    icon: <Globe className="w-8 h-8 text-gold" />,
    title: "Global Trade Finance",
    description:
      "Expert advisory and strategic tools for international expansion, export financing, and global logistics support.",
  },
];

const BusinessSolutions = () => {
  return (
    <section className="py-24 bg-warm-white">
      <div className="px-[5%] md:px-0 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-gold font-jost text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
            Strategic Scale
          </span>
          <h2 className="font-playfair text-[clamp(2.2rem,4vw,3rem)] font-bold text-midnight mb-6">
            Solutions for Modern Enterprises
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SOLUTIONS.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-cream/10 p-10 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 border border-cream group"
            >
              <div className="mb-8 w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:bg-gold/10 transition-colors duration-500 shadow-sm">
                {solution.icon}
              </div>
              <h3 className="font-playfair text-[1.4rem] font-bold text-midnight mb-4 group-hover:text-gold transition-colors">
                {solution.title}
              </h3>
              <p className="text-slate/80 text-sm leading-relaxed font-light">
                {solution.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessSolutions;
