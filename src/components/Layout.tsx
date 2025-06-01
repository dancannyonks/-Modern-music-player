
import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import PlayerBar from './PlayerBar';
import ModernLogo from './ModernLogo';
import { Link } from 'react-router-dom';
import { Search, Bell, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

const Layout = ({ children, showSidebar = true }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-black text-white w-full">
        {/* Single Header */}
        <header className="bg-black/95 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Left side - Logo and Sidebar trigger */}
              <div className="flex items-center space-x-4">
                {showSidebar && <SidebarTrigger className="text-white hover:bg-white/10" />}
                <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                  <ModernLogo className="w-8 h-8" />
                  <span className="text-xl font-bold text-white hidden sm:block">NYONKS</span>
                </Link>
              </div>

              {/* Center - Search Bar */}
              <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search songs, artists, albums..."
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all"
                  />
                </div>
              </div>

              {/* Right side - User Actions */}
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10">
                  <Bell className="w-5 h-5" />
                </button>
                
                <div className="hidden md:flex items-center space-x-3">
                  <Link
                    to="/premium"
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full hover:from-yellow-500 hover:to-orange-600 transition-all text-sm font-bold"
                  >
                    Premium
                  </Link>
                  <Link
                    to="/register"
                    className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/login"
                    className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 py-2 rounded-full hover:from-pink-700 hover:to-purple-700 transition-all text-sm font-medium"
                  >
                    Log In
                  </Link>
                </div>

                <Link
                  to="/profile"
                  className="bg-gray-800 rounded-full p-2 flex items-center space-x-2 hover:bg-gray-700 transition-colors"
                >
                  <User className="w-5 h-5 text-white" />
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          {showSidebar && <AppSidebar />}
          <main className="flex-1">
            {children}
          </main>
        </div>
        <PlayerBar />
      </div>
    </SidebarProvider>
  );
};

export default Layout;
