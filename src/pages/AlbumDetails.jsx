import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useDispatch, useSelector } from 'react-redux';
import { setSongInfo, togglePlaying } from '../features/audioPlayerSlice';

const AlbumDetails = ({ audio }) => {
	const isPlaying = useSelector((state) => state.audioPlayer.isPlaying);
	const [albumDetails, setAlbumDetails] = useState();

	const dispatch = useDispatch();

	const params = useParams();

	useEffect(() => {
		axios.get(`http://localhost:5000/albums/${params.id}`).then((res) => {
			setAlbumDetails(res.data);
		});
	}, []);

	return (
		albumDetails && (
			<div>
				<div className='p-8'>
					<img src={albumDetails.albumImageUrl} height='100%' width='100%' />
				</div>
				<div className='flex items-center justify-between mb-4'>
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
				<ul>
					{albumDetails.songs.map((item) => (
						<li
							className='flex justify-between py-2'
							key={item._id}
							onClick={() => {
								dispatch(
									setSongInfo({
										title: item.title,
										artist: albumDetails.artist,
										album: albumDetails.name,
									})
								);

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
							<div>
								<span className='block text-sm'>{item.title}</span>
								<span className='block text-sm text-zinc-300'>
									{albumDetails.artist}
								</span>
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
