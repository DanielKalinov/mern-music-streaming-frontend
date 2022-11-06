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
			<div style={{ width: '300px' }}>
				<Slider
					railStyle={{ backgroundColor: '#71717a', cursor: 'pointer' }}
					trackStyle={[{ backgroundColor: '#db2777', cursor: 'pointer' }]}
					handleStyle={[
						{
							backgroundColor: '#db2777',
							borderColor: '#db2777',
							cursor: 'pointer',
							boxShadow: 'none',
							opacity: 1,
						},
					]}
					onChange={(value) => {
						audio.currentTime = (value / 100) * audio.duration;
					}}
					onBeforeChange={() => audio.pause()}
					onAfterChange={() => audio.play()}
				/>
			</div>
			<AudioControlsPanel />
		</>
	);
};

export default App;
