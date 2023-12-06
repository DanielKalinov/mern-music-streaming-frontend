import Album from './Album';

export default interface Track {
	_id: string;
	title: string;
	album: Album;
	audioUrl: string;
}
