
import React, { useEffect, useRef, useState } from 'react';
import { User, Music, Heart, Clock, Settings, Edit, Share, Crown } from 'lucide-react';
import { gsap } from 'gsap';
import Layout from '../components/Layout';

const Profile = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Music Lover',
    email: 'user@nyonks.com',
    username: '@musiclover',
    bio: 'Passionate about discovering new artists and sharing great music with friends.',
    subscription: 'Premium',
    joinDate: 'January 2024'
  });

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, []);

  const stats = [
    { icon: Music, label: 'Saved Songs', value: '1,247', color: 'text-blue-400' },
    { icon: Heart, label: 'Liked Playlists', value: '89', color: 'text-red-400' },
    { icon: Clock, label: 'Hours Played', value: '342h', color: 'text-green-400' },
    { icon: Settings, label: 'Playlists Created', value: '15', color: 'text-purple-400' },
  ];

  const recentActivity = [
    { title: 'Chill Vibes Mix', artist: 'Your Playlist', type: 'playlist', time: '2 hours ago' },
    { title: 'Blinding Lights', artist: 'The Weeknd', type: 'track', time: '5 hours ago' },
    { title: 'Lo-Fi Study Session', artist: 'Various Artists', type: 'album', time: '1 day ago' },
    { title: 'Indie Rock Essentials', artist: 'Curated Playlist', type: 'playlist', time: '2 days ago' },
    { title: 'Midnight City', artist: 'M83', type: 'track', time: '3 days ago' },
    { title: 'Electronic Dreamscape', artist: 'Your Playlist', type: 'playlist', time: '1 week ago' },
  ];

  return (
    <Layout>
      <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
        {/* Profile Header */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-2xl p-8 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative">
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-4 border-white/30">
                  <User className="w-16 h-16 text-white" />
                </div>
                <button className="absolute bottom-2 right-2 bg-white/20 rounded-full p-2 hover:bg-white/30 transition-colors">
                  <Edit className="w-4 h-4 text-white" />
                </button>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-4xl font-bold text-white">{userData.name}</h1>
                  {userData.subscription === 'Premium' && (
                    <Crown className="w-6 h-6 text-yellow-400" />
                  )}
                </div>
                <p className="text-white/80 mb-2">{userData.username}</p>
                <p className="text-white/70 mb-4 max-w-md">{userData.bio}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="bg-white/20 px-3 py-1 rounded-full">{userData.subscription} Member</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full">Joined {userData.joinDate}</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full">128 Following</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full">1.2K Followers</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors">
                  Edit Profile
                </button>
                <button className="bg-white/20 text-white p-3 rounded-full hover:bg-white/30 transition-colors">
                  <Share className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10 hover:border-white/20 transition-all">
                <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Clock className="w-6 h-6 mr-3 text-green-400" />
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Music className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-white">{item.title}</h3>
                      <p className="text-gray-400 text-sm">{item.artist}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-500 capitalize bg-white/10 px-2 py-1 rounded">
                        {item.type}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Genres & Artists */}
            <div className="space-y-8">
              {/* Top Genres */}
              <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold mb-4">Top Genres</h3>
                <div className="space-y-3">
                  {['Electronic', 'Indie Rock', 'Lo-Fi Hip Hop', 'Ambient', 'Jazz Fusion'].map((genre, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-white">{genre}</span>
                      <div className="w-20 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                          style={{ width: `${100 - index * 15}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-3 rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all">
                    Create Playlist
                  </button>
                  <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-3 rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all">
                    Discover Music
                  </button>
                  <button className="bg-gradient-to-r from-purple-600 to-violet-600 text-white p-3 rounded-lg font-medium hover:from-purple-700 hover:to-violet-700 transition-all">
                    Share Profile
                  </button>
                  <button className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-3 rounded-lg font-medium hover:from-orange-700 hover:to-red-700 transition-all">
                    Export Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
