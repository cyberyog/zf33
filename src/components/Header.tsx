import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { categories } from '../data/categories';
import { getImageById } from '../data/images';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Check if we're on a gallery page and get the style slug
  const galleryMatch = location.pathname.match(/\/gallery\/([^/]+)/);
  const currentStyle = galleryMatch ? galleryMatch[1] : null;
  
  // Check if we're on an image page and get the image id
  const imageMatch = location.pathname.match(/\/image\/([^/]+)/);
  const imageId = imageMatch ? imageMatch[1] : null;
  
  // Find the category name if we're on a gallery page
  const currentCategory = currentStyle 
    ? categories.find(cat => cat.slug === currentStyle) 
    : null;
    
  // Get the image if we're on an image page
  const currentImage = imageId ? getImageById(imageId) : null;
  
  // Get the style name to display in header
  const styleToDisplay = currentCategory?.name || (currentImage ? currentImage.categoryLabel : null);
  const styleSlug = currentStyle || (currentImage ? currentImage.category : null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`glass-borderless fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-neutral/70 dark:bg-primary-dark/70' 
          : 'bg-neutral/40 dark:bg-primary-dark/40'
      }`}
    >
      <div className="container mx-auto px-4 h-12 flex justify-between items-center">
        <Link to="/" className="hover:text-accent-blue transition-colors duration-300">
          <h1 className="text-lg font-mono font-bold text-[#E0E0E0] dark:text-white tracking-tight">StyleMaps</h1>
        </Link>
        
        {/* Centered style name */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {styleToDisplay && styleSlug && (
            <Link 
              to={`/gallery/${styleSlug}`} 
              className="text-xs font-mono text-[#E0E0E0] dark:text-white tracking-wide lowercase hover:text-accent-sage transition-colors duration-300"
            >
              {styleToDisplay.toLowerCase()}
            </Link>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <Link 
            to="/saved" 
            className="p-2 rounded-full hover:bg-primary/20 transition-colors duration-200"
            aria-label="Saved likes"
          >
            <Heart className="w-5 h-5 text-[#E0E0E0] dark:text-white" />
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;