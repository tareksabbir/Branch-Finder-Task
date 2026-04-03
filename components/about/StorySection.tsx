"use client";
import { motion } from "framer-motion";
import React from "react";

const TEAM = [
    {
        name: "Arthur Brightstream",
        role: "Founder & Chairman",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=2487"
    },
    {
        name: "Elizabeth Vance",
        role: "CEO & President",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=2488"
    },
    {
        name: "Marcus Thorne",
        role: "Head of Wealth Management",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=2487"
    }
];

const StorySection = () => {
    return (
        <section className="px-[5%] md:px-0 py-40 max-w-7xl mx-auto overflow-hidden">
            <div className="text-center mb-20">
                <span className="text-gold font-jost text-xs uppercase tracking-[0.4em] font-bold mb-4 block underline-offset-8 decoration-gold/40 underline decoration-solid">The Story</span>
                <h2 className="font-playfair text-[clamp(2.2rem,4vw,3.2rem)] font-bold text-midnight mb-6 leading-tight">
                    Rooted in Stability. <br />
                    <span className="text-deep-teal">Driven by Progress.</span>
                </h2>
                <p className="max-w-3xl mx-auto text-slate font-light text-lg leading-relaxed">
                    Founded in the heart of the financial district, Brightstream Bank began as a private institution 
                    dedicated to several families and businesses. Today, we serve thousands across the globe, 
                    yet we remain true to our heritage: absolute discretion and unparalleled service.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 mt-16">
                {TEAM.map((member, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="group text-center"
                    >
                        <div className="relative aspect-[3/4] mb-8 overflow-hidden rounded-2xl shadow-lg border-2 border-cream transition-all duration-500 group-hover:border-gold group-hover:shadow-2xl">
                            <img 
                                src={member.image} 
                                alt={member.name} 
                                className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0" 
                            />
                        </div>
                        <h4 className="font-playfair text-xl font-bold text-midnight mb-2 group-hover:text-gold transition-colors">{member.name}</h4>
                        <p className="text-slate/60 text-xs uppercase tracking-widest font-bold font-jost mb-4">{member.role}</p>
                        <div className="w-12 h-px bg-gold/20 mx-auto transition-all duration-500 group-hover:w-24 group-hover:bg-gold" />
                    </motion.div>
                ))}
            </div>

            {/* Closing Statement */}
            <div className="mt-32 p-16 bg-navy text-warm-white rounded-3xl relative overflow-hidden shadow-midnight/30 shadow-2xl">
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-10 w-60 h-60 bg-deep-teal/10 blur-[100px] pointer-events-none" />
                
                <div className="relative z-10 text-center max-w-3xl mx-auto">
                    <h3 className="font-playfair text-2xl md:text-3xl font-bold mb-8">
                        The Brightstream Promise
                    </h3>
                    <p className="text-cream text-lg font-light leading-relaxed mb-10 italic">
                        "Financial prosperity is not just an end goal—it's a path. We're here to walk it with you, every step, every decision, every year."
                    </p>
                    <div className="w-20 h-px bg-gold mx-auto mb-4" />
                    <span className="text-[0.7rem] uppercase tracking-widest font-medium text-gold">The Executive Board</span>
                </div>
            </div>
        </section>
    );
};

export default StorySection;
