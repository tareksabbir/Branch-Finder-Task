"use client";

import React from "react";
import { motion } from "framer-motion";
import { Coffee, ShoppingBag, Truck, Smartphone, CreditCard, ArrowDownRight, ArrowUpRight } from "lucide-react";

const activities = [
  {
    id: 1,
    title: "Starbucks Coffee",
    category: "Food & Drink",
    amount: "-$12.50",
    date: "Today, 10:45 AM",
    status: "Completed",
    icon: <Coffee className="w-5 h-5 text-sage" />,
  },
  {
    id: 2,
    title: "Amazon.com",
    category: "Shopping",
    amount: "-$84.99",
    date: "Yesterday, 3:20 PM",
    status: "Completed",
    icon: <ShoppingBag className="w-5 h-5 text-gold" />,
  },
  {
    id: 3,
    title: "Monthly Salary",
    category: "Income",
    amount: "+$8,500.00",
    date: "April 1, 2026",
    status: "Completed",
    icon: <ArrowDownRight className="w-5 h-5 text-deep-teal" />,
  },
  {
    id: 4,
    title: "Uber Trip",
    category: "Transport",
    amount: "-$32.40",
    date: "March 30, 2026",
    status: "Pending",
    icon: <Truck className="w-5 h-5 text-slate" />,
  },
  {
    id: 5,
    title: "Apple Services",
    category: "Subscription",
    amount: "-$9.99",
    date: "March 28, 2026",
    status: "Completed",
    icon: <Smartphone className="w-5 h-5 text-navy" />,
  },
];

const RecentActivity = () => {
  return (
    <div className="py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-playfair text-3xl font-bold text-midnight tracking-tight">Recent Activity</h2>
        <motion.button 
           whileHover={{ x: 5 }}
           className="text-gold text-sm font-medium flex items-center gap-1 group"
        >
          View Statements <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </motion.button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="group flex flex-col md:flex-row items-center justify-between p-5 bg-warm-white rounded-2xl border border-slate/5 hover:border-gold/20 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-5 w-full md:w-auto mb-4 md:mb-0">
              <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center shadow-sm border border-slate/5 text-midnight transition-transform group-hover:scale-110">
                {activity.icon}
              </div>
              <div>
                <h4 className="font-medium text-midnight leading-tight text-lg">{activity.title}</h4>
                <p className="text-midnight/40 text-sm font-medium uppercase tracking-wider">{activity.category} • {activity.date}</p>
              </div>
            </div>

            <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-8">
               <div className="text-right">
                  <p className={`font-bold text-lg ${activity.amount.startsWith("+") ? "text-sage" : "text-midnight"}`}>
                    {activity.amount}
                  </p>
                  <span className={`text-[0.65rem] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full ${
                    activity.status === "Completed" ? "bg-sage/10 text-sage" : "bg-gold/10 text-gold"
                  }`}>
                    {activity.status}
                  </span>
               </div>
               <div className="hidden md:block w-px h-8 bg-slate/10" />
               <motion.button 
                 whileHover={{ scale: 1.1 }}
                 className="p-2 rounded-full bg-cream/50 text-midnight/40 hover:text-gold transition-colors"
                >
                  <CreditCard className="w-5 h-5" />
                </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
