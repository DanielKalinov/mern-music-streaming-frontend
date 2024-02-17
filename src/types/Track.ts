import Album from './Album';
import Artist from './Artist';

export default interface Track {
	_id: string;
	track: {
		title: string;
		album: Album;
		audioUrl: string;
		artist: Artist[];
	};
}
