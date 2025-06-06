import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImageGrid from '../components/ImageGrid';
import { categories } from '../data/categories';
import { getImagesByCategory } from '../data/images';
import { Category, Image } from '../types/image';

const GalleryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [images, setImages] = useState<Image[]>([]);
  
  useEffect(() => {
    if (slug) {
      const foundCategory = categories.find(cat => cat.slug === slug);
      if (foundCategory) {
        setCategory(foundCategory);
        
        const categoryImages = getImagesByCategory(slug);
        setImages(categoryImages);
      }
    }
  }, [slug]);
  
  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral dark:bg-primary-dark text-[#E0E0E0] dark:text-white">
        <p>Loading gallery...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral dark:bg-primary-dark text-[#E0E0E0] dark:text-white relative pt-12">
      <section>
        <div className="container mx-auto px-4">
          <ImageGrid images={images} category={category} />
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;