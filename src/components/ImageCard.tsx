import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from '../types/image';

interface ImageCardProps {
  image: Image;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  return (
    <Link
      to={`/image/${image.id}`}
      className="block relative overflow-hidden rounded-lg transition-transform duration-400 transform hover:scale-[1.02] group"
    >
      <div className="aspect-square bg-neutral-light dark:bg-primary-dark flex items-center justify-center">
        <img 
          src={image.url} 
          alt={image.title} 
          className="max-w-full max-h-full object-contain transition-all duration-400"
          loading="lazy"
        />
        
        {/* Subtle hover effect without any text */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm h-0 group-hover:h-1 transition-all duration-300"></div>
      </div>
    </Link>
  );
};

export default ImageCard;