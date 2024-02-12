import Album from './Album';
import Artist from './Artist';

interface TrackObj {
	_id: string;
	title: string;
	album: Album;
	audioUrl: string;
	artist: Artist[];
}

export default interface Track extends TrackObj {
	track: TrackObj;
}
