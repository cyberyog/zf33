import { describe, it, expect } from 'vitest';
import { getImageById, getImagesByCategory, getRelatedImages } from './images';

describe('image data utilities', () => {
  it('getImageById returns the correct image', () => {
    const image = getImageById('28');
    expect(image?.title).toBe('Quantum Spheres');
  });

  it('getImagesByCategory filters images by category', () => {
    const results = getImagesByCategory('neo-retro');
    expect(results.length).toBeGreaterThan(0);
    for (const img of results) {
      expect(img.category).toBe('neo-retro');
    }
  });

  it('getRelatedImages returns valid related images', () => {
    const related = getRelatedImages('28');
    expect(related.map(i => i?.id)).toEqual(['29', '36', '52']);
  });
});
