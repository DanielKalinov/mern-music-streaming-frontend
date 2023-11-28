export default interface Song {
	_id: string;
	title: string;
	album: { name: string; albumImageUrl: string; artist: { name: string } };
	audioUrl: string;
}
