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
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-2xl z-[9999]"
        >
          <div className="relative overflow-hidden bg-midnight/80 backdrop-blur-xl border border-gold/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-5 md:p-6">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-5">
              {/* Icon */}
              <div className="shrink-0 w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-gold" />
              </div>

              {/* Text */}
              <div className="flex-1">
                <h3 className="text-warm-white font-semibold text-lg mb-1 flex items-center gap-2">
                  Find Branches Near You
                  <ShieldCheck className="w-4 h-4 text-gold/60" />
                </h3>
                <p className="text-warm-white/60 text-sm leading-relaxed">
                  Allow us to use your location for a personalized experience. We use cookies to remember your preference and show you the closest Brightstream branches.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-row md:flex-col lg:flex-row items-center gap-3 w-full md:w-auto shrink-0">
                <button
                  onClick={handleDecline}
                  className="px-4 py-2.5 text-sm font-medium text-warm-white/40 hover:text-warm-white transition-colors order-2 md:order-1"
                >
                  Later
                </button>
                <Button
                  onClick={handleAllow}
                  className="w-full md:w-auto bg-gold hover:bg-gold-light text-midnight font-bold rounded-xl px-6 py-3 shadow-lg shadow-gold/20 order-1 md:order-2"
                >
                  Allow Location
                </Button>
              </div>

              {/* Close Button */}
              <button 
                onClick={() => setIsVisible(false)}
                className="absolute top-2 right-2 p-1 text-warm-white/20 hover:text-warm-white/60 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
