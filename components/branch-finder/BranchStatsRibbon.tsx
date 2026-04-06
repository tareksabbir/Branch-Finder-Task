"use client";

interface BranchStatsRibbonProps {
  total: number;
  countries: number;
}

export function BranchStatsRibbon({
  total,
  countries,
}: BranchStatsRibbonProps) {
  const stats = [
    { num: total || "—", label: "Branches Worldwide" },
    { num: countries || "—", label: "Countries" },
    { num: "24/7", label: "Digital Support" },
  ];

  return (
    <div className="relative border-t border-gold/15 bg-navy/60">
      <div className="flex justify-center gap-12 md:gap-16 py-8 px-6">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-xl md:text-2xl font-bold text-gold font-playfair">
              {typeof s.num === "number" ? s.num.toLocaleString() : s.num}
            </div>
            <div className="text-[0.85rem] text-warm-white/40 uppercase tracking-widest mt-0.5">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
