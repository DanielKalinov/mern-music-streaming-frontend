export default interface Song {
	_id: string;
	title: string;
	album: { albumImageUrl: string; artist: { name: string } };
	audioUrl: string;
}
