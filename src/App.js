import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import AudioControlsPanel from './components/AudioControlsPanel';

const App = () => {
	const audio = useRef(new Audio());
	const [isPlaying, setIsPlaying] = useState(false);
	const [audioProgressValue, setAudioProgressValue] = useState(0);

	useEffect(() => {
		axios.get('http://localhost:5000/test_audio').then((res) => {
			audio.current.src = res.data;
		});

		audio.current.ontimeupdate = () => {
			// convert audio current progress to percent
			const percent =
				(audio.current.currentTime / audio.current.duration) * 100;
			setAudioProgressValue(!Number.isNaN(percent) ? percent : 0);
		};
	}, []);

	useEffect(() => {
		isPlaying ? audio.current.play() : audio.current.pause();
	}, [isPlaying]);

	return (
		<>
			{/* pb-[--height of panel--] */}
			<div className='pb-[60px]'>
				<div className='p-3'>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
						maximus ex eu porttitor suscipit. Sed vitae lectus pharetra, finibus
						magna nec, molestie odio. Praesent iaculis, magna bibendum
						scelerisque cursus, orci metus facilisis erat, et tempor est ligula
						at felis. Nam imperdiet ante erat, quis vestibulum metus aliquet
						quis. Mauris a consectetur massa. Quisque venenatis dui ac tincidunt
						bibendum. Vestibulum ante ipsum primis in faucibus orci luctus et
						ultrices posuere cubilia curae; Integer mattis id sem vel tristique.
						Integer in volutpat sapien, eget consequat felis. In et lacus erat.
						Integer in fringilla nisl, ut efficitur velit. Quisque congue
						placerat consequat. Aenean eget velit et diam mattis suscipit vitae
						nec magna. Aenean aliquet vulputate orci in ultricies. Donec a nulla
						id diam ullamcorper euismod vel eget mauris. Curabitur vel lectus
						gravida, hendrerit dui et, tristique justo. Cras bibendum sapien id
						erat hendrerit cursus. Integer accumsan turpis eget metus tincidunt,
						tincidunt iaculis magna semper. Pellentesque ipsum urna, congue a
						fringilla nec, blandit vitae sem. Curabitur in massa sit amet nibh
						congue laoreet bibendum et risus. Integer vulputate, orci egestas
						fermentum aliquet, elit dui varius nisl, quis semper dolor orci sit
						amet sapien. Curabitur auctor arcu sit amet odio cursus consectetur.
						Mauris vestibulum massa nisi, vitae rutrum nulla cursus non. Ut non
						ultrices lorem, at congue urna. Ut eget vestibulum mi. Mauris ac
						risus nunc. Proin venenatis scelerisque tincidunt. Suspendisse
						potenti. Donec vel auctor ipsum. Vestibulum nec pharetra tellus. Sed
						a elit dolor. Nam at hendrerit massa, in volutpat ligula. Donec
						placerat, orci ac aliquam sollicitudin, urna purus ultricies leo, at
						volutpat lacus leo at nunc. Donec id sapien in est gravida
						fermentum. Orci varius natoque penatibus et magnis dis parturient
						montes, nascetur ridiculus mus. Nunc vel mauris vitae nibh bibendum
						placerat. Nam pharetra lectus varius lorem tincidunt, quis efficitur
						felis molestie. Quisque a neque sit amet magna auctor dapibus. Morbi
						vitae suscipit enim, sit amet efficitur lacus. Donec non imperdiet
						ex. Suspendisse tincidunt, magna eu consequat porttitor, purus diam
						pellentesque dui, vel fermentum ex nulla a ligula. Sed id augue
						accumsan, molestie nisl sed, aliquet ipsum. Vestibulum blandit
						turpis a mauris varius varius. Phasellus quis sapien id lacus
						gravida pellentesque sit amet eu libero. Mauris scelerisque
						imperdiet vulputate. Ut venenatis quam quis convallis posuere. Fusce
						nisl tortor, mollis ac sagittis laoreet, vulputate vel urna. Nullam
						vitae lobortis tortor, interdum aliquet justo. Nam consectetur,
						felis id porttitor bibendum, erat augue gravida leo, vel interdum
						tellus arcu sed justo. Proin fringilla sem posuere ipsum iaculis,
						vel molestie lorem auctor. Praesent tincidunt dui neque, eget
						vulputate est volutpat ut. Maecenas vel fermentum nisl, varius
						auctor nibh. Vestibulum eros tortor, dignissim ac faucibus sed,
						ultrices ut ligula.
					</p>
				</div>
			</div>
			<AudioControlsPanel
				audio={audio}
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				audioProgressValue={audioProgressValue}
				setAudioProgressValue={setAudioProgressValue}
			/>
		</>
	);
};

export default App;
