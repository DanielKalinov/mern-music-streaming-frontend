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
import Slider from '@mui/material/Slider';
import { FastAverageColor } from 'fast-average-color';
import image from '../../test.png';

const AudioControlsPanel = ({
	audio,
	isPlaying,
	setIsPlaying,
	audioProgressValue,
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

	return (
		<>
			<div className='fixed bottom-0 w-full flex flex-col items-center bg-primary rounded-2xl rounded-b-none'>
				<div
					className='flex items-center justify-between w-full p-3'
					onClick={() => setFullscreenMode(true)}>
					<div className='flex items-center'>
						<div className='h-8 w-8 mr-3 rounded-md bg-secondary' />
						<span>Song Title</span>
					</div>
					<IconButton
						className='!text-white'
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
				<div className='h-0.5 w-full bg-secondary'>
					<div ref={staticProgressBarRef} className={`h-0.5 bg-accent`} />
				</div>
				<div className='flex justify-evenly w-full p-1'>
					<IconButton className='!text-accent'>
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

			<div
				style={{
					background: `linear-gradient(${color}, #262626)`,
				}}
				className={`${fullscreenMode ? 'opacity-100' : 'opacity-0'} ${
					fullscreenMode ? 'translate-y-0' : 'translate-y-full'
				} fixed top-0 w-full h-full [transition:transform_300ms_ease-in-out,opacity_200ms_ease-in-out] z-10`}>
				<div className='flex justify-between items-center'>
					<IconButton
						onClick={() => {
							setFullscreenMode(false);
							setColor(false);
						}}>
						<ExpandMoreRoundedIcon fontSize='large' className='!text-white' />
					</IconButton>
					<IconButton>
						<MoreVertRoundedIcon className='!text-white' />
					</IconButton>
				</div>
				<div className='px-6'>
					<img
						ref={imgRef}
						src={image}
						width={'100%'}
						height={'100%'}
						className='shadow-lg rounded-lg'
					/>
					<div className='flex flex-col px-1'>
						<div className='mt-4'>
							<span className='block text-center font-bold text-xl mb-1'>
								A Song Title
							</span>
							<span className='block text-center text-zinc-300'>Artist</span>
						</div>
						<button
							className='flex w-full my-1'
							onMouseDown={() => setSeeking(true)}
							onPointerDown={() => setSeeking(true)}>
							<Slider
								value={rangeInputValue}
								size='small'
								aria-label='Small'
								onChange={(e, value) => {
									setRangeInputValue(value);
								}}
								onChangeCommitted={() => {
									// on mouse up, set the audio currentTime to percent converted to milliseconds
									audio.current.currentTime =
										(rangeInputValue / 100) * audio.current.duration;

									setSeeking(false);
								}}
							/>
						</button>
						<div className='flex justify-between'>
							<span className='text-xs -mt-3'>0:00</span>
							<span className='text-xs -mt-3'>3:21</span>
						</div>
					</div>
					<div className='flex justify-evenly'>
						<IconButton className='!text-white'>
							<ShuffleIcon />
						</IconButton>
						<IconButton className='!text-white'>
							<SkipPreviousIcon />
						</IconButton>
						<IconButton
							className='!text-white !bg-white/10 rounded-full'
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
						<IconButton className='!text-white'>
							<SkipNextIcon />
						</IconButton>
						<IconButton className='!text-white'>
							<RepeatIcon />
						</IconButton>
					</div>
				</div>
			</div>
		</>
	);
};

export default AudioControlsPanel;
