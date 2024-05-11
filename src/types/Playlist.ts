import Track from './Track';

export interface Playlist {
  _id: string;
  name: string;
  imageUrl: string;
  tracks: Track[];
}
