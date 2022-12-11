import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isPlaying: false,
	audioProgressValue: 0,
	songInfo: {},
	averageColor: '',
	queue: [],
	loading: false,
	isSeeking: false,
	src: '',
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
			state.songInfo = action.payload;
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
		setSrc: (state, action) => {
			state.src = action.payload;
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
	setSrc,
} = audioPlayerSlice.actions;

export default audioPlayerSlice.reducer;
