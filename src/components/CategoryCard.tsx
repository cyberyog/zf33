import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../types/image';

interface CategoryCardProps {
  category: Category;
  featuredImage: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, featuredImage }) => {
  // Special styling for Neo Retro category
  const categoryNameClass = 'font-mono text-white/90 lowercase tracking-wider';
    
  // Generate a tag based on category with custom colors
  const getTag = () => {
    switch(category.slug) {
      case 'cyber-zen':
        return { text: 'futuristic', color: 'bg-[#FCEF72]' };
      case 'natural-flow':
        return { text: 'organic', color: 'bg-[#7BB972]' };
      case 'sacred-tech':
        return { text: 'mystical', color: 'bg-[#5F6BBB]' };
      case 'neo-retro':
        return { text: 'geometric', color: 'bg-[#FCEF72]' };
      case 'iridescent-divinity':
        return { text: 'ethereal', color: 'bg-[#5F6BBB]' };
      case 'urban-minimalism':
        return { text: 'clean', color: 'bg-[#7BB972]' };
      case 'digital-dreams':
        return { text: 'surreal', color: 'bg-[#5F6BBB]' };
      case 'abstract-flow':
        return { text: 'movement', color: 'bg-[#FCEF72]' };
      case 'bronze-mythic-realism':
        return { text: 'cinematic', color: 'bg-[#B8A082]' };
      case 'hyper-anime-portraiture':
        return { text: 'realistic', color: 'bg-[#5F6BBB]' };
      default:
        return { text: 'artistic', color: 'bg-[#7BB972]' };
    }
  };

  const tag = getTag();

  return (
    <Link 
      to={`/gallery/${category.slug}`} 
      className="block rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={featuredImage} 
          alt={category.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <h3 className={`text-2xl font-medium ${categoryNameClass}`}>
              {category.name.toLowerCase()}
            </h3>
            <span 
              className={`${tag.color} px-2 py-0.5 rounded-full text-primary-dark text-xs`}
            >
              {tag.text}
            </span>
          </div>
          <div className="w-10 h-0.5 bg-accent-gold mb-2 transition-all duration-300 group-hover:w-16"></div>
          <p className="text-neutral-light font-serif opacity-90 text-sm">{category.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;