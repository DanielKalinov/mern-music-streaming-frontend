import React, { useEffect, useState, useRef } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import IconButton from '@mui/material/IconButton';
import PauseIcon from '@mui/icons-material/Pause';
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
import { FastAverageColor } from 'fast-average-color';
import image from '../../test.png';

const AudioControlsPanel = ({
	audio,
	isPlaying,
	setIsPlaying,
	audioProgressValue,
	totalSeconds,
	setTotalSeconds,
}) => {
	const [fullscreenMode, setFullscreenMode] = useState(false);
	const [rangeInputValue, setRangeInputValue] = useState(0);
	const [seeking, setSeeking] = useState(false);
	const staticProgressBarRef = useRef();
	const imgRef = useRef();
	const [color, setColor] = useState('');

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

		const fac = new FastAverageColor();
		fac
			.getColorAsync(document.body.querySelector('img'))
			.then((color) => {
				setColor(color.hex);
			})
			.catch((e) => {
				console.log(e);
			});
	}, [fullscreenMode]);

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
		<>
			<div className='fixed bottom-0 w-full p-2'>
				<div className='flex flex-col items-center bg-primary/60 rounded-xl rounded-b-3xl backdrop-blur-md border solid border-primary'>
					<div
						className='flex items-center justify-between w-full p-2'
						onClick={() => setFullscreenMode(true)}>
						<div className='flex items-center'>
							<div className='h-8 w-8 mr-3 rounded-md bg-secondary bg-[url("test.png")] bg-center bg-cover' />
							<div>
								<span className='block text-sm font-bold'>A Song Title</span>
								<span className='block text-sm text-zinc-300'>Artist</span>
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
										setIsPlaying(true);
									} else {
										setIsPlaying(false);
									}
								}}>
								{isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
							</IconButton>
						</div>
					</div>
					<div className='h-0.5 w-full bg-secondary'>
						<div ref={staticProgressBarRef} className={`h-0.5 bg-accent`} />
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

			<div
				style={{
					background: `linear-gradient(${color}, #0f172a)`,
				}}
				className={`${fullscreenMode ? 'opacity-100' : 'opacity-0'} ${
					fullscreenMode ? 'translate-y-0' : 'translate-y-full'
				} fixed top-0 flex flex-col w-full h-full [transition:transform_300ms_ease-in-out,opacity_200ms_ease-in-out] z-10 [&>*]:mb-auto`}>
				<div>
					<div className='flex justify-between items-center'>
						<IconButton
							onClick={() => {
								setFullscreenMode(false);
								setColor(false);
							}}>
							<ExpandMoreRoundedIcon fontSize='large' />
						</IconButton>
						<IconButton>
							<MoreVertRoundedIcon />
						</IconButton>
					</div>
				</div>
				<div className='px-6'>
					<img
						ref={imgRef}
						src={image}
						width={'100%'}
						height={'100%'}
						className='shadow-lg rounded-lg'
					/>
				</div>
				<div className='px-6'>
					<div className='flex flex-col px-1'>
						<div className='flex justify-between items-center mt-4'>
							<div>
								<span className='block font-bold text-xl mb-1'>
									A Song Title
								</span>
								<span className='block text-zinc-300'>Artist</span>
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
									setTotalSeconds(
										(rangeInputValue / 100) * audio.current.duration
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
										backgroundColor: '#f472b6',
									},
								}}
							/>
						</div>
						<div className='flex justify-between'>
							<span className='text-xs -mt-3'>
								{formattedTime(totalSeconds)}
							</span>
							<span className='text-xs -mt-3'>
								{formattedTime(audio.current.duration)}
							</span>
						</div>
					</div>
					<div className='flex justify-evenly'>
						<IconButton>
							<ShuffleIcon />
						</IconButton>
						<IconButton>
							<SkipPreviousIcon />
						</IconButton>
						<IconButton
							className='!bg-white/10 rounded-full'
							onClick={(e) => {
								e.stopPropagation();

								if (audio.current.paused) {
									setIsPlaying(true);
								} else {
									setIsPlaying(false);
								}
							}}>
							{isPlaying ? (
								<PauseIcon fontSize='large' />
							) : (
								<PlayArrowIcon fontSize='large' />
							)}
						</IconButton>
						<IconButton>
							<SkipNextIcon />
						</IconButton>
						<IconButton>
							<RepeatIcon />
						</IconButton>
					</div>
				</div>
			</div>
		</>
	);
};

export default AudioControlsPanel;
