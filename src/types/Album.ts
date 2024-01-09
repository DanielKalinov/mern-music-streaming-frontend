import Artist from './Artist';
import Track from './Track';

export default interface Album {
	_id: string;
	artist: Artist[];
	name: string;
	duration: string;
	year: string;
	albumImageUrl: string;
	tracks: { _id: string; track: Track }[];
}
