import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isPlaying: false,
	totalSeconds: 0,
};

export const audioPlayerSlice = createSlice({
	name: 'audioPlayer',
	initialState,
	reducers: {
		togglePlaying: (state) => {
			state.isPlaying = !state.isPlaying;
		},
		setTotalSeconds: (state, action) => {
			state.totalSeconds = action.payload;
		},
	},
});

export const { togglePlaying, setTotalSeconds } = audioPlayerSlice.actions;

export default audioPlayerSlice.reducer;
