import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { skipTrack, togglePlaying } from '../../features/audioPlayerSlice';
import TrackInfo from '../TrackInfo/TrackInfo';
import QueueInfo from '../QueueInfo/QueueInfo';
import AudioPlayerState from '../../types/AudioPlayerState';
import IconButton from '@mui/material/IconButton';
import { PlayArrow, Pause, SkipNext, SkipPrevious } from '@mui/icons-material';
import Image from '../Image';

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
	} = audioPlayer;

	const dispatch = useDispatch();

	const staticProgressBarRef = useRef<HTMLDivElement>(null);

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

	return (
		<>
			<div
				className={`${
					Object.keys(currentTrackInfo).length > 0
						? 'translate-y-0'
						: 'translate-y-full'
				} fixed bottom-0 left-0 px-2 pb-2 w-full transition-all duration-300 ease-in-out z-20`}>
				<div className='flex flex-col max-w-lg m-auto items-center card !shadow-audio-panel overflow-hidden'>
					<div
						className='relative flex items-center justify-between w-full'
						onClick={() => setShowTrackInfo(true)}>
						<div className='flex items-center'>
							<div className='p-2'>
								<div className='w-[40px] h-[40px] relative'>
									{queue.map(
										(item, index) =>
											currentTrackPosition === index && (
												<Image
													key={index}
													src={item.album?.albumImageUrl}
													height={40}
													width={40}
													classes='rounded-md shadow-md'
												/>
											)
									)}
								</div>
							</div>

							<div>
								<span className='block text-sm font-bold'>
									{currentTrackInfo.title}
								</span>
								<span className='block text-sm text-inactive'>
									{currentTrackInfo.artist?.[0].name}
								</span>
							</div>
						</div>
						<div className='flex mr-2'>
							<IconButton
								disabled={currentTrackPosition == 0}
								onClick={(e) => {
									e.stopPropagation();

									dispatch(skipTrack('prev'));
								}}
								className='disabled:opacity-30'>
								<SkipPrevious className='font-color' />
							</IconButton>
							<IconButton
								onClick={(e) => {
									e.stopPropagation();

									if (isPlaying) {
										dispatch(togglePlaying(false));
									} else {
										dispatch(togglePlaying(true));
									}
								}}
								className='disabled:opacity-30'>
								{isPlaying ? (
									<Pause className='font-color' />
								) : (
									<PlayArrow className='font-color' />
								)}
							</IconButton>
							<IconButton
								disabled={currentTrackPosition + 1 == queue.length}
								onClick={(e) => {
									e.stopPropagation();

									dispatch(skipTrack('next'));
								}}
								className='disabled:opacity-30'>
								<SkipNext className='font-color' />
							</IconButton>
						</div>
					</div>
					<div className='px-2 !w-full !h-full'>
						<div className='h-0.5 w-full bg-secondary'>
							<div
								ref={staticProgressBarRef}
								className='h-0.5 w-0 bg-accent transition-all duration-300 ease-in-out'
							/>
						</div>
					</div>
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

			<QueueInfo
				showQueueInfo={showQueueInfo}
				setShowQueueInfo={setShowQueueInfo}
			/>
		</>
	);
};

export default AudioControlsPanel;
