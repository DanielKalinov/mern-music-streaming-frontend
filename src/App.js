import axios from 'axios';
import { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const App = () => {
	const [url, setUrl] = useState();

	useEffect(() => {
		axios.get('http://localhost:5000/test_audio').then((res) => {
			setUrl(res.data);
		});
	}, []);

	return (
		<>
			<audio src={url} controls />
			<Slider min={1} max={80} />
		</>
	);
};

export default App;
