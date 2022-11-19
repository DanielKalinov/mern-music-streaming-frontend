import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useDispatch, useSelector } from 'react-redux';
import {
	setAverageColor,
	setQueue,
	setSongInfo,
	togglePlaying,
} from '../features/audioPlayerSlice';
import { FastAverageColor } from 'fast-average-color';

const AlbumDetails = ({ audio }) => {
	const isPlaying = useSelector((state) => state.audioPlayer.isPlaying);
	const [albumDetails, setAlbumDetails] = useState();
	const averageColor = useSelector((state) => state.audioPlayer.averageColor);

	const albumImageRef = useRef();

	const dispatch = useDispatch();

	const params = useParams();

	useEffect(() => {
		axios.get(`http://localhost:5000/albums/${params.id}`).then((res) => {
			setAlbumDetails(res.data);
		});
	}, []);

	useEffect(() => {
		if (albumImageRef.current) {
			const fac = new FastAverageColor();
			albumImageRef.current.crossOrigin = 'Anonymous';
			fac
				.getColorAsync(albumImageRef.current)
				.then((color) => {
					dispatch(setAverageColor(color.hex));
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
					className='p-4'
					style={{
						background: `linear-gradient(${averageColor}, #0f172a)`,
					}}>
					<div className='p-8'>
						<img
							className='shadow-lg rounded-lg'
							ref={albumImageRef}
							src={albumDetails.albumImageUrl}
							height='100%'
							width='100%'
						/>
					</div>
					<div className='flex items-center justify-between'>
						<div>
							<span className='block font-bold text-2xl'>
								{albumDetails.name} • {albumDetails.year}
							</span>
							<span className='block text-lg text-zinc-300'>
								{albumDetails.artist}
							</span>
						</div>
						<IconButton>
							<FavoriteBorderIcon fontSize='large' />
						</IconButton>
					</div>
				</div>

				<ul className='px-4'>
					{albumDetails.songs.map((item, index) => (
						<li
							className={`flex justify-between py-2 ${
								item.audioUrl == audio.current.src ? 'text-accent' : ''
							}`}
							key={item._id}
							onClick={() => {
								dispatch(
									setSongInfo({
										position: item.position,
										title: item.title,
										artist: item.artist,
										albumImageUrl: item.albumImageUrl,
									})
								);

								dispatch(setQueue(albumDetails.songs));

								if (item.audioUrl == audio.current.src) {
									if (!audio.current.paused) {
										dispatch(togglePlaying(false));
										audio.current.pause();
									} else {
										dispatch(togglePlaying(true));
										audio.current.play();
									}
								} else {
									dispatch(togglePlaying(true));
									audio.current.src = item.audioUrl;
									audio.current.play();
								}
							}}>
							<div className='flex items-center'>
								<span className='mr-4'>{index + 1}</span>
								<div>
									<span className='block text-sm'>{item.title}</span>
									<span className='block text-sm text-zinc-300'>
										{albumDetails.artist}
									</span>
								</div>
							</div>

							<div>
								{item.audioUrl == audio.current.src && (
									<IconButton edge='end'>
										{isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
									</IconButton>
								)}
								<IconButton edge='end'>
									<MoreVertRoundedIcon />
								</IconButton>
							</div>
						</li>
					))}
				</ul>
			</div>
		)
	);
};

export default AlbumDetails;
