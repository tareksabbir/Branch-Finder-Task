"use client";

import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { Send, Plus, Receipt, UserRound, ArrowRightLeft, CreditCard } from "lucide-react";

const actions = [
  { label: "Transfer Funds", icon: <ArrowRightLeft className="w-5 h-5" />, variant: "primary" as const },
  { label: "Pay Bills", icon: <Receipt className="w-5 h-5" />, variant: "midnight" as const },
  { label: "Manage Cards", icon: <CreditCard className="w-5 h-5" />, variant: "outline" as const },
  { label: "Add Deposit", icon: <Plus className="w-5 h-5" />, variant: "secondary" as const },
];

const QuickActions = () => {
  return (
    <div className="flex flex-wrap items-center gap-4 py-8 border-b border-slate/10 group">
      <h3 className="text-midnight/40 text-sm font-medium uppercase tracking-widest mr-4">Quick Actions</h3>
      <div className="flex flex-wrap gap-4">
        {actions.map((action, index) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.4 }}
          >
            <Button
              variant={action.variant}
              leftIcon={action.icon}
              size="md"
              className={action.variant === "outline" ? "border-slate/20 text-midnight hover:bg-slate/5 hover:text-midnight" : ""}
            >
              {action.label}
            </Button>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button variant="link" size="sm" className="ml-4">
            View All Services
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default QuickActions;
