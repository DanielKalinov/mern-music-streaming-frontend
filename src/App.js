import axios from 'axios';
import { useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import AudioControlsPanel from './components/AudioControlsPanel';

const App = () => {
	const audio = new Audio();

	useEffect(() => {
		axios.get('http://localhost:5000/test_audio').then((res) => {
			audio.src = res.data;
		});
	}, []);

	return (
		<>
			<div
				style={{ marginBottom: '40px' }}
				onClick={() => (audio.paused ? audio.play() : audio.pause())}>
				Play
			</div>

			<AudioControlsPanel audio={audio} />
		</>
	);
};

export default App;
