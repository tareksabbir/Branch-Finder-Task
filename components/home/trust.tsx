/* eslint-disable react/no-unescaped-entities */
"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { num: "2M+", label: "Satisfied Customers" },
  { num: "$45B", label: "Assets Under Management" },
  { num: "98%", label: "Customer Satisfaction" },
  { num: "150+", label: "Global Locations" }
];

const Trust = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="about" className="py-32 px-[5%] bg-warm-white">
      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-20 max-w-350 mx-auto items-center">
        <div 
          className="h-150 bg-cover bg-center rounded-[30px] shadow-2xl"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551135049-8a33b5883817?w=1000&q=90')" }}
        />
        
        <div>
          <h2 className="font-playfair text-[clamp(2.5rem,4vw,3.5rem)] font-bold text-midnight mb-8 tracking-[-1px]">
            Trusted by Millions, Built on Integrity
          </h2>
          <p className="text-lg text-slate font-light leading-relaxed mb-6">
            For over three decades, we've been more than a bank. We're a partner in your financial journey, committed to transparency and innovation.
          </p>
          
          <div className="grid grid-cols-2 gap-8 mt-12">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-8 bg-cream rounded-[20px]"
              >
                <span className="font-playfair text-[3rem] font-bold text-gold block mb-2">{s.num}</span>
                <span className="text-sm text-slate uppercase tracking-wider">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trust;