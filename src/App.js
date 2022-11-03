import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import AudioControlsPanel from './components/AudioControlsPanel';

const App = () => {
	const [url, setUrl] = useState();
	const [percent, setPercent] = useState(0);
	const audioRef = useRef();

	useEffect(() => {
		axios.get('http://localhost:5000/test_audio').then((res) => {
			setUrl(res.data);
		});
	}, []);

	const handleProgress = () => {
		const percent =
			(audioRef.current.currentTime / audioRef.current.duration) * 100;

		setPercent(percent);
	};

	return (
		<>
			<audio
				ref={audioRef}
				src={url}
				controls
				onTimeUpdate={handleProgress}
				muted
			/>
			<h2>HELLO WORLD</h2>
			<div style={{ width: '300px' }}>
				<Slider
					value={percent}
					railStyle={{ cursor: 'pointer' }}
					trackStyle={[{ backgroundColor: 'red', cursor: 'pointer' }]}
					handleStyle={[
						{
							backgroundColor: 'red',
							borderColor: 'red',
							cursor: 'pointer',
						},
					]}
					onChange={(value) => {
						setPercent(value);
						audioRef.current.currentTime =
							(value / 100) * audioRef.current.duration;
					}}
					onBeforeChange={() => audioRef.current.pause()}
					onAfterChange={() => audioRef.current.play()}
					draggableTrack
				/>
			</div>
			<AudioControlsPanel />
		</>
	);
};

export default App;
