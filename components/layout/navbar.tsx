"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 w-full py-6 px-[5%] flex justify-between items-center z-50 nav-gradient"
    >
      <Link
        href="/"
        className="font-playfair text-[1.8rem] font-bold text-warm-white tracking-tight no-underline"
      >
        Brightstream
      </Link>

      <ul className="hidden md:flex gap-12 list-none items-center">
        {["Personal", "Business", "Wealth", "About", "Articles"].map((item) => (
          <li key={item}>
            <Link
              href="#"
              className="text-cream no-underline font-normal text-[0.95rem] tracking-wide hover:text-gold transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1.25 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          </li>
        ))}
        <li>
          <button className="bg-gold text-midnight py-3 px-8 rounded-full font-medium text-[0.95rem] hover:bg-warm-white hover:-translate-y-0.5 transition-all duration-300 shadow-lg">
            Get Started
          </button>
        </li>
      </ul>
    </motion.nav>
  );
};

export default Navbar;
