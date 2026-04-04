/* eslint-disable react/no-unescaped-entities */
"use client";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const FeaturedArticle = () => {
  return (
    <section className="bg-midnight py-24 px-[5%] md:px-0 text-warm-white">
      <div className="max-w-350 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="h-125 rounded-[25px] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1000&q=90')",
          }}
        />

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-[clamp(2.5rem,4vw,3.5rem)] font-bold mb-6 tracking-[-1px]">
            Featured Article: The Future of Digital Banking
          </h2>
          <div className="flex gap-6 mb-8 text-cream">
            <span>December 10, 2024</span>
            <span>12 min read</span>
          </div>
          <p className="text-cream font-light leading-relaxed mb-4 text-lg">
            Explore how artificial intelligence, blockchain technology, and
            biometric security are reshaping the banking landscape.
          </p>
          <p className="text-cream font-light leading-relaxed mb-8 text-lg">
            From instant global payments to AI-powered financial advisors,
            discover what's coming next.
          </p>
          <Button
            href="#"
            as="a"
            variant="outline"
            size="lg"
            className="border-gold hover:bg-gold hover:text-midnight"
          >
            Read Full Article
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedArticle;
