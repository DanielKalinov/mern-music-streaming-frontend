import axios from 'axios';
import { useEffect, useRef } from 'react';
import AudioControlsPanel from './components/AudioControlsPanel';
import { useSelector, useDispatch } from 'react-redux';
import {
	setAudioProgressValue,
	setTotalSeconds,
} from './features/audioPlayerSlice';
import { Route, Routes } from 'react-router-dom';
import Albums from './pages/Albums';
import Home from './pages/Home';
import AlbumDetails from './pages/AlbumDetails';

const App = () => {
	const audio = useRef(new Audio());

	const totalSeconds = useSelector((state) => state.audioPlayer.totalSeconds);
	const isPlaying = useSelector((state) => state.audioPlayer.isPlaying);
	const src = useSelector((state) => state.audioPlayer.src);
	const audioProgressValue = useSelector(
		(state) => state.audioPlayer.audioProgressValue
	);

	const dispatch = useDispatch();

	useEffect(() => {
		audio.current.ontimeupdate = () => {
			// convert audio current progress to percent
			const percent =
				(audio.current.currentTime / audio.current.duration) * 100;

			dispatch(setAudioProgressValue(!Number.isNaN(percent) ? percent : 0));
			dispatch(setTotalSeconds(audio.current.currentTime));
		};
	}, []);

	// Performing audio side effects on state change
	useEffect(() => {
		if (isPlaying && audio.current.src == src) {
			// Play audio if we've already loaded the same src as the requested one
			audio.current.play();
		} else if (isPlaying && audio.current.src !== src) {
			// Play audio AND set the audio src to the requested one if it's different from audio src
			audio.current.src = src;
			audio.current.play();
		} else {
			// Otherwise, pause audio
			audio.current.pause();
		}
	}, [isPlaying, src]);

	return (
		<>
			{/* pb-[--height of panel--] */}
			<div className='pb-[124px]'>
				<div className='p-4'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/albums' element={<Albums />} />
						<Route path={`/albums/:id`} element={<AlbumDetails src={src} />} />
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
