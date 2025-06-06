import { Image } from '../types/image';

/**
 * Generates a unique ID for a new image
 * @param images The current array of images
 * @returns A new unique ID string
 */
export function generateUniqueId(images: Image[]): string {
  // Find the highest existing ID and increment by 1
  const highestId = images.reduce((max, img) => {
    const id = parseInt(img.id);
    return isNaN(id) ? max : Math.max(max, id);
  }, 0);
  
  return String(highestId + 1);
}

/**
 * Generates filename-safe strings from titles
 * @param title The original title string
 * @returns A filename-safe version of the title
 */
export function generateFilenameFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove non-word chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

/**
 * Finds appropriate related images for a new image
 * @param images All available images
 * @param category The category of the new image
 * @param excludeId ID to exclude (usually the new image's ID)
 * @returns Array of 3 related image IDs
 */
export function findRelatedImages(
  images: Image[], 
  category: string, 
  excludeId: string
): string[] {
  // Get other images in the same category
  const sameCategory = images.filter(img => 
    img.category === category && img.id !== excludeId
  );
  
  // If we have at least 3 images in the same category, use those
  if (sameCategory.length >= 3) {
    return sameCategory.slice(0, 3).map(img => img.id);
  }
  
  // Otherwise, fill with random images from other categories
  const otherImages = images.filter(img => 
    img.category !== category && img.id !== excludeId
  );
  
  const related = [...sameCategory];
  
  // Fill remaining slots with random images from other categories
  while (related.length < 3 && otherImages.length > 0) {
    const randomIndex = Math.floor(Math.random() * otherImages.length);
    related.push(otherImages[randomIndex]);
    otherImages.splice(randomIndex, 1);
  }
  
  return related.map(img => img.id);
}