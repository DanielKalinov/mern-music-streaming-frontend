import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useDispatch, useSelector } from 'react-redux';
import {
	setQueue,
	setCurrentSongInfo,
	togglePlaying,
} from '../features/audioPlayerSlice';
import Song from '../types/Song';
import AudioPlayerState from '../types/AudioPlayerState';
import BackButton from '../components/BackButton';
import PageTransition from '../components/PageTransition';
import Image from '../components/Image';
import TrackList from '../components/TrackList';

const AlbumDetails = () => {
	const isPlaying = useSelector(
		(state: AudioPlayerState) => state.audioPlayer.isPlaying
	);
	const [albumDetails, setAlbumDetails] = useState<AlbumDetails>();
	const currentSongInfo = useSelector(
		(state: AudioPlayerState) => state.audioPlayer.currentSongInfo
	);

	const targetRef = useRef<HTMLDivElement>(null);

	const dispatch = useDispatch();

	const params = useParams();

	useEffect(() => {
		axios.get(`http://localhost:5000/albums/${params.id}`).then((res) => {
			setAlbumDetails(res.data);
		});
	}, []);

	return albumDetails ? (
		<PageTransition duration={0.2}>
			<div>
				<BackButton
					url={`/${albumDetails.artist._id}`}
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
							<span className='block font-bold text-2xl'>
								{albumDetails.name} • {albumDetails.year}
							</span>
							<span className='block text-lg text-inactive'>
								{albumDetails.artist.name}
							</span>
						</div>
					</div>
				</div>
				<div className='flex justify-between mb-2'>
					<IconButton edge='start'>
						<FavoriteBorderIcon fontSize='large' />
					</IconButton>
					<IconButton
						className='rounded-full !border-2 !border-solid !transition-transform active:scale-90'
						onClick={() => {
							if (!currentSongInfo.audioUrl) {
								const firstTrack = albumDetails.tracks[0];

								dispatch(togglePlaying(true));
								dispatch(
									setCurrentSongInfo({
										_id: firstTrack._id,
										title: firstTrack.title,
										album: firstTrack.album,
										audioUrl: firstTrack.audioUrl,
									})
								);
								dispatch(setQueue(albumDetails.tracks));
							} else if (currentSongInfo.audioUrl && isPlaying) {
								dispatch(togglePlaying(false));
							} else {
								dispatch(togglePlaying(true));
							}
						}}>
						{isPlaying ? (
							<PauseIcon fontSize='large' />
						) : (
							<PlayArrowIcon fontSize='large' />
						)}
					</IconButton>
				</div>

				<TrackList tracks={albumDetails.tracks} />
			</div>
		</PageTransition>
	) : null;
};

interface AlbumDetails {
	name: string;
	albumImageUrl: string;
	year: string;
	artist: { _id: string; name: string };
	tracks: Song[];
}

export default AlbumDetails;
