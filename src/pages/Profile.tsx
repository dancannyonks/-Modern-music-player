
import React, { useEffect, useRef } from 'react';
import { User, Music, Heart, Clock, Settings } from 'lucide-react';
import { gsap } from 'gsap';

const Profile = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
      {/* Profile Header */}
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 mb-8">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">音乐爱好者</h1>
            <p className="text-white/80 mb-4">member@nyonks.com</p>
            <div className="flex space-x-4 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">VIP会员</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">已关注 128 位艺术家</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-zinc-900 rounded-xl p-6 text-center">
          <Music className="w-8 h-8 text-blue-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white">1,247</div>
          <div className="text-gray-400">收藏歌曲</div>
        </div>
        <div className="bg-zinc-900 rounded-xl p-6 text-center">
          <Heart className="w-8 h-8 text-red-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white">89</div>
          <div className="text-gray-400">喜欢歌单</div>
        </div>
        <div className="bg-zinc-900 rounded-xl p-6 text-center">
          <Clock className="w-8 h-8 text-green-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white">342h</div>
          <div className="text-gray-400">总播放时长</div>
        </div>
        <div className="bg-zinc-900 rounded-xl p-6 text-center">
          <Settings className="w-8 h-8 text-purple-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white">15</div>
          <div className="text-gray-400">创建歌单</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">最近播放</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-zinc-900 rounded-lg p-4 hover:bg-zinc-800 transition-colors cursor-pointer">
              <div className="w-full h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-4"></div>
              <h3 className="font-medium text-white mb-1">热门歌曲 {item}</h3>
              <p className="text-gray-400 text-sm">知名艺术家</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
