
import React, { useState, useEffect, useRef } from 'react';
import { Users, Music, Album, Settings, BarChart3, Shield, Crown, Trash2, Edit, Plus } from 'lucide-react';
import { gsap } from 'gsap';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, [activeTab]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail === 'nyonks254@gmail.com') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid admin credentials');
    }
  };

  const tabs = [
    { id: 'users', label: 'Users', icon: Users },
    { id: 'music', label: 'Music', icon: Music },
    { id: 'categories', label: 'Categories', icon: Album },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', plan: 'Premium', status: 'Active', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', plan: 'Free', status: 'Active', joinDate: '2024-02-20' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', plan: 'Family', status: 'Active', joinDate: '2024-03-10' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', plan: 'Premium', status: 'Suspended', joinDate: '2024-01-05' },
  ];

  const mockSongs = [
    { id: 1, title: 'Song One', artist: 'Artist A', album: 'Album X', duration: '3:45', plays: 15420 },
    { id: 2, title: 'Song Two', artist: 'Artist B', album: 'Album Y', duration: '4:12', plays: 8932 },
    { id: 3, title: 'Song Three', artist: 'Artist C', album: 'Album Z', duration: '2:58', plays: 24671 },
  ];

  const mockCategories = [
    { id: 1, name: 'Pop Music', songs: 1250, playlists: 89 },
    { id: 2, name: 'Rock', songs: 892, playlists: 67 },
    { id: 3, name: 'Electronic', songs: 634, playlists: 45 },
    { id: 4, name: 'Classical', songs: 412, playlists: 23 },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 w-full max-w-md border border-white/10">
          <div className="text-center mb-8">
            <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Admin Access</h1>
            <p className="text-gray-400">Please enter your admin credentials</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2 font-medium">Admin Email</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-400"
                placeholder="nyonks254@gmail.com"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-medium">Password</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-400"
                placeholder="Enter admin password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 rounded-lg font-medium hover:from-red-700 hover:to-pink-700 transition-all"
            >
              Access Admin Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-xl border-b border-white/10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Crown className="w-8 h-8 text-yellow-500" />
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-black/20 p-1 rounded-xl border border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-white/10 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div ref={containerRef}>
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">User Management</h2>
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Add User</span>
                </button>
              </div>

              <div className="bg-black/20 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="text-left p-4 font-medium">User</th>
                        <th className="text-left p-4 font-medium">Plan</th>
                        <th className="text-left p-4 font-medium">Status</th>
                        <th className="text-left p-4 font-medium">Join Date</th>
                        <th className="text-left p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockUsers.map((user) => (
                        <tr key={user.id} className="border-t border-white/10 hover:bg-white/5">
                          <td className="p-4">
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-gray-400 text-sm">{user.email}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              user.plan === 'Premium' ? 'bg-purple-600 text-white' :
                              user.plan === 'Family' ? 'bg-blue-600 text-white' :
                              'bg-gray-600 text-white'
                            }`}>
                              {user.plan}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              user.status === 'Active' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="p-4 text-gray-400">{user.joinDate}</td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <button className="p-2 hover:bg-white/10 rounded">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-2 hover:bg-red-600/20 rounded text-red-400">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'music' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Music Management</h2>
                <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Add Song</span>
                </button>
              </div>

              <div className="bg-black/20 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="text-left p-4 font-medium">Song</th>
                        <th className="text-left p-4 font-medium">Artist</th>
                        <th className="text-left p-4 font-medium">Album</th>
                        <th className="text-left p-4 font-medium">Duration</th>
                        <th className="text-left p-4 font-medium">Plays</th>
                        <th className="text-left p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockSongs.map((song) => (
                        <tr key={song.id} className="border-t border-white/10 hover:bg-white/5">
                          <td className="p-4 font-medium">{song.title}</td>
                          <td className="p-4 text-gray-400">{song.artist}</td>
                          <td className="p-4 text-gray-400">{song.album}</td>
                          <td className="p-4 text-gray-400">{song.duration}</td>
                          <td className="p-4 text-gray-400">{song.plays.toLocaleString()}</td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <button className="p-2 hover:bg-white/10 rounded">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-2 hover:bg-red-600/20 rounded text-red-400">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Category Management</h2>
                <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Add Category</span>
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockCategories.map((category) => (
                  <div key={category.id} className="bg-black/20 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:bg-white/5 transition-colors">
                    <h3 className="text-xl font-bold mb-4">{category.name}</h3>
                    <div className="space-y-2 text-gray-400">
                      <div>{category.songs} songs</div>
                      <div>{category.playlists} playlists</div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <button className="p-2 hover:bg-white/10 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-red-600/20 rounded text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'Total Users', value: '12,431', change: '+12%', color: 'text-blue-400' },
                  { title: 'Premium Users', value: '3,542', change: '+8%', color: 'text-purple-400' },
                  { title: 'Total Streams', value: '1.2M', change: '+15%', color: 'text-green-400' },
                  { title: 'Revenue', value: '$45,231', change: '+23%', color: 'text-yellow-400' },
                ].map((stat, index) => (
                  <div key={index} className="bg-black/20 backdrop-blur-xl rounded-xl p-6 border border-white/10">
                    <div className="text-gray-400 text-sm mb-2">{stat.title}</div>
                    <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                    <div className="text-green-400 text-sm">{stat.change}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Platform Settings</h2>
              
              <div className="bg-black/20 backdrop-blur-xl rounded-xl p-6 border border-white/10 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Maintenance Mode</h3>
                    <p className="text-gray-400 text-sm">Enable maintenance mode for platform updates</p>
                  </div>
                  <button className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg">
                    Disabled
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">User Registration</h3>
                    <p className="text-gray-400 text-sm">Allow new users to register accounts</p>
                  </div>
                  <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg">
                    Enabled
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Content Uploads</h3>
                    <p className="text-gray-400 text-sm">Allow users to upload music content</p>
                  </div>
                  <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg">
                    Enabled
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
