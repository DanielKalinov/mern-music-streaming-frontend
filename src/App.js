import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import AudioControlsPanel from './components/AudioControlsPanel';
import { useSelector, useDispatch } from 'react-redux';
import {
	setAudioProgressValue,
	setTotalSeconds,
} from './features/audioPlayerSlice';

const App = () => {
	const [albumList, setAlbumList] = useState([]);
	const audio = useRef(new Audio());

	const totalSeconds = useSelector((state) => state.audioPlayer.totalSeconds);
	const isPlaying = useSelector((state) => state.audioPlayer.isPlaying);
	const audioProgressValue = useSelector(
		(state) => state.audioPlayer.audioProgressValue
	);

	const dispatch = useDispatch();

	useEffect(() => {
		axios.get('http://localhost:5000/albums').then((res) => {
			setAlbumList(res.data);
		});

		// audio.current.src = res.data;

		// audio.current.ontimeupdate = () => {
		// 	// convert audio current progress to percent
		// 	const percent =
		// 		(audio.current.currentTime / audio.current.duration) * 100;

		// 	dispatch(setAudioProgressValue(!Number.isNaN(percent) ? percent : 0));
		// 	dispatch(setTotalSeconds(audio.current.currentTime));
		// };
	}, []);

	useEffect(() => {
		isPlaying ? audio.current.play() : audio.current.pause();
	}, [isPlaying]);

	return (
		<>
			{/* pb-[--height of panel--] */}
			<div className='pb-[124px]'>
				<div className='p-4'>
					{albumList.map((item) => (
						<img
							key={item._id}
							src={item.albumImageUrl}
							width={'100%'}
							height={'100%'}
						/>
					))}
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
