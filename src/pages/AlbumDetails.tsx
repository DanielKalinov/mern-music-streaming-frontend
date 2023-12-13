import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import PageTransition from '../components/PageTransition';
import Image from '../components/Image';
import TrackList from '../components/TrackList';
import Album from '../types/Album';
import PlaylistControls from '../components/PlaylistControls';

const AlbumDetails = () => {
	const [albumDetails, setAlbumDetails] = useState<Album>();

	const targetRef = useRef<HTMLDivElement>(null);

	const params = useParams();

	useEffect(() => {
		axios.get(`http://localhost:5000/albums/${params.id}`).then((res) => {
			setAlbumDetails(res.data);
		});
	}, []);

	return albumDetails ? (
		<PageTransition duration={0.2}>
			<div className='max-w-2xl m-auto sm:mt-20'>
				<BackButton
					url={`/artist/${albumDetails.artist?._id}`}
					text={albumDetails.name}
					targetRef={targetRef}
					threshold={70}
				/>
				<div className='mt-12 sm:flex sm:items-center sm:gap-4'>
					<div className='absolute top-0 left-0 w-full z-0'>
						<Image
							src={albumDetails.albumImageUrl}
							height='100%'
							width='100%'
							classes='max-h-[400px]'
						/>
						<div className='absolute top-0 left-0 h-full w-full bg-black/30 backdrop-blur-[128px]' />
						<div className='absolute top-0 left-0 h-full w-full bg-gradient-to-b from-transparent to-background-dark' />
					</div>
					<Image
						src={albumDetails.albumImageUrl}
						width={350}
						height={350}
						classes='m-auto max-w-[350px] max-h-[350px] mb-8 shadow-lg rounded-lg sm:basis-1/2 sm:m-0'
					/>
					<div
						ref={targetRef}
						className='relative flex items-center justify-between mb-2 z-10 transition-opacity duration-200 h-fit'>
						<div>
							<span className='block mb-1 font-bold text-2xl lg:text-4xl'>
								{albumDetails.name}
							</span>
							<span className='text-inactive'>
								{albumDetails.artist?.name} • {albumDetails.year} •{' '}
								{albumDetails.tracks.length} tracks, {albumDetails.duration}
							</span>
						</div>
					</div>
				</div>

				<PlaylistControls playlist={albumDetails.tracks} />

				<TrackList tracks={albumDetails.tracks} type='album' />
			</div>
		</PageTransition>
	) : null;
};

export default AlbumDetails;
