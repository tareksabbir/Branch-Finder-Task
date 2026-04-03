"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "link" | "midnight";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

type ButtonProps<T extends React.ElementType = "button"> = ButtonBaseProps & {
  as?: T;
} & Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonBaseProps | "as"> & {
  motionProps?: HTMLMotionProps<any>;
};

// Pre-built motion components for each supported element type.
// motion.create() replaces the deprecated motion() factory and must be called
// outside of render to avoid recreating the component on every render.
const motionComponents = {
  button: motion.create("button"),
  a: motion.create("a"),
  div: motion.create("div"),
  span: motion.create("span"),
} as const;

type SupportedComponent = keyof typeof motionComponents;

const DEFAULT_COMPONENT: SupportedComponent = "button";

const Button = React.forwardRef<any, ButtonProps<any>>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = "",
      disabled,
      as: Component = DEFAULT_COMPONENT,
      motionProps,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary:
        "bg-gold text-midnight shadow-lg hover:shadow-xl hover:bg-midnight hover:text-warm-white",
      secondary:
        "bg-cream text-midnight border-2 border-transparent hover:bg-midnight hover:text-warm-white",
      outline:
        "bg-transparent text-warm-white border-2 border-warm-white hover:bg-warm-white hover:text-midnight",
      ghost: "bg-transparent text-midnight hover:bg-cream/50",
      link: "bg-transparent text-gold p-0 rounded-none hover:gap-4 gap-2 border-b-2 border-transparent hover:border-gold transition-all",
      midnight: "bg-midnight text-warm-white hover:bg-navy shadow-lg",
    };

    const sizes = {
      sm: "py-2 px-6 text-sm",
      md: "py-3.5 px-8 text-base",
      lg: "py-4 px-10 text-lg",
    };

    const variantStyles =
      variant === "link"
        ? variants.link
        : `${variants[variant as ButtonVariant]} ${sizes[size as ButtonSize]}`;
    const widthStyle = fullWidth ? "w-full" : "";

    // Resolve the pre-built motion component, falling back to "button" for any
    // unsupported element type (e.g. custom components passed via `as`).
    const MotionComponent =
      motionComponents[Component as SupportedComponent] ??
      motion.create(Component);

    return (
      <MotionComponent
        ref={ref}
        disabled={isLoading || disabled}
        whileHover={variant !== "link" ? { y: -3 } : {}}
        whileTap={{ scale: 0.98 }}
        className={`${baseStyles} ${variantStyles} ${widthStyle} ${className}`}
        {...motionProps}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}

        {children}

        {!isLoading && variant === "link" && !rightIcon && (
          <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
        )}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </MotionComponent>
    );
  }
);

Button.displayName = "Button";

export default Button;