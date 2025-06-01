
// Supabase configuration for easy database setup
import { createClient } from '@supabase/supabase-js';

// These would be set in your Supabase project settings
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database table structures for music app
export const databaseTables = {
  users: `
    CREATE TABLE users (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      email VARCHAR UNIQUE NOT NULL,
      username VARCHAR UNIQUE NOT NULL,
      full_name VARCHAR,
      avatar_url VARCHAR,
      subscription_type VARCHAR DEFAULT 'free',
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `,
  
  playlists: `
    CREATE TABLE playlists (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      title VARCHAR NOT NULL,
      description TEXT,
      cover_image VARCHAR,
      is_public BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `,
  
  tracks: `
    CREATE TABLE tracks (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      title VARCHAR NOT NULL,
      artist VARCHAR NOT NULL,
      album VARCHAR,
      duration INTEGER,
      preview_url VARCHAR,
      cover_image VARCHAR,
      external_id VARCHAR,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `,
  
  playlist_tracks: `
    CREATE TABLE playlist_tracks (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      playlist_id UUID REFERENCES playlists(id) ON DELETE CASCADE,
      track_id UUID REFERENCES tracks(id) ON DELETE CASCADE,
      position INTEGER,
      added_at TIMESTAMP DEFAULT NOW()
    );
  `,
  
  user_favorites: `
    CREATE TABLE user_favorites (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      track_id UUID REFERENCES tracks(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT NOW(),
      UNIQUE(user_id, track_id)
    );
  `
};

// RLS Policies for security
export const securityPolicies = {
  users: [
    'ALTER TABLE users ENABLE ROW LEVEL SECURITY;',
    'CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);',
    'CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);'
  ],
  playlists: [
    'ALTER TABLE playlists ENABLE ROW LEVEL SECURITY;',
    'CREATE POLICY "Users can view own playlists" ON playlists FOR SELECT USING (auth.uid() = user_id);',
    'CREATE POLICY "Users can view public playlists" ON playlists FOR SELECT USING (is_public = true);',
    'CREATE POLICY "Users can create playlists" ON playlists FOR INSERT WITH CHECK (auth.uid() = user_id);',
    'CREATE POLICY "Users can update own playlists" ON playlists FOR UPDATE USING (auth.uid() = user_id);',
    'CREATE POLICY "Users can delete own playlists" ON playlists FOR DELETE USING (auth.uid() = user_id);'
  ]
};

// Helper functions for database operations
export const dbHelpers = {
  async createUser(userData: any) {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select();
    return { data, error };
  },

  async getUserPlaylists(userId: string) {
    const { data, error } = await supabase
      .from('playlists')
      .select('*')
      .eq('user_id', userId);
    return { data, error };
  },

  async addTrackToPlaylist(playlistId: string, trackId: string) {
    const { data, error } = await supabase
      .from('playlist_tracks')
      .insert([{ playlist_id: playlistId, track_id: trackId }]);
    return { data, error };
  },

  async favoriteTrack(userId: string, trackId: string) {
    const { data, error } = await supabase
      .from('user_favorites')
      .insert([{ user_id: userId, track_id: trackId }]);
    return { data, error };
  }
};
