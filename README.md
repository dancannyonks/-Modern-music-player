
# NYONKS MUSIC - Modern Music Streaming Platform

A modern, responsive music streaming platform built with React, TypeScript, and Supabase.

## Features

- 🎵 Modern music streaming interface
- 🔍 Advanced search functionality  
- 👤 User authentication and profiles
- 📱 Responsive design
- 🎨 Beautiful card-based UI
- 👑 Premium subscription features
- 🛡️ Admin dashboard for user management
- 🎼 Playlist and category management

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (Database, Auth, Storage)
- **Animations**: GSAP
- **Icons**: Lucide React
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd nyonks-music
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
# Create .env.local file
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_PROVIDER=spotify
```

4. Start the development server
```bash
npm run dev
```

## Supabase Configuration

### 1. Create a New Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose your organization and enter project details
4. Wait for the project to be created

### 2. Get Your Project Credentials

1. Go to Project Settings > API
2. Copy your Project URL and anon public key
3. Add them to your environment variables

### 3. Database Schema Setup

Run the following SQL commands in the Supabase SQL Editor:

```sql
-- Enable RLS
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  is_premium BOOLEAN DEFAULT FALSE,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create artists table
CREATE TABLE artists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create albums table
CREATE TABLE albums (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  artist_id UUID REFERENCES artists(id) ON DELETE CASCADE,
  cover_url TEXT,
  release_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create songs table
CREATE TABLE songs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  artist_id UUID REFERENCES artists(id) ON DELETE CASCADE,
  album_id UUID REFERENCES albums(id) ON DELETE SET NULL,
  duration INTEGER, -- in seconds
  file_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create playlists table
CREATE TABLE playlists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  is_public BOOLEAN DEFAULT TRUE,
  cover_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create playlist_songs junction table
CREATE TABLE playlist_songs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  playlist_id UUID REFERENCES playlists(id) ON DELETE CASCADE,
  song_id UUID REFERENCES songs(id) ON DELETE CASCADE,
  position INTEGER,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_subscriptions table
CREATE TABLE user_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('free', 'premium', 'family')),
  status TEXT NOT NULL CHECK (status IN ('active', 'cancelled', 'expired')),
  starts_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ends_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4. Row Level Security (RLS) Policies

```sql
-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Playlists policies
CREATE POLICY "Public playlists are viewable by everyone" ON playlists
  FOR SELECT USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can create playlists" ON playlists
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own playlists" ON playlists
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own playlists" ON playlists
  FOR DELETE USING (auth.uid() = user_id);

-- Songs policies (read-only for regular users)
CREATE POLICY "Songs are viewable by everyone" ON songs
  FOR SELECT USING (true);

-- Artists policies (read-only for regular users)
CREATE POLICY "Artists are viewable by everyone" ON artists
  FOR SELECT USING (true);

-- Albums policies (read-only for regular users)
CREATE POLICY "Albums are viewable by everyone" ON albums
  FOR SELECT USING (true);

-- Categories policies (read-only for regular users)
CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT USING (true);
```

### 5. Admin Setup

To set up admin access:

1. Create the admin user account with email: `nyonks254@gmail.com`
2. Run this SQL to make the user an admin:

```sql
-- Set admin privileges for the specific user
UPDATE profiles 
SET is_admin = true, is_premium = true
WHERE id = (
  SELECT id FROM auth.users 
  WHERE email = 'nyonks254@gmail.com'
);
```

### 6. Admin Permissions

Add these additional policies for admin users:

```sql
-- Admin can manage all content
CREATE POLICY "Admins can manage songs" ON songs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.is_admin = true
    )
  );

CREATE POLICY "Admins can manage artists" ON artists
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.is_admin = true
    )
  );

CREATE POLICY "Admins can manage albums" ON albums
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.is_admin = true
    )
  );

CREATE POLICY "Admins can manage categories" ON categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.is_admin = true
    )
  );

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles p2
      WHERE p2.id = auth.uid() 
      AND p2.is_admin = true
    )
  );
```

### 7. Sample Data (Optional)

```sql
-- Insert sample categories
INSERT INTO categories (name, description, color) VALUES
('Pop Music', 'Popular music hits', 'from-pink-500 to-purple-500'),
('Rock', 'Rock and alternative music', 'from-red-500 to-orange-500'),
('Electronic', 'Electronic and dance music', 'from-blue-500 to-cyan-500'),
('Classical', 'Classical and orchestral music', 'from-yellow-500 to-orange-500'),
('Jazz', 'Jazz and blues', 'from-purple-600 to-pink-600'),
('Hip Hop', 'Hip hop and rap music', 'from-green-500 to-teal-500');

-- Insert sample artists
INSERT INTO artists (name, bio) VALUES
('Sample Artist 1', 'A talented musician'),
('Sample Artist 2', 'Another great artist'),
('Sample Artist 3', 'Upcoming talent');
```

## Authentication Setup

### Email Authentication

Supabase provides built-in email authentication. Configure it in your Supabase dashboard:

1. Go to Authentication > Settings
2. Configure your site URL
3. Set up email templates (optional)
4. Configure redirect URLs

### Social Authentication (Optional)

You can enable Google, GitHub, and other social providers in the Authentication > Providers section.

## Storage Setup (For Music Files and Images)

1. Go to Storage in your Supabase dashboard
2. Create buckets:
   - `music-files` (for audio files)
   - `images` (for covers, avatars, etc.)
3. Set up appropriate policies for file access

## Environment Variables

Create a `.env.local` file with:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_PROVIDER=spotify
```

## Deployment

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy

### Deploy to Netlify

1. Connect your GitHub repository to Netlify
2. Add environment variables in Netlify dashboard
3. Deploy

## Admin Features

The admin dashboard (`/admin`) includes:

- User management (view, edit, delete users)
- Content management (songs, artists, albums)
- Category management
- Subscription management
- Analytics and reporting

**Admin Login**: Use `nyonks254@gmail.com` with the password you set during registration.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the GitHub repository.
