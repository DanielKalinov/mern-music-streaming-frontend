import Album from './Album';
import Song from './Song';

export default interface Artist {
	_id: string;
	name: string;
	artistImageUrl: string;
	artistBioImageUrl: string;
	bio: string;
	albums: Album[];
	topTracks: Song[];
}
