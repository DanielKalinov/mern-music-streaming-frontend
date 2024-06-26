import {
  FormatListBulleted,
  Pause,
  PlayArrow,
  Repeat,
  Shuffle,
  SkipNext,
  SkipPrevious,
} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setRepeatCurrentTrack,
  shuffleList,
  skipTrack,
  togglePlaying,
} from '../../features/audioPlayerSlice';
import AudioPlayerState from '../../types/AudioPlayerState';
import artistNames from '../../utils/artistName';
import AudioSlider from '../AudioSlider';
import Image from '../Image';
import QueueInfo from '../QueueInfo/QueueInfo';
import TextSlideAnim from '../TextSlideAnim';
import TrackInfo from '../TrackInfo/TrackInfo';

const AudioControlsPanel = ({
  setSeekCurrentTime,
}: {
  setSeekCurrentTime: (value: number) => void;
}) => {
  const [showTrackInfo, setShowTrackInfo] = useState(false);
  const [showQueueInfo, setShowQueueInfo] = useState(false);
  const [rangeInputValue, setRangeInputValue] = useState(0);
  const audioPlayer = useSelector(
    (state: AudioPlayerState) => state.audioPlayer
  );
  const {
    isPlaying,
    duration,
    audioProgressValue,
    queue,
    currentTrackInfo,
    currentTrackPosition,
    isShuffled,
    repeatCurrentTrack,
  } = audioPlayer;

  const { track } = currentTrackInfo;
  const title = track?.title;
  const artist = track?.artist;

  const dispatch = useDispatch();

  const staticProgressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRangeInputValue(audioProgressValue);

    if (window.innerWidth < 1024) {
      const percent = (audioProgressValue / duration) * 100;

      if (staticProgressBarRef.current) {
        staticProgressBarRef.current.style.width = `${percent}%`;
      }
    }
  }, [audioProgressValue]);

  return (
    <>
      <div
        className={`${
          Object.keys(currentTrackInfo).length > 0
            ? 'translate-y-0'
            : 'translate-y-full'
        } flex fixed bottom-0 left-0 w-full p-2 transition-all duration-100 ease-in-out z-40`}
      >
        <div className='relative flex items-center justify-between max-w-lg w-full m-auto card lg:max-w-none lg:p-4 lg:justify-normal'>
          <div className='absolute bottom-0 left-0 w-full px-2 lg:hidden'>
            <div className='relative h-0.5 w-full bg-white/30 rounded-full'>
              <div
                ref={staticProgressBarRef}
                className='absolute top-0 left-0 h-0.5 w-0 bg-accent rounded-full transition-all'
              />
            </div>
          </div>
          <div
            className='flex items-center min-w-0 w-full p-2 lg:basis-1/4 lg:p-0'
            onClick={() => {
              if (window.innerWidth < 1024) {
                setShowTrackInfo(true);
                document.body.style.overflow = 'hidden';
              }
            }}
          >
            <div className='shrink-0 w-[50px] h-[50px] lg:w-[70px] lg:h-[70px] relative'>
              <Image
                src={currentTrackInfo.track?.album?.albumImageUrl}
                height={70}
                width={70}
                classes='rounded-md shadow-card'
              />
            </div>
            <div className='text-sm ml-2 overflow-hidden whitespace-nowrap text-overflow-fadeout lg:text-base'>
              <TextSlideAnim className='font-bold'>{title}</TextSlideAnim>
              <TextSlideAnim className='text-inactive'>
                {artistNames(artist)}
              </TextSlideAnim>
            </div>
          </div>
          <div className='flex flex-col items-center justify-between h-full lg:basis-1/2 '>
            <div className='flex justify-center ml-4 gap-x-2 lg:ml-0 lg:mb-2 lg:gap-x-4'>
              <IconButton
                className='!hidden lg:!flex'
                onClick={() => dispatch(shuffleList())}
              >
                <Shuffle className={`${isShuffled ? 'text-accent' : ''}`} />
              </IconButton>
              <IconButton
                disabled={currentTrackPosition === 0}
                onClick={(e) => {
                  e.stopPropagation();

                  dispatch(skipTrack('prev'));
                }}
              >
                <SkipPrevious />
              </IconButton>
              <IconButton
                className='rounded-full !transition-transform lg:active:scale-90 lg:!bg-white/10'
                onClick={(e) => {
                  e.stopPropagation();

                  if (isPlaying) {
                    dispatch(togglePlaying(false));
                  } else {
                    dispatch(togglePlaying(true));
                  }
                }}
              >
                {isPlaying ? <Pause /> : <PlayArrow />}
              </IconButton>
              <IconButton
                disabled={currentTrackPosition + 1 === queue.length}
                onClick={(e) => {
                  e.stopPropagation();

                  dispatch(skipTrack('next'));
                }}
              >
                <SkipNext />
              </IconButton>
              <IconButton
                className='!hidden lg:!flex'
                onClick={() => dispatch(setRepeatCurrentTrack())}
              >
                <Repeat
                  className={`${repeatCurrentTrack ? 'text-accent' : ''}`}
                />
              </IconButton>
            </div>
            <div className='hidden w-full justify-center lg:flex'>
              <AudioSlider
                rangeInputValue={rangeInputValue}
                setRangeInputValue={setRangeInputValue}
                setSeekCurrentTime={setSeekCurrentTime}
              />
            </div>
          </div>
          <div className='hidden basis-1/4 items-center !justify-end lg:flex'>
            <IconButton onClick={() => setShowQueueInfo(!showQueueInfo)}>
              <FormatListBulleted />
            </IconButton>
          </div>
        </div>
        <div className='lg:block'>
          <QueueInfo
            showQueueInfo={showQueueInfo}
            setShowQueueInfo={setShowQueueInfo}
          />
        </div>
      </div>

      <TrackInfo
        showTrackInfo={showTrackInfo}
        setShowTrackInfo={setShowTrackInfo}
        rangeInputValue={rangeInputValue}
        setRangeInputValue={setRangeInputValue}
        setSeekCurrentTime={setSeekCurrentTime}
        setShowQueueInfo={setShowQueueInfo}
      />

      <div className='lg:hidden'>
        <QueueInfo
          showQueueInfo={showQueueInfo}
          setShowQueueInfo={setShowQueueInfo}
        />
      </div>
    </>
  );
};

export default AudioControlsPanel;
