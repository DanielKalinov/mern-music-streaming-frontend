import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AudioPlayerState from '../../types/AudioPlayerState';
import {
	setCurrentTrackInfo,
	setCurrentPlaylistInfo,
	setQueue,
	togglePlaying,
} from '../../features/audioPlayerSlice';
import { IconButton, ButtonBase } from '@mui/material';
import WaveAnimation from '../WaveAnimation';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import Image from '../Image';
import Track from '../../types/Track';
import artistNames from '../../utils/artistName';

const TrackList = ({
	tracks,
	showAlbumImage,
	playlistInfo,
}: {
	tracks: Track[];
	showAlbumImage?: boolean;
	playlistInfo: {
		type: 'album' | 'artist';
		name: string;
	};
}) => {
	const audioPlayer = useSelector(
		(state: AudioPlayerState) => state.audioPlayer
	);
	const { currentTrackInfo, isPlaying } = audioPlayer;

	const dispatch = useDispatch();

	return (
		<ul className='relative'>
			{tracks &&
				tracks.map((item: Track, index) => (
					<li
						key={item._id}
						className={`flex ${
							item._id == currentTrackInfo._id &&
							'bg-gradient-to-r from-white/5 to-transparent rounded-xl'
						}`}>
						<ButtonBase
							className='w-full text-left !rounded-xl'
							onClick={() => {
								if (item._id == currentTrackInfo._id) {
									if (isPlaying) {
										dispatch(togglePlaying(false));
									} else {
										dispatch(togglePlaying(true));
									}
								} else {
									dispatch(setCurrentTrackInfo(item));
									dispatch(togglePlaying(true));
									dispatch(setQueue(tracks));
									dispatch(
										setCurrentPlaylistInfo({
											type: playlistInfo.type,
											name: playlistInfo.name,
										})
									);
								}
							}}>
							<div className='w-full flex justify-between py-2 px-4'>
								<div
									className={`flex items-center transition-colors duration-200 ease-in-out font-medium ${
										item._id == currentTrackInfo._id && 'text-accent'
									}`}>
									{item._id == currentTrackInfo._id && isPlaying ? (
										<WaveAnimation />
									) : (
										<span className='w-4 text-center mr-2'>{index + 1}</span>
									)}
									{showAlbumImage && (
										<Image
											src={item.track?.album.albumImageUrl}
											width={50}
											height={50}
											classes='shadow-img rounded-md mr-2'
										/>
									)}
									<div>
										<span className='block text-sm'>{item.track?.title}</span>
										<span className='block text-sm text-inactive font-normal'>
											{artistNames(item.track?.artist)}
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
