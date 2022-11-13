import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isPlaying: false,
};

export const audioPlayerSlice = createSlice({
	name: 'audioPlayer',
	initialState,
	reducers: {
		togglePlaying: (state) => {
			state.isPlaying = !state.isPlaying;
		},
	},
});

export const { togglePlaying } = audioPlayerSlice.actions;

export default audioPlayerSlice.reducer;
