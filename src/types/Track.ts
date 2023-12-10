import Album from './Album';
import Artist from './Artist';

export default interface Track {
	id: string;
	title: string;
	album: Album;
	audioUrl: string;
	artist: Artist;
}
