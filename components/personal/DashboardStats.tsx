"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { TrendingUp, CreditCard, Star, Wallet } from "lucide-react";

const stats = [
  {
    label: "Total Balance",
    value: "$142,520.12",
    change: "+2.4%",
    icon: <Wallet className="w-6 h-6 text-gold" />,
    color: "gold",
  },
  {
    label: "Monthly Spending",
    value: "$8,240.45",
    change: "-1.2%",
    icon: <CreditCard className="w-6 h-6 text-sage" />,
    color: "sage",
  },
  {
    label: "Investment Growth",
    value: "+18.4%",
    change: "Last quarter",
    icon: <TrendingUp className="w-6 h-6 text-deep-teal" />,
    color: "deep-teal",
  },
  {
    label: "Reward Points",
    value: "2,450",
    change: "Tier: Gold",
    icon: <Star className="w-6 h-6 text-gold" />,
    color: "gold",
  },
];

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <Card
            variant="interactive"
            hover
            className="h-full border-slate/5 bg-white/50 backdrop-blur-sm shadow-sm ring-1 ring-slate/5"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-xl bg-warm-white shadow-sm border border-slate/5`}
                >
                  {stat.icon}
                </div>
                {stat.change.startsWith("+") ? (
                  <span className="text-sage text-sm font-medium">
                    {stat.change}
                  </span>
                ) : (
                  <span className="text-slate text-sm font-medium">
                    {stat.change}
                  </span>
                )}
              </div>
              <h3 className="text-slate/60 text-sm font-normal uppercase tracking-wider mb-1">
                {stat.label}
              </h3>
              <p className="text-midnight text-2xl font-bold font-playfair tracking-tight">
                {stat.value}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStats;
