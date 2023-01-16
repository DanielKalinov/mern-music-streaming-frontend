import React, { useEffect, useState } from 'react';
import { FastAverageColor } from 'fast-average-color';
import Slider from '@mui/material/Slider';
import {
	togglePlaying,
	setIsSeeking,
	setRepeatCurrentSong,
	skipTrack,
} from '../../features/audioPlayerSlice';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';

const SongInfo = (props) => {
	const {
		showSongInfo,
		setShowSongInfo,
		setShowQueueInfo,
		rangeInputValue,
		setRangeInputValue,
		setSeekCurrentTime,
	} = props;

	const dispatch = useDispatch();

	const isPlaying = useSelector((state) => state.audioPlayer.isPlaying);
	const currentSongInfo = useSelector(
		(state) => state.audioPlayer.currentSongInfo
	);
	const queue = useSelector((state) => state.audioPlayer.queue);
	const duration = useSelector((state) => state.audioPlayer.duration);
	const repeatCurrentSong = useSelector(
		(state) => state.audioPlayer.repeatCurrentSong
	);

	const [averageColor, setAverageColor] = useState('');

	useEffect(() => {
		const albumImage = document.getElementById(`${currentSongInfo.position}`);

		if (albumImage) {
			const fac = new FastAverageColor();
			albumImage.crossOrigin = 'Anonymous';
			fac
				.getColorAsync(albumImage)
				.then((color) => {
					setAverageColor(color.hex);
				})
				.catch((e) => {
					console.log(e);
				});
		}
	}, [currentSongInfo]);

	const format = (val) => {
		const valString = val + '';
		if (valString.length < 2) {
			return '0' + valString;
		} else {
			return valString;
		}
	};

	const formattedTime = (val) => {
		const seconds = format(parseInt(val % 60));
		const minutes = parseInt(val / 60);

		return `${minutes}:${seconds}`;
	};

	return (
		<div
			className={`${
				showSongInfo
					? 'opacity-100 translate-y-0'
					: 'opacity-0 translate-y-full'
			} z-30 fixed top-0 h-full w-full [transition:transform_0.3s_ease-in-out,opacity_0.2s_ease-in-out]`}>
			<div
				className='absolute top-0 h-full w-full transition-all duration-500 ease-in-out'
				style={{ backgroundColor: averageColor }}
			/>
			<div className='relative flex flex-col h-full w-full bg-gradient-to-t from-background-dark [&>*]:mb-auto'>
				<div>
					<div className='flex justify-between items-center'>
						<IconButton
							onClick={() => {
								setShowSongInfo(false);
							}}>
							<ExpandMoreRoundedIcon fontSize='large' />
						</IconButton>
						<div className='text-center text-xs'>
							<span className='block tracking-widest'>PLAYING FROM ALBUM</span>
							<span className='block font-bold'>Album Name</span>
						</div>
						<IconButton onClick={() => setShowQueueInfo(true)}>
							<FormatListBulletedIcon />
						</IconButton>
					</div>
				</div>

				<div
					className='flex transition-transform duration-200 ease-in-out'
					style={{
						width: window.innerWidth * queue.length,
						transform: `translateX(-${
							window.innerWidth * currentSongInfo.position
						}px)`,
					}}>
					{queue.map((item, index) => {
						return (
							<div
								key={index}
								className='px-6 transition-transform duration-300 ease-in-out'
								style={{
									width: window.innerWidth,
									transform: `scale(${
										currentSongInfo.position == index ? '1' : '0.7'
									})`,
								}}>
								<img
									id={index}
									src={item.albumImageUrl}
									width={'100%'}
									height={'100%'}
									className='shadow-lg rounded-lg'
								/>
							</div>
						);
					})}
				</div>

				<div className='px-6'>
					<div className='flex flex-col px-1'>
						<div className='flex justify-between items-center mt-4'>
							<div>
								<span className='block font-bold text-xl'>
									{currentSongInfo.title}
								</span>
								<span className='block text-inactive'>
									{currentSongInfo.artist}
								</span>
							</div>
							<IconButton edge='end'>
								<FavoriteBorderIcon />
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
								onChange={(e, value) => {
									setRangeInputValue(value);
								}}
								onChangeCommitted={(e, value) => {
									dispatch(setIsSeeking(false));
									dispatch(togglePlaying(true));
									setSeekCurrentTime(value);
								}}
								sx={{
									'& .MuiSlider-thumb': {
										backgroundColor: '#ffffff',
										height: 14,
										width: 14,
										'&.Mui-active': {
											boxShadow: '0 0 0 7px rgba(255, 255, 255, 16%)',
											height: 16,
											width: 16,
										},
									},
									'& .MuiSlider-track': {
										backgroundColor: '#ec4899',
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
						<IconButton>
							<ShuffleIcon />
						</IconButton>
						<IconButton
							disabled={currentSongInfo.position == 0}
							onClick={() => {
								dispatch(skipTrack('prev'));
							}}
							size='large'>
							<SkipPreviousIcon fontSize='large' />
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
								<PauseIcon fontSize='large' />
							) : (
								<PlayArrowIcon fontSize='large' />
							)}
						</IconButton>
						<IconButton
							disabled={currentSongInfo.position + 1 == queue.length}
							onClick={() => {
								dispatch(skipTrack('next'));
							}}
							size='large'>
							<SkipNextIcon fontSize='large' />
						</IconButton>
						<IconButton onClick={() => dispatch(setRepeatCurrentSong())}>
							<RepeatIcon className={`${repeatCurrentSong && 'text-accent'}`} />
						</IconButton>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SongInfo;
