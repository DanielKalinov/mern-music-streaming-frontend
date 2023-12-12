import React from 'react';
import {
	setQueue,
	setCurrentTrackInfo,
	togglePlaying,
	setCurrentPlaylistInfo,
} from '../../features/audioPlayerSlice';
import { IconButton } from '@mui/material';
import { FavoriteBorder, PlayArrow, Pause } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import AudioPlayerState from '../../types/AudioPlayerState';
import Track from '../../types/Track';

const PlaylistControls = ({ playlist }: { playlist: Track[] }) => {
	const audioPlayer = useSelector(
		(state: AudioPlayerState) => state.audioPlayer
	);
	const { isPlaying, currentTrackInfo } = audioPlayer;

	const dispatch = useDispatch();

	const isInPlaylist = playlist.find(
		(item) => item._id == currentTrackInfo._id
	);

	return (
		<div className='flex justify-between mb-2'>
			<IconButton edge='start'>
				<FavoriteBorder fontSize='large' />
			</IconButton>
			<IconButton
				className='rounded-full !border-2 !border-solid !transition-transform active:scale-90'
				onClick={() => {
					if (!isInPlaylist) {
						const firstTrack = playlist[0];

						dispatch(togglePlaying(true));
						dispatch(
							setCurrentTrackInfo({
								_id: firstTrack._id,
								audioUrl: firstTrack.audioUrl,
								artist: firstTrack.artist,
								title: firstTrack.title,
								album: firstTrack.album,
							})
						);
						dispatch(setQueue(playlist));
						dispatch(
							setCurrentPlaylistInfo({
								type: 'album',
								name: firstTrack.album?.name,
							})
						);
					} else if (isPlaying && isInPlaylist) {
						dispatch(togglePlaying(false));
					} else {
						dispatch(togglePlaying(true));
					}
				}}>
				{isPlaying && isInPlaylist ? (
					<Pause fontSize='large' />
				) : (
					<PlayArrow fontSize='large' />
				)}
			</IconButton>
		</div>
	);
};

export default PlaylistControls;
