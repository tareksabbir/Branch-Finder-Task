"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  variant?: "transparent" | "solid";
}

const navItems = [
  { name: "Personal", href: "/personal" },
  { name: "Business", href: "/business" },
  { name: "Wealth", href: "/wealth" },
  { name: "About", href: "/about" },
  { name: "Articles", href: "/articles" },
];

const Navbar = ({ variant = "transparent" }: NavbarProps) => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Add scroll listener for subtle bg change
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const navBg =
    variant === "solid" || scrolled
      ? "bg-midnight/90 backdrop-blur-xl shadow-lg shadow-midnight/20"
      : "bg-gradient-to-b from-midnight/95 to-transparent backdrop-blur-md";

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 w-full py-4 md:py-6 px-[5%] flex justify-between items-center z-50 transition-all duration-500 ${navBg}`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-playfair text-[1.5rem] md:text-[1.8rem] font-bold text-warm-white tracking-tight no-underline"
        >
          Brightstream
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-10 lg:gap-12 list-none items-center">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`no-underline font-normal text-[0.95rem] tracking-wide transition-colors duration-300 relative group ${
                    active ? "text-gold font-medium" : "text-cream hover:text-gold"
                  }`}
                >
                  {item.name}
                  {/* Underline indicator */}
                  <span
                    className={`absolute bottom-[-5px] left-0 h-[1.5px] bg-gold transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href="/branch"
              className={`py-3 px-8 rounded-full font-medium text-[0.95rem] transition-all duration-300 shadow-lg hover:-translate-y-0.5 ${
                isActive("/branch")
                  ? "bg-warm-white text-midnight"
                  : "bg-gold text-midnight hover:bg-warm-white"
              }`}
            >
              Get Started
            </Link>
          </li>
        </ul>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-warm-white/10 backdrop-blur-sm border border-warm-white/15 text-warm-white hover:bg-warm-white/20 transition-all duration-300 cursor-pointer"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={20} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={20} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-midnight/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 w-[80%] max-w-[340px] h-full bg-midnight/95 backdrop-blur-xl z-[45] md:hidden border-l border-warm-white/10 flex flex-col"
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-warm-white/10">
                <span className="font-playfair text-lg font-bold text-warm-white">
                  Menu
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 rounded-lg bg-warm-white/10 flex items-center justify-center text-warm-white hover:bg-warm-white/20 transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <nav className="flex-1 px-4 py-6 overflow-y-auto">
                <ul className="flex flex-col gap-1 list-none">
                  {navItems.map((item, i) => {
                    const active = isActive(item.href);
                    return (
                      <motion.li
                        key={item.name}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * i + 0.1, duration: 0.3 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-[1.05rem] tracking-wide no-underline transition-all duration-300 ${
                            active
                              ? "bg-gold/15 text-gold font-medium border-l-2 border-gold"
                              : "text-cream hover:bg-warm-white/5 hover:text-warm-white"
                          }`}
                        >
                          {item.name}
                          {active && (
                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-gold" />
                          )}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Mobile CTA */}
              <div className="px-6 pb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.3 }}
                >
                  <Link
                    href="/branch"
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-center w-full py-3.5 rounded-full font-medium text-[1rem] transition-all duration-300 shadow-lg no-underline ${
                      isActive("/branch")
                        ? "bg-warm-white text-midnight"
                        : "bg-gold text-midnight hover:bg-warm-white"
                    }`}
                  >
                    Find our Branch
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;