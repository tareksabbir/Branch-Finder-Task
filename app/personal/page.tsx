import PersonalHero from "@/components/personal/PersonalHero";
import DashboardStats from "@/components/personal/DashboardStats";
import QuickActions from "@/components/personal/QuickActions";
import RecentActivity from "@/components/personal/RecentActivity";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personal Dashboard — Brightstream Bank",
  description:
    "Manage your premium banking experience with Brightstream Thorne.",
};

export default function PersonalPage() {
  return (
    <main className="min-h-screen bg-warm-white">
      {/* Hero Section */}
      <PersonalHero />

      {/* Main Content Area */}
      <div className="container px-[5%] mx-auto -mt-10 relative z-20">
        <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-8 md:p-12 mb-20">
          {/* Quick Actions at the top of the card content */}
          <QuickActions />

          {/* Stats Overview */}
          <div className="py-12 border-b border-slate/10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-playfair text-3xl font-bold text-midnight tracking-tight">
                Financial Overview
              </h2>
              <p className="text-midnight/40 text-sm font-medium uppercase tracking-widest">
                Last Updated: Just Now
              </p>
            </div>
            <DashboardStats />
          </div>

          {/* Recent Activity */}
          <RecentActivity />
        </div>
      </div>
    </main>
  );
}
