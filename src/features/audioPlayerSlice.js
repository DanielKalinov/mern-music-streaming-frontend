import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
	isPlaying: false,
	audioProgressValue: 0,
	currentSongInfo: {},
	averageColor: '',
	queue: [],
	loading: false,
	isSeeking: false,
	duration: 0,
	repeatCurrentSong: false,
};

export const audioPlayerSlice = createSlice({
	name: 'audioPlayer',
	initialState,
	reducers: {
		togglePlaying: (state, action) => {
			state.isPlaying = action.payload;
		},
		setAudioProgressValue: (state, action) => {
			state.audioProgressValue = action.payload;
		},
		setCurrentSongInfo: (state, action) => {
			state.currentSongInfo = action.payload;
		},
		setAverageColor: (state, action) => {
			state.averageColor = action.payload;
		},
		setQueue: (state, action) => {
			state.queue = action.payload;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setIsSeeking: (state, action) => {
			state.isSeeking = action.payload;
		},
		setDuration: (state, action) => {
			state.duration = action.payload;
		},
		setRepeatCurrentSong: (state) => {
			state.repeatCurrentSong = !state.repeatCurrentSong;
		},
		skipTrack: (state, action) => {
			const currentTrackPosition = state.queue.findIndex(
				(item) => item.title == state.currentSongInfo.title
			);

			const nextTrackPosition =
				currentTrackPosition + (action.payload == 'next' ? 1 : -1);

			const track = state.queue[nextTrackPosition];

			if (track) {
				state.currentSongInfo = { ...track, position: nextTrackPosition };
				state.isPlaying = true;
			} else {
				state.isPlaying = false;
			}
		},
	},
});

export const {
	togglePlaying,
	setAudioProgressValue,
	setCurrentSongInfo,
	setAverageColor,
	setQueue,
	setLoading,
	setIsSeeking,
	setDuration,
	setRepeatCurrentSong,
	skipTrack,
} = audioPlayerSlice.actions;

export default audioPlayerSlice.reducer;
