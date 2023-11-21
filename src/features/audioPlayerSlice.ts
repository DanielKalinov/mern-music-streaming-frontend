import { createSlice } from '@reduxjs/toolkit';
import Song from '../types/Song';

const initialState = {
	isPlaying: false,
	audioProgressValue: 0,
	currentSongInfo: <Song>{},
	currentSongPosition: 0,
	queue: <Song[]>[],
	loading: false,
	isSeeking: false,
	duration: 0,
	repeatCurrentSong: false,
	shuffleList: false,
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
		setCurrentSongPosition: (state, action) => {
			state.currentSongPosition = action.payload;
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
			const trackPosition =
				state.currentSongPosition + (action.payload == 'next' ? 1 : -1);

			const track = state.queue[trackPosition];

			if (track) {
				state.currentSongInfo = track;
				state.isPlaying = true;
			} else {
				state.isPlaying = false;
			}
		},
		setShuffleList: (state) => {
			state.shuffleList = !state.shuffleList;
		},
	},
});

export const {
	togglePlaying,
	setAudioProgressValue,
	setCurrentSongInfo,
	setCurrentSongPosition,
	setQueue,
	setLoading,
	setIsSeeking,
	setDuration,
	setRepeatCurrentSong,
	skipTrack,
	setShuffleList,
} = audioPlayerSlice.actions;

export default audioPlayerSlice.reducer;
