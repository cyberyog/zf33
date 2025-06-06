import React from 'react';
import { Image } from '../types/image';
import ImageCard from './ImageCard';
import CategoryDescription from './CategoryDescription';
import { Category } from '../types/image';

interface ImageGridProps {
  images: Image[];
  category: Category;
  title?: string;
  description?: string;
}

const ImageGrid: React.FC<ImageGridProps> = ({ images, category, title, description }) => {
  // Create a grid where we'll insert description boxes at the start and after every 7 images
  const gridItems = [];
  
  // Add initial description box at the very beginning
  gridItems.push(
    <CategoryDescription key="desc-initial\" category={category} index={0} />
  );
  
  // Add images with description boxes after every 7 images
  images.forEach((image, index) => {
    // Add the image
    gridItems.push(
      <ImageCard key={image.id} image={image} />
    );
    
    // Add a description box after every 7 images
    if ((index + 1) % 7 === 0 && index < images.length - 1) {
      const descIndex = Math.floor((index + 1) / 7);
      if (descIndex <= 2) { // Limit to a total of 3 description boxes (including the initial one)
        gridItems.push(
          <CategoryDescription key={`desc-${descIndex}`} category={category} index={descIndex} />
        );
      }
    }
  });

  return (
    <div className="pt-4 pb-8">
      {title && (
        <h2 className="text-2xl md:text-3xl font-sans font-light text-[#E0E0E0] dark:text-white mb-2">{title}</h2>
      )}
      
      {description && (
        <p className="text-[#E0E0E0] dark:text-white font-serif mb-4 max-w-2xl">{description}</p>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gridItems}
      </div>
    </div>
  );
};

export default ImageGrid;