"use client";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";


const articles = [
  {
    img: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=90",
    category: "Personal Finance",
    date: "December 8, 2024",
    read: "5 min read",
    title: "Building Your Emergency Fund: A Complete Guide",
    excerpt: "Learn how to build a safety net that protects you from unexpected expenses and financial emergencies."
  },
  {
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=90",
    category: "Investing",
    date: "December 5, 2024",
    read: "8 min read",
    title: "Diversification Strategies for 2025",
    excerpt: "Navigate market volatility with smart diversification. Explore asset allocation strategies."
  },
  {
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=90",
    category: "Business",
    date: "December 3, 2024",
    read: "6 min read",
    title: "Cash Flow Management for Small Businesses",
    excerpt: "Master the art of cash flow management with proven techniques that keep your business healthy."
  },
  {
    img: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=800&q=90",
    category: "Retirement",
    date: "November 30, 2024",
    read: "10 min read",
    title: "Maximizing Your 401(k) Contributions",
    excerpt: "Unlock the full potential of your retirement savings with strategies to maximize employer matching."
  },
  {
    img: "https://images.unsplash.com/photo-1551135049-8a33b5883817?w=800&q=90",
    category: "Market Insights",
    date: "November 28, 2024",
    read: "7 min read",
    title: "Q4 Market Outlook and Trends",
    excerpt: "Our chief economist analyzes key market trends and what they mean for your investment portfolio."
  },
  {
    img: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=90",
    category: "Personal Finance",
    date: "November 25, 2024",
    read: "5 min read",
    title: "Credit Score Optimization Techniques",
    excerpt: "Practical steps to improve your credit score and unlock better rates on loans."
  }
];

const container = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 } 
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
};

import { Card, CardHeader, CardContent } from "@/components/ui/Card";

const ArticleGrid = ({ activeCategory }: { activeCategory: string }) => {
  const filteredArticles = activeCategory === "All Topics" 
    ? articles 
    : articles.filter(article => article.category === activeCategory);

  return (
    <section className="px-[5%] md:px-0 pt-10 pb-24 max-w-7xl mx-auto min-h-[600px]">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
      >
        {filteredArticles.map((article, i) => (
          <Card
            key={`${article.title}-${i}`}
            layout
            variants={item}
            hover
            className="bg-cream shadow-sm hover:shadow-xl transition-shadow duration-300 h-full"
          >
            <CardHeader>
              <div 
                className="h-[250px] bg-cover bg-center relative"
                style={{ backgroundImage: `url('${article.img}')` }}
              >
                <span className="absolute top-6 left-6 bg-gold text-midnight py-2 px-4 rounded-full text-xs font-bold uppercase tracking-wide">
                  {article.category}
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-10 flex flex-col flex-1">
              <div className="flex gap-6 mb-4 text-sm text-slate">
                <span>{article.date}</span>
                <span>{article.read}</span>
              </div>
              <h3 className="font-playfair text-[1.8rem] font-semibold text-midnight mb-4 leading-tight">
                {article.title}
              </h3>
              <p className="text-slate font-light leading-relaxed mb-6">
                {article.excerpt}
              </p>
              <div className="mt-auto pt-4 flex">
                <Button 
                  as="a" 
                  href="#" 
                  variant="link"
                  className="px-0 py-0"
                >
                  Read More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </section>
  );
};

export default ArticleGrid;