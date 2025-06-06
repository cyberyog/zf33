import React, { createContext, useContext, useState, useEffect } from 'react';
import { Image } from '../types/image';
import { getImageById } from '../data/images';

interface LikesContextType {
  likedImages: Image[];
  toggleLike: (imageId: string) => void;
  isLiked: (imageId: string) => boolean;
}

const LikesContext = createContext<LikesContextType | undefined>(undefined);

export function LikesProvider({ children }: { children: React.ReactNode }) {
  const [likedImageIds, setLikedImageIds] = useState<string[]>(() => {
    const savedLikes = localStorage.getItem('likedImages');
    return savedLikes ? JSON.parse(savedLikes) : [];
  });
  
  const [likedImages, setLikedImages] = useState<Image[]>([]);
  
  // Load actual image objects when component mounts or likedImageIds changes
  useEffect(() => {
    const images = likedImageIds
      .map(id => getImageById(id))
      .filter(image => image !== undefined) as Image[];
    
    setLikedImages(images);
  }, [likedImageIds]);

  // Save to localStorage whenever likedImageIds changes
  useEffect(() => {
    localStorage.setItem('likedImages', JSON.stringify(likedImageIds));
  }, [likedImageIds]);

  const toggleLike = (imageId: string) => {
    setLikedImageIds(prev => {
      if (prev.includes(imageId)) {
        return prev.filter(id => id !== imageId);
      } else {
        return [...prev, imageId];
      }
    });
  };

  const isLiked = (imageId: string): boolean => {
    return likedImageIds.includes(imageId);
  };

  return (
    <LikesContext.Provider value={{ likedImages, toggleLike, isLiked }}>
      {children}
    </LikesContext.Provider>
  );
}

export function useLikes() {
  const context = useContext(LikesContext);
  if (context === undefined) {
    throw new Error('useLikes must be used within a LikesProvider');
  }
  return context;
}