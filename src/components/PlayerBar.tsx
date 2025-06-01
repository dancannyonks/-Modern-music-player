
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat, Heart } from 'lucide-react';
import { gsap } from 'gsap';

const PlayerBar = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [volume, setVolume] = useState(80);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (playerRef.current) {
      gsap.fromTo(playerRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.5 }
      );
    }
  }, []);

  return (
    <div 
      ref={playerRef} 
      className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/10 px-4 py-2 z-50"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Current Track Info */}
        <div className="flex items-center space-x-3 min-w-0 w-1/4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md flex-shrink-0"></div>
          <div className="min-w-0">
            <h4 className="text-white font-medium text-sm truncate">Sample Song</h4>
            <p className="text-zinc-400 text-xs truncate">Sample Artist</p>
          </div>
          <Heart className="w-4 h-4 text-zinc-400 hover:text-pink-500 cursor-pointer transition-colors flex-shrink-0" />
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-1 w-2/4 max-w-md">
          <div className="flex items-center space-x-3">
            <Shuffle className="w-4 h-4 text-zinc-400 hover:text-white cursor-pointer transition-colors" />
            <SkipBack className="w-4 h-4 text-zinc-400 hover:text-white cursor-pointer transition-colors" />
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-7 h-7 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <Pause className="w-3 h-3 text-black" />
              ) : (
                <Play className="w-3 h-3 text-black ml-0.5" />
              )}
            </button>
            <SkipForward className="w-4 h-4 text-zinc-400 hover:text-white cursor-pointer transition-colors" />
            <Repeat className="w-4 h-4 text-zinc-400 hover:text-white cursor-pointer transition-colors" />
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-2 w-full">
            <span className="text-xs text-zinc-400 min-w-[32px]">1:23</span>
            <div className="flex-1 group">
              <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer">
                <div 
                  className="h-full bg-white transition-all duration-150 hover:bg-pink-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <span className="text-xs text-zinc-400 min-w-[32px]">3:45</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2 w-1/4 justify-end">
          <Volume2 className="w-4 h-4 text-zinc-400" />
          <div className="w-20 group">
            <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer">
              <div 
                className="h-full bg-white transition-all duration-150 hover:bg-pink-500"
                style={{ width: `${volume}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerBar;
