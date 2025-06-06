import React from 'react';
import { Category } from '../types/image';

interface CategoryHeroProps {
  category: Category;
  featuredImage?: string;
}

const CategoryHero: React.FC<CategoryHeroProps> = ({ category }) => {
  // Get color accent based on category
  const getCategoryAccent = (slug: string): string => {
    switch(slug) {
      case 'cyber-zen':
        return 'border-accent-blue';
      case 'natural-flow':
        return 'border-accent-sage';
      case 'sacred-tech':
        return 'border-accent-purple';
      case 'urban-minimalism':
        return 'border-accent-gold';
      case 'digital-dreams':
        return 'border-accent-lavender';
      case 'abstract-flow':
        return 'border-accent-matrix';
      case 'neo-retro':
        return 'border-accent-blue';
      case 'iridescent-divinity':
        return 'border-accent-lavender';
      default:
        return 'border-accent-gold';
    }
  };

  const borderAccent = getCategoryAccent(category.slug);

  return (
    <div className={`bg-black rounded-lg overflow-hidden aspect-square flex items-center justify-center p-5 shadow-md relative ${borderAccent} border`}>
      <div className="absolute inset-0 bg-black opacity-95"></div>
      <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-black opacity-75 animate-pulse"></div>
    </div>
  );
};

export default CategoryHero;