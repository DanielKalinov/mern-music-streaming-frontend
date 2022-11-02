import axios from 'axios';
import { useEffect, useState } from 'react';

const App = () => {
	const [url, setUrl] = useState();

	useEffect(() => {
		axios.get('http://localhost:5000/test_audio').then((res) => {
			setUrl(res.data);
		});
	}, []);

	return <audio src={url} controls />;
};

export default App;
