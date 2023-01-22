import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { ButtonBase } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import {
	setAverageColor,
	setLoading,
	setQueue,
	setCurrentSongInfo,
	togglePlaying,
} from '../features/audioPlayerSlice';
import { FastAverageColor } from 'fast-average-color';

const AlbumDetails = () => {
	const isPlaying = useSelector(
		(state: AudioPlayerState) => state.audioPlayer.isPlaying
	);
	const [albumDetails, setAlbumDetails] = useState<AlbumDetails>();
	// const [averageColor, setAverageColor] = useState();
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

			res.data.songs.map((item: { albumImageUrl: string }) => {
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

	useEffect(() => {
		if (albumImageRef.current) {
			const fac = new FastAverageColor();
			albumImageRef.current.crossOrigin = 'Anonymous';
			fac
				.getColorAsync(albumImageRef.current)
				.then((color) => {
					setAverageColor(color.hex);
				})
				.catch((e) => {
					console.log(e);
				});
		}
	}, [albumImageRef.current]);

	return albumDetails ? (
		<div>
			<div
				ref={albumHeaderRef}
				className='fixed w-full z-20 transition-colors duration-300 p-1'>
				<IconButton className='!mr-4'>
					<ArrowBackIcon />
				</IconButton>
				<span className='opacity-0 transition-all duration-300'>
					{albumDetails.name}
				</span>
			</div>
			<div ref={albumTopSectionRef} className='p-4'>
				<div className='p-8'>
					<img
						className='shadow-lg rounded-lg'
						ref={albumImageRef}
						src={albumDetails.albumImageUrl}
						height='100%'
						width='100%'
					/>
				</div>
				<div className='flex items-center justify-between mb-2'>
					<div>
						<span className='block font-bold text-2xl'>
							{albumDetails.name} • {albumDetails.year}
						</span>
						<span className='block text-lg text-inactive'>
							{albumDetails.artist}
						</span>
					</div>
				</div>
			</div>
			<div className='flex justify-between px-4 mb-2'>
				<IconButton edge='start'>
					<FavoriteBorderIcon fontSize='large' />
				</IconButton>
				<IconButton
					className='rounded-full !border-2 !border-solid !transition-transform active:scale-90'
					onClick={() => {
						if (!currentSongInfo.audioUrl) {
							const firstTrack = albumDetails.songs[0];

							dispatch(togglePlaying(true));
							dispatch(
								setCurrentSongInfo({
									id: firstTrack._id,
									position: 0,
									title: firstTrack.title,
									artist: firstTrack.artist,
									albumImageUrl: firstTrack.albumImageUrl,
									audioUrl: firstTrack.audioUrl,
								})
							);
							dispatch(setQueue(albumDetails.songs));
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
				{albumDetails.songs.map((item, index) => (
					<li key={item._id} className='flex pr-4'>
						<ButtonBase
							className='w-full text-left'
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
											id: item._id,
											position: index,
											title: item.title,
											artist: item.artist,
											albumImageUrl: item.albumImageUrl,
											audioUrl: item.audioUrl,
										})
									);
									dispatch(togglePlaying(true));
									dispatch(setQueue(albumDetails.songs));
								}
							}}>
							<div className='w-full flex justify-between py-2'>
								<div
									className={`flex items-center transition-colors duration-200 ease-in-out ${
										item.title == currentSongInfo.title && 'text-accent'
									}`}>
									{item.title == currentSongInfo.title && isPlaying ? (
										<div className='flex justify-center items-center m-auto h-4 w-6 ml-4 mr-2 space-x-1'>
											<div className='h-full w-0.5 bg-accent rounded-full strokeWave' />
											<div className='h-full w-0.5 bg-accent rounded-full strokeWave' />
											<div className='h-full w-0.5 bg-accent rounded-full strokeWave' />
										</div>
									) : (
										<span className='w-6 text-center ml-4 mr-2'>
											{index + 1}
										</span>
									)}

									<div>
										<span className='block text-sm'>{item.title}</span>
										<span className='block text-sm text-inactive font-normal'>
											{albumDetails.artist}
										</span>
									</div>
								</div>
							</div>
						</ButtonBase>

						<IconButton edge='end'>
							<MoreVertRoundedIcon />
						</IconButton>
					</li>
				))}
			</ul>
		</div>
	) : null;
};

interface AudioPlayerState {
	audioPlayer: {
		currentSongInfo: {
			audioUrl: string;
			title: string;
		};
		isSeeking: boolean;
		isPlaying: boolean;
		repeatCurrentSong: boolean;
	};
}

interface AlbumDetails {
	name: string;
	albumImageUrl: string;
	year: string;
	artist: string;
	songs: {
		_id: string;
		title: string;
		artist: string;
		albumImageUrl: string;
		audioUrl: string;
	}[];
}

export default AlbumDetails;
