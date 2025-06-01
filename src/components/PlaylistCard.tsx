
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface PlaylistCardProps {
  title: string;
  description: string;
  image: string;
  delay?: number;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ title, description, image, delay = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, delay, ease: "power3.out" }
      );
    }
  }, [delay]);

  return (
    <div ref={cardRef} className="flex items-center space-x-4 p-3 rounded-lg bg-zinc-900/50 hover:bg-zinc-800/70 transition-all duration-300 cursor-pointer group">
      <img 
        src={image} 
        alt={title}
        className="w-16 h-16 rounded-md object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-medium truncate group-hover:text-spotify-green transition-colors">{title}</h3>
        <p className="text-zinc-400 text-sm truncate">{description}</p>
      </div>
    </div>
  );
};

export default PlaylistCard;
