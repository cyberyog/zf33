export interface Image {
  id: string;
  title: string;
  description: string;
  category: 'mythic-tech-realism' | 'epic-painterly-realism' | 'neon-mythic-odyssey' | 'retro-surreal-saga';
  categoryLabel: string;
  url: string;
  featured: boolean;
  createdAt: string;
  tags?: string;
  tag2?: string;
  tag3?: string;
  prompt?: string;
  tokens?: string[][];
  technical?: {
    dimensions?: string;
    medium?: string;
    process?: string;
  };
  related?: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
  featured: boolean;
}