import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Share2 } from 'lucide-react';
import { Image } from '../types/image';
import { useLikes } from '../context/LikesContext';

interface ImageDetailProps {
  image: Image;
  prevImageId?: string;
  nextImageId?: string;
  relatedImages: Image[];
}

const ImageDetail: React.FC<ImageDetailProps> = ({ 
  image, 
  relatedImages
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [promptText, setPromptText] = useState(image.prompt || '');
  const { isLiked, toggleLike } = useLikes();
  const isFavorite = isLiked(image.id);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Update promptText whenever image changes
  useEffect(() => {
    setPromptText(image.prompt || '');
  }, [image.id, image.prompt]);
  
  // Auto-resize the textarea based on content
  useEffect(() => {
    const resizeTextarea = () => {
      const textarea = textareaRef.current;
      if (textarea) {
        // Reset height to auto to get the correct scrollHeight
        textarea.style.height = 'auto';
        // Set to scrollHeight to ensure all content is visible without scrolling
        textarea.style.height = textarea.scrollHeight + 'px';
      }
    };
    
    // Initial resize
    resizeTextarea();
    
    // Add event listener for input changes
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener('input', resizeTextarea);
    }
    
    // Cleanup
    return () => {
      if (textarea) {
        textarea.removeEventListener('input', resizeTextarea);
      }
    };
  }, [promptText]); // Re-run when promptText changes

  // Reset share success state after 2 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (shareSuccess) {
      timer = setTimeout(() => {
        setShareSuccess(false);
      }, 2000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [shareSuccess]);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLike(image.id);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };
  
  // Function to handle share
  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Create the URL for the current image
    const shareUrl = window.location.href;
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        setShareSuccess(true);
      })
      .catch((error) => {
        console.error('Error copying text: ', error);
        alert('Failed to copy link. Please try again.');
      });
  };
  
  // Function to handle prompt text change
  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPromptText(e.target.value);
  };
  
  // Function to add text to remix prompt
  const addToRemixPrompt = (text: string) => {
    if (textareaRef.current) {
      const newText = promptText ? `${promptText} ${text}` : text;
      setPromptText(newText);
      
      // Focus the textarea
      textareaRef.current.focus();
    }
  };

  // Function to add token to prompt
  const addTokenToPrompt = (token: string) => {
    if (textareaRef.current) {
      const newText = promptText ? `${promptText} ${token}` : token;
      setPromptText(newText);
      
      // Focus the textarea
      textareaRef.current.focus();
    }
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Image Section - 67% */}
        <div className="lg:col-span-2">
          <div className="relative rounded-lg overflow-hidden bg-neutral dark:bg-primary-dark group">
            {/* Fixed square aspect ratio container */}
            <div 
              className="aspect-square relative cursor-pointer"
              onClick={toggleZoom}
            >
              <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${isZoomed ? 'scale-125' : 'scale-100'}`}>
                <img
                  src={image.url}
                  alt={image.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Info Section - 33% */}
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            {/* Combined Remix Box with Tags and Prompt */}
            <div className="mb-8">
              <div className="rounded-2xl bg-black/50 backdrop-blur-sm p-4 shadow-inner relative">
                {/* Title at top of black box with buttons to the right */}
                <div className="flex items-center justify-between mb-1">
                  <h2 
                    className="text-3xl font-sans font-light text-accent-sage cursor-pointer hover:text-accent-sage/80 transition-colors duration-300"
                    onClick={() => addToRemixPrompt(image.title)}
                  >
                    {image.title}
                  </h2>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={handleToggleFavorite}
                      className={`p-2 rounded-full transition-colors duration-300 ${isFavorite ? 'text-accent-gold' : 'text-white hover:text-accent-gold'}`}
                      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                      <Heart size={20} fill={isFavorite ? "#B8A082" : "none"} />
                    </button>
                    <button 
                      onClick={handleShare}
                      className="p-2 rounded-full text-white hover:text-accent-gold transition-colors duration-300 relative"
                      aria-label="Share"
                    >
                      <Share2 size={20} />
                      {shareSuccess && (
                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                          Link copied!
                        </span>
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Style name below title inside the black box */}
                <div 
                  className="font-mono text-accent-sage text-lg lowercase tracking-wider mb-4 cursor-pointer hover:text-accent-sage/80 transition-colors duration-300"
                  onClick={() => addToRemixPrompt(image.categoryLabel)}
                >
                  {image.categoryLabel.toLowerCase()}
                </div>
                
                {/* Tags as text with icon prefix - updated styling */}
                <div className="flex flex-wrap gap-4 mb-3 text-[#94AFA7]">
                  {image.tags && (
                    <span className="inline-flex items-center">
                      <span className="text-[#66BB6A] text-lg mr-1 select-none">↯</span>
                      <span
                        className="text-[#94AFA7] hover:text-[#829992] text-xs cursor-pointer transition-colors duration-300"
                        onClick={() => addToRemixPrompt(image.tags || '')}
                      >
                        {image.tags}
                      </span>
                    </span>
                  )}

                  {image.tag2 && (
                    <span className="inline-flex items-center">
                      <span className="text-[#66BB6A] text-lg mr-1 select-none">↯</span>
                      <span
                        className="text-[#94AFA7] hover:text-[#829992] text-xs cursor-pointer transition-colors duration-300"
                        onClick={() => addToRemixPrompt(image.tag2 || '')}
                      >
                        {image.tag2}
                      </span>
                    </span>
                  )}

                  {image.tag3 && (
                    <span className="inline-flex items-center">
                      <span className="text-[#66BB6A] text-lg mr-1 select-none">↯</span>
                      <span
                        className="text-[#94AFA7] hover:text-[#829992] text-xs cursor-pointer transition-colors duration-300"
                        onClick={() => addToRemixPrompt(image.tag3 || '')}
                      >
                        {image.tag3}
                      </span>
                    </span>
                  )}
                </div>
                
                {/* Text Area */}
                <textarea
                  ref={textareaRef}
                  value={promptText}
                  onChange={handlePromptChange}
                  className="w-full p-2 rounded-2xl bg-black/50 text-accent-sage placeholder-gray-500 dark:placeholder-neutral-light/40 font-mono text-sm border-0 focus:ring-1 focus:ring-accent-blue/40 resize-none overflow-hidden"
                  style={{ minHeight: '3rem' }}
                />

                {/* Tokens section - only show for new styles with tokens */}
                {image.tokens && image.tokens.length > 0 && (
                  <div className="mt-4">
                    <div className="space-y-2">
                      {image.tokens.map((tokenRow, rowIndex) => (
                        <div key={rowIndex} className="flex flex-wrap gap-1">
                          {tokenRow.map((token, tokenIndex) => (
                            <button
                              key={tokenIndex}
                              onClick={() => addTokenToPrompt(token)}
                              className="px-2 py-1 bg-black/30 hover:bg-black/50 text-[#94AFA7] hover:text-[#829992] text-xs rounded-xl transition-all duration-300 cursor-pointer font-mono"
                            >
                              {token}
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-center mt-3">
                  <button
                    className="inline-block px-4 py-1.5 bg-black/50 text-[#66BB6A] hover:opacity-90 transition-colors duration-300 text-sm font-mono tracking-wide rounded-2xl"
                  >
                    REMIX - COMING SOON 💟
                  </button>
                </div>
              </div>
            </div>
            
            {relatedImages.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-[#E0E0E0] dark:text-white mb-3">Related Artworks</h3>
                <div className="grid grid-cols-3 gap-2">
                  {relatedImages.slice(0, 9).map((relImg) => (
                    <Link 
                      key={relImg.id} 
                      to={`/image/${relImg.id}`} 
                      className="block aspect-square relative rounded overflow-hidden"
                    >
                      <img 
                        src={relImg.url} 
                        alt={relImg.title} 
                        className="absolute inset-0 w-full h-full object-cover hover:opacity-90 transition-opacity"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDetail;