import {
  ExpandMoreRounded,
  Pause,
  PlayArrow,
  SkipNext,
  SkipPrevious,
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { skipTrack, togglePlaying } from '../../features/audioPlayerSlice';
import AudioPlayerState from '../../types/AudioPlayerState';
import artistNames from '../../utils/artistName';
import DraggableList from '../DraggableList';
import Image from '../Image';
import WaveAnimation from '../WaveAnimation';

const QueueInfo = (props: QueueInfoProps) => {
  const { showQueueInfo, setShowQueueInfo } = props;

  const dispatch = useDispatch();

  const audioPlayer = useSelector(
    (state: AudioPlayerState) => state.audioPlayer
  );

  const {
    queue,
    isPlaying,
    currentTrackInfo,
    currentTrackPosition,
    currentPlaylistInfo,
  } = audioPlayer;

  const { track } = currentTrackInfo;
  const title = track?.title;
  const artist = track?.artist;
  const albumImageUrl = track?.album?.albumImageUrl;

  return (
    <>
      <div
        className={`${
          showQueueInfo ? 'opacity-100 visible' : 'opacity-0 invisible'
        } fixed top-0 left-0 w-full h-full bg-black/70 backdrop-blur-xl transition-opacity duration-200 ease-in-out z-40 lg:hidden`}
        onClick={(e) => {
          setShowQueueInfo(false);
          e.stopPropagation();
        }}
      />
      <div
        className={`${
          showQueueInfo
            ? 'opacity-100 translate-y-0 visible'
            : 'opacity-0 translate-y-full invisible'
        } fixed top-0 left-1/2 -translate-x-1/2 p-4 h-full max-w-lg w-full z-40 [transition:all_200ms_ease-in-out,opacity_100ms_ease-in-out] lg:top-auto lg:bottom-[120px] lg:left-auto lg:right-2 lg:translate-x-0 lg:h-[600px] lg:max-w-md lg:p-0`}
      >
        <div className={`h-full w-full card`}>
          <div className='h-full flex flex-col'>
            <div className='flex justify-between items-center px-4'>
              <IconButton
                edge='start'
                disableRipple
                onClick={() => {
                  setShowQueueInfo(false);
                }}
              >
                <ExpandMoreRounded fontSize='large' />
              </IconButton>
              <div className='absolute left-1/2 -translate-x-1/2 text-center text-xs lg:text-sm'>
                <span className='block tracking-widest'>
                  PLAYING FROM {currentPlaylistInfo.type?.toUpperCase()}
                </span>
                <span className='whitespace-nowrap block font-bold'>
                  {currentPlaylistInfo.name}
                </span>
              </div>
            </div>
            <div className='my-6 px-4'>
              <span className='block mb-2 font-bold lg:text-lg'>
                Now Playing
              </span>
              <div className='flex items-center w-full'>
                <div className='min-w-[40px] min-h-[40px] relative mr-2'>
                  <Image
                    src={albumImageUrl}
                    width={40}
                    height={40}
                    classes='rounded-md shadow-md'
                  />
                </div>
                <div className='overflow-hidden mr-4'>
                  <span className='block text-sm text-accent max-w-full truncate lg:text-base'>
                    {title}
                  </span>
                  <span className='block text-sm text-inactive lg:text-base'>
                    {artistNames(artist)}
                  </span>
                </div>
                {isPlaying && (
                  <div className='ml-auto'>
                    <WaveAnimation />
                  </div>
                )}
              </div>
            </div>
            {queue.length > 0 && queue[currentTrackPosition + 1] && (
              <>
                <div className='mb-2'>
                  <span className='font-bold px-4 truncate lg:text-lg'>
                    Next From: {currentPlaylistInfo.name}
                  </span>
                </div>
                {queue.length > 0 && (
                  <DraggableList
                    queue={queue}
                    currentTrackPosition={currentTrackPosition}
                  />
                )}
              </>
            )}
            <div className='mt-auto w-full lg:hidden'>
              <div className='flex justify-evenly my-4'>
                <IconButton
                  disabled={currentTrackPosition === 0}
                  onClick={() => {
                    dispatch(skipTrack('prev'));
                  }}
                  size='large'
                >
                  <SkipPrevious fontSize='large' />
                </IconButton>
                <IconButton
                  size='large'
                  className='!bg-white/10 rounded-full !transition-transform active:scale-90'
                  onClick={(e) => {
                    e.stopPropagation();

                    if (isPlaying) {
                      dispatch(togglePlaying(false));
                    } else {
                      dispatch(togglePlaying(true));
                    }
                  }}
                >
                  {isPlaying ? (
                    <Pause fontSize='large' />
                  ) : (
                    <PlayArrow fontSize='large' />
                  )}
                </IconButton>
                <IconButton
                  disabled={currentTrackPosition + 1 === queue.length}
                  onClick={() => {
                    dispatch(skipTrack('next'));
                  }}
                  size='large'
                >
                  <SkipNext fontSize='large' />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface QueueInfoProps {
  showQueueInfo: boolean;
  setShowQueueInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

export default QueueInfo;
