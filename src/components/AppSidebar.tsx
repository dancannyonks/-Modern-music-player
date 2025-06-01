
import React from 'react';
import { Home, Search, Library, Heart, Plus, Music, ChevronDown, ChevronRight } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

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

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === 'collapsed';

  const getNavClass = (isActive: boolean) =>
    isActive
      ? 'bg-white/10 text-white'
      : 'text-zinc-400 hover:text-white hover:bg-white/5';

  return (
    <Sidebar className="bg-black border-r border-white/10" collapsible="icon">
      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-zinc-500 uppercase tracking-wider text-xs">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => getNavClass(isActive)}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Library Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-zinc-500 uppercase tracking-wider text-xs">
            Your Library
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {libraryItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => getNavClass(isActive)}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                      {item.count && !isCollapsed && (
                        <span className="ml-auto text-xs bg-white/10 px-2 py-1 rounded-full">
                          {item.count}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Recent Playlists */}
        {!isCollapsed && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-zinc-500 uppercase tracking-wider text-xs">
              Recently Played
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {recentPlaylists.map((playlist, index) => (
                  <SidebarMenuItem key={playlist}>
                    <SidebarMenuButton>
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md flex items-center justify-center flex-shrink-0">
                        <Music className="w-4 h-4 text-white" />
                      </div>
                      <span className="truncate">{playlist}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
