import React, { Dispatch, SetStateAction } from 'react';
import Slider from '@mui/material/Slider';
import {
	togglePlaying,
	setIsSeeking,
	setRepeatCurrentTrack,
	skipTrack,
	setShuffleList,
} from '../../features/audioPlayerSlice';
import { useDispatch, useSelector } from 'react-redux';
import AudioPlayerState from '../../types/AudioPlayerState';
import IconButton from '@mui/material/IconButton';
import {
	ExpandMoreRounded,
	FormatListBulleted,
	SkipNext,
	SkipPrevious,
	Shuffle,
	Repeat,
	FavoriteBorder,
	PlayArrow,
	Pause,
} from '@mui/icons-material';
import Image from '../Image';

const TrackInfo = (props: TrackInfoProps) => {
	const {
		showTrackInfo,
		setShowTrackInfo,
		setShowQueueInfo,
		rangeInputValue,
		setRangeInputValue,
		setSeekCurrentTime,
	} = props;

	const dispatch = useDispatch();

	const audioPlayer = useSelector(
		(state: AudioPlayerState) => state.audioPlayer
	);
	const {
		isPlaying,
		currentTrackInfo,
		currentTrackPosition,
		currentPlaylistInfo,
		queue,
		duration,
		repeatCurrentTrack,
		shuffleList,
	} = audioPlayer;

	const format = (val: number) => {
		const valString = val + '';
		if (valString.length < 2) {
			return '0' + valString;
		} else {
			return valString;
		}
	};

	const formattedTime = (val: any) => {
		const seconds = format(Math.trunc(val % 60));
		const minutes = Math.trunc((val / 60) as any);

		return `${minutes}:${seconds}`;
	};

	const carouselAnimation = (index: number) => {
		// This function adds a carousel effect on track change.

		switch (index - currentTrackPosition) {
			case 0:
				// Current track - move to center.
				return 'translate-x-0 opacity-100';
			case 1:
				// Next track - move to left.
				return 'translate-x-full scale-0 opacity-0';
			case -1:
				// Previous track - move to right.
				return '-translate-x-full scale-0 opacity-0';
			default:
				return '';
		}
	};

	return (
		<div
			className={`${
				showTrackInfo ? 'translate-y-0 opacity-1' : 'translate-y-full opacity-0'
			} z-30 fixed top-0 left-0 h-full w-full [transition:transform_0.3s_ease-in-out,opacity_0.2s_ease-in-out]`}>
			<div
				className='absolute top-0 h-full w-full transition-all duration-500 ease-in-out'
				style={{
					backgroundImage: `url(${currentTrackInfo.album?.albumImageUrl})`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			/>
			<div className='relative flex flex-col h-full w-full px-8 bg-black/70 backdrop-blur-3xl [&>*]:mb-auto'>
				<div className='flex justify-between items-center -mx-4'>
					<IconButton
						edge='start'
						onClick={() => {
							setShowTrackInfo(false);
						}}>
						<ExpandMoreRounded fontSize='large' />
					</IconButton>
					<div className='text-center text-xs'>
						<span className='block tracking-widest'>
							PLAYING FROM {currentPlaylistInfo.type?.toUpperCase()}
						</span>
						<span className='block font-bold'>{currentPlaylistInfo.name}</span>
					</div>
					<IconButton edge='end' onClick={() => setShowQueueInfo(true)}>
						<FormatListBulleted />
					</IconButton>
				</div>

				<div
					className={`${
						showTrackInfo
							? 'translate-y-0 opacity-1'
							: 'translate-y-full opacity-0'
					} [transition:transform_0.4s_ease-in-out,opacity_0.7s_ease-in-out]`}>
					<div className='relative h-80'>
						{queue.map(
							(item, index) =>
								// Render only the current track, the next one, or the previous one.
								// This avoids attaching all items to the DOM.
								(index === currentTrackPosition ||
									index === currentTrackPosition + 1 ||
									index === currentTrackPosition - 1) && (
									<div
										key={item._id}
										className={`w-full absolute transition-all duration-200 ease-in-out ${carouselAnimation(
											index
										)}`}>
										<Image
											src={item.album?.albumImageUrl}
											width={300}
											height={300}
											classes='shadow-lg rounded-lg'
										/>
									</div>
								)
						)}
					</div>
				</div>

				<div>
					<div className='flex flex-col'>
						<div className='flex justify-between items-center mt-4'>
							<div>
								<span className='block font-bold text-xl'>
									{currentTrackInfo.title}
								</span>
								<span className='block text-inactive'>
									{currentTrackInfo.artist?.name}
								</span>
							</div>
							<IconButton edge='end'>
								<FavoriteBorder />
							</IconButton>
						</div>
						<div
							className='flex w-full my-1'
							onMouseDown={() => dispatch(setIsSeeking(true))}
							onPointerDown={() => dispatch(setIsSeeking(true))}>
							<Slider
								value={rangeInputValue}
								size='small'
								aria-label='Small'
								max={duration}
								onChange={(_, value) => {
									setRangeInputValue(value as number);
								}}
								onChangeCommitted={(_, value) => {
									dispatch(setIsSeeking(false));
									dispatch(togglePlaying(true));
									setSeekCurrentTime(value as number);
								}}
								sx={{
									'& .MuiSlider-thumb': {
										backgroundColor: '#ffffff',
										height: 11,
										width: 11,
										'&.Mui-active': {
											boxShadow: '0 0 0 7px rgba(255, 255, 255, 16%)',
											height: 14,
											width: 14,
										},
									},
									'& .MuiSlider-track': {
										backgroundColor: '#fde047',
										height: '4px',
									},
									'& .MuiSlider-rail': {
										height: '4px',
									},
								}}
							/>
						</div>
						<div className='flex justify-between'>
							<span className='text-xs -mt-3'>
								{formattedTime(rangeInputValue)}
							</span>
							<span className='text-xs -mt-3'>{formattedTime(duration)}</span>
						</div>
					</div>
					<div className='flex justify-evenly'>
						<IconButton onClick={() => dispatch(setShuffleList())}>
							<Shuffle className={`${shuffleList ? 'text-accent' : ''}`} />
						</IconButton>
						<IconButton
							disabled={currentTrackPosition == 0}
							onClick={() => {
								dispatch(skipTrack('prev'));
							}}
							size='large'>
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
							}}>
							{isPlaying ? (
								<Pause fontSize='large' />
							) : (
								<PlayArrow fontSize='large' />
							)}
						</IconButton>
						<IconButton
							disabled={currentTrackPosition + 1 == queue.length}
							onClick={() => {
								dispatch(skipTrack('next'));
							}}
							size='large'>
							<SkipNext fontSize='large' />
						</IconButton>
						<IconButton onClick={() => dispatch(setRepeatCurrentTrack())}>
							<Repeat
								className={`${repeatCurrentTrack ? 'text-accent' : ''}`}
							/>
						</IconButton>
					</div>
				</div>
			</div>
		</div>
	);
};

interface TrackInfoProps {
	showTrackInfo: boolean;
	rangeInputValue: number;
	setShowTrackInfo: Dispatch<SetStateAction<boolean>>;
	setShowQueueInfo: Dispatch<SetStateAction<boolean>>;
	setRangeInputValue: Dispatch<SetStateAction<number>>;
	setSeekCurrentTime: (value: number) => void;
}

export default TrackInfo;
