# StyleMaps

A digital art gallery showcasing various artistic styles at the intersection of technology and spirituality.

## Adding New Images

This guide explains how to add new images to the StyleMaps gallery.

### 1. Prepare Your Images

- Images should be in JPG or PNG format
- Recommended dimensions: at least 1920×1080 pixels for good quality
- File size: Keep under 2MB per image for good performance

### 2. Upload Images to the Public Folder

Images are organized by style category in the `public/` directory:

```
public/
├─ style001/ (cyber-zen)
├─ style002/ (natural-flow)
├─ style003/ (sacred-tech)
├─ style004/ (urban-minimalism)
├─ style005/ (digital-dreams)
├─ style006/ (abstract-flow)
├─ style007/ (neo-retro)
├─ style008/ (iridescent-divinity)
└─ ... (additional style folders)
```

Upload your images to the appropriate style folder based on their category.

### 3. Use the Image Download Script (Optional)

For downloading multiple images from URLs:

1. Edit the `scripts/download-images.js` file to include your image URLs
2. Run `npm run download-images` to download the images to the appropriate folders

### 4. Update the Images Data

After uploading your images, update the `src/data/images.ts` file to include your new images.

Follow the template at the bottom of the images array:

```typescript
{
  id: 'UNIQUE_ID',  // Increment from the last ID
  title: 'Image Title',
  description: 'Detailed image description.',
  category: 'category-slug', // Must match one of the existing categories
  categoryLabel: 'Category Label', // Human-readable category name
  url: '/folder-name/file-name.jpg', // Path to the image in the public folder
  featured: false, // Set to true only for category showcase images
  createdAt: '2025-MM-DD', // Keep the future date format consistent
  technical: {
    dimensions: 'WIDTH x HEIGHT px',
    medium: 'Digital',
    process: 'Description of creation process',
  },
  related: ['ID1', 'ID2', 'ID3'], // IDs of 3 related images
}
```

### 5. Add New Categories (If Needed)

If creating a new style category:

1. Add the new category to `src/data/categories.ts`
2. Create the corresponding folder in `public/`
3. Update any type definitions in `src/types/image.ts` if necessary

### 6. Test Your Changes

After adding new images, run the development server to verify that they appear correctly in the gallery:

```
npm run dev
```

Check both the gallery view and the image detail pages for the new images.