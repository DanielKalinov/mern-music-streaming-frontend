import Album from './Album';
import Track from './Track';

export default interface Artist {
	_id: string;
	name: string;
	artistImageUrl: string;
	artistAboutImageUrl: string;
	about: string;
	albums: Album[];
	tracks: Track[];
}
