import Track from './Track';

export default interface AudioPlayerState {
	audioPlayer: {
		isPlaying: boolean;
		currentTrackInfo: Track;
		currentTrackPosition: number;
		playlistInfo: { type: string; name: string };
		isSeeking: boolean;
		audioProgressValue: number;
		duration: number;
		repeatCurrentTrack: boolean;
		queue: Track[];
		loading: boolean;
		shuffleList: boolean;
	};
}
