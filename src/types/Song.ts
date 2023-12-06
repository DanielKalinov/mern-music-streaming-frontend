import Album from './Album';

export default interface Song {
	_id: string;
	title: string;
	album: Album;
	audioUrl: string;
}
