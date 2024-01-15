import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TopBar from '../components/TopBar';
import PageTransition from '../components/PageTransition';
import Image from '../components/Image';
import TrackList from '../components/TrackList';
import Album from '../types/Album';
import PlaylistControls from '../components/PlaylistControls';
import artistNames from '../utils/artistName';
import Track from '../types/Track';

const AlbumDetails = () => {
	const [albumDetails, setAlbumDetails] = useState<Album>();

	const targetRef = useRef<HTMLDivElement>(null);

	const params = useParams();

	useEffect(() => {
		axios.get(`http://localhost:5000/albums/${params.id}`).then((res) => {
			setAlbumDetails({
				...res.data,
				tracks: res.data.tracks.map(
					({ track, _id }: { track: Track; _id: string }) => ({
						...track,
						_id,
					})
				),
			});
		});
	}, []);

	return albumDetails ? (
		<PageTransition duration={0.2}>
			<div className='max-w-2xl m-auto'>
				<TopBar
					url={`/artist/${albumDetails.artist[0]._id}`}
					text={albumDetails.name}
					targetRef={targetRef}
					threshold={20}
				/>
				<div className='mt-20 mb-8 sm:flex sm:items-center sm:gap-4'>
					<div className='absolute top-0 left-0 w-full'>
						<Image src={albumDetails.albumImageUrl} classes='max-h-[400px]' />
						<div className='absolute top-0 left-0 h-full w-full bg-black/30 backdrop-blur-[128px]' />
						<div className='absolute top-0 left-0 h-full w-full bg-gradient-to-b from-transparent to-background-dark' />
					</div>
					<Image
						src={albumDetails.albumImageUrl}
						width={300}
						height={300}
						classes='m-auto max-w-[300px] max-h-[300px] mb-8 shadow-lg rounded-lg sm:basis-1/2 sm:m-0'
					/>
					<div
						ref={targetRef}
						className='relative flex items-center justify-between w-full basis-1/2 mb-8 transition-opacity duration-200 h-fit'>
						<div className='w-full'>
							<span className='block mb-1 font-bold text-2xl lg:text-4xl'>
								{albumDetails.name}
							</span>
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

				<TrackList
					tracks={albumDetails.tracks}
					playlistInfo={{ type: 'album', name: albumDetails.name }}
				/>
			</div>
		</PageTransition>
	) : null;
};

export default AlbumDetails;
