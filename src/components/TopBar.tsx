
import React, { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';
import { gsap } from 'gsap';

const TopBar = () => {
  const topBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (topBarRef.current) {
      gsap.fromTo(topBarRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.2 }
      );
    }
  }, []);

  return (
    <div ref={topBarRef} className="flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
      {/* Navigation */}
      <div className="flex items-center space-x-4">
        <button className="w-8 h-8 rounded-full bg-black/70 flex items-center justify-center hover:bg-black transition-colors">
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button className="w-8 h-8 rounded-full bg-black/70 flex items-center justify-center hover:bg-black transition-colors">
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* User Profile */}
      <div className="flex items-center space-x-4">
        <button className="bg-black rounded-full px-4 py-2 flex items-center space-x-2 hover:bg-zinc-800 transition-colors">
          <User className="w-4 h-4 text-white" />
          <span className="text-white text-sm font-medium">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default TopBar;
