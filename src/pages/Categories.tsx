
import React, { useEffect, useRef } from 'react';
import { Play, Heart, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const Categories = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }
    if (gridRef.current) {
      gsap.fromTo(gridRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.3, ease: "power2.out" }
      );
    }
  }, []);

  const categories = [
    {
      id: 1,
      name: "华语流行",
      description: "Popular Chinese music hits",
      image: "https://picsum.photos/400/300?random=1",
      color: "from-red-500 to-pink-500",
      playlists: [
        { title: "华语金曲榜", artist: "Various Artists", cover: "https://picsum.photos/200/200?random=11" },
        { title: "经典老歌", artist: "Various Artists", cover: "https://picsum.photos/200/200?random=12" },
        { title: "新歌快递", artist: "Various Artists", cover: "https://picsum.photos/200/200?random=13" }
      ]
    },
    {
      id: 2,
      name: "欧美金曲",
      description: "Western popular music",
      image: "https://picsum.photos/400/300?random=2",
      color: "from-blue-500 to-cyan-500",
      playlists: [
        { title: "Top 100 Hits", artist: "Various Artists", cover: "https://picsum.photos/200/200?random=14" },
        { title: "Rock Classics", artist: "Various Artists", cover: "https://picsum.photos/200/200?random=15" },
        { title: "Pop Essentials", artist: "Various Artists", cover: "https://picsum.photos/200/200?random=16" }
      ]
    },
    {
      id: 3,
      name: "日韩音乐",
      description: "J-Pop and K-Pop hits",
      image: "https://picsum.photos/400/300?random=3",
      color: "from-purple-500 to-indigo-500",
      playlists: [
        { title: "K-Pop Hits", artist: "Various Artists", cover: "https://picsum.photos/200/200?random=17" },
        { title: "J-Pop Classics", artist: "Various Artists", cover: "https://picsum.photos/200/200?random=18" },
        { title: "Asian Pop Mix", artist: "Various Artists", cover: "https://picsum.photos/200/200?random=19" }
      ]
    },
    {
      id: 4,
      name: "电子舞曲",
      description: "Electronic and dance music",
      image: "https://picsum.photos/400/300?random=4",
      color: "from-green-500 to-teal-500",
      playlists: [
        { title: "EDM Bangers", artist: "Various Artists", cover: "https://picsum.photos/200/200?random=20" },
        { title: "House Vibes", artist: "Various Artists", cover: "https://picsum.photos/200/200?random=21" },
        { title: "Techno Underground", artist: "Various Artists", cover: "https://picsum.photos/200/200?random=22" }
      ]
    },
    {
      id: 5,
      name: "古典音乐",
      description: "Classical and orchestral music",
      image: "https://picsum.photos/400/300?random=5",
      color: "from-yellow-500 to-orange-500",
      playlists: [
        { title: "Classical Masterpieces", artist: "Various Artists", cover: "https://picsum.photos/200/200?random=23" },
        { title: "Piano Concertos", artist: "Various Artists", cover: "https://picsum.photos/200/200?random=24" },
        { title: "Symphony Collection", artist: "Various Artists", cover: "https://picsum.photos/200/200?random=25" }
      ]
    },
    {
      id: 6,
      name: "摇滚乐",
      description: "Rock and alternative music",
      image: "https://picsum.photos/400/300?random=6",
      color: "from-red-600 to-red-800",
      playlists: [
        { title: "Rock Anthems", artist: "Various Artists", cover: "https://picsum.photos/200/200?random=26" },
        { title: "Alternative Rock", artist: "Various Artists", cover: "https://picsum.photos/200/200?random=27" },
        { title: "Metal Madness", artist: "Various Artists", cover: "https://picsum.photos/200/200?random=28" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div ref={containerRef} className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Music Categories</h1>
          <p className="text-gray-400 text-lg">Discover music by genre and mood</p>
        </div>

        {/* Categories Grid */}
        <div ref={gridRef} className="space-y-12">
          {categories.map((category) => (
            <div key={category.id} className="category-section">
              {/* Category Header */}
              <div className={`relative bg-gradient-to-r ${category.color} rounded-2xl p-8 mb-8 overflow-hidden`}>
                <div className="absolute inset-0 opacity-20">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold text-white mb-2">{category.name}</h2>
                  <p className="text-white/90 text-lg mb-6">{category.description}</p>
                  <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center space-x-2">
                    <Play className="w-5 h-5" />
                    <span>Play All</span>
                  </button>
                </div>
              </div>

              {/* Playlists Grid */}
              <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-6">
                {category.playlists.map((playlist, index) => (
                  <Link
                    key={index}
                    to="/playlist"
                    className="group bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 hover:bg-zinc-800/50 transition-all duration-300 cursor-pointer border border-white/5 hover:border-white/10"
                  >
                    <div className="relative mb-4">
                      <img
                        src={playlist.cover}
                        alt={playlist.title}
                        className="w-full aspect-square object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                        <button className="bg-green-500 hover:bg-green-600 text-black p-3 rounded-full transform scale-90 group-hover:scale-100 transition-transform duration-300">
                          <Play className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                    
                    <h3 className="text-white font-semibold mb-2 group-hover:text-green-400 transition-colors">
                      {playlist.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">{playlist.artist}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10">
                          <Heart className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-xs text-gray-500">
                        {Math.floor(Math.random() * 50) + 10} songs
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Featured Playlists Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">Featured Playlists</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Today's Top Hits", artist: "NYONKS Music", cover: "https://picsum.photos/300/300?random=29" },
              { title: "Viral 50", artist: "Global", cover: "https://picsum.photos/300/300?random=30" },
              { title: "Trending Now", artist: "Trending", cover: "https://picsum.photos/300/300?random=31" },
              { title: "New Music Friday", artist: "Weekly", cover: "https://picsum.photos/300/300?random=32" }
            ].map((playlist, index) => (
              <Link
                key={index}
                to="/playlist"
                className="group bg-black/20 backdrop-blur-sm rounded-xl p-4 hover:bg-black/30 transition-all duration-300 border border-white/10 hover:border-white/20"
              >
                <div className="relative mb-4">
                  <img
                    src={playlist.cover}
                    alt={playlist.title}
                    className="w-full aspect-square object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                    <button className="bg-green-500 hover:bg-green-600 text-black p-3 rounded-full">
                      <Play className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <h3 className="text-white font-medium mb-1 group-hover:text-green-400 transition-colors">
                  {playlist.title}
                </h3>
                <p className="text-gray-400 text-sm">{playlist.artist}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
