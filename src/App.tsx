import React, { useEffect, useRef } from 'react';
import AudioControlsPanel from './components/AudioControlsPanel';
import { useSelector, useDispatch } from 'react-redux';
import {
	setAudioProgressValue,
	setCurrentTrackPosition,
	setDuration,
	skipTrack,
} from './features/audioPlayerSlice';
import { Route, Routes } from 'react-router-dom';
import AlbumDetails from './pages/AlbumDetails';
import AudioPlayerState from './types/AudioPlayerState';
import Artists from './pages/Artists';
import ArtistDetails from './pages/ArtistDetails';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
	const audio = useRef(new Audio());
	audio.current.preload = 'metadata';

	const audioPlayer = useSelector(
		(state: AudioPlayerState) => state.audioPlayer
	);
	const { isPlaying, currentTrackInfo, queue, isSeeking, repeatCurrentTrack } =
		audioPlayer;
	const { track } = currentTrackInfo;
	const audioUrl = track?.audioUrl;

	const dispatch = useDispatch();

	// set new src and play
	useEffect(() => {
		if (audioUrl) {
			audio.current.src = audioUrl;

			// play audio once it has loaded
			audio.current.onloadeddata = () => {
				audio.current.play();
			};
		}

		const currentTrackIndex = queue.findIndex(
			(item) => item._id == currentTrackInfo._id
		);

		dispatch(setCurrentTrackPosition(currentTrackIndex));

		// get audio duration on loaded data
		audio.current.onloadedmetadata = () => {
			dispatch(setDuration(audio.current.duration));
		};

		// skip to next track on track end
		audio.current.onended = () => {
			dispatch(skipTrack('next'));
		};
	}, [currentTrackInfo]);

	// toggle playing
	useEffect(() => {
		isPlaying ? audio.current.play() : audio.current.pause();
	}, [isPlaying]);

	// save audio progress value on update
	useEffect(() => {
		audio.current.ontimeupdate = () => {
			!isSeeking && dispatch(setAudioProgressValue(audio.current.currentTime));
		};
	}, [isSeeking]);

	useEffect(() => {
		audio.current.loop = repeatCurrentTrack;
	}, [repeatCurrentTrack]);

	const setSeekCurrentTime = (value: number) => {
		audio.current.currentTime = value;
	};

	return (
		<div className='px-4 pb-36'>
			<ScrollToTop>
				<Routes>
					<Route path='/' element={<Artists />} />
					<Route path='artist/:id' element={<ArtistDetails />} />
					<Route path='albums/:id' element={<AlbumDetails />} />
				</Routes>
			</ScrollToTop>

			<AudioControlsPanel setSeekCurrentTime={setSeekCurrentTime} />
		</div>
	);
};

export default App;
