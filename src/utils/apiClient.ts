
/**
 * Universal API Client for Music Platforms
 * Supports Spotify, Apple Music, YouTube Music, SoundCloud, and more
 */

export interface ApiConfig {
  baseUrl: string;
  apiKey?: string;
  clientId?: string;
  clientSecret?: string;
  accessToken?: string;
  headers?: Record<string, string>;
}

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
  error?: string;
}

export interface TrackData {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number;
  imageUrl?: string;
  previewUrl?: string;
  externalUrl?: string;
}

export interface PlaylistData {
  id: string;
  name: string;
  description?: string;
  tracks: TrackData[];
  imageUrl?: string;
  owner?: string;
}

export interface SearchResult {
  tracks: TrackData[];
  playlists: PlaylistData[];
  artists: any[];
  albums: any[];
}

class ApiClient {
  private config: ApiConfig;

  constructor(config: ApiConfig) {
    this.config = config;
  }

  // Generic HTTP methods
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint, undefined, params);
  }

  async post<T>(endpoint: string, data?: any, params?: Record<string, any>): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, data, params);
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, data);
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint);
  }

  private async request<T>(
    method: string,
    endpoint: string,
    data?: any,
    params?: Record<string, any>
  ): Promise<ApiResponse<T>> {
    try {
      const url = new URL(endpoint, this.config.baseUrl);
      
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          url.searchParams.append(key, String(value));
        });
      }

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...this.config.headers,
      };

      if (this.config.accessToken) {
        headers.Authorization = `Bearer ${this.config.accessToken}`;
      } else if (this.config.apiKey) {
        headers['X-API-Key'] = this.config.apiKey;
      }

      const response = await fetch(url.toString(), {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || `HTTP ${response.status}`);
      }

      return {
        data: responseData,
        status: response.status,
        message: 'Success',
      };
    } catch (error) {
      console.error('API Request failed:', error);
      return {
        data: null as any,
        status: 500,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Spotify Web API methods
  async spotifySearch(query: string, type: string = 'track,artist,album,playlist'): Promise<ApiResponse<SearchResult>> {
    return this.get<SearchResult>('/search', { q: query, type, limit: 20 });
  }

  async getSpotifyTrack(trackId: string): Promise<ApiResponse<TrackData>> {
    return this.get<TrackData>(`/tracks/${trackId}`);
  }

  async getSpotifyPlaylist(playlistId: string): Promise<ApiResponse<PlaylistData>> {
    return this.get<PlaylistData>(`/playlists/${playlistId}`);
  }

  // YouTube Music API methods (requires unofficial API or custom backend)
  async youtubeSearch(query: string): Promise<ApiResponse<SearchResult>> {
    return this.get<SearchResult>('/youtube/search', { q: query });
  }

  // SoundCloud API methods
  async soundcloudSearch(query: string): Promise<ApiResponse<SearchResult>> {
    return this.get<SearchResult>('/soundcloud/search', { q: query });
  }

  // Apple Music API methods
  async appleMusicSearch(query: string): Promise<ApiResponse<SearchResult>> {
    return this.get<SearchResult>('/apple/search', { term: query });
  }

  // Generic platform search
  async searchTracks(query: string, platform: 'spotify' | 'youtube' | 'soundcloud' | 'apple' = 'spotify'): Promise<ApiResponse<SearchResult>> {
    switch (platform) {
      case 'spotify':
        return this.spotifySearch(query, 'track');
      case 'youtube':
        return this.youtubeSearch(query);
      case 'soundcloud':
        return this.soundcloudSearch(query);
      case 'apple':
        return this.appleMusicSearch(query);
      default:
        return this.spotifySearch(query, 'track');
    }
  }

  // Update configuration
  updateConfig(newConfig: Partial<ApiConfig>) {
    this.config = { ...this.config, ...newConfig };
  }

  // Get current configuration
  getConfig(): ApiConfig {
    return { ...this.config };
  }
}

// Factory functions for different platforms
export const createSpotifyClient = (accessToken: string): ApiClient => {
  return new ApiClient({
    baseUrl: 'https://api.spotify.com/v1',
    accessToken,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const createYouTubeClient = (apiKey: string): ApiClient => {
  return new ApiClient({
    baseUrl: 'https://www.googleapis.com/youtube/v3',
    apiKey,
  });
};

export const createSoundCloudClient = (clientId: string): ApiClient => {
  return new ApiClient({
    baseUrl: 'https://api.soundcloud.com',
    clientId,
  });
};

export const createAppleMusicClient = (developerToken: string): ApiClient => {
  return new ApiClient({
    baseUrl: 'https://api.music.apple.com/v1',
    accessToken: developerToken,
  });
};

// Custom backend client
export const createCustomClient = (baseUrl: string, apiKey?: string): ApiClient => {
  return new ApiClient({
    baseUrl,
    apiKey,
  });
};

export default ApiClient;
