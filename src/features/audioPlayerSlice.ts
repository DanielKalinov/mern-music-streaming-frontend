import { createSlice } from '@reduxjs/toolkit';
import Track from '../types/Track';

const initialState = {
  isPlaying: false,
  audioProgressValue: 0,
  currentTrackInfo: <Track>{},
  currentTrackPosition: 0,
  currentPlaylistInfo: { type: '', name: '' },
  queue: <Track[]>[],
  prevQueue: <Track[]>[],
  loading: false,
  isSeeking: false,
  duration: 0,
  repeatCurrentTrack: false,
  isShuffled: false,
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
      state.isShuffled = false;
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
    shuffleList: (state) => {
      if (!state.isShuffled) {
        // shuffle the queue

        state.prevQueue = state.queue;

        const newQueue = [...state.queue];
        const currentItem = newQueue.splice(state.currentTrackPosition, 1);
        newQueue.sort(() => 0.5 - Math.random());

        state.currentTrackPosition = 0;
        state.queue = [currentItem[0], ...newQueue];
      } else {
        // restore previous queue

        const currentTrackIndex = state.prevQueue.findIndex(
          ({ _id }) => _id == state.currentTrackInfo._id
        );
        const nextFromListPrev = state.prevQueue.slice(
          currentTrackIndex + 1,
          state.prevQueue.length
        );
        state.currentTrackPosition = currentTrackIndex;

        const newQueue = [...state.prevQueue];
        newQueue.splice(
          currentTrackIndex + 1,
          nextFromListPrev.length,
          ...nextFromListPrev
        );

        state.queue = newQueue;
      }

      state.isShuffled = !state.isShuffled;
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
  shuffleList,
} = audioPlayerSlice.actions;

export default audioPlayerSlice.reducer;
