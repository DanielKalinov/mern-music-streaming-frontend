import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import Image from '../components/Image';
import Artist from '../types/Artist';
import { useSelector } from 'react-redux';
import AudioPlayerState from '../types/AudioPlayerState';
import PlaylistControls from '../components/PlaylistControls';

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
				<div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6'>
					{artists.map(({ _id, name, artistImageUrl, tracks }: Artist) => (
						<div key={_id} className='relative group'>
							<Link to={`/artist/${_id}`}>
								<div className='p-4 rounded-lg transition-all duration-300 ease-in-out group disablemobilehover:group-hover:bg-primary disablemobilehover:group-hover:shadow-card'>
									<div className='transition-all duration-300 ease-in-out disablemobilehover:group-hover:p-2'>
										<Image
											src={artistImageUrl}
											fullSize={true}
											classes='aspect-square rounded-full shadow-card'
										/>
									</div>
									<span
										className={`mt-4 block text-center text-sm font-semibold truncate sm:text-base md:text-lg ${
											currentPlaylistInfo.name == name && 'text-accent'
										}`}>
										{name}
									</span>
								</div>
							</Link>
							<div
								className={`absolute bottom-16 right-8 transition-all duration-300 disablemobilehover:group-hover:visible disablemobilehover:group-hover:opacity-100 ${
									currentPlaylistInfo.name == name
										? 'visible opacity-100 translate-y-0'
										: 'invisible opacity-0 translate-y-2'
								}`}>
								<PlaylistControls
									playlist={tracks}
									playlistInfo={{ type: 'artist', name: name }}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</PageTransition>
	);
};

export default Artists;
