export default interface Song {
	_id: string;
	title: string;
	artist: { name: string };
	albumImageUrl: string;
	audioUrl: string;
}
