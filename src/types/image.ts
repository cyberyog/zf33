export interface Image {
  id: string;
  title: string;
  description: string;
  category: 'neo-retro' | 'iridescent-divinity' | 'bronze-mythic-realism' | 'hyper-anime-portraiture' | 'mythic-tech-realism' | 'epic-painterly-realism';
  categoryLabel: string;
  url: string;
  featured: boolean;
  createdAt: string;
  tags?: string;
  tag2?: string;
  tag3?: string;
  prompt?: string;
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