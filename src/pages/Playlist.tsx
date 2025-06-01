
import React, { useEffect, useRef } from 'react';
import { Play, Heart, Share2, MoreHorizontal, Clock } from 'lucide-react';
import { gsap } from 'gsap';

const Playlist = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }
    if (containerRef.current) {
      gsap.fromTo(containerRef.current.querySelectorAll('.track-item'),
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.3, ease: "power2.out" }
      );
    }
  }, []);

  const tracks = [
    { id: 1, title: "夜的钢琴曲", artist: "石进", album: "夜的钢琴曲", duration: "3:45" },
    { id: 2, title: "卡农", artist: "帕赫贝尔", album: "古典精选", duration: "4:12" },
    { id: 3, title: "月光奏鸣曲", artist: "贝多芬", album: "贝多芬全集", duration: "5:23" },
    { id: 4, title: "天空之城", artist: "久石让", album: "宫崎骏音乐集", duration: "4:18" },
    { id: 5, title: "River Flows in You", artist: "Yiruma", album: "First Love", duration: "3:36" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Playlist Header */}
      <div ref={headerRef} className="relative bg-gradient-to-b from-purple-800 to-purple-900 p-8">
        <div className="max-w-6xl mx-auto flex items-end space-x-6">
          <div className="w-64 h-64 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg shadow-2xl flex items-center justify-center">
            <div className="text-6xl">🎵</div>
          </div>
          <div>
            <p className="text-gray-300 mb-2">歌单</p>
            <h1 className="text-5xl font-bold mb-4">我的最爱</h1>
            <p className="text-gray-300 mb-4">精选的最佳音乐合集，适合任何心情</p>
            <div className="flex items-center space-x-4 text-sm text-gray-300">
              <span>NYONKS MUSIC</span>
              <span>•</span>
              <span>2024年创建</span>
              <span>•</span>
              <span>{tracks.length} 首歌曲</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-gradient-to-b from-purple-900/50 to-transparent p-6">
        <div className="max-w-6xl mx-auto flex items-center space-x-6">
          <button className="bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-8 rounded-full flex items-center space-x-2 transition-colors">
            <Play className="w-5 h-5" />
            <span>播放</span>
          </button>
          <button className="text-gray-300 hover:text-white transition-colors">
            <Heart className="w-8 h-8" />
          </button>
          <button className="text-gray-300 hover:text-white transition-colors">
            <Share2 className="w-8 h-8" />
          </button>
          <button className="text-gray-300 hover:text-white transition-colors">
            <MoreHorizontal className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Track List */}
      <div ref={containerRef} className="max-w-6xl mx-auto px-6 pb-8">
        <div className="bg-black/20 rounded-lg overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 text-gray-400 text-sm border-b border-gray-800">
            <div className="col-span-1">#</div>
            <div className="col-span-6">标题</div>
            <div className="col-span-3">专辑</div>
            <div className="col-span-2 text-right">
              <Clock className="w-4 h-4 ml-auto" />
            </div>
          </div>

          {/* Tracks */}
          {tracks.map((track, index) => (
            <div
              key={track.id}
              className="track-item grid grid-cols-12 gap-4 px-6 py-3 hover:bg-white/5 transition-colors cursor-pointer group"
            >
              <div className="col-span-1 text-gray-400 group-hover:text-white">
                <span className="group-hover:hidden">{index + 1}</span>
                <Play className="w-4 h-4 hidden group-hover:block" />
              </div>
              <div className="col-span-6">
                <div className="text-white font-medium mb-1">{track.title}</div>
                <div className="text-gray-400 text-sm">{track.artist}</div>
              </div>
              <div className="col-span-3 text-gray-400 text-sm flex items-center">
                {track.album}
              </div>
              <div className="col-span-2 text-gray-400 text-sm text-right flex items-center justify-end">
                {track.duration}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
