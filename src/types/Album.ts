import Artist from './Artist';
import Song from './Song';

export default interface Album {
	_id: string;
	name: string;
	albumImageUrl: string;
	year: string;
	artist: Artist;
	tracks: Song[];
}
