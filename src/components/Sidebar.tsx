
import React, { useEffect, useRef } from 'react';
import { Home, Search, Library, Heart, Plus, Music } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { gsap } from 'gsap';

const Sidebar = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sidebarRef.current) {
      gsap.fromTo(sidebarRef.current, 
        { x: -300, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }
  }, []);

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Library, label: 'Your Library', path: '/library' },
  ];

  const libraryItems = [
    { icon: Heart, label: 'Liked Songs', path: '/liked' },
    { icon: Plus, label: 'Create Playlist', path: '/create' },
  ];

  return (
    <div ref={sidebarRef} className="w-64 bg-black h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <Music className="w-8 h-8 text-spotify-green" />
          <span className="text-2xl font-bold text-white">NYONKS</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="px-6 space-y-2">
        {menuItems.map((item, index) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-4 p-3 rounded-md transition-colors duration-200 ${
                isActive
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Library Section */}
      <div className="mt-8 px-6">
        <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">
          Your Library
        </h3>
        <div className="space-y-2">
          {libraryItems.map((item, index) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-4 p-3 rounded-md transition-colors duration-200 ${
                  isActive
                    ? 'bg-zinc-800 text-white'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Recently Played Playlists */}
      <div className="mt-8 px-6 flex-1 overflow-y-auto">
        <div className="space-y-2">
          {['My Playlist #1', 'Chill Vibes', 'Workout Mix', 'Late Night', 'Focus Music'].map((playlist, index) => (
            <div
              key={playlist}
              className="text-zinc-400 hover:text-white cursor-pointer p-2 rounded-md hover:bg-zinc-900 transition-colors duration-200"
            >
              {playlist}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
