import React from 'react';
import {
	setQueue,
	setCurrentTrackInfo,
	togglePlaying,
	setCurrentPlaylistInfo,
} from '../../features/audioPlayerSlice';
import { IconButton } from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import AudioPlayerState from '../../types/AudioPlayerState';
import Track from '../../types/Track';

const PlaylistControls = ({
	playlist,
	type,
}: {
	playlist: Track[];
	type: string;
}) => {
	const audioPlayer = useSelector(
		(state: AudioPlayerState) => state.audioPlayer
	);
	const { isPlaying, currentTrackInfo } = audioPlayer;

	const dispatch = useDispatch();

	const isInPlaylist = playlist.find(
		(item) => item._id == currentTrackInfo._id
	);

	return (
		<div className='flex w-full justify-end'>
			<IconButton
				className='rounded-full !bg-accent shadow-btn !text-primary !transition-transform active:scale-90'
				onClick={() => {
					if (!isInPlaylist) {
						const firstTrack = playlist[0];
						const { _id, audioUrl, artist, title, album } = firstTrack;

						dispatch(togglePlaying(true));
						dispatch(
							setCurrentTrackInfo({
								_id: _id,
								audioUrl: audioUrl,
								artist: artist,
								title: title,
								album: album,
							})
						);
						dispatch(setQueue(playlist));
						dispatch(
							setCurrentPlaylistInfo({
								type,
								name:
									type == 'album'
										? album.name
										: type == 'artist'
										? artist[0].name
										: '',
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
