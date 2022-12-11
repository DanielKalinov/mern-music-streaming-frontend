import React, { useEffect, useState } from 'react';
import { FastAverageColor } from 'fast-average-color';
import Slider from '@mui/material/Slider';
import {
	setSongInfo,
	togglePlaying,
	setIsSeeking,
} from '../../features/audioPlayerSlice';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
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
		rangeInputValue,
		setRangeInputValue,
		audio,
	} = props;

	const dispatch = useDispatch();

	const songInfo = useSelector((state) => state.audioPlayer.songInfo);
	const queue = useSelector((state) => state.audioPlayer.queue);
	const isPlaying = useSelector((state) => state.audioPlayer.isPlaying);
	const [averageColor, setAverageColor] = useState('');
	const [duration, setDuration] = useState(0);

	useEffect(() => {
		const albumImage = document.getElementById(`${songInfo.position}`);

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

		audio.current.onloadedmetadata = () => {
			setDuration(audio.current.duration);
		};
	}, [songInfo]);

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

	const skipTrack = (track) => {
		dispatch(
			setSongInfo({
				position: track.position,
				title: track.title,
				artist: track.artist,
				albumImageUrl: track.albumImageUrl,
				duration: track.duration,
			})
		);
		dispatch(togglePlaying(true));

		audio.current.src = track.audioUrl;
		audio.current.oncanplaythrough = () => {
			audio.current.play();
		};
	};

	return (
		<div
			className={`${showSongInfo ? 'opacity-100' : 'opacity-0'} ${
				showSongInfo ? 'translate-y-0' : 'translate-y-full'
			} z-30 fixed top-0 h-full w-full [transition:transform_300ms_ease-in-out,opacity_200ms_ease-in-out]`}>
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
						<IconButton>
							<MoreVertRoundedIcon />
						</IconButton>
					</div>
				</div>

				<div
					className='flex transition-all duration-200 ease-in-out'
					style={{
						width: window.innerWidth * queue.length,
						transform: `translateX(-${
							window.innerWidth * songInfo.position
						}px)`,
					}}>
					{queue.map((item, index) => {
						return (
							<div
								key={index}
								className='px-6 transition-all duration-300 ease-in-out'
								style={{
									width: window.innerWidth,
									transform: `scale(${
										songInfo.position == index ? '1' : '0.7'
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
								<span className='block font-bold text-xl mb-1'>
									{songInfo.title}
								</span>
								<span className='block text-zinc-300'>{songInfo.artist}</span>
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
									audio.current.currentTime = value;

									dispatch(setIsSeeking(false));
									dispatch(togglePlaying(true));
								}}
								sx={{
									'& .MuiSlider-thumb': {
										backgroundColor: '#ffffff',
										'&.Mui-active': {
											boxShadow: '0 0 0 7px rgba(255, 255, 255, 16%)',
											height: 14,
											width: 14,
										},
									},
									'& .MuiSlider-track': {
										backgroundColor: '#ec4899',
									},
								}}
							/>
						</div>
						<div className='flex justify-between'>
							<span className='text-xs -mt-3'>
								{formattedTime(rangeInputValue)}
							</span>
							<span className='text-xs -mt-3'>{songInfo.duration}</span>
						</div>
					</div>
					<div className='flex justify-evenly'>
						<IconButton>
							<ShuffleIcon />
						</IconButton>
						<IconButton
							disabled={!queue[songInfo.position - 1]}
							onClick={() => {
								skipTrack(queue[songInfo.position - 1]);
							}}
							size='large'>
							<SkipPreviousIcon
								fontSize='large'
								className={`${
									!queue[songInfo.position - 1] && 'text-disabled'
								}`}
							/>
						</IconButton>
						<IconButton
							size='large'
							className='!bg-white/10 rounded-full !transition-transform active:scale-90'
							onClick={(e) => {
								e.stopPropagation();

								if (audio.current.paused) {
									dispatch(togglePlaying(true));
									audio.current.play();
								} else {
									dispatch(togglePlaying(false));
									audio.current.pause();
								}
							}}>
							{isPlaying ? (
								<PauseIcon fontSize='large' />
							) : (
								<PlayArrowIcon fontSize='large' />
							)}
						</IconButton>
						<IconButton
							disabled={!queue[songInfo.position + 1]}
							onClick={() => {
								skipTrack(queue[songInfo.position + 1]);
							}}
							size='large'>
							<SkipNextIcon
								fontSize='large'
								className={`${
									!queue[songInfo.position + 1] && 'text-disabled'
								}`}
							/>
						</IconButton>
						<IconButton>
							<RepeatIcon />
						</IconButton>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SongInfo;
