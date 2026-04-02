"use client";
import { motion } from "framer-motion";

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-gold fill-none stroke-2 stroke-round stroke-linejoin">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    ),
    title: "Fort Knox Security",
    desc: "Military-grade encryption and biometric authentication protect your assets 24/7. Your security is our obsession, giving you the peace of mind to focus on what matters most.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-gold fill-none stroke-2 stroke-round stroke-linejoin">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
    ),
    title: "Instant Everything",
    desc: "Transfer funds, pay bills, or open accounts in seconds. Our cutting-edge technology ensures every transaction is lightning-fast without compromising security.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-gold fill-none stroke-2 stroke-round stroke-linejoin">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
      </svg>
    ),
    title: "Premium Rewards",
    desc: "Earn extraordinary rewards on every purchase, with exclusive access to luxury experiences, travel perks, and cashback that actually makes a difference in your life.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-gold fill-none stroke-2 stroke-round stroke-linejoin">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
        <polyline points="17 6 23 6 23 12"></polyline>
      </svg>
    ),
    title: "Personalized Insights",
    desc: "AI-powered analytics provide real-time insights into your spending, saving patterns, and investment opportunities tailored specifically to your financial goals.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-gold fill-none stroke-2 stroke-round stroke-linejoin">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
    ),
    title: "Global Access",
    desc: "Bank from anywhere in the world with no foreign transaction fees. Our worldwide network ensures you're never far from exceptional banking service.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-gold fill-none stroke-2 stroke-round stroke-linejoin">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
      </svg>
    ),
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
          <motion.div
            key={i}
            variants={item}
            whileHover={{
              y: -10,
              boxShadow: "0 30px 60px rgba(10, 22, 40, 0.1)",
            }}
            className="bg-warm-white px-10 py-12 rounded-[20px] relative overflow-hidden group cursor-pointer"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-gold to-sage scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

            <div className="w-17.5 h-17.5 bg-linear-to-br from-midnight to-deep-teal rounded-[18px] flex items-center justify-center mb-8">
              {f.icon}
            </div>

            <h3 className="font-playfair text-[1.8rem] font-semibold text-midnight mb-4">
              {f.title}
            </h3>
            <p className="text-slate font-jost font-light leading-[1.8]">{f.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Features;
