"use client";

import ArticleGrid from "@/components/articles/articleGrid";
import ArticlesHero from "@/components/articles/articlesHero";
import FeaturedArticle from "@/components/articles/featuredArticle";
import Newsletter from "@/components/articles/newsletter";
import FilterTags from "@/components/articles/filterTags";
import Modal from "@/components/home/modal";
import { useState } from "react";

export default function ArticlesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Topics");

  return (
    <main>
      <ArticlesHero />
      <FilterTags active={activeCategory} setActive={setActiveCategory} />
      <ArticleGrid activeCategory={activeCategory} />
      <FeaturedArticle />
      <Newsletter />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
