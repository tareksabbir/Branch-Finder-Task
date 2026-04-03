"use client";
import { motion } from "framer-motion";
import { Shield, Sparkles, Handshake, Users } from "lucide-react";
import React from "react";

const VALUES = [
    {
        icon: <Shield className="w-8 h-8 text-gold" />,
        title: "Unwavering Integrity",
        description: "Consistency and transparency are the foundations of every relationship we build. At Brightstream, your trust is our most valuable asset."
    },
    {
        icon: <Sparkles className="w-8 h-8 text-gold" />,
        title: "Forward Innovation",
        description: "We don't just keep up with the times—we push the boundaries of what's possible, integrating cutting-edge technology with traditional expertise."
    },
    {
        icon: <Handshake className="w-8 h-8 text-gold" />,
        title: "Personalized Excellence",
        description: "Every financial journey is unique. Our advisors provide bespoke strategies tailored precisely to your individual goals and aspirations."
    },
    {
        icon: <Users className="w-8 h-8 text-gold" />,
        title: "Global Community",
        description: "Banking is about more than just transactions. We are committed to fostering prosperity in the communities where we live and work."
    }
];

const ValueGrid = () => {
    return (
        <section className="py-24 bg-cream/30">
            <div className="px-[5%] md:px-0 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-gold font-jost text-xs uppercase tracking-[0.4em] font-bold mb-4 block underline-offset-8 decoration-gold/40">Our Foundation</span>
                    <h2 className="font-playfair text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-midnight mb-6">The Values that Guide Us</h2>
                    <div className="w-20 h-1 bg-gold mx-auto" />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {VALUES.map((value, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-warm-white p-10 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 border border-cream group text-center"
                        >
                            <div className="mb-8 w-16 h-16 bg-cream rounded-full flex items-center justify-center mx-auto group-hover:bg-gold/10 transition-colors duration-500">
                                {value.icon}
                            </div>
                            <h3 className="font-playfair text-[1.4rem] font-bold text-midnight mb-4 group-hover:text-gold transition-colors">{value.title}</h3>
                            <p className="text-slate/80 text-sm leading-relaxed font-light">
                                {value.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ValueGrid;
