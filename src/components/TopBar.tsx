
import React, { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const TopBar = () => {
  const topBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (topBarRef.current) {
      gsap.fromTo(topBarRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.2 }
      );
    }
  }, []);

  return (
    <div ref={topBarRef} className="flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
      {/* Navigation */}
      <div className="flex items-center space-x-4">
        <button className="w-8 h-8 rounded-full bg-black/70 flex items-center justify-center hover:bg-black transition-colors">
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button className="w-8 h-8 rounded-full bg-black/70 flex items-center justify-center hover:bg-black transition-colors">
          <ChevronRight className="w-5 h-5 text-white" />
        </button>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6 ml-8">
          <Link to="/" className="text-white hover:text-pink-400 transition-colors font-medium">
            首页
          </Link>
          <Link to="/search" className="text-white hover:text-pink-400 transition-colors font-medium">
            搜索
          </Link>
          <Link to="/library" className="text-white hover:text-pink-400 transition-colors font-medium">
            音乐库
          </Link>
          <Link to="/playlist" className="text-white hover:text-pink-400 transition-colors font-medium">
            歌单
          </Link>
        </div>
      </div>

      {/* User Profile */}
      <div className="flex items-center space-x-4">
        <Link to="/register" className="text-white hover:text-pink-400 transition-colors text-sm">
          注册
        </Link>
        <Link to="/login" className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors text-sm font-medium">
          登录
        </Link>
        <Link to="/profile" className="bg-black rounded-full px-4 py-2 flex items-center space-x-2 hover:bg-zinc-800 transition-colors">
          <User className="w-4 h-4 text-white" />
          <span className="text-white text-sm font-medium">个人资料</span>
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
