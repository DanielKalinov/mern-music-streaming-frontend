import React, { useEffect, useState, useRef } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import IconButton from '@mui/material/IconButton';
import PauseIcon from '@mui/icons-material/Pause';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
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
			<div className='fixed bottom-0 w-full flex flex-col items-center bg-primary rounded-2xl rounded-b-none z-10'>
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
				<div className='flex justify-evenly w-full p-3'>
					<IconButton className='!text-accent'>
						<HomeIcon />
					</IconButton>
					<IconButton className='!text-inactive'>
						<SearchIcon />
					</IconButton>
					<IconButton className='!text-inactive'>
						<LibraryMusicIcon />
					</IconButton>
				</div>
				{/* <button
					className='flex w-full'
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
				</button> */}
			</div>

			<div
				style={{
					background: `linear-gradient(${color}, #262626)`,
				}}
				className={`${fullscreenMode ? 'opacity-100' : 'opacity-0'} ${
					fullscreenMode ? 'translate-y-0' : 'translate-y-full'
				} fixed top-0 w-full h-full p-3 [transition:transform_300ms_ease-in-out,opacity_200ms_ease-in-out] z-10`}>
				<div>
					<IconButton
						onClick={() => {
							setFullscreenMode(false);
							setColor(false);
						}}>
						<ExpandMoreRoundedIcon fontSize='large' />
					</IconButton>
				</div>
				<img
					ref={imgRef}
					src={image}
					width={'100%'}
					height={'100%'}
					className='shadow-lg'
				/>
			</div>
		</>
	);
};

export default AudioControlsPanel;
