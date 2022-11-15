import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isPlaying: false,
	src: '',
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
		setSrc: (state, action) => {
			state.src = action.payload;
		},
		setTotalSeconds: (state, action) => {
			state.totalSeconds = action.payload;
		},
		setAudioProgressValue: (state, action) => {
			state.audioProgressValue = action.payload;
		},
	},
});

export const { togglePlaying, setSrc, setTotalSeconds, setAudioProgressValue } =
	audioPlayerSlice.actions;

export default audioPlayerSlice.reducer;
