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
	playlistInfo,
}: {
	playlist: Track[];
	playlistInfo: {
		type: 'album' | 'artist';
		name: string;
	};
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
							type: playlistInfo.type,
							name: playlistInfo.name,
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
	);
};

export default PlaylistControls;
