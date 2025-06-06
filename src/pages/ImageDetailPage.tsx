import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ImageDetail from '../components/ImageDetail';
import { getImageById, getImagesByCategory, getRelatedImages } from '../data/images';
import { Image } from '../types/image';

const ImageDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [image, setImage] = useState<Image | null>(null);
  const [relatedImages, setRelatedImages] = useState<Image[]>([]);
  
  useEffect(() => {
    if (id) {
      const currentImage = getImageById(id);
      
      if (currentImage) {
        setImage(currentImage);
        
        // Get all images from same category for more related images
        const categoryImages = getImagesByCategory(currentImage.category);
        const filteredCategoryImages = categoryImages.filter(img => img.id !== id);
        
        // Get related images from the image's related array
        const relatedFromProps = getRelatedImages(id) as Image[];
        
        // Combine related images from props with others from the same category
        let combinedRelated = [...relatedFromProps];
        
        // Add more from category if needed to reach 9
        if (combinedRelated.length < 9) {
          const additionalNeeded = 9 - combinedRelated.length;
          const additionalImages = filteredCategoryImages
            .filter(img => !combinedRelated.some(rel => rel.id === img.id))
            .slice(0, additionalNeeded);
          
          combinedRelated = [...combinedRelated, ...additionalImages];
        }
        
        setRelatedImages(combinedRelated);
      } else {
        // Image not found
        navigate('/');
      }
    }
  }, [id, navigate]);
  
  if (!image) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral dark:bg-primary-dark text-[#E0E0E0] dark:text-white">
        <p>Loading image...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral dark:bg-primary-dark text-[#E0E0E0] dark:text-white pt-12">
      <ImageDetail 
        image={image} 
        relatedImages={relatedImages}
      />
    </div>
  );
};

export default ImageDetailPage;