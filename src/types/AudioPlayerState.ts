import Song from './Song';

export default interface AudioPlayerState {
	audioPlayer: {
		isPlaying: boolean;
		currentSongInfo: Song;
		currentSongPosition: number;
		isSeeking: boolean;
		audioProgressValue: number;
		duration: number;
		repeatCurrentSong: boolean;
		queue: Song[];
		loading: boolean;
		shuffleList: boolean;
	};
}
