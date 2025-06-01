
// Flexible API configuration for any music streaming service
export interface ApiConfig {
  baseUrl: string;
  apiKey?: string;
  endpoints: {
    search: string;
    tracks: string;
    albums: string;
    artists: string;
    playlists: string;
    user: string;
  };
  headers?: Record<string, string>;
}

// Default configuration for Spotify API (can be easily changed)
export const defaultApiConfig: ApiConfig = {
  baseUrl: 'https://api.spotify.com/v1',
  endpoints: {
    search: '/search',
    tracks: '/tracks',
    albums: '/albums',
    artists: '/artists',
    playlists: '/playlists',
    user: '/me'
  },
  headers: {
    'Content-Type': 'application/json'
  }
};

// Alternative configurations for other APIs
export const lastFmConfig: ApiConfig = {
  baseUrl: 'https://ws.audioscrobbler.com/2.0',
  endpoints: {
    search: '',
    tracks: '',
    albums: '',
    artists: '',
    playlists: '',
    user: ''
  }
};

export const deezerConfig: ApiConfig = {
  baseUrl: 'https://api.deezer.com',
  endpoints: {
    search: '/search',
    tracks: '/track',
    albums: '/album',
    artists: '/artist',
    playlists: '/playlist',
    user: '/user'
  }
};

// Function to get current API configuration
export const getApiConfig = (): ApiConfig => {
  // This can be configured via environment variables or user settings
  const apiProvider = import.meta.env.VITE_API_PROVIDER || 'spotify';
  
  switch (apiProvider) {
    case 'lastfm':
      return lastFmConfig;
    case 'deezer':
      return deezerConfig;
    default:
      return defaultApiConfig;
  }
};
