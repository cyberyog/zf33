import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen bg-primary-dark flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 
            className={`text-4xl md:text-6xl font-sans font-light tracking-wide text-neutral-light mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
          >
            Where <span className="text-accent-sage">Technology</span> meets <span className="text-accent-lavender">Spirituality</span>
          </h1>
          
          <p 
            className={`text-lg md:text-xl font-serif text-neutral-light opacity-90 mb-10 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
          >
            ZenFlow explores the intersection of digital innovation and spiritual consciousness through diverse artistic perspectives.
          </p>
          
          <div 
            className={`flex flex-col md:flex-row items-center justify-center gap-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
          >
            <Link 
              to="/gallery/cyber-zen" 
              className="px-8 py-3 rounded-full bg-accent-sage text-white font-medium transition-all duration-300 hover:bg-accent-sage hover:shadow-lg flex items-center"
            >
              Explore Galleries <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-primary opacity-30"></div>
    </section>
  );
};

export default Hero;