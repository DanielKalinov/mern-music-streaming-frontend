import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isPlaying: false,
	totalSeconds: 0,
	audioProgressValue: 0,
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
	},
});

export const { togglePlaying, setTotalSeconds, setAudioProgressValue } =
	audioPlayerSlice.actions;

export default audioPlayerSlice.reducer;
