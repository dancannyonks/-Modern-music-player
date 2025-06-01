
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
    <div ref={playerRef} className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Current Track Info */}
        <div className="flex items-center space-x-4 min-w-0 w-1/4">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md flex-shrink-0 animate-pulse-glow"></div>
          <div className="min-w-0">
            <h4 className="text-white font-medium truncate">Sample Song</h4>
            <p className="text-zinc-400 text-sm truncate">Sample Artist</p>
          </div>
          <Heart className="w-5 h-5 text-zinc-400 hover:text-spotify-green cursor-pointer transition-colors" />
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2 w-2/4 max-w-md">
          <div className="flex items-center space-x-4">
            <Shuffle className="w-4 h-4 text-zinc-400 hover:text-white cursor-pointer transition-colors" />
            <SkipBack className="w-5 h-5 text-zinc-400 hover:text-white cursor-pointer transition-colors" />
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-black ml-0.5" />
              ) : (
                <Play className="w-4 h-4 text-black ml-0.5" />
              )}
            </button>
            <SkipForward className="w-5 h-5 text-zinc-400 hover:text-white cursor-pointer transition-colors" />
            <Repeat className="w-4 h-4 text-zinc-400 hover:text-white cursor-pointer transition-colors" />
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-2 w-full">
            <span className="text-xs text-zinc-400">1:23</span>
            <div className="flex-1 group">
              <div className="progress-bar">
                <div 
                  className="progress-fill group-hover:bg-spotify-green"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <span className="text-xs text-zinc-400">3:45</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2 w-1/4 justify-end">
          <Volume2 className="w-4 h-4 text-zinc-400" />
          <div className="w-24 group">
            <div className="progress-bar">
              <div 
                className="progress-fill group-hover:bg-spotify-green"
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
