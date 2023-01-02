import { useEffect, useRef, useState } from 'react';
import AudioControlsPanel from './components/AudioControlsPanel';
import { useSelector, useDispatch } from 'react-redux';
import {
	setAudioProgressValue,
	setDuration,
	skipTrack,
} from './features/audioPlayerSlice';
import { Route, Routes } from 'react-router-dom';
import Albums from './pages/Albums';
import Home from './pages/Home';
import AlbumDetails from './pages/AlbumDetails';

const App = () => {
	const audio = useRef(new Audio());
	audio.current.preload = 'metadata';

	const currentSongInfo = useSelector(
		(state) => state.audioPlayer.currentSongInfo
	);
	const queue = useSelector((state) => state.audioPlayer.queue);
	const isSeeking = useSelector((state) => state.audioPlayer.isSeeking);
	const isPlaying = useSelector((state) => state.audioPlayer.isPlaying);
	const repeatCurrentSong = useSelector(
		(state) => state.audioPlayer.repeatCurrentSong
	);

	const dispatch = useDispatch();

	// set new src and play
	useEffect(() => {
		if (currentSongInfo.audioUrl) {
			audio.current.src = currentSongInfo.audioUrl;

			// play audio once it has loaded
			audio.current.onloadeddata = () => {
				audio.current.play();
			};
		}

		// get audio duration on loaded data
		audio.current.onloadedmetadata = () => {
			dispatch(setDuration(audio.current.duration));
		};

		// skip to next track on song end
		audio.current.onended = () => {
			dispatch(skipTrack('next'));
		};
	}, [currentSongInfo]);

	// toggle playing
	useEffect(() => {
		if (isPlaying) {
			audio.current.play();
		} else {
			audio.current.pause();
		}
	}, [isPlaying]);

	// save audio progress value on update
	useEffect(() => {
		audio.current.ontimeupdate = () => {
			!isSeeking && dispatch(setAudioProgressValue(audio.current.currentTime));
		};
	}, [isSeeking]);

	useEffect(() => {
		audio.current.loop = repeatCurrentSong;
	}, [repeatCurrentSong]);

	const setSeekCurrentTime = (value) => {
		audio.current.currentTime = value;
	};

	return (
		<>
			{/* offset panel height */}
			<div className='pb-[150px]'>
				<div>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/albums' element={<Albums />} />
						<Route path={`/albums/:id`} element={<AlbumDetails />} />
					</Routes>
				</div>
			</div>
			<AudioControlsPanel setSeekCurrentTime={setSeekCurrentTime} />
		</>
	);
};

export default App;
