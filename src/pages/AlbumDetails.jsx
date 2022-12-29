import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
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
	const isPlaying = useSelector((state) => state.audioPlayer.isPlaying);
	const [albumDetails, setAlbumDetails] = useState();
	const [averageColor, setAverageColor] = useState();
	const loading = useSelector((state) => state.audioPlayer.loading);
	const currentSongInfo = useSelector(
		(state) => state.audioPlayer.currentSongInfo
	);

	const albumTopSectionRef = useRef();
	const albumImageRef = useRef();
	const albumHeaderRef = useRef();

	const dispatch = useDispatch();

	const params = useParams();

	useEffect(() => {
		axios.get(`http://localhost:5000/albums/${params.id}`).then((res) => {
			setAlbumDetails(res.data);

			res.data.songs.map((item) => {
				dispatch(setLoading(true));

				const img = new Image();
				img.onload = () => dispatch(setLoading(false));
				img.src = item.albumImageUrl;
			});
		});

		const changeOpacityOnScroll = () => {
			const albumTopSectionOpacity = (400 - window.scrollY) / 400;

			albumTopSectionRef.current.style.opacity = albumTopSectionOpacity;
			albumHeaderRef.current.style.backgroundColor = `rgba(30, 41, 59, ${
				window.scrollY >= 350 ? '1' : '0'
			})`;
			albumHeaderRef.current.children[1].style.opacity = `${
				window.scrollY >= 350 ? '1' : '0'
			}`;
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

	return (
		albumDetails && (
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
										position: 0,
										title: firstTrack.title,
										artist: firstTrack.artist,
										albumImageUrl: firstTrack.albumImageUrl,
										duration: firstTrack.duration,
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
												position: index,
												title: item.title,
												artist: item.artist,
												albumImageUrl: item.albumImageUrl,
												duration: item.duration,
												audioUrl: item.audioUrl,
											})
										);
										dispatch(togglePlaying(true));
										dispatch(setQueue(albumDetails.songs));
									}
								}}>
								<div className='w-full flex justify-between py-2 pl-4'>
									<div
										className={`flex items-center ${
											item.title == currentSongInfo.title &&
											'text-accent font-bold'
										}`}>
										<span className='w-6'>{index + 1}</span>
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
					<li className='flex pr-4'>
						<ButtonBase className='w-full text-left'>
							<div className='w-full flex justify-between py-2 pl-4'>
								<div className='flex items-center'>
									<span className='w-6'>12</span>
									<div>
										<span className='block text-sm'>Title</span>
										<span className='block text-sm text-inactive font-normal'>
											Artist
										</span>
									</div>
								</div>
							</div>
						</ButtonBase>
						<IconButton edge='end'>
							<MoreVertRoundedIcon />
						</IconButton>
					</li>
					<li className='flex pr-4'>
						<ButtonBase className='w-full text-left'>
							<div className='w-full flex justify-between py-2 pl-4'>
								<div className='flex items-center'>
									<span className='w-6'>12</span>
									<div>
										<span className='block text-sm'>Title</span>
										<span className='block text-sm text-inactive font-normal'>
											Artist
										</span>
									</div>
								</div>
							</div>
						</ButtonBase>
						<IconButton edge='end'>
							<MoreVertRoundedIcon />
						</IconButton>
					</li>
					<li className='flex pr-4'>
						<ButtonBase className='w-full text-left'>
							<div className='w-full flex justify-between py-2 pl-4'>
								<div className='flex items-center'>
									<span className='w-6'>12</span>
									<div>
										<span className='block text-sm'>Title</span>
										<span className='block text-sm text-inactive font-normal'>
											Artist
										</span>
									</div>
								</div>
							</div>
						</ButtonBase>
						<IconButton edge='end'>
							<MoreVertRoundedIcon />
						</IconButton>
					</li>
					<li className='flex pr-4'>
						<ButtonBase className='w-full text-left'>
							<div className='w-full flex justify-between py-2 pl-4'>
								<div className='flex items-center'>
									<span className='w-6'>12</span>
									<div>
										<span className='block text-sm'>Title</span>
										<span className='block text-sm text-inactive font-normal'>
											Artist
										</span>
									</div>
								</div>
							</div>
						</ButtonBase>
						<IconButton edge='end'>
							<MoreVertRoundedIcon />
						</IconButton>
					</li>
					<li className='flex pr-4'>
						<ButtonBase className='w-full text-left'>
							<div className='w-full flex justify-between py-2 pl-4'>
								<div className='flex items-center'>
									<span className='w-6'>12</span>
									<div>
										<span className='block text-sm'>Title</span>
										<span className='block text-sm text-inactive font-normal'>
											Artist
										</span>
									</div>
								</div>
							</div>
						</ButtonBase>
						<IconButton edge='end'>
							<MoreVertRoundedIcon />
						</IconButton>
					</li>
					<li className='flex pr-4'>
						<ButtonBase className='w-full text-left'>
							<div className='w-full flex justify-between py-2 pl-4'>
								<div className='flex items-center'>
									<span className='w-6'>12</span>
									<div>
										<span className='block text-sm'>Title</span>
										<span className='block text-sm text-inactive font-normal'>
											Artist
										</span>
									</div>
								</div>
							</div>
						</ButtonBase>
						<IconButton edge='end'>
							<MoreVertRoundedIcon />
						</IconButton>
					</li>
					<li className='flex pr-4'>
						<ButtonBase className='w-full text-left'>
							<div className='w-full flex justify-between py-2 pl-4'>
								<div className='flex items-center'>
									<span className='w-6'>12</span>
									<div>
										<span className='block text-sm'>Title</span>
										<span className='block text-sm text-inactive font-normal'>
											Artist
										</span>
									</div>
								</div>
							</div>
						</ButtonBase>
						<IconButton edge='end'>
							<MoreVertRoundedIcon />
						</IconButton>
					</li>
					<li className='flex pr-4'>
						<ButtonBase className='w-full text-left'>
							<div className='w-full flex justify-between py-2 pl-4'>
								<div className='flex items-center'>
									<span className='w-6'>12</span>
									<div>
										<span className='block text-sm'>Title</span>
										<span className='block text-sm text-inactive font-normal'>
											Artist
										</span>
									</div>
								</div>
							</div>
						</ButtonBase>
						<IconButton edge='end'>
							<MoreVertRoundedIcon />
						</IconButton>
					</li>
					<li className='flex pr-4'>
						<ButtonBase className='w-full text-left'>
							<div className='w-full flex justify-between py-2 pl-4'>
								<div className='flex items-center'>
									<span className='w-6'>12</span>
									<div>
										<span className='block text-sm'>Title</span>
										<span className='block text-sm text-inactive font-normal'>
											Artist
										</span>
									</div>
								</div>
							</div>
						</ButtonBase>
						<IconButton edge='end'>
							<MoreVertRoundedIcon />
						</IconButton>
					</li>
					<li className='flex pr-4'>
						<ButtonBase className='w-full text-left'>
							<div className='w-full flex justify-between py-2 pl-4'>
								<div className='flex items-center'>
									<span className='w-6'>12</span>
									<div>
										<span className='block text-sm'>Title</span>
										<span className='block text-sm text-inactive font-normal'>
											Artist
										</span>
									</div>
								</div>
							</div>
						</ButtonBase>
						<IconButton edge='end'>
							<MoreVertRoundedIcon />
						</IconButton>
					</li>
					<li className='flex pr-4'>
						<ButtonBase className='w-full text-left'>
							<div className='w-full flex justify-between py-2 pl-4'>
								<div className='flex items-center'>
									<span className='w-6'>12</span>
									<div>
										<span className='block text-sm'>Title</span>
										<span className='block text-sm text-inactive font-normal'>
											Artist
										</span>
									</div>
								</div>
							</div>
						</ButtonBase>
						<IconButton edge='end'>
							<MoreVertRoundedIcon />
						</IconButton>
					</li>
					<li className='flex pr-4'>
						<ButtonBase className='w-full text-left'>
							<div className='w-full flex justify-between py-2 pl-4'>
								<div className='flex items-center'>
									<span className='w-6'>12</span>
									<div>
										<span className='block text-sm'>Title</span>
										<span className='block text-sm text-inactive font-normal'>
											Artist
										</span>
									</div>
								</div>
							</div>
						</ButtonBase>
						<IconButton edge='end'>
							<MoreVertRoundedIcon />
						</IconButton>
					</li>
					<li className='flex pr-4'>
						<ButtonBase className='w-full text-left'>
							<div className='w-full flex justify-between py-2 pl-4'>
								<div className='flex items-center'>
									<span className='w-6'>12</span>
									<div>
										<span className='block text-sm'>Title</span>
										<span className='block text-sm text-inactive font-normal'>
											Artist
										</span>
									</div>
								</div>
							</div>
						</ButtonBase>
						<IconButton edge='end'>
							<MoreVertRoundedIcon />
						</IconButton>
					</li>
				</ul>
			</div>
		)
	);
};

export default AlbumDetails;
