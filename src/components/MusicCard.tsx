
import React, { useRef, useEffect } from 'react';
import { Play } from 'lucide-react';
import { gsap } from 'gsap';

interface MusicCardProps {
  title: string;
  artist: string;
  image: string;
  delay?: number;
}

const MusicCard: React.FC<MusicCardProps> = ({ title, artist, image, delay = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const playButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, delay, ease: "power2.out" }
      );
    }
  }, [delay]);

  const handleMouseEnter = () => {
    if (playButtonRef.current && cardRef.current) {
      gsap.to(playButtonRef.current, { 
        opacity: 1, 
        scale: 1, 
        duration: 0.2, 
        ease: "power2.out" 
      });
      gsap.to(cardRef.current, { 
        y: -8, 
        duration: 0.3, 
        ease: "power2.out" 
      });
    }
  };

  const handleMouseLeave = () => {
    if (playButtonRef.current && cardRef.current) {
      gsap.to(playButtonRef.current, { 
        opacity: 0, 
        scale: 0.8, 
        duration: 0.2, 
        ease: "power2.out" 
      });
      gsap.to(cardRef.current, { 
        y: 0, 
        duration: 0.3, 
        ease: "power2.out" 
      });
    }
  };

  return (
    <div 
      ref={cardRef}
      className="music-card p-4 relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative mb-4">
        <img 
          src={image} 
          alt={title}
          className="w-full aspect-square object-cover rounded-md shadow-lg"
        />
        <button
          ref={playButtonRef}
          className="absolute bottom-2 right-2 w-12 h-12 bg-spotify-green rounded-full flex items-center justify-center opacity-0 scale-75 transition-all duration-200 hover:scale-110 shadow-lg"
        >
          <Play className="w-5 h-5 text-black ml-0.5" />
        </button>
      </div>
      <h3 className="text-white font-medium truncate mb-1">{title}</h3>
      <p className="text-zinc-400 text-sm truncate">{artist}</p>
    </div>
  );
};

export default MusicCard;
