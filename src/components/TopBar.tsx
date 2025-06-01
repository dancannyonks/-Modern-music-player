
import React, { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, User, Bell } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

const TopBar = () => {
  const topBarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (topBarRef.current) {
      gsap.fromTo(topBarRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.2 }
      );
    }
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleForward = () => {
    navigate(1);
  };

  return (
    <div ref={topBarRef} className="flex items-center justify-between p-6 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
      {/* Navigation Controls */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={handleBack}
          className="w-10 h-10 rounded-full bg-black/70 flex items-center justify-center hover:bg-black/90 transition-all duration-200 hover:scale-105 border border-white/10"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button 
          onClick={handleForward}
          className="w-10 h-10 rounded-full bg-black/70 flex items-center justify-center hover:bg-black/90 transition-all duration-200 hover:scale-105 border border-white/10"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Page Title - Dynamic based on current route */}
      <div className="hidden md:block">
        <h1 className="text-2xl font-bold text-white">Good evening</h1>
      </div>

      {/* User Actions */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>

        {/* Premium Upgrade */}
        <Link
          to="/premium"
          className="hidden md:block bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full hover:from-yellow-500 hover:to-orange-600 transition-all text-sm font-bold"
        >
          Upgrade
        </Link>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Link
            to="/register"
            className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            Log In
          </Link>
        </div>

        {/* Profile */}
        <Link
          to="/profile"
          className="bg-zinc-800 rounded-full p-2 flex items-center space-x-2 hover:bg-zinc-700 transition-all duration-200 hover:scale-105 border border-white/10"
        >
          <User className="w-5 h-5 text-white" />
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
