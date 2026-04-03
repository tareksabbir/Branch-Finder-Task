"use client";
import { motion } from "framer-motion";
import { Shield, Zap, Award, BarChart, Globe, Headphones } from "lucide-react";

const features = [
  {
    icon: <Shield className="w-8 h-8 text-gold stroke-gold" />,
    title: "Fort Knox Security",
    desc: "Military-grade encryption and biometric authentication protect your assets 24/7. Your security is our obsession, giving you the peace of mind to focus on what matters most.",
  },
  {
    icon: <Zap className="w-8 h-8 text-gold stroke-gold" />,
    title: "Instant Everything",
    desc: "Transfer funds, pay bills, or open accounts in seconds. Our cutting-edge technology ensures every transaction is lightning-fast without compromising security.",
  },
  {
    icon: <Award className="w-8 h-8 text-gold stroke-gold" />,
    title: "Premium Rewards",
    desc: "Earn extraordinary rewards on every purchase, with exclusive access to luxury experiences, travel perks, and cashback that actually makes a difference in your life.",
  },
  {
    icon: <BarChart className="w-8 h-8 text-gold stroke-gold" />,
    title: "Personalized Insights",
    desc: "AI-powered analytics provide real-time insights into your spending, saving patterns, and investment opportunities tailored specifically to your financial goals.",
  },
  {
    icon: <Globe className="w-8 h-8 text-gold stroke-gold" />,
    title: "Global Access",
    desc: "Bank from anywhere in the world with no foreign transaction fees. Our worldwide network ensures you're never far from exceptional banking service.",
  },
  {
    icon: <Headphones className="w-8 h-8 text-gold stroke-gold" />,
    title: "24/7 Concierge",
    desc: "Real humans, real expertise, real care. Our dedicated team of financial advisors is available around the clock to assist with any need, big or small.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

import { Card, CardContent } from "@/components/ui/Card";

const Features = () => {
  return (
    <section id="personal" className="py-32 px-[5%] bg-cream relative">
      <div className="max-w-175 mx-auto mb-20 text-center">
        <div className="text-sm uppercase tracking-[3px] text-sage font-medium mb-4">
          Why Choose Brightstream
        </div>
        <h2 className="font-playfair text-[clamp(2.5rem,5vw,4rem)] font-bold text-midnight leading-tight mb-6 tracking-[-1px]">
          Built Around You
        </h2>
        <p className="text-[1.15rem] leading-relaxed text-slate font-jost font-light">
          Every feature, every service, every interaction is designed with one
          thing in mind: your financial wellbeing and success.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-350 mx-auto"
      >
        {features.map((f, i) => (
          <Card
            key={i}
            variants={item}
            hover
            className="bg-warm-white group cursor-pointer"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-gold to-sage scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />

            <CardContent className="px-10 py-12">
              <div className="w-17.5 h-17.5 bg-linear-to-br from-midnight to-deep-teal rounded-[18px] flex items-center justify-center mb-8">
                {f.icon}
              </div>

              <h3 className="font-playfair text-[1.8rem] font-semibold text-midnight mb-4">
                {f.title}
              </h3>
              <p className="text-slate font-jost font-light leading-[1.8]">{f.desc}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </section>
  );
};

export default Features;
