import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import AudioControlsPanel from './components/AudioControlsPanel';

const App = () => {
	const audio = useRef(new Audio());
	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		axios.get('http://localhost:5000/test_audio').then((res) => {
			audio.current.src = res.data;
		});
	}, []);

	useEffect(() => {
		isPlaying ? audio.current.play() : audio.current.pause();
	}, [isPlaying]);

	return (
		<>
			<AudioControlsPanel
				audio={audio}
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
			/>
		</>
	);
};

export default App;
