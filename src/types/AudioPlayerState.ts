import Song from './Song';

export default interface AudioPlayerState {
	audioPlayer: {
		isPlaying: boolean;
		currentSongInfo: Song;
		isSeeking: boolean;
		audioProgressValue: number;
		duration: number;
		repeatCurrentSong: boolean;
		queue: Song[];
		loading: boolean;
		averageColor: string;
		shuffleList: boolean;
	};
}
