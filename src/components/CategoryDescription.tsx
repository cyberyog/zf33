import React from 'react';
import { Category } from '../types/image';

interface CategoryDescriptionProps {
  category: Category;
  index: number;
}

const CategoryDescription: React.FC<CategoryDescriptionProps> = ({ category, index }) => {
  // Mythic Tech Realism essence statements
  const getMythicTechEssence = (index: number) => {
    switch(index) {
      case 0:
        return "Ancestral sigils meet sleek cyber alloy";
      case 1:
        return "Dusk rim-light carves heroic silhouette";
      case 2:
        return "Micro detail blends fur, stone, brocade";
      default:
        return "Ancestral sigils meet sleek cyber alloy";
    }
  };
  
  // Epic Painterly Realism essence statements
  const getEpicPainterlyEssence = (index: number) => {
    switch(index) {
      case 0:
        return "Oil-brush texture meets cinema-grade depth";
      case 1:
        return "Heroic scale bathed in mythic skylight";
      case 2:
        return "Jewel-tone palette highlights tactile armor";
      default:
        return "Oil-brush texture meets cinema-grade depth";
    }
  };

  // Neon Mythic Odyssey essence statements
  const getNeonMythicEssence = (index: number) => {
    switch(index) {
      case 0:
        return "Ancient spirits stride through synth-lit horizons";
      case 1:
        return "Hyper-saturated palettes paint deities and beasts";
      case 2:
        return "Cosmic vastness meets intimate folklore ritual";
      default:
        return "Ancient spirits stride through synth-lit horizons";
    }
  };

  // Retro Surreal Saga essence statements
  const getRetroSurrealEssence = (index: number) => {
    switch(index) {
      case 0:
        return "Oil-smooth heroes glow under retro film grain";
      case 1:
        return "Fantasy pulp meets future tech chroma haze";
      case 2:
        return "Legendary calm wrapped in magazine-cover drama";
      default:
        return "Oil-smooth heroes glow under retro film grain";
    }
  };

  // Different descriptions based on the box position
  const getDescription = () => {
    // Special handling for Mythic Tech Realism category
    if (category.slug === 'mythic-tech-realism') {
      return getMythicTechEssence(index);
    }
    
    // Special handling for Epic Painterly Realism category
    if (category.slug === 'epic-painterly-realism') {
      return getEpicPainterlyEssence(index);
    }

    // Special handling for Neon Mythic Odyssey category
    if (category.slug === 'neon-mythic-odyssey') {
      return getNeonMythicEssence(index);
    }

    // Special handling for Retro Surreal Saga category
    if (category.slug === 'retro-surreal-saga') {
      return getRetroSurrealEssence(index);
    }
    
    // Regular descriptions for other categories
    switch(index) {
      case 0:
        return `${category.description} This introduction showcases the foundational elements of the ${category.name} style.`;
      case 1:
        return `The middle section of our ${category.name} collection explores deeper variations and technical innovations within this aesthetic movement.`;
      case 2:
        return `The final selections in our ${category.name} gallery represent the most experimental and boundary-pushing works in this style.`;
      default:
        return category.description;
    }
  };

  const description = getDescription();
  
  // Special styling for special styles that have essence statements
  const isSpecialStyle = ['mythic-tech-realism', 'epic-painterly-realism', 'neon-mythic-odyssey', 'retro-surreal-saga'].includes(category.slug);
  
  // Container class - remove glass styling (which has borders) for special styles
  const containerClass = isSpecialStyle 
    ? "aspect-square rounded-lg overflow-hidden shadow-md relative bg-black flex flex-col"
    : "glass aspect-square rounded-lg overflow-hidden flex items-center justify-center shadow-md relative";

  return (
    <div className={containerClass}>
      {isSpecialStyle ? (
        <>
          {/* Essence text in the center/top area */}
          <div className="flex-1 flex items-center justify-center p-4">
            <p className="text-[#829992] font-mono text-4xl leading-relaxed text-center">
              {description}
            </p>
          </div>
          
          {/* REMIX button at the bottom */}
          <div className="flex justify-center pb-4">
            <button className="inline-block px-4 py-1.5 bg-black/50 text-[#66BB6A] hover:opacity-90 transition-colors duration-300 text-sm font-mono tracking-wide rounded-2xl">
              REMIX - COMING SOON 💟
            </button>
          </div>
        </>
      ) : (
        <p className="text-[#E0E0E0] dark:text-white font-mono text-sm leading-relaxed p-4 overflow-auto">
          {description}
        </p>
      )}
    </div>
  );
};

export default CategoryDescription;