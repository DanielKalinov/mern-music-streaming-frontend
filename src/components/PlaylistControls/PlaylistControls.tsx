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
import accentColor from '../../utils/accentColor';

const PlaylistControls = ({
	playlist,
	playlistInfo,
	small,
}: {
	playlist: Track[];
	playlistInfo: {
		type: 'album' | 'artist';
		name: string;
	};
	small?: boolean;
}) => {
	const audioPlayer = useSelector(
		(state: AudioPlayerState) => state.audioPlayer
	);
	const { isPlaying, currentTrackInfo } = audioPlayer;

	const dispatch = useDispatch();

	const isInPlaylist = playlist.find(({ _id }) => _id == currentTrackInfo._id);

	const fontSize = small ? 'medium' : 'large';

	return (
		<IconButton
			className='rounded-full bg-gradient-to-b !from-accent !to-rose-600 !text-primary !transition-transform active:scale-90'
			style={{ boxShadow: `0 10px 40px ${accentColor}50` }}
			onClick={() => {
				// Set the first track of the playlist.
				if (!isInPlaylist) {
					dispatch(togglePlaying(true));
					dispatch(setCurrentTrackInfo(playlist[0]));
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
				<Pause className='text-slate-200' fontSize={fontSize} />
			) : (
				<PlayArrow className='text-slate-200' fontSize={fontSize} />
			)}
		</IconButton>
	);
};

export default PlaylistControls;
