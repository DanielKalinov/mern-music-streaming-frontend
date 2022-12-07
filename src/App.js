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
	const audioProgressValue = useSelector(
		(state) => state.audioPlayer.audioProgressValue
	);
	const panelRef = useRef();

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

	return (
		<>
			{/* pb-[--height of panel--] */}
			<div className={`pb-[${panelRef?.current?.clientHeight}px]`}>
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
				ref={panelRef}
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
