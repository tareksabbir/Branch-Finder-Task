"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import { setCookie, getCookie } from "@/lib/utils/cookie";

interface ConsentBannerProps {
  onAllow: () => void;
}

export function ConsentBanner({ onAllow }: ConsentBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice via cookie
    const consent = getCookie("branch_finder_consent");
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAllow = () => {
    setCookie("branch_finder_consent", "allowed", 365); // 1 year
    setIsVisible(false);
    onAllow();
  };

  const handleDecline = () => {
    setCookie("branch_finder_consent", "declined", 30); // 30 days
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="fixed bottom-0 left-0 w-full z-9999"
        >
          <div className="bg-white border-t border-stone-200 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] py-4 md:py-5 px-4 md:px-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4 md:gap-8">
              {/* Icon & Text Group */}
              <div className="flex items-center gap-4 flex-1">
                <div className="shrink-0 w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="text-stone-900 font-bold text-base md:text-lg flex items-center gap-2 leading-tight">
                    Find Branches Near You
                    <ShieldCheck className="w-4 h-4 text-stone-400" />
                  </h3>
                  <p className="text-stone-500 text-xs md:text-sm mt-0.5 leading-relaxed max-w-2xl">
                    Allow us to use your location for a personalized experience.
                    We use cookies to remember your preference and show you the
                    closest Brightstream branches.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
                <button
                  onClick={handleDecline}
                  className="flex-1 md:flex-none px-6 py-2.5 text-sm font-bold text-stone-400 hover:text-stone-900 transition-colors"
                >
                  Later
                </button>
                <Button
                  onClick={handleAllow}
                  variant="midnight"
                  className="flex-1 md:flex-none rounded-full px-10 py-3 text-sm font-bold shadow-xl active:scale-95 bg-midnight hover:bg-midnight-light"
                >
                  Allow Location
                </Button>
              </div>

              {/* Close Button */}
              <button
                onClick={handleDecline}
                className="absolute top-4 right-4 md:static p-1 text-stone-300 hover:text-stone-900 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
