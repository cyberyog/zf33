import React from 'react';
import { useLikes } from '../context/LikesContext';
import ImageCard from '../components/ImageCard';

const SavedPage: React.FC = () => {
  const { likedImages } = useLikes();
  
  return (
    <div className="min-h-screen bg-neutral dark:bg-primary-dark text-[#E0E0E0] dark:text-white pt-12">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-mono font-semibold text-[#E0E0E0] dark:text-white mb-6">Saved Artworks</h1>
        
        {likedImages.length === 0 ? (
          <div className="bg-neutral-light/40 dark:bg-primary-dark/40 rounded-lg p-8 text-center">
            <p className="text-[#E0E0E0] dark:text-white mb-4">You haven't saved any artworks yet.</p>
            <p className="text-[#E0E0E0]/80 dark:text-white/80 text-sm">
              Explore galleries and click the heart icon to save your favorite pieces.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {likedImages.map((image) => (
              <ImageCard key={image.id} image={image} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedPage;