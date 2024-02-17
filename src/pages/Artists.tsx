import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import Image from '../components/Image';
import Artist from '../types/Artist';
import { useSelector } from 'react-redux';
import AudioPlayerState from '../types/AudioPlayerState';

const Artists = () => {
	const [artists, setArtists] = useState<Artist[]>([]);
	const { audioPlayer } = useSelector((state: AudioPlayerState) => state);
	const { currentPlaylistInfo } = audioPlayer;

	useEffect(() => {
		axios.get<Artist[]>('http://localhost:5000/artists').then((res) => {
			setArtists(res.data);
		});
	}, []);

	return (
		<PageTransition duration={1}>
			<div className='pageContainer'>
				<h1 className='w-full text-center mt-4 mb-8'>Pick an artist</h1>
				<div className='grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6'>
					{artists.map((item: Artist) => (
						<Link key={item._id} to={`/artist/${item._id}`}>
							<div className='rounded-lg transition-all duration-300 ease-in-out group hover:bg-primary hover:shadow-card hover:p-2'>
								<div className='transition-all duration-300 ease-in-out group-hover:p-2'>
									<Image
										src={item.artistImageUrl}
										fullSize={true}
										classes='aspect-square rounded-full shadow-card'
									/>
								</div>
								<span
									className={`mt-2 block text-center text-sm font-semibold truncate ${
										currentPlaylistInfo.name == item.name && 'text-accent'
									}`}>
									{item.name}
								</span>
							</div>
						</Link>
					))}
				</div>
			</div>
		</PageTransition>
	);
};

export default Artists;
