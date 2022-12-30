import { useEffect, useRef, useState } from 'react';
import AudioControlsPanel from './components/AudioControlsPanel';
import { useSelector, useDispatch } from 'react-redux';
import {
	setAudioProgressValue,
	setDuration,
	setCurrentSongInfo,
	togglePlaying,
	setSeekCurrentTime,
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
	const seekCurrentTime = useSelector(
		(state) => state.audioPlayer.seekCurrentTime
	);
	const repeatCurrentSong = useSelector(
		(state) => state.audioPlayer.repeatCurrentSong
	);

	const dispatch = useDispatch();

	// set new src and play
	useEffect(() => {
		if (currentSongInfo.audioUrl) {
			audio.current.src = currentSongInfo.audioUrl;

			// play audio once it has loaded
			audio.current.oncanplaythrough = () => {
				audio.current.play();
			};
		}
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

	// seek audio to range slider value
	useEffect(() => {
		audio.current.currentTime = seekCurrentTime;

		// set value to null, if seeked value is 0, in order to update state
		seekCurrentTime == 0 && dispatch(setSeekCurrentTime(null));
	}, [seekCurrentTime]);

	useEffect(() => {
		audio.current.loop = repeatCurrentSong;
	}, [repeatCurrentSong]);

	useEffect(() => {
		// get audio duration on loaded data
		audio.current.onloadedmetadata = () => {
			dispatch(setDuration(audio.current.duration));
		};

		// skip to next track on song end
		audio.current.onended = () => {
			skipToNextTrack();
		};
	}, [currentSongInfo]);

	const skipToNextTrack = () => {
		const nextTrack = queue[currentSongInfo.position + 1];

		if (nextTrack) {
			dispatch(
				setCurrentSongInfo({
					position: nextTrack.position,
					title: nextTrack.title,
					artist: nextTrack.artist,
					albumImageUrl: nextTrack.albumImageUrl,
					duration: nextTrack.duration,
				})
			);
			dispatch(togglePlaying(true));

			audio.current.src = nextTrack.audioUrl;
			audio.current.oncanplaythrough = () => {
				audio.current.play();
			};
		} else {
			dispatch(togglePlaying(false));
		}
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
			<AudioControlsPanel />
		</>
	);
};

export default App;
