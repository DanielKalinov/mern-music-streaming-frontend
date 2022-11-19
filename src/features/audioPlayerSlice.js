import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isPlaying: false,
	totalSeconds: 0,
	audioProgressValue: 0,
	songInfo: {},
	averageColor: '',
	queue: [],
};

export const audioPlayerSlice = createSlice({
	name: 'audioPlayer',
	initialState,
	reducers: {
		togglePlaying: (state, action) => {
			state.isPlaying = action.payload;
		},

		setTotalSeconds: (state, action) => {
			state.totalSeconds = action.payload;
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
	},
});

export const {
	togglePlaying,
	setTotalSeconds,
	setAudioProgressValue,
	setSongInfo,
	setAverageColor,
	setQueue,
} = audioPlayerSlice.actions;

export default audioPlayerSlice.reducer;
