
import React, { useEffect, useRef, useState } from 'react';
import { Home, Search, Library, Heart, Plus, Music, ChevronDown, ChevronRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { gsap } from 'gsap';
import ModernLogo from './ModernLogo';

const Sidebar = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLibrary, setShowLibrary] = useState(true);

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
    { icon: Heart, label: 'Liked Songs', path: '/liked', count: '247' },
    { icon: Plus, label: 'Create Playlist', path: '/create' },
  ];

  const recentPlaylists = [
    'My Favorites Mix',
    'Chill Vibes',
    'Workout Energy',
    'Late Night Jazz',
    'Focus & Study'
  ];

  return (
    <div 
      ref={sidebarRef} 
      className={`${isCollapsed ? 'w-20' : 'w-80'} bg-black h-screen flex flex-col transition-all duration-300 border-r border-white/10`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <ModernLogo className="w-8 h-8" />
          {!isCollapsed && (
            <span className="text-xl font-bold text-white">NYONKS</span>
          )}
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="px-4 py-6 space-y-2">
        {menuItems.map((item, index) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-4 p-3 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-white/10 text-white shadow-lg'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <item.icon className="w-6 h-6 flex-shrink-0" />
            {!isCollapsed && (
              <span className="font-medium">{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Library Section */}
      {!isCollapsed && (
        <div className="px-4 flex-1 overflow-y-auto">
          <div className="mb-4">
            <button
              onClick={() => setShowLibrary(!showLibrary)}
              className="flex items-center justify-between w-full text-zinc-400 hover:text-white transition-colors p-2"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider">
                Your Library
              </h3>
              {showLibrary ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          </div>

          {showLibrary && (
            <div className="space-y-2 mb-6">
              {libraryItems.map((item, index) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between p-3 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? 'bg-white/10 text-white'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                  {item.count && (
                    <span className="text-xs bg-white/10 px-2 py-1 rounded-full">
                      {item.count}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          )}

          {/* Recent Playlists */}
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 px-2">
              Recently Played
            </h4>
            {recentPlaylists.map((playlist, index) => (
              <div
                key={playlist}
                className="text-zinc-400 hover:text-white cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-all duration-200 text-sm"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md flex items-center justify-center flex-shrink-0">
                    <Music className="w-4 h-4 text-white" />
                  </div>
                  <span className="truncate">{playlist}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Collapse Toggle */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full text-zinc-400 hover:text-white transition-colors text-sm"
        >
          {isCollapsed ? '→' : '←'} {!isCollapsed && 'Collapse'}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
