
import React from 'react';
import ModernHeader from './ModernHeader';
import Sidebar from './Sidebar';
import PlayerBar from './PlayerBar';

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

const Layout = ({ children, showSidebar = true }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-black text-white">
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
