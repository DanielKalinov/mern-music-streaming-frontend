import { createSlice } from '@reduxjs/toolkit';
import Track from '../types/Track';

const initialState = {
  isPlaying: false,
  audioProgressValue: 0,
  currentTrackInfo: <Track>{},
  currentTrackPosition: 0,
  currentPlaylistInfo: { type: '', name: '' },
  queue: <Track[]>[],
  loading: false,
  isSeeking: false,
  duration: 0,
  repeatCurrentTrack: false,
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
    setCurrentTrackInfo: (state, action) => {
      state.currentTrackInfo = action.payload;
    },
    setCurrentTrackPosition: (state, action) => {
      state.currentTrackPosition = action.payload;
    },
    setCurrentPlaylistInfo: (state, action) => {
      state.currentPlaylistInfo = action.payload;
      state.shuffleList = false;
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
    setRepeatCurrentTrack: (state) => {
      state.repeatCurrentTrack = !state.repeatCurrentTrack;
    },
    skipTrack: (state, action) => {
      const trackPosition =
        state.currentTrackPosition + (action.payload == 'next' ? 1 : -1);

      const track = state.queue[trackPosition];

      if (track) {
        state.currentTrackInfo = track;
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
  setCurrentTrackInfo,
  setCurrentTrackPosition,
  setCurrentPlaylistInfo,
  setQueue,
  setLoading,
  setIsSeeking,
  setDuration,
  setRepeatCurrentTrack,
  skipTrack,
  setShuffleList,
} = audioPlayerSlice.actions;

export default audioPlayerSlice.reducer;
