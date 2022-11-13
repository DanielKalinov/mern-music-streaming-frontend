import { configureStore } from '@reduxjs/toolkit';
import audioPlayerReducer from './features/audioPlayerSlice';

export const store = configureStore({
	reducer: {
		audioPlayer: audioPlayerReducer,
	},
});
