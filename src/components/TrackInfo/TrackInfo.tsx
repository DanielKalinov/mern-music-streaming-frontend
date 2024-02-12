import React, { Dispatch, SetStateAction } from 'react';
import {
	togglePlaying,
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
import artistNames from '../../utils/artistName';
import AudioSlider from '../AudioSlider/AudioSlider';

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
		repeatCurrentTrack,
		shuffleList,
	} = audioPlayer;

	const { track } = currentTrackInfo;
	const title = track?.title;
	const artist = track?.artist;
	const albumImageUrl = track?.album?.albumImageUrl;

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
			} z-30 fixed top-0 left-0 h-full w-full [transition:transform_0.3s_ease-in-out,opacity_0.2s_ease-in-out] lg:hidden`}>
			<div
				className='absolute top-0 h-full w-full transition-all duration-500 ease-in-out'
				style={{
					backgroundImage: `url(${albumImageUrl})`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			/>
			<div className='relative flex flex-col h-full w-full px-8 bg-black/60 backdrop-blur-[128px]'>
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
					} relative flex flex-col items-center justify-center h-full [transition:transform_0.4s_ease-in-out,opacity_0.7s_ease-in-out]`}>
					{queue.map(
						(item, index) =>
							// Render only the current track, the next one, or the previous one.
							// This avoids attaching all items to the DOM.
							(index === currentTrackPosition ||
								index === currentTrackPosition + 1 ||
								index === currentTrackPosition - 1) && (
								<div
									key={item._id}
									className={`absolute transition-all duration-150 ease-in-out ${carouselAnimation(
										index
									)}`}>
									<Image
										src={item.track?.album?.albumImageUrl}
										classes='shadow-lg rounded-lg max-w-md'
									/>
								</div>
							)
					)}
				</div>

				<div className='max-w-md w-full mx-auto mb-16'>
					<div className='flex flex-col'>
						<div className='flex justify-between items-center mb-4'>
							<div>
								<span className='block font-bold text-xl'>{title}</span>
								<span className='block text-inactive'>
									{artistNames(artist)}
								</span>
							</div>
							<IconButton edge='end'>
								<FavoriteBorder />
							</IconButton>
						</div>
						<AudioSlider
							rangeInputValue={rangeInputValue}
							setRangeInputValue={setRangeInputValue}
							setSeekCurrentTime={setSeekCurrentTime}
						/>
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
