"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Modal from "@/components/home/modal";

const BusinessCTA = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="px-[5%] md:px-0 py-32 bg-linear-to-br from-midnight to-deep-teal text-center relative overflow-hidden cta-radial">
            <div className="relative z-10 max-w-4xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-gold font-jost text-xs uppercase tracking-[0.6em] font-bold mb-6 block underline decoration-solid decoration-gold/40">Scale Your Vision</span>
                    <h2 className="font-playfair text-[clamp(2rem,5vw,3.5rem)] font-bold text-warm-white mb-8">
                        Ready to Build the Future?
                    </h2>
                    <p className="text-[1.2rem] text-cream mb-12 font-light max-w-2xl mx-auto leading-relaxed">
                        Join thousands of global leaders who trust Brightstream Bank for their most critical strategic moves.
                    </p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="py-5 px-14 rounded-full font-medium text-midnight bg-gold shadow-2xl hover:bg-warm-white hover:-translate-y-1.5 transition-all duration-400 cursor-pointer text-lg tracking-wide uppercase transition-all duration-500"
                    >
                        Inquire Now
                    </button>
                </motion.div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-gold/5 blur-[100px] pointer-events-none" />
        </section>
    );
};

export default BusinessCTA;
