import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setRepeatCurrentTrack,
	setShuffleList,
	skipTrack,
	togglePlaying,
} from '../../features/audioPlayerSlice';
import TrackInfo from '../TrackInfo/TrackInfo';
import QueueInfo from '../QueueInfo/QueueInfo';
import AudioPlayerState from '../../types/AudioPlayerState';
import IconButton from '@mui/material/IconButton';
import {
	PlayArrow,
	Pause,
	SkipNext,
	SkipPrevious,
	FormatListBulleted,
	Repeat,
	Shuffle,
} from '@mui/icons-material';
import Image from '../Image';
import artistNames from '../../utils/artistName';
import AudioSlider from '../AudioSlider';

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
		shuffleList,
		repeatCurrentTrack,
	} = audioPlayer;

	const { track } = currentTrackInfo;
	const title = track?.title;
	const artist = track?.artist;

	const dispatch = useDispatch();

	const staticProgressBarRef = useRef<HTMLDivElement>(null);
	const spanRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (window.innerWidth < 1024) {
			setRangeInputValue(audioProgressValue);

			const percent = (audioProgressValue / duration) * 100;

			if (staticProgressBarRef.current) {
				staticProgressBarRef.current.style.width = `${percent}%`;
			}
		}
	}, [audioProgressValue]);

	useEffect(() => {
		if (Object.keys(currentTrackInfo).length > 0 && spanRef.current) {
			spanRef.current.style.right = '0px';
			spanRef.current.style.transition = 'none';

			spanRef.current.scrollWidth !== spanRef.current.clientWidth &&
				textSlideAnim();
		}
	}, [currentTrackInfo]);

	function textSlideAnim() {
		let direction = 'left';

		changeTextPosition();

		spanRef.current!.ontransitionend = () => {
			direction = direction === 'left' ? 'right' : 'left';
			changeTextPosition();
		};

		function changeTextPosition() {
			spanRef.current!.style.transition = 'all 5s linear';
			spanRef.current!.style.right =
				direction === 'left'
					? spanRef.current!.scrollWidth - spanRef.current!.clientWidth + 'px'
					: '0px';
		}
	}

	return (
		<>
			<div
				className={`${
					Object.keys(currentTrackInfo).length > 0
						? 'translate-y-0'
						: 'translate-y-full'
				} flex fixed bottom-0 left-0 w-full p-2 transition-all duration-100 ease-in-out z-40`}>
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
						}}>
						<div className='shrink-0 w-[50px] h-[50px] lg:w-[70px] lg:h-[70px] relative'>
							<Image
								src={currentTrackInfo.track?.album?.albumImageUrl}
								height={70}
								width={70}
								classes='rounded-md shadow-card'
							/>
						</div>
						<div className='text-sm ml-2 overflow-hidden whitespace-nowrap text-overflow-fadeout lg:text-base'>
							<span
								ref={spanRef}
								className='relative right-0 whitespace-nowrap block font-bold !delay-[2s]'>
								{title}
							</span>
							<span className='block text-inactive'>{artistNames(artist)}</span>
						</div>
					</div>
					<div className='flex flex-col items-center justify-between h-full lg:basis-1/2 '>
						<div className='flex justify-center ml-4 gap-x-2 lg:ml-0 lg:mb-2 lg:gap-x-4'>
							<IconButton
								className='!hidden lg:!flex'
								onClick={() => dispatch(setShuffleList())}>
								<Shuffle className={`${shuffleList ? 'text-accent' : ''}`} />
							</IconButton>
							<IconButton
								disabled={currentTrackPosition == 0}
								onClick={(e) => {
									e.stopPropagation();

									dispatch(skipTrack('prev'));
								}}>
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
								}}>
								{isPlaying ? <Pause /> : <PlayArrow />}
							</IconButton>
							<IconButton
								disabled={currentTrackPosition + 1 == queue.length}
								onClick={(e) => {
									e.stopPropagation();

									dispatch(skipTrack('next'));
								}}>
								<SkipNext />
							</IconButton>
							<IconButton
								className='!hidden lg:!flex'
								onClick={() => dispatch(setRepeatCurrentTrack())}>
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
