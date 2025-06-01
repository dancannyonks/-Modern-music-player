
import React, { useEffect, useRef } from 'react';
import { Music, Heart, Clock, Plus } from 'lucide-react';
import { gsap } from 'gsap';

const Library = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, []);

  const playlists = [
    { id: 1, name: "我的最爱", count: 45, color: "from-red-500 to-pink-500" },
    { id: 2, name: "流行热歌", count: 32, color: "from-blue-500 to-cyan-500" },
    { id: 3, name: "古典音乐", count: 28, color: "from-purple-500 to-indigo-500" },
    { id: 4, name: "摇滚经典", count: 56, color: "from-orange-500 to-red-500" },
    { id: 5, name: "放松音乐", count: 23, color: "from-green-500 to-teal-500" },
    { id: 6, name: "电子音乐", count: 41, color: "from-pink-500 to-purple-500" },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-4xl font-bold mb-6">音乐库</h1>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-4 cursor-pointer hover:from-green-500 hover:to-green-600 transition-all">
            <Heart className="w-6 h-6 mb-2" />
            <div className="font-medium">已赞歌曲</div>
            <div className="text-sm opacity-80">147首歌曲</div>
          </div>
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-4 cursor-pointer hover:from-purple-500 hover:to-purple-600 transition-all">
            <Clock className="w-6 h-6 mb-2" />
            <div className="font-medium">最近播放</div>
            <div className="text-sm opacity-80">32首歌曲</div>
          </div>
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-4 cursor-pointer hover:from-blue-500 hover:to-blue-600 transition-all">
            <Music className="w-6 h-6 mb-2" />
            <div className="font-medium">本地音乐</div>
            <div className="text-sm opacity-80">89首歌曲</div>
          </div>
          <div className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg p-4 cursor-pointer hover:from-gray-500 hover:to-gray-600 transition-all">
            <Plus className="w-6 h-6 mb-2" />
            <div className="font-medium">创建歌单</div>
            <div className="text-sm opacity-80">新建歌单</div>
          </div>
        </div>
      </div>

      {/* Created Playlists */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">创建的歌单</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-zinc-900 rounded-lg p-6 hover:bg-zinc-800 transition-all cursor-pointer group"
            >
              <div className={`w-full h-32 bg-gradient-to-br ${playlist.color} rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform`}>
                <Music className="w-12 h-12 text-white" />
              </div>
              <h3 className="font-bold text-white mb-2">{playlist.name}</h3>
              <p className="text-gray-400 text-sm">{playlist.count} 首歌曲</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recently Added */}
      <div className="max-w-6xl mx-auto mt-12">
        <h2 className="text-2xl font-bold mb-6">最近添加</h2>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-white font-medium">新歌曲 {item}</div>
                <div className="text-gray-400 text-sm">知名艺术家</div>
              </div>
              <div className="text-gray-400 text-sm">3:45</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Library;
