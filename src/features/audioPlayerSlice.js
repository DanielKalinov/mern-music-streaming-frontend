import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isPlaying: false,
	audioProgressValue: 0,
	currentSongInfo: {},
	averageColor: '',
	queue: [],
	loading: false,
	isSeeking: false,
	duration: 0,
	seekCurrentTime: 0,
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
		setSongInfo: (state, action) => {
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
		setSeekCurrentTime: (state, action) => {
			state.seekCurrentTime = action.payload;
		},
	},
});

export const {
	togglePlaying,
	setAudioProgressValue,
	setSongInfo,
	setAverageColor,
	setQueue,
	setLoading,
	setIsSeeking,
	setDuration,
	setSeekCurrentTime,
} = audioPlayerSlice.actions;

export default audioPlayerSlice.reducer;
