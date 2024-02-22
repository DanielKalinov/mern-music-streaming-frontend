//@ts-nocheck
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
		<ul className='relative space-y-2'>
			{tracks &&
				tracks.map((item: Track, index) => {
					const { track } = item;
					const title = track?.title;
					const artist = track?.artist;
					const albumImageUrl = track?.album.albumImageUrl;

					return (
						<li
							className={`flex items-center rounded-xl bg-gradient-to-r to-transparent transition-colors duration-150 ease-in-out disablemobilehover:hover:from-white/5 ${
								item._id == currentTrackInfo._id
									? 'text-accent !from-white/10'
									: ''
							}`}
							key={item._id}>
							<ButtonBase
								className='w-full text-left !p-2 !rounded-xl'
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
								<div className='flex items-center mx-2'>
									{item._id == currentTrackInfo._id && isPlaying ? (
										<WaveAnimation />
									) : (
										<span className='w-4 text-center'>{index + 1}</span>
									)}
								</div>
								{showAlbumImage && (
									<Image
										src={albumImageUrl}
										width={50}
										height={50}
										classes='shrink-0 shadow-card rounded-md mr-2'
									/>
								)}
								<div className='w-full overflow-hidden'>
									<span className='truncate block text-sm lg:text-base'>
										{title}
									</span>
									<span className='block text-sm lg:text-base text-inactive font-normal'>
										{artistNames(artist)}
									</span>
								</div>
							</ButtonBase>
						</li>
					);
				})}
		</ul>
	);
};

export default TrackList;
