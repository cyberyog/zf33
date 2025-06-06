import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from '../types/image';
import { ChevronRight } from 'lucide-react';

interface FeaturedImageProps {
  image: Image;
}

const FeaturedImage: React.FC<FeaturedImageProps> = ({ image }) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-md bg-primary-dark">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="relative min-h-[300px] md:min-h-[400px]">
          <img 
            src={image.url} 
            alt={image.title} 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-3">
            <span className="font-mono text-white/90 lowercase tracking-wider">{image.categoryLabel.toLowerCase()}</span>
          </div>
        </div>
        
        <div className="p-8 flex flex-col justify-center">
          <h2 className="text-neutral-light text-2xl md:text-3xl font-sans font-light mt-2 mb-4">{image.title}</h2>
          <p className="text-neutral-light opacity-80 font-serif mb-6 line-clamp-3">{image.description}</p>
          
          <Link 
            to={`/image/${image.id}`} 
            className="inline-flex items-center text-accent-gold hover:text-accent-sage transition-colors duration-300"
          >
            View artwork <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedImage;