
import React from 'react';
import ModernHeader from './ModernHeader';
import Sidebar from './Sidebar';
import PlayerBar from './PlayerBar';
import ModernLogo from './ModernLogo';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

const Layout = ({ children, showSidebar = true }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Fixed Logo in Top Left */}
      <div className="fixed top-4 left-4 z-50">
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <ModernLogo className="w-8 h-8" />
          <span className="text-xl font-bold text-white hidden sm:block">NYONKS</span>
        </Link>
      </div>

      <ModernHeader />
      <div className="flex">
        {showSidebar && <Sidebar />}
        <main className={`flex-1 ${showSidebar ? 'ml-0' : ''}`}>
          {children}
        </main>
      </div>
      <PlayerBar />
    </div>
  );
};

export default Layout;
