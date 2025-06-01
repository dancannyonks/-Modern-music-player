
import React, { useState, useRef, useEffect } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { gsap } from 'gsap';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import PlayerBar from '../components/PlayerBar';
import MusicCard from '../components/MusicCard';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchRef.current) {
      gsap.fromTo(searchRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(query.length > 0);
    
    if (resultsRef.current && query.length > 0) {
      gsap.fromTo(resultsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
  };

  const mockResults = [
    {
      title: "Blinding Lights",
      artist: "The Weeknd",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop"
    },
    {
      title: "Watermelon Sugar",
      artist: "Harry Styles",
      image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&h=400&fit=crop"
    },
    {
      title: "Levitating",
      artist: "Dua Lipa",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
    },
    {
      title: "Good 4 U",
      artist: "Olivia Rodrigo",
      image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop"
    },
  ];

  const genres = [
    { name: 'Pop', color: 'bg-pink-500', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop' },
    { name: 'Hip-Hop', color: 'bg-orange-500', image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&h=400&fit=crop' },
    { name: 'Rock', color: 'bg-red-500', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop' },
    { name: 'Electronic', color: 'bg-blue-500', image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop' },
    { name: 'Jazz', color: 'bg-purple-500', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop' },
    { name: 'Classical', color: 'bg-green-500', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop' },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        
        <main className="flex-1 overflow-y-auto pb-24 px-8 py-6">
          {/* Search Bar */}
          <div ref={searchRef} className="max-w-md mb-8">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
              <input
                type="text"
                placeholder="What do you want to listen to?"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full bg-zinc-800 text-white pl-10 pr-10 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-spotify-green transition-all duration-200"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {!isSearching ? (
            /* Browse Categories */
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Browse all</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {genres.map((genre, index) => (
                  <div
                    key={genre.name}
                    className={`${genre.color} rounded-lg p-4 h-32 relative overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200`}
                    style={{
                      backgroundImage: `url(${genre.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className="absolute inset-0 bg-black/40"></div>
                    <h3 className="text-white font-bold text-lg relative z-10">{genre.name}</h3>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Search Results */
            <div ref={resultsRef}>
              <h2 className="text-2xl font-bold text-white mb-6">
                Search results for "{searchQuery}"
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {mockResults.map((result, index) => (
                  <MusicCard
                    key={`${result.title}-${index}`}
                    title={result.title}
                    artist={result.artist}
                    image={result.image}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </div>
          )}
        </main>

        <PlayerBar />
      </div>
    </div>
  );
};

export default Search;
