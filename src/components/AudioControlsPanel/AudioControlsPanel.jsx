import React, { useEffect, useState, useRef } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import IconButton from '@mui/material/IconButton';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Slider from '@mui/material/Slider';
import { setSongInfo, togglePlaying } from '../../features/audioPlayerSlice';
import { useSelector } from 'react-redux';
import { FastAverageColor } from 'fast-average-color';

const AudioControlsPanel = ({
	isPlaying,
	audio,
	audioProgressValue,
	totalSeconds,
	setTotalSeconds,
	dispatch,
}) => {
	const [fullscreenMode, setFullscreenMode] = useState(false);
	const [rangeInputValue, setRangeInputValue] = useState(0);
	const [seeking, setSeeking] = useState(false);
	const songInfo = useSelector((state) => state.audioPlayer.songInfo);
	const queue = useSelector((state) => state.audioPlayer.queue);
	const [averageColor, setAverageColor] = useState('');

	const staticProgressBarRef = useRef();

	useEffect(() => {
		// if not seeking, change range input value to the current audio progress,
		// otherwise do nothing in order to avoid setting state from both places, which causes the handle to 'glitch' back and forth
		!seeking && setRangeInputValue(audioProgressValue);

		if (staticProgressBarRef.current) {
			staticProgressBarRef.current.style.width = `${audioProgressValue}%`;
		}
	}, [audioProgressValue]);

	useEffect(() => {
		fullscreenMode
			? (document.body.style.overflow = 'hidden')
			: (document.body.style.overflow = 'auto');
	}, [fullscreenMode]);

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
		audio.current.play();
	};

	return (
		<>
			<div
				className={`${
					audio.current.src
						? 'opacity-1 translate-y-0'
						: 'opacity-0 translate-y-full'
				} fixed bottom-0 w-full p-2 transition-all duration-300 ease-in-out`}>
				<div className='flex flex-col items-center bg-primary/60 rounded-xl rounded-b-3xl backdrop-blur-md border solid border-primary'>
					<div
						className='flex items-center justify-between w-full p-2'
						onClick={() => setFullscreenMode(true)}>
						<div className='flex items-center'>
							<img
								src={songInfo.albumImageUrl}
								width={40}
								height={40}
								className='rounded-lg mr-2'
							/>
							<div>
								<span className='block text-sm font-bold'>
									{songInfo.title}
								</span>
								<span className='block text-sm text-zinc-300'>
									{songInfo.artist}
								</span>
							</div>
						</div>
						<div>
							<IconButton size='small' onClick={(e) => e.stopPropagation()}>
								<FavoriteBorderIcon />
							</IconButton>
							<IconButton
								size='small'
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
								{isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
							</IconButton>
						</div>
					</div>
					<div className='h-0.5 w-full bg-secondary'>
						<div ref={staticProgressBarRef} className='h-0.5 bg-accent' />
					</div>
					<div className='flex justify-evenly w-full p-1 bg-primary rounded-b-3xl'>
						<IconButton>
							<HomeIcon fontSize='medium' />
						</IconButton>
						<IconButton className='!text-inactive'>
							<SearchIcon fontSize='medium' />
						</IconButton>
						<IconButton className='!text-inactive'>
							<LibraryMusicIcon fontSize='medium' />
						</IconButton>
					</div>
				</div>
			</div>

			{/* Fullscreen mode window */}
			<div
				className={`${fullscreenMode ? 'opacity-100' : 'opacity-0'} ${
					fullscreenMode ? 'translate-y-0' : 'translate-y-full'
				} fixed top-0 h-full w-full [transition:transform_300ms_ease-in-out,opacity_200ms_ease-in-out]`}>
				<div
					className='absolute top-0 h-full w-full transition-all duration-500 ease-in-out'
					style={{ backgroundColor: averageColor }}
				/>
				<div className='relative flex flex-col h-full w-full bg-gradient-to-t from-background-dark [&>*]:mb-auto'>
					<div>
						<div className='flex justify-between items-center'>
							<IconButton
								onClick={() => {
									setFullscreenMode(false);
								}}>
								<ExpandMoreRoundedIcon fontSize='large' />
							</IconButton>
							<IconButton>
								<MoreVertRoundedIcon />
							</IconButton>
						</div>
					</div>

					<div
						className='relative flex transition-all duration-200 ease-in-out'
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
								onMouseDown={() => setSeeking(true)}
								onPointerDown={() => setSeeking(true)}>
								<Slider
									value={rangeInputValue}
									size='small'
									aria-label='Small'
									onChange={(e, value) => {
										setRangeInputValue(value);

										// update timestamp on slider move
										dispatch(
											setTotalSeconds(
												(rangeInputValue / 100) * audio.current.duration
											)
										);
									}}
									onChangeCommitted={() => {
										// on mouse up, set the audio currentTime to percent converted to milliseconds
										audio.current.currentTime =
											(rangeInputValue / 100) * audio.current.duration;

										setSeeking(false);
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
									{formattedTime(totalSeconds)}
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
		</>
	);
};

export default AudioControlsPanel;
