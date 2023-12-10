import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AudioPlayerState from '../../types/AudioPlayerState';
import {
	setCurrentTrackInfo,
	setQueue,
	togglePlaying,
} from '../../features/audioPlayerSlice';
import { IconButton, ButtonBase } from '@mui/material';
import WaveAnimation from '../WaveAnimation';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import Image from '../Image';
import Track from '../../types/Track';

const TrackList = ({
	tracks,
	showAlbumImage,
	albumName,
}: {
	tracks: Track[];
	showAlbumImage?: boolean;
	albumName?: string;
}) => {
	const currentTrackInfo = useSelector(
		(state: AudioPlayerState) => state.audioPlayer.currentTrackInfo
	);
	const isPlaying = useSelector(
		(state: AudioPlayerState) => state.audioPlayer.isPlaying
	);

	const dispatch = useDispatch();

	return (
		<ul>
			{tracks &&
				tracks.map((item: Track, index) => (
					<li
						key={item.id}
						className={`flex ${
							item.id == currentTrackInfo.id &&
							'bg-gradient-to-r from-white/5 to-transparent rounded-xl'
						}`}>
						<ButtonBase
							className='w-full text-left !rounded-xl'
							onClick={() => {
								if (item.audioUrl == currentTrackInfo.audioUrl) {
									if (isPlaying) {
										dispatch(togglePlaying(false));
									} else {
										dispatch(togglePlaying(true));
									}
								} else {
									dispatch(
										setCurrentTrackInfo({
											id: item.id,
											audioUrl: item.audioUrl,
											artist: item.artist,
											title: item.title,
											album: item.album,
										})
									);
									dispatch(togglePlaying(true));
									dispatch(setQueue(tracks));
								}
							}}>
							<div className='w-full flex justify-between py-2 px-4'>
								<div
									className={`flex items-center transition-colors duration-200 ease-in-out font-medium ${
										item.id == currentTrackInfo.id && 'text-accent'
									}`}>
									{item.id == currentTrackInfo.id && isPlaying ? (
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
											{item.artist?.name}
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

export default TrackList;
