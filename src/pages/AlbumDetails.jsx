import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { useDispatch, useSelector } from 'react-redux';
import { togglePlaying } from '../features/audioPlayerSlice';
import { setSrc } from '../features/audioPlayerSlice';

const AlbumDetails = ({ src }) => {
	const dispatch = useDispatch();
	const isPlaying = useSelector((state) => state.audioPlayer.isPlaying);

	const [albumDetails, setAlbumDetails] = useState();

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
							{albumDetails.name}
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
							onClick={(e) => {
								dispatch(setSrc(item.audioUrl));

								if (isPlaying && item.audioUrl == src) {
									// If audio is playing and we've loaded the same src, pause audio
									dispatch(togglePlaying(false));
								} else {
									// Otherwise, play audio
									dispatch(togglePlaying(true));
								}
							}}>
							<div>
								<span className='block text-sm'>{item.title}</span>
								<span className='block text-sm text-zinc-300'>
									{albumDetails.artist}
								</span>
							</div>

							<IconButton edge='end'>
								<MoreVertRoundedIcon />
							</IconButton>
						</li>
					))}
				</ul>
			</div>
		)
	);
};

export default AlbumDetails;
