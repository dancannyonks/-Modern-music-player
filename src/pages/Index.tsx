
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import PlayerBar from '../components/PlayerBar';
import MusicCard from '../components/MusicCard';
import PlaylistCard from '../components/PlaylistCard';

const Index = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero section animation
    if (heroRef.current) {
      gsap.fromTo(heroRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.3 }
      );
    }

    // Stagger animation for sections
    if (sectionsRef.current) {
      const sections = sectionsRef.current.children;
      gsap.fromTo(sections,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out", delay: 0.8 }
      );
    }
  }, []);

  const featuredAlbums = [
    {
      title: "Midnight Dreams",
      artist: "Luna Rodriguez",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop"
    },
    {
      title: "Electric Pulse",
      artist: "Neon Collective",
      image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&h=400&fit=crop"
    },
    {
      title: "Ocean Waves",
      artist: "Coastal Sounds",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
    },
    {
      title: "Urban Nights",
      artist: "City Lights",
      image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop"
    },
    {
      title: "Cosmic Journey",
      artist: "Space Odyssey",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop"
    },
  ];

  const recentPlaylists = [
    {
      title: "Today's Top Hits",
      description: "The most played songs right now",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
    },
    {
      title: "Chill Vibes",
      description: "Relax and unwind with these tracks",
      image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&h=300&fit=crop"
    },
    {
      title: "Workout Mix",
      description: "High energy songs for your workout",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop"
    },
    {
      title: "Focus Music",
      description: "Instrumental tracks for concentration",
      image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop"
    },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        
        <main ref={mainRef} className="flex-1 overflow-y-auto pb-24">
          {/* Hero Section */}
          <div ref={heroRef} className="px-8 py-12">
            <div className="text-center mb-12">
              <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                Welcome to NYONKS MUSIC
              </h1>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                Discover millions of songs, create playlists, and enjoy high-quality streaming
              </p>
            </div>
          </div>

          <div ref={sectionsRef} className="px-8 space-y-12">
            {/* Recently Played */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Recently Played</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {recentPlaylists.map((playlist, index) => (
                  <PlaylistCard
                    key={playlist.title}
                    title={playlist.title}
                    description={playlist.description}
                    image={playlist.image}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </section>

            {/* Featured Albums */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Featured Albums</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {featuredAlbums.map((album, index) => (
                  <MusicCard
                    key={album.title}
                    title={album.title}
                    artist={album.artist}
                    image={album.image}
                    delay={index * 0.15}
                  />
                ))}
              </div>
            </section>

            {/* Made For You */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Made For You</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {featuredAlbums.slice().reverse().map((album, index) => (
                  <MusicCard
                    key={`made-for-you-${album.title}`}
                    title={`Discover ${album.title}`}
                    artist={album.artist}
                    image={album.image}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </section>
          </div>
        </main>

        <PlayerBar />
      </div>
    </div>
  );
};

export default Index;
