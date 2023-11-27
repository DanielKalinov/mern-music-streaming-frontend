import React, { useEffect, useRef } from 'react';
import AudioControlsPanel from './components/AudioControlsPanel';
import { useSelector, useDispatch } from 'react-redux';
import {
	setAudioProgressValue,
	setCurrentSongPosition,
	setDuration,
	skipTrack,
} from './features/audioPlayerSlice';
import { Route, Routes } from 'react-router-dom';
import AlbumDetails from './pages/AlbumDetails';
import AudioPlayerState from './types/AudioPlayerState';
import Artists from './pages/Artists';
import ArtistDetails from './pages/ArtistDetails';

const App = () => {
	const audio = useRef(new Audio());
	audio.current.preload = 'metadata';

	const audioPlayer = useSelector(
		(state: AudioPlayerState) => state.audioPlayer
	);
	const { isPlaying, currentSongInfo, queue, isSeeking, repeatCurrentSong } =
		audioPlayer;

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

		const currentSongIndex = queue.findIndex(
			(item) => item._id == currentSongInfo._id
		);
		dispatch(setCurrentSongPosition(currentSongIndex));

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

	const setSeekCurrentTime = (value: number) => {
		audio.current.currentTime = value;
	};

	return (
		<div className='px-4'>
			{/* offset panel height */}
			<div className='pb-[150px]'>
				<div>
					<Routes>
						<Route path='/' element={<Artists />} />
						<Route path='/:id' element={<ArtistDetails />} />
						<Route path='/:id/albums/:id' element={<AlbumDetails />} />
					</Routes>
				</div>
			</div>
			<AudioControlsPanel setSeekCurrentTime={setSeekCurrentTime} />
		</div>
	);
};

export default App;
