// components/ui/Card.tsx
"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils/common";

interface CardProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "interactive" | "glass" | "outline";
  hover?: boolean;
  active?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", hover = false, active = false, className, children, ...props }, ref) => {
    const variants = {
      default: "bg-warm-white border border-slate/10 shadow-sm",
      interactive: cn(
        "bg-warm-white border transition-all duration-200 cursor-pointer",
        active 
          ? "border-midnight bg-cream shadow-md" 
          : "border-slate/10 hover:border-navy hover:shadow-md"
      ),
      glass: "bg-white/70 backdrop-blur-md border border-white/20 shadow-lg",
      outline: "bg-transparent border border-slate/20 hover:border-gold transition-colors",
    };

    const hoverAnimation = hover ? {
      whileHover: { y: -8, transition: { duration: 0.2 } },
    } : {};

    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-2xl overflow-hidden relative flex flex-col",
          variants[variant],
          className
        )}
        {...hoverAnimation}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
Card.displayName = "Card";

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

const CardHeader = ({ className, children }: CardHeaderProps) => (
  <div className={cn("relative z-10", className)}>
    {children}
  </div>
);

interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

const CardContent = ({ className, children }: CardContentProps) => (
  <div className={cn("p-6 md:p-8", className)}>
    {children}
  </div>
);

interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

const CardFooter = ({ className, children }: CardFooterProps) => (
  <div className={cn("px-6 pb-6 md:px-8 md:pb-8 pt-0", className)}>
    {children}
  </div>
);

export { Card, CardHeader, CardContent, CardFooter };
