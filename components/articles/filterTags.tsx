"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const tags = ["All Topics", "Personal Finance", "Investing", "Business", "Retirement", "Market Insights"];

const FilterTags = ({ active, setActive }: { active: string, setActive: (tag: string) => void }) => {
  return (
    <div className="flex justify-center gap-4 flex-wrap mt-20 mb-16 ">
      {tags.map((tag, i) => (
        <Button
          key={tag}
          variant="secondary"
          size="sm"
          motionProps={{
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: i * 0.05 }
          }}
          onClick={() => setActive(tag)}
          className={active === tag ? "border-gold bg-midnight text-warm-white" : ""}
        >
          {tag}
        </Button>
      ))}
    </div>
  );
};

export default FilterTags;