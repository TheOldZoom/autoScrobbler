export interface Config {
  tracks: Track[];
  timeout: number;
  debug: boolean;
}

export interface Track {
  name: string;
  artist: string;
  album?: string;
}
