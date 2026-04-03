"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { Branch } from "@/lib/types";
import { formatDistance } from "@/lib/utils/geo";
import {
  MapPin,
  Phone,
  Mail,
  Ruler,
  Navigation,
  X,
} from "lucide-react";

interface BranchDetailPanelProps {
  branch: Branch | null;
  onClose: () => void;
}

export function BranchDetailPanel({
  branch,
  onClose,
}: BranchDetailPanelProps) {
  // ESC key close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {branch && (
        <motion.div
          key={branch.id}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="
            z-[500]
            pointer-events-auto
            
            /* 📱 Mobile: Screen Bottom Center (Fixed - Sticky behavior) */
            fixed 
            bottom-4 
            left-1/2 
            -translate-x-1/2 
            w-[92%] 
            max-w-sm

            /* 💻 Desktop: Parent Div Top Right (Absolute) */
            md:absolute 
            md:fixed-none 
            md:bottom-auto 
            md:left-auto 
            md:translate-x-0 
            md:top-6 
            md:right-6 
            md:w-[22rem]
          "
        >
          <div className="relative bg-warm-white shadow-[0_24px_64px_rgba(11,31,58,0.18)] border border-slate/10 rounded-[20px] overflow-hidden">

            {/* Top accent */}
            <div className="h-[3px] w-full bg-gradient-to-r from-gold/0 via-gold to-gold/0" />

            {/* Header */}
            <div className="relative px-6 pt-5 pb-5 bg-midnight overflow-hidden">
              {/* Grid overlay */}
              <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg,transparent,transparent 24px,#fff 24px,#fff 25px),repeating-linear-gradient(90deg,transparent,transparent 24px,#fff 24px,#fff 25px)",
                }}
              />

              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center z-20
                bg-black/40 border border-white/20
                hover:bg-gold/20 hover:border-gold/40 transition"
              >
                <X className="w-4 h-4 text-white" strokeWidth={2.5} />
              </button>

              {/* Badge */}
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="inline-flex items-center gap-1.5 text-[0.7rem] font-semibold tracking-[0.14em] uppercase px-2.5 py-1 rounded-full"
                  style={{
                    background: "rgba(201,168,76,0.15)",
                    border: "1px solid rgba(201,168,76,0.3)",
                    color: "#C9A84C",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_6px_rgba(201,168,76,0.8)]" />
                  {branch.countryCode} · {branch.city}
                </span>
              </div>

              {/* Name */}
              <h2
                className="text-warm-white font-bold leading-[1.2] pr-10"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(1.3rem, 3vw, 1.6rem)",
                }}
              >
                {branch.name}
              </h2>
            </div>

            {/* Details */}
            <div className="px-5 py-4 space-y-1">
              <DetailRow
                icon={<MapPin />}
                label="Address"
                value={[branch.street, branch.city, branch.zipCode, branch.country]
                  .filter(Boolean)
                  .join(", ")}
              />

              <Divider />

              <DetailRow
                icon={<Phone />}
                label="Phone"
                value={branch.phone || "Not available"}
                href={branch.phone ? `tel:${branch.phone}` : undefined}
              />

              <Divider />

              <DetailRow
                icon={<Mail />}
                label="Email"
                value={branch.email || "Not available"}
                href={branch.email ? `mailto:${branch.email}` : undefined}
              />

              {branch.distance != null && (
                <>
                  <Divider />
                  <DetailRow
                    icon={<Ruler />}
                    label="Distance"
                    value={formatDistance(branch.distance)}
                  />
                </>
              )}
            </div>

            {/* Actions */}
            <div className="px-5 pb-5 pt-1 grid grid-cols-2 gap-2.5">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${branch.lat},${branch.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 rounded-xl py-3 text-[0.9rem] font-semibold
                bg-midnight text-warm-white hover:bg-[#0f2a4a] active:scale-[0.97] transition"
              >
                <Navigation className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                Directions
              </a>

              <a
                href={branch.email ? `mailto:${branch.email}` : "#"}
                className="group flex items-center justify-center gap-2 rounded-xl py-3 text-[0.9rem] font-semibold
                text-midnight border border-black/10 hover:bg-cream active:scale-[0.97] transition"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Divider() {
  return <div className="h-px bg-slate/10" />;
}

function DetailRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-3 py-2.5 rounded-xl px-2 -mx-2 hover:bg-cream/60 transition">
      <div className="w-8 h-8 rounded-lg grid place-items-center mt-0.5 bg-gold/10 border border-gold/20">
        <span className="[&>svg]:w-[14px] [&>svg]:h-[14px] [&>svg]:text-gold">
          {icon}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-slate/50 mb-0.5">
          {label}
        </p>

        <p className="text-[0.95rem] text-midnight font-medium leading-snug break-words">
          {value}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block no-underline">
        {content}
      </a>
    );
  }

  return content;
}