
import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, Mic, TrendingUp } from 'lucide-react';
import { gsap } from 'gsap';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, []);

  const categories = [
    { id: 'all', name: '全部' },
    { id: 'songs', name: '歌曲' },
    { id: 'artists', name: '艺术家' },
    { id: 'albums', name: '专辑' },
    { id: 'playlists', name: '歌单' }
  ];

  const trendingSearches = [
    "周杰伦", "Taylor Swift", "林俊杰", "邓紫棋", "薛之谦",
    "古典音乐", "电子音乐", "摇滚", "民谣", "爵士"
  ];

  const searchResults = [
    {
      type: 'song',
      title: '青花瓷',
      artist: '周杰伦',
      album: '我很忙',
      image: 'https://picsum.photos/100/100?random=1',
      duration: '3:58'
    },
    {
      type: 'song',
      title: 'Shape of You',
      artist: 'Ed Sheeran',
      album: '÷ (Divide)',
      image: 'https://picsum.photos/100/100?random=2',
      duration: '3:53'
    },
    {
      type: 'artist',
      title: '林俊杰',
      subtitle: '251万 月听众',
      image: 'https://picsum.photos/100/100?random=3'
    },
    {
      type: 'album',
      title: '范特西',
      artist: '周杰伦',
      year: '2001',
      image: 'https://picsum.photos/100/100?random=4'
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
      {/* Search Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="relative mb-6">
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索歌曲、艺术家、专辑..."
            className="w-full pl-14 pr-14 py-4 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors text-lg"
          />
          <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
            <Mic className="w-6 h-6" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex space-x-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-white text-black font-medium'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results or Trending */}
      <div className="max-w-4xl mx-auto">
        {searchQuery ? (
          /* Search Results */
          <div>
            <h2 className="text-2xl font-bold mb-6">搜索结果</h2>
            <div className="space-y-4">
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <img
                    src={result.image}
                    alt={result.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">{result.title}</h3>
                    {result.type === 'song' && (
                      <p className="text-gray-400 text-sm">
                        {result.artist} • {result.album}
                      </p>
                    )}
                    {result.type === 'artist' && (
                      <p className="text-gray-400 text-sm">{result.subtitle}</p>
                    )}
                    {result.type === 'album' && (
                      <p className="text-gray-400 text-sm">
                        {result.artist} • {result.year}
                      </p>
                    )}
                  </div>
                  {result.duration && (
                    <span className="text-gray-400 text-sm">{result.duration}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Trending Searches */
          <div>
            <div className="flex items-center mb-6">
              <TrendingUp className="w-6 h-6 text-red-500 mr-3" />
              <h2 className="text-2xl font-bold">热门搜索</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {trendingSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(search)}
                  className="bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-3 rounded-lg transition-colors text-left"
                >
                  <span className="text-gray-400 text-sm mr-2">{index + 1}</span>
                  {search}
                </button>
              ))}
            </div>

            {/* Popular Categories */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">浏览分类</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: '华语流行', color: 'from-red-500 to-pink-500', image: 'https://picsum.photos/200/200?random=11' },
                  { name: '欧美金曲', color: 'from-blue-500 to-cyan-500', image: 'https://picsum.photos/200/200?random=12' },
                  { name: '日韩音乐', color: 'from-purple-500 to-indigo-500', image: 'https://picsum.photos/200/200?random=13' },
                  { name: '电子舞曲', color: 'from-green-500 to-teal-500', image: 'https://picsum.photos/200/200?random=14' },
                  { name: '古典音乐', color: 'from-yellow-500 to-orange-500', image: 'https://picsum.photos/200/200?random=15' },
                  { name: '摇滚乐', color: 'from-red-600 to-red-800', image: 'https://picsum.photos/200/200?random=16' },
                  { name: '爵士乐', color: 'from-purple-600 to-pink-600', image: 'https://picsum.photos/200/200?random=17' },
                  { name: '民谣', color: 'from-emerald-500 to-teal-600', image: 'https://picsum.photos/200/200?random=18' }
                ].map((category, index) => (
                  <div
                    key={index}
                    className={`relative bg-gradient-to-br ${category.color} rounded-lg p-6 h-32 cursor-pointer hover:scale-105 transition-transform duration-300 overflow-hidden`}
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-30"
                    />
                    <div className="relative z-10">
                      <h3 className="text-white font-bold text-lg">{category.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
