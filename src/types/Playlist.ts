import Track from './Track';

export interface Playlist {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  tracks: Track[];
}
