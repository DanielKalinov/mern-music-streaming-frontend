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
		axios.get('http://localhost:5000/artists').then((res) => {
			setArtists(res.data);
		});
	}, []);

	return (
		<PageTransition duration={1}>
			<div className='pageContainer'>
				<h1 className='w-full text-center mt-4 mb-8'>Pick an artist</h1>
				<div className='grid grid-cols-2 gap-4 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8'>
					{artists.map(
						(item: { _id: string; name: string; artistImageUrl: string }) => (
							<Link key={item._id} to={`/artist/${item._id}`}>
								<div className='p-3 card hover:bg-secondary'>
									<Image
										src={item.artistImageUrl}
										fullSize={true}
										classes='aspect-square rounded-lg shadow-img'
									/>
									<span
										className={`mt-3 block text-center text-sm font-semibold truncate ${
											currentPlaylistInfo.name == item.name && 'text-accent'
										}`}>
										{item.name}
									</span>
								</div>
							</Link>
						)
					)}
				</div>
			</div>
		</PageTransition>
	);
};

export default Artists;
