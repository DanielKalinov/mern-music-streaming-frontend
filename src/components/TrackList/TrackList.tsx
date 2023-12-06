import React from 'react';
import { useSelector } from 'react-redux';
import { IconButton, ButtonBase } from '@mui/material';
import { useDispatch } from 'react-redux';
import AudioPlayerState from '../../types/AudioPlayerState';
import {
	setCurrentSongInfo,
	setQueue,
	togglePlaying,
} from '../../features/audioPlayerSlice';
import WaveAnimation from '../WaveAnimation';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import Image from '../Image';
import Song from '../../types/Song';

const TracksList = ({
	tracks,
	showAlbumImage,
	albumName,
}: {
	tracks: Song[];
	showAlbumImage?: boolean;
	albumName?: string;
}) => {
	const currentSongInfo = useSelector(
		(state: AudioPlayerState) => state.audioPlayer.currentSongInfo
	);
	const isPlaying = useSelector(
		(state: AudioPlayerState) => state.audioPlayer.isPlaying
	);

	const dispatch = useDispatch();

	return (
		<ul>
			{tracks &&
				tracks.map((item: Song, index) => (
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
											album: albumName
												? { ...item.album, name: albumName }
												: item.album,
											audioUrl: item.audioUrl,
										})
									);
									dispatch(togglePlaying(true));
									dispatch(setQueue(tracks));
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
									{showAlbumImage && (
										<Image
											src={item.album.albumImageUrl}
											width={50}
											height={50}
											classes='h-11 shadow-md rounded-md mr-2'
										/>
									)}
									<div>
										<span className='block text-sm'>{item.title}</span>
										<span className='block text-sm text-inactive font-normal'>
											{item.album.artist.name}
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
	);
};

export default TracksList;
