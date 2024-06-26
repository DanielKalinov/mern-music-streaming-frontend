import { Pause, PlayArrow } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentPlaylistInfo,
  setCurrentTrackInfo,
  setQueue,
  togglePlaying,
} from '../../features/audioPlayerSlice';
import AudioPlayerState from '../../types/AudioPlayerState';
import Track from '../../types/Track';

const PlaylistControls = ({
  playlist,
  playlistInfo,
  small,
}: {
  playlist: Track[];
  playlistInfo: {
    type: 'album' | 'playlist' | 'artist';
    name: string;
  };
  small?: boolean;
}) => {
  const audioPlayer = useSelector(
    (state: AudioPlayerState) => state.audioPlayer
  );
  const { isPlaying, currentTrackInfo } = audioPlayer;

  const dispatch = useDispatch();

  const isInPlaylist = playlist.find(({ _id }) => _id === currentTrackInfo._id);

  const fontSize = small ? 'medium' : 'large';

  return (
    <IconButton
      className='rounded-full bg-gradient-to-b !from-accent !to-rose-600 !text-primary !transition-transform active:scale-90'
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
      }}
    >
      {isPlaying && isInPlaylist ? (
        <Pause className='text-slate-200' fontSize={fontSize} />
      ) : (
        <PlayArrow className='text-slate-200' fontSize={fontSize} />
      )}
    </IconButton>
  );
};

export default PlaylistControls;
