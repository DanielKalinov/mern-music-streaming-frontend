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
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam non odio
				placerat, consequat risus at, dapibus eros. Ut egestas auctor ligula, ac
				laoreet augue mattis nec. Nullam mollis sollicitudin elit. Nam et
				suscipit tortor, nec sollicitudin velit. Ut vulputate lectus id ante
				mollis, vitae ultricies nibh ultrices. Sed pellentesque mi nisl, vitae
				scelerisque mi hendrerit a. Ut efficitur lectus eget elit pretium
				pretium et eu lacus. Fusce lacinia lacus vel metus finibus, ac sagittis
				libero euismod. Sed at mollis dui. Mauris nisi quam, viverra sed risus
				in, porttitor consequat quam. Mauris auctor tincidunt nibh in placerat.
				Curabitur sit amet est ac mauris interdum ornare ac ac risus. Proin
				imperdiet, metus maximus finibus gravida, massa nulla vestibulum nunc,
				non tincidunt dolor justo ut ipsum. Curabitur pretium nisi eu vestibulum
				dignissim. Morbi nec eros eu lacus maximus faucibus. Mauris massa eros,
				porta eget est eu, feugiat ullamcorper magna. Praesent sed mi velit.
				Nunc aliquet sagittis mauris, vitae pulvinar erat facilisis vel. Ut id
				metus in est accumsan hendrerit at ac nunc. Suspendisse maximus nulla ut
				urna laoreet, eu porttitor sapien pulvinar. Donec id mauris aliquam,
				porta dolor sed, ultricies est. Duis turpis leo, venenatis id
				condimentum non, egestas ut lacus. Quisque vel auctor tortor. Quisque
				condimentum fermentum auctor. In varius fermentum commodo. Quisque
				fringilla nunc sed rutrum vehicula. Morbi nec sem fringilla, semper
				risus ut, dictum lorem. Mauris ac lorem purus. Mauris eu pellentesque
				quam. Maecenas vitae augue sagittis, facilisis dui a, feugiat sapien.
				Praesent in elit cursus, dignissim tortor a, efficitur purus. Aenean
				tincidunt ligula eget orci consequat maximus. Duis ornare lectus commodo
				finibus efficitur. Proin nec elit eu tellus sodales dapibus eget vitae
				magna. Nunc pharetra varius pellentesque. Nullam pretium enim tellus.
				Pellentesque ultrices feugiat imperdiet. Praesent bibendum dolor eu
				sodales egestas. Class aptent taciti sociosqu ad litora torquent per
				conubia nostra, per inceptos himenaeos. Integer vulputate massa sapien,
				vestibulum efficitur nisi sollicitudin id. In eu ex in ante efficitur
				porttitor scelerisque sit amet turpis. Sed auctor vestibulum nisi, eu
				vehicula tellus pharetra id. Fusce congue odio sit amet lacus ultrices
				mollis. Praesent ac ex vitae augue dapibus volutpat non vel neque. In
				vel molestie nisi. Ut fermentum ultricies laoreet. Cras a blandit dui.
				Vestibulum vitae nisi eu dui cursus aliquam. Nulla erat neque, porta ut
				orci facilisis, tempor mollis nisl. Phasellus orci nulla, convallis ut
				dapibus ac, elementum sit amet massa. Mauris dapibus fermentum
				consectetur. Quisque et felis facilisis, sodales sapien laoreet,
				lobortis risus. Mauris varius risus dolor, quis efficitur urna
				vestibulum nec. Etiam imperdiet risus lorem, ac molestie arcu faucibus
				vitae. Praesent consectetur ligula id varius ullamcorper. Mauris sed mi
				dignissim neque ultrices malesuada. Maecenas congue leo vitae ex
				fringilla molestie. Quisque vel bibendum sem. Praesent sit amet nisl
				orci. Mauris vitae nisl vel mi interdum fringilla sit amet id ex. Sed
				risus nisl, blandit vitae purus vel, volutpat convallis mauris. Aliquam
				consectetur, risus eu dignissim suscipit, justo mi blandit nisl, in
				pellentesque dolor quam et ante. Maecenas molestie magna a sapien cursus
				congue eget dictum augue. Sed facilisis lorem et ex fermentum pretium.
				Sed a elit nec enim lacinia finibus. Vivamus vitae ante elit. Donec
				vestibulum pharetra sem eget rutrum. Nullam purus turpis, ultricies non
				scelerisque et, tempor et nisl. Ut varius urna quam, vitae malesuada
				nisi elementum ut. Donec aliquam convallis ligula, eget scelerisque nunc
				iaculis in. Proin mauris ex, sollicitudin vel urna id, imperdiet
				placerat ipsum. Pellentesque dictum nulla turpis, aliquet auctor eros
				posuere non. Maecenas augue libero, dignissim et dolor quis, dictum
				blandit erat. Aenean bibendum nunc eu aliquam venenatis. Donec tempus
				quam vel ipsum porttitor auctor in et turpis. Nulla facilisi.
				Suspendisse semper dictum lacus sit amet pharetra. Ut sit amet posuere
				ipsum. Praesent imperdiet ante id velit facilisis, vel pellentesque
				felis varius. Pellentesque interdum dictum tincidunt. Fusce malesuada
				nulla congue sem posuere, eget dictum lorem laoreet. Praesent ac
				elementum mauris. Nam a lorem in est maximus ultricies quis id nisl. Sed
				sit amet justo non arcu porttitor vestibulum nec vitae eros. In et ex
				urna. Ut tincidunt urna urna, ut tincidunt arcu cursus ac. Donec sed
				orci lacinia, pharetra dolor quis, tristique est. Donec accumsan
				faucibus arcu in ornare. Nunc sed leo ipsum. Proin sed ante nec magna
				mattis consequat. Pellentesque dignissim viverra neque, ac consectetur
				purus sollicitudin non. Integer ac maximus lorem. Pellentesque nisi
				erat, vehicula sit amet tincidunt porta, laoreet aliquam ante. In
				ullamcorper enim aliquam velit ornare pellentesque. Nunc pharetra quis
				turpis feugiat fringilla. Maecenas aliquam ultricies tellus ac
				vulputate. Phasellus a auctor lacus. Nam ipsum nulla, viverra nec rutrum
				et, facilisis non nisl. Etiam fringilla pellentesque leo ac malesuada.
				Mauris efficitur, risus non aliquam tincidunt, lacus massa elementum
				elit, ornare pretium dolor enim ut ligula. Donec at mauris id tortor
				ultrices pulvinar laoreet venenatis libero. Nulla tempor massa risus,
				nec mattis ipsum euismod sit amet. Pellentesque pulvinar leo quis
				tristique malesuada. Proin venenatis efficitur aliquam. Aliquam
				vestibulum pellentesque lorem, sit amet faucibus odio bibendum et. Proin
				tincidunt lacus quis lorem vestibulum, finibus congue sapien gravida.
				Curabitur tincidunt arcu id augue maximus fringilla. Duis aliquet
				fermentum sollicitudin. Quisque sit amet elit vitae diam pretium
				fermentum at at nisl. Ut semper justo eget ipsum lacinia, a eleifend
				velit vestibulum. Proin sapien ipsum, scelerisque eu nibh at, pulvinar
				sagittis metus. Quisque dictum consequat turpis, ut ultrices tellus
				efficitur sed. Sed dui tellus, maximus tincidunt tincidunt eget, rhoncus
				in est. Sed convallis molestie elit, at condimentum lectus molestie sit
				amet. Nam suscipit sem nisl, ac fermentum tortor feugiat vel. Nullam
				feugiat orci ac convallis ultricies. Mauris laoreet vulputate justo
				vitae volutpat. Quisque mattis mollis elit in tincidunt. Sed molestie
				lorem eu iaculis fringilla. Sed velit nunc, consectetur in neque eget,
				mollis pulvinar turpis. Etiam ac lacinia est, at tempus nisl.
				Suspendisse potenti. Donec libero tortor, varius nec ante nec, lacinia
				suscipit felis. Sed tristique augue magna, volutpat sagittis orci mollis
				ac. In hac habitasse platea dictumst. Pellentesque convallis orci vitae
				ornare pulvinar. Ut placerat tincidunt enim eu facilisis. Orci varius
				natoque penatibus et magnis dis parturient montes, nascetur ridiculus
				mus. Quisque laoreet fringilla lobortis. Etiam facilisis eu ligula nec
				sagittis. Duis vulputate faucibus ante, et efficitur massa lobortis eu.
				Donec vel magna arcu. Quisque eget viverra nisl. Nullam sollicitudin id
				dui ut facilisis. Nunc accumsan quam vel lacinia laoreet. Nulla eget sem
				eleifend, auctor ipsum id, ultrices magna. Donec non metus porta,
				faucibus sapien eget, bibendum augue. Aenean cursus dolor quis ligula
				sodales interdum. Nunc vitae metus nec leo convallis dapibus. Donec
				feugiat ac eros quis aliquam. Curabitur eget elementum nibh. Suspendisse
				non arcu turpis. Proin viverra dui at vulputate finibus. Pellentesque
				feugiat rutrum aliquet. Maecenas volutpat rhoncus vulputate. Aliquam
				lacinia tincidunt eleifend. Donec sed euismod ipsum. Mauris velit
				mauris, pellentesque cursus pellentesque vel, sodales vel libero.
				Praesent tristique mi orci. Aenean rutrum sit amet lorem quis
				pellentesque. Curabitur quis volutpat sem. In mauris diam, eleifend ac
				quam vel, molestie lobortis elit. Fusce semper urna mi, vitae pretium
				lacus tincidunt vitae. Maecenas accumsan elit eros, a dictum nunc
				finibus nec. Duis laoreet nisl eu urna pellentesque vestibulum. Nullam
				semper elit ac dolor finibus sollicitudin. Fusce blandit bibendum elit,
				at efficitur nunc tincidunt mattis. Vestibulum ante ipsum primis in
				faucibus orci luctus et ultrices posuere cubilia curae; Morbi orci
				ipsum, faucibus sit amet maximus in, interdum ac lacus. Fusce volutpat
				ipsum eu ante semper consectetur. Nullam at aliquam neque. Suspendisse
				in iaculis lectus. Vivamus et eros leo. Morbi ornare lorem ex, ornare
				interdum augue bibendum sit amet. Integer ornare feugiat lorem. Nunc
				malesuada et diam vitae convallis. Morbi commodo ligula et enim
				suscipit, a rhoncus magna finibus. Curabitur auctor eros ut nisl
				sagittis sollicitudin. Maecenas in tellus eget elit rhoncus feugiat sit
				amet vel arcu. Duis consequat nibh metus, in feugiat velit porttitor
				mattis. Nulla posuere orci in odio lacinia, ut bibendum orci sodales.
				Donec vel magna faucibus odio dapibus feugiat. Pellentesque eu egestas
				nunc. Ut vestibulum pretium lobortis. Praesent pharetra facilisis diam
				eu interdum. Praesent interdum ut purus sit amet tempus. Quisque rutrum
				enim quis lorem commodo, eu rutrum est accumsan. Aenean hendrerit ac
				sapien at interdum. Cras mattis est quis vulputate ultricies. In in
				auctor tellus, ac vulputate urna. Quisque et sem nec tellus mattis
				accumsan eget a ligula. Etiam pretium augue elit, ut ultricies nisi
				luctus maximus. Sed erat orci, feugiat vel magna sed, consectetur
				interdum lorem. Nullam tempor aliquet dolor, quis gravida ex fringilla
				in. Praesent facilisis ipsum nunc, sed ultrices arcu sollicitudin in. Ut
				feugiat quam in sem hendrerit luctus. Vivamus vitae viverra lorem. Ut
				condimentum nisi at neque tempus, quis tempus lectus varius. Praesent
				sed pretium eros. Ut lorem nisi, faucibus et imperdiet eget, condimentum
				id tortor. Nullam consequat metus a ligula finibus, eu tincidunt nisl
				euismod. Donec condimentum eros et laoreet laoreet. Pellentesque
				habitant morbi tristique senectus et netus et malesuada fames ac turpis
				egestas. Suspendisse potenti. Nam fermentum nulla in nibh tincidunt,
				eget pretium diam lacinia. Duis tincidunt felis id urna condimentum, sit
				amet vulputate lorem sodales. Class aptent taciti sociosqu ad litora
				torquent per conubia nostra, per inceptos himenaeos. Phasellus at est
				volutpat, gravida sapien ac, tincidunt ipsum. Aliquam erat volutpat.
				Quisque mollis dapibus turpis non tempor. Suspendisse vitae mi quis
				tortor maximus tincidunt ut et mauris. Sed porttitor, purus id accumsan
				tempor, lorem mi aliquet sem, ut interdum dui odio id dui. Integer
				dapibus enim sed justo placerat posuere non in velit. Praesent sapien
				ipsum, eleifend ac consectetur non, sagittis eget lacus. Mauris
				imperdiet tellus ut purus dictum efficitur. Pellentesque vestibulum
				laoreet nunc, eu maximus nunc faucibus et. Nunc vel neque nunc. Vivamus
				ultricies tortor erat, at pharetra lectus venenatis viverra. Etiam in
				magna enim. Cras vel turpis eu urna faucibus interdum eu quis turpis.
				Aenean vel turpis ullamcorper, pellentesque metus facilisis, pharetra
				quam. Proin rhoncus mi massa, scelerisque eleifend dui laoreet nec. Sed
				vulputate tortor nec est luctus pulvinar. Sed luctus tincidunt neque, ac
				pulvinar magna ultricies a. Nulla ut sem et eros blandit tincidunt ac
				non est. Donec bibendum non magna eu aliquet. Nam quis bibendum libero.
				Vestibulum ac mauris nec odio rutrum iaculis eu ac lorem. Nulla
				facilisi. Etiam finibus consequat erat, ut rhoncus risus tempor in.
				Proin porttitor neque sed lacinia tincidunt. Nulla vitae purus nec
				lectus fermentum sodales. Ut condimentum maximus purus, nec tempus enim
				imperdiet ac. Orci varius natoque penatibus et magnis dis parturient
				montes, nascetur ridiculus mus. Nam quis turpis a justo aliquam
				tincidunt.
			</p>
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
