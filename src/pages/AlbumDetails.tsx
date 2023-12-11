import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {
	setQueue,
	setCurrentTrackInfo,
	togglePlaying,
	setCurrentPlaylistInfo,
} from '../features/audioPlayerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { FavoriteBorder, PlayArrow, Pause } from '@mui/icons-material';
import AudioPlayerState from '../types/AudioPlayerState';
import BackButton from '../components/BackButton';
import PageTransition from '../components/PageTransition';
import Image from '../components/Image';
import TrackList from '../components/TrackList';
import Album from '../types/Album';

const AlbumDetails = () => {
	const [albumDetails, setAlbumDetails] = useState<Album>();
	const audioPlayer = useSelector(
		(state: AudioPlayerState) => state.audioPlayer
	);
	const { isPlaying, currentTrackInfo } = audioPlayer;

	const targetRef = useRef<HTMLDivElement>(null);

	const dispatch = useDispatch();

	const params = useParams();

	useEffect(() => {
		axios.get(`http://localhost:5000/albums/${params._id}`).then((res) => {
			setAlbumDetails(res.data);
		});
	}, []);

	return albumDetails ? (
		<PageTransition duration={0.2}>
			<div>
				<BackButton
					url={`/${albumDetails.artist?._id}`}
					text={albumDetails.name}
					targetRef={targetRef}
					threshold={70}
				/>
				<div className='mt-12'>
					<div className='absolute top-0 left-0 w-full z-0'>
						<Image
							src={albumDetails.albumImageUrl}
							height='100%'
							width='100%'
						/>
						<div className='absolute top-0 left-0 h-full w-full bg-black/30 backdrop-blur-3xl' />
						<div className='absolute top-0 left-0 h-full w-full bg-gradient-to-b from-transparent to-background-dark' />
					</div>
					<div className='relative p-8 z-10'>
						<Image
							src={albumDetails.albumImageUrl}
							width={300}
							height={300}
							classes='shadow-lg rounded-lg'
						/>
					</div>
					<div
						ref={targetRef}
						className='relative flex items-center justify-between mb-2 z-10 transition-opacity duration-200'>
						<div>
							<span className='block mb-1 font-bold text-2xl'>
								{albumDetails.name} • {albumDetails.year}
							</span>
							<span className='text-inactive'>
								{albumDetails.artist?.name} • {albumDetails.tracks.length}{' '}
								tracks, {albumDetails.duration}
							</span>
						</div>
					</div>
				</div>
				<div className='flex justify-between mb-2'>
					<IconButton edge='start'>
						<FavoriteBorder fontSize='large' />
					</IconButton>
					<IconButton
						className='rounded-full !border-2 !border-solid !transition-transform active:scale-90'
						onClick={() => {
							if (
								!albumDetails.tracks.find(
									(item) => item._id == currentTrackInfo._id
								)
							) {
								const firstTrack = albumDetails.tracks[0];

								dispatch(togglePlaying(true));
								dispatch(
									setCurrentTrackInfo({
										_id: firstTrack._id,
										audioUrl: firstTrack.audioUrl,
										artist: firstTrack.artist,
										title: firstTrack.title,
										album: firstTrack.album,
									})
								);
								dispatch(setQueue(albumDetails.tracks));
								dispatch(
									setCurrentPlaylistInfo({
										type: 'album',
										name: currentTrackInfo.album?.name,
									})
								);
							} else if (
								isPlaying &&
								albumDetails.tracks.find(
									(item) => item._id == currentTrackInfo._id
								)
							) {
								dispatch(togglePlaying(false));
							} else {
								dispatch(togglePlaying(true));
							}
						}}>
						{isPlaying &&
						albumDetails.tracks.find(
							(item) => item._id == currentTrackInfo._id
						) ? (
							<Pause fontSize='large' />
						) : (
							<PlayArrow fontSize='large' />
						)}
					</IconButton>
				</div>

				<TrackList tracks={albumDetails.tracks} type='album' />
			</div>
		</PageTransition>
	) : null;
};

export default AlbumDetails;
