import { useEffect, useRef, useState } from 'react';
import AudioControlsPanel from './components/AudioControlsPanel';
import { useSelector, useDispatch } from 'react-redux';
import {
	setAudioProgressValue,
	setSongInfo,
	setTotalSeconds,
	togglePlaying,
} from './features/audioPlayerSlice';
import { Route, Routes } from 'react-router-dom';
import Albums from './pages/Albums';
import Home from './pages/Home';
import AlbumDetails from './pages/AlbumDetails';

const App = () => {
	const audio = useRef(new Audio());

	const totalSeconds = useSelector((state) => state.audioPlayer.totalSeconds);
	const isPlaying = useSelector((state) => state.audioPlayer.isPlaying);
	const audioProgressValue = useSelector(
		(state) => state.audioPlayer.audioProgressValue
	);
	const songInfo = useSelector((state) => state.audioPlayer.songInfo);
	const queue = useSelector((state) => state.audioPlayer.queue);
	const isSeeking = useSelector((state) => state.audioPlayer.isSeeking);

	const dispatch = useDispatch();

	useEffect(() => {
		audio.current.ontimeupdate = () => {
			// convert audio current progress to percent
			const percent =
				(audio.current.currentTime / audio.current.duration) * 100;

			!isSeeking &&
				dispatch(setAudioProgressValue(!Number.isNaN(percent) ? percent : 0));
			!isSeeking && dispatch(setTotalSeconds(audio.current.currentTime));
		};
	}, [isSeeking]);

	useEffect(() => {
		audio.current.onended = () => {
			skipToNextTrack();
		};
	}, [songInfo]);

	const skipToNextTrack = () => {
		const nextTrack = queue[songInfo.position + 1];

		if (nextTrack !== undefined) {
			dispatch(
				setSongInfo({
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
						<Route
							path={`/albums/:id`}
							element={<AlbumDetails audio={audio} />}
						/>
					</Routes>
				</div>
			</div>
			<AudioControlsPanel
				isPlaying={isPlaying}
				audio={audio}
				audioProgressValue={audioProgressValue}
				totalSeconds={totalSeconds}
				setTotalSeconds={setTotalSeconds}
				dispatch={dispatch}
			/>
		</>
	);
};

export default App;
