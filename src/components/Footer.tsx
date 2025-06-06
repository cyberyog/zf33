import React from 'react';
import { Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="glass-borderless mt-auto py-2 opacity-50">
      <div className="container mx-auto px-4 h-6 flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <span className="text-[#E0E0E0] dark:text-white">&copy; {new Date().getFullYear()} StyleMaps</span>
          <a href="#" className="text-[#E0E0E0] dark:text-white hover:text-accent-purple">Terms</a>
        </div>
        <div className="flex gap-4">
          <a href="#" aria-label="X" className="text-[#E0E0E0] dark:text-white hover:text-accent-purple">
            <Twitter size={16} />
          </a>
          <a href="#" aria-label="YouTube" className="text-[#E0E0E0] dark:text-white hover:text-accent-purple">
            <Youtube size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;