import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import AudioControlsPanel from './components/AudioControlsPanel';

const App = () => {
	const audio = useRef(new Audio());
	const [isPlaying, setIsPlaying] = useState(false);
	const [percentProgress, setPercentProgress] = useState(0);

	useEffect(() => {
		axios.get('http://localhost:5000/test_audio').then((res) => {
			audio.current.src = res.data;
		});

		audio.current.ontimeupdate = () => {
			// convert audio current progress to percent
			const percent =
				(audio.current.currentTime / audio.current.duration) * 100;
			setPercentProgress(!Number.isNaN(percent) ? percent : 0);
		};
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
				percentProgress={percentProgress}
				setPercentProgress={setPercentProgress}
			/>
		</>
	);
};

export default App;
