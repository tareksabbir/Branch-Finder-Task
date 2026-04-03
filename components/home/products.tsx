"use client";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const products = [
  {
    img: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=90",
    title: "Premier Checking",
    desc: "The account that works as hard as you do.",
    features: ["No minimum balance", "Free ATM access", "2.5% cashback"],
  },
  {
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=90",
    title: "Wealth Management",
    desc: "Sophisticated strategies to grow your wealth.",
    features: ["Dedicated advisor", "Tax optimization", "Estate planning"],
  },
  {
    img: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&q=90",
    title: "Business Banking",
    desc: "Powerful tools to help your business scale.",
    features: [
      "Payment processing",
      "Credit lines up to $5M",
      "Cash management",
    ],
  },
];

import { Card, CardHeader, CardContent } from "@/components/ui/Card";

const Products = () => {
  return (
    <section
      id="business"
      className="py-32 px-[5%] bg-midnight text-warm-white"
    >
      <div className="max-w-175 mx-auto mb-20 text-center">
        <div className="text-sm uppercase tracking-[3px] text-gold font-medium mb-4">
          Our Products
        </div>
        <h2 className="font-playfair text-[clamp(2.5rem,5vw,4rem)] font-bold text-warm-white leading-tight mb-6">
          Tailored Solutions
        </h2>
        <p className="text-lg text-cream font-light">
          Discover products designed to help you achieve more.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-350 mx-auto">
        {products.map((p, i) => (
          <Card
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            viewport={{ once: true }}
            hover
            className="bg-linear-to-br from-navy to-deep-teal border-none shadow-lg text-warm-white h-full"
          >
            <CardHeader>
              <div
                className="h-75 bg-cover bg-center relative"
                style={{ backgroundImage: `url('${p.img}')` }}
              >
                <div className="absolute inset-0 bg-linear-to-t from-midnight/90 to-transparent" />
              </div>
            </CardHeader>
            <CardContent className="p-10 flex flex-col flex-1">
              <h3 className="font-playfair text-2xl font-semibold mb-4">
                {p.title}
              </h3>
              <p className="text-cream font-light mb-6">{p.desc}</p>
              <ul className="mb-6 space-y-2">
                {p.features.map((f, idx) => (
                  <li
                    key={idx}
                    className="text-cream font-light flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-4 flex">
                <a
                  href="#"
                  className="text-gold font-medium hover:gap-4 transition-all flex items-center gap-2 group"
                >
                  Learn More{" "}
                  <span className="transition-transform group-hover:translate-x-1">
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Products;
