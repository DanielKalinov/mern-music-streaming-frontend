import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import PageTransition from '../components/PageTransition';
import Image from '../components/Image';
import TrackList from '../components/TrackList';
import Album from '../types/Album';
import PlaylistControls from '../components/PlaylistControls';
import artistNames from '../utils/artistName';

const AlbumDetails = () => {
	const [albumDetails, setAlbumDetails] = useState<Album>();

	const targetRef = useRef<HTMLDivElement>(null);

	const params = useParams();

	useEffect(() => {
		axios
			.get<Album>(`http://localhost:5000/albums/${params.id}`)
			.then((res) => {
				setAlbumDetails(res.data);
			});
	}, []);

	return albumDetails ? (
		<PageTransition duration={0.2}>
			<NavigationBar
				text={albumDetails.name}
				targetRef={targetRef}
				threshold={20}
			/>
			<div className='-mx-4'>
				<div className='relative w-full pt-20 pb-8'>
					<div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-background-dark backdrop-blur-3xl z-10' />
					<div
						className='absolute top-0 left-0 h-full w-full'
						style={{
							backgroundImage: `url(${albumDetails.albumImageUrl})`,
							backgroundSize: 'cover',
						}}
					/>
					<div className='relative max-w-2xl m-auto px-4 z-20 sm:flex sm:items-center sm:gap-6'>
						<Image
							src={albumDetails.albumImageUrl}
							height={250}
							width={250}
							classes='shrink-0 m-auto w-fit mb-6 shadow-card rounded-lg sm:m-0'
						/>
						<div
							ref={targetRef}
							className='relative flex items-center justify-between w-full transition-opacity duration-200'>
							<div>
								<h2 className='mb-1'>{albumDetails.name}</h2>
								<span className='text-inactive'>
									{artistNames(albumDetails.artist)}
								</span>
								<span className='block text-inactive'>
									{albumDetails.year} • {albumDetails.tracks.length} tracks,{' '}
									{albumDetails.duration}
								</span>
							</div>
							<PlaylistControls
								playlist={albumDetails.tracks}
								playlistInfo={{ type: 'album', name: albumDetails.name }}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className='max-w-2xl m-auto'>
				<TrackList
					tracks={albumDetails.tracks}
					playlistInfo={{ type: 'album', name: albumDetails.name }}
				/>
			</div>
		</PageTransition>
	) : null;
};

export default AlbumDetails;
