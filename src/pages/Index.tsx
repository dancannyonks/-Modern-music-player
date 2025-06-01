
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import TopBar from '../components/TopBar';
import PlaylistCard from '../components/PlaylistCard';
import ModernLogo from '../components/ModernLogo';

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(heroRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "power3.out" }
      );
    }
    if (sectionsRef.current) {
      gsap.fromTo(sectionsRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, delay: 0.3, ease: "power2.out" }
      );
    }
  }, []);

  const featuredPlaylists = [
    {
      title: "今日热门",
      description: "最受欢迎的音乐精选",
      image: "https://picsum.photos/400/400?random=1"
    },
    {
      title: "流行金曲",
      description: "经典流行音乐合集",
      image: "https://picsum.photos/400/400?random=2"
    },
    {
      title: "放松时光",
      description: "轻松愉悦的背景音乐",
      image: "https://picsum.photos/400/400?random=3"
    },
    {
      title: "电子音乐",
      description: "节奏感强烈的电子乐",
      image: "https://picsum.photos/400/400?random=4"
    },
    {
      title: "古典精选",
      description: "优美的古典音乐作品",
      image: "https://picsum.photos/400/400?random=5"
    },
    {
      title: "摇滚经典",
      description: "永恒的摇滚名曲",
      image: "https://picsum.photos/400/400?random=6"
    }
  ];

  const newReleases = [
    {
      title: "新歌首发",
      artist: "人气歌手",
      image: "https://picsum.photos/300/300?random=7"
    },
    {
      title: "热门单曲",
      artist: "知名艺术家",
      image: "https://picsum.photos/300/300?random=8"
    },
    {
      title: "最新专辑",
      artist: "流行乐队",
      image: "https://picsum.photos/300/300?random=9"
    },
    {
      title: "独家首播",
      artist: "新晋歌手",
      image: "https://picsum.photos/300/300?random=10"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <TopBar />
      
      {/* Hero Section */}
      <div ref={heroRef} className="relative bg-gradient-to-r from-purple-900 via-blue-900 to-pink-900 p-8 mb-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center mb-4">
              <ModernLogo className="w-12 h-12 mr-4" />
              <h1 className="text-5xl font-bold text-white">NYONKS MUSIC</h1>
            </div>
            <p className="text-xl text-gray-300 mb-6">发现你的音乐世界，享受无限精彩</p>
            <button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
              开始探索
            </button>
          </div>
          <div className="hidden lg:block">
            <div className="w-64 h-64 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full opacity-20 animate-pulse"></div>
          </div>
        </div>
      </div>

      <div ref={sectionsRef} className="max-w-6xl mx-auto px-6 space-y-12">
        {/* Featured Playlists */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-6">精选歌单</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPlaylists.map((playlist, index) => (
              <PlaylistCard
                key={index}
                title={playlist.title}
                description={playlist.description}
                image={playlist.image}
                delay={index * 0.1}
              />
            ))}
          </div>
        </section>

        {/* New Releases */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-6">新歌首发</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {newReleases.map((release, index) => (
              <div
                key={index}
                className="bg-zinc-900 rounded-lg p-4 hover:bg-zinc-800 transition-all duration-300 cursor-pointer group"
              >
                <img
                  src={release.image}
                  alt={release.title}
                  className="w-full aspect-square object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
                />
                <h3 className="text-white font-medium mb-1 group-hover:text-pink-400 transition-colors">
                  {release.title}
                </h3>
                <p className="text-gray-400 text-sm">{release.artist}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Categories */}
        <section className="pb-8">
          <h2 className="text-3xl font-bold text-white mb-6">热门分类</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "华语流行", color: "from-red-500 to-pink-500" },
              { name: "欧美金曲", color: "from-blue-500 to-cyan-500" },
              { name: "日韩音乐", color: "from-purple-500 to-indigo-500" },
              { name: "电子舞曲", color: "from-green-500 to-teal-500" },
              { name: "古典音乐", color: "from-yellow-500 to-orange-500" },
              { name: "摇滚乐", color: "from-red-600 to-red-800" },
              { name: "爵士乐", color: "from-purple-600 to-pink-600" },
              { name: "民谣", color: "from-emerald-500 to-teal-600" }
            ].map((category, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${category.color} rounded-lg p-6 text-white font-bold text-lg cursor-pointer hover:scale-105 transition-transform duration-300`}
              >
                {category.name}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
