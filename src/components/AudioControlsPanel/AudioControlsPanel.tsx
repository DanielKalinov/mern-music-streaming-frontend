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
		setRangeInputValue(audioProgressValue);

		const percent = (audioProgressValue / duration) * 100;

		if (staticProgressBarRef.current) {
			staticProgressBarRef.current.style.width = `${percent}%`;
		}
	}, [audioProgressValue]);

	useEffect(() => {
		showTrackInfo
			? (document.body.style.overflow = 'hidden')
			: (document.body.style.overflow = 'auto');
	}, [showTrackInfo]);

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
				} flex fixed bottom-0 left-0 w-full p-2 transition-all duration-100 ease-in-out z-40 lg:p-4`}>
				<div
					className='flex justify-between max-w-lg w-full p-2 m-auto card lg:max-w-none lg:p-4 lg:justify-normal'
					onClick={() => window.innerWidth < 1024 && setShowTrackInfo(true)}>
					<div className='flex items-center min-w-0 lg:basis-1/4'>
						<div className='min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] lg:max-w-[60px] lg:min-w-[60px] lg:max-h-[60px] lg:min-h-[60px] relative'>
							<Image
								src={currentTrackInfo.track?.album?.albumImageUrl}
								height={60}
								width={60}
								classes='rounded-md shadow-card'
							/>
						</div>
						<div className='text-sm ml-2 overflow-hidden whitespace-nowrap lg:ml-4 lg:text-base'>
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
