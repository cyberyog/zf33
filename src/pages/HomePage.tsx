import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/categories';
import { getFeaturedImages } from '../data/images';
import type { Category } from '../types/image';

const HomePage: React.FC = () => {
  const featuredImages = getFeaturedImages();
  
  const categoryImages = {
    'neo-retro': '/style007/quantum-spheres.jpg',
    'iridescent-divinity': '/style008/witness-unveiled.jpg',
    'bronze-mythic-realism': '/style011/xyber3_85247_ancient_armored_knight_hidden_among_jagged_rocks_f066717c-438a-4afd-ae93-bf23b0a67d7c_2.png',
    'hyper-anime-portraiture': '/style011/xyber3_85247_mysterious_red-haired_woman_in_vintage_attire_st_d04a3fcf-5e54-4369-a40a-c59fa452d62c_1.png',
    'mythic-tech-realism': '/style021/21photo01.png',
    'epic-painterly-realism': '/style022/22photo01.png',
  };

  const getCategoryImage = (category: Category) => {
    const slug = category.slug;
    // First check if we have a predefined image for this category
    if (categoryImages[slug as keyof typeof categoryImages]) {
      return categoryImages[slug as keyof typeof categoryImages];
    }
    
    // If not, find a featured image from this category
    const featuredImage = featuredImages.find(img => img.category === slug);
    if (featuredImage) {
      return featuredImage.url;
    }
    
    // Default fallback image
    return '/style022/22photo01.png';
  };

  return (
    <div className="min-h-screen bg-neutral dark:bg-primary-dark pt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={`/gallery/${category.slug}`} 
              className="group relative aspect-square overflow-hidden rounded-lg bg-neutral-light dark:bg-primary"
            >
              <img 
                src={getCategoryImage(category)} 
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                <div className="inline-block bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-t-md group-hover:bg-black/60 transition-all duration-300 border-t border-x border-white/10">
                  <h3 className="font-mono text-white lowercase tracking-wider text-xs">
                    {category.name.toLowerCase()}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;