import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { ButtonBase } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import {
	setLoading,
	setQueue,
	setCurrentSongInfo,
	togglePlaying,
} from '../features/audioPlayerSlice';
import Song from '../types/Song';
import AudioPlayerState from '../types/AudioPlayerState';
import WaveAnimation from '../components/WaveAnimation';

const AlbumDetails = () => {
	const isPlaying = useSelector(
		(state: AudioPlayerState) => state.audioPlayer.isPlaying
	);
	const [albumDetails, setAlbumDetails] = useState<AlbumDetails>();
	// const loading = useSelector((state) => state.audioPlayer.loading);
	const currentSongInfo = useSelector(
		(state: AudioPlayerState) => state.audioPlayer.currentSongInfo
	);

	const albumTopSectionRef = useRef<HTMLDivElement>(null);
	const albumImageRef = useRef<HTMLImageElement>(null);
	const albumHeaderRef = useRef<HTMLDivElement>(null);

	const dispatch = useDispatch();

	const params = useParams();

	useEffect(() => {
		axios.get(`http://localhost:5000/albums/${params.id}`).then((res) => {
			setAlbumDetails(res.data);
			res.data.tracks.map((item: { albumImageUrl: string }) => {
				dispatch(setLoading(true));
				const img = new Image();
				img.onload = () => dispatch(setLoading(false));
				img.src = item.albumImageUrl;
			});
		});

		const changeOpacityOnScroll = () => {
			if (albumTopSectionRef.current && albumHeaderRef.current) {
				const albumTopSectionOpacity = (400 - window.scrollY) / 400;

				albumTopSectionRef.current.style.opacity =
					albumTopSectionOpacity.toString();
				albumHeaderRef.current.style.backgroundColor = `rgba(30, 41, 59, ${
					window.scrollY >= 300 ? '1' : '0'
				})`;

				const child = albumHeaderRef.current.children[1] as HTMLElement;

				child.style.opacity = `${window.scrollY >= 300 ? '1' : '0'}`;
			}
		};

		window.addEventListener('scroll', changeOpacityOnScroll);

		return () => window.removeEventListener('scroll', changeOpacityOnScroll);
	}, []);

	return albumDetails ? (
		<div>
			<div
				ref={albumHeaderRef}
				className='fixed top-0 left-0 px-4 w-full z-20 transition-colors duration-300'>
				<Link to={`/${albumDetails.artist._id}`}>
					<IconButton edge='start'>
						<ArrowBackIcon fontSize='large' />
					</IconButton>
				</Link>
				<span className='opacity-0 transition-all duration-300'>
					{albumDetails.name}
				</span>
			</div>
			<div className='mt-12' ref={albumTopSectionRef}>
				<div className='absolute top-0 left-0 w-full z-0'>
					<img
						ref={albumImageRef}
						src={albumDetails.albumImageUrl}
						height='100%'
						width='100%'
					/>
					<div className='absolute top-0 left-0 h-full w-full bg-black/30 backdrop-blur-3xl' />
					<div className='absolute top-0 left-0 h-full w-full bg-gradient-to-b from-transparent to-background-dark' />
				</div>
				<div className='relative p-8 z-10'>
					<img
						ref={albumImageRef}
						src={albumDetails.albumImageUrl}
						height='100%'
						width='100%'
						className='shadow-lg rounded-lg z-20'
					/>
				</div>
				<div className='relative flex items-center justify-between mb-2 z-10'>
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

			<ul>
				{albumDetails.tracks.map((item, index) => (
					<li
						key={item._id}
						className={`flex ${
							item.title == currentSongInfo.title &&
							'bg-gradient-to-r from-white/5 to-transparent rounded-xl'
						}`}>
						<ButtonBase
							className='w-full text-left !rounded-xl'
							onClick={() => {
								if (item.audioUrl == currentSongInfo.audioUrl) {
									if (isPlaying) {
										dispatch(togglePlaying(false));
									} else {
										dispatch(togglePlaying(true));
									}
								} else {
									dispatch(
										setCurrentSongInfo({
											_id: item._id,
											title: item.title,
											album: item.album,
											audioUrl: item.audioUrl,
										})
									);
									dispatch(togglePlaying(true));
									dispatch(setQueue(albumDetails.tracks));
								}
							}}>
							<div className='w-full flex justify-between py-2 px-4'>
								<div
									className={`flex items-center transition-colors duration-200 ease-in-out font-medium ${
										item.title == currentSongInfo.title && 'text-accent'
									}`}>
									{item.title == currentSongInfo.title && isPlaying ? (
										<WaveAnimation />
									) : (
										<span className='w-4 text-center mr-2'>{index + 1}</span>
									)}

									<div>
										<span className='block text-sm'>{item.title}</span>
										<span className='block text-sm text-inactive font-normal'>
											{albumDetails.artist.name}
										</span>
									</div>
								</div>
							</div>
						</ButtonBase>

						<IconButton>
							<MoreVertRoundedIcon />
						</IconButton>
					</li>
				))}
			</ul>
		</div>
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
