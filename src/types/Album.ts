import Artist from './Artist';
import Track from './Track';

export default interface Album {
	_id: string;
	name: string;
	albumImageUrl: string;
	year: string;
	artist: Artist;
	tracks: Track[];
}
