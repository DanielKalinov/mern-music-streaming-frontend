import React, { useEffect, useState } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import IconButton from '@mui/material/IconButton';
import PauseIcon from '@mui/icons-material/Pause';
import Slider from '@mui/material/Slider';

const AudioControlsPanel = ({
	audio,
	isPlaying,
	setIsPlaying,
	audioProgressValue,
}) => {
	const [rangeInputValue, setRangeInputValue] = useState(0);
	const [seeking, setSeeking] = useState(false);

	useEffect(() => {
		// if not seeking, change range input value to the current audio progress,
		// otherwise do nothing in order to avoid setting state from both places, which causes the handle to 'glitch' back and forth
		!seeking && setRangeInputValue(audioProgressValue);
	}, [audioProgressValue]);

	return (
		<div>
			<div className='absolute bottom-0 w-full p-3'>
				<div className='flex justify-between items-center p-3 bg-primary rounded-lg'>
					<div className='flex items-center'>
						<div className='h-8 w-8 mr-3 rounded-md bg-blue-200' />
						<span>Song Title</span>
					</div>
					<IconButton
						className='!text-white'
						size='small'
						onClick={() => {
							if (audio.current.paused) {
								setIsPlaying(true);
							} else {
								setIsPlaying(false);
							}
						}}>
						{isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
					</IconButton>
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
			</div>
		</div>
	);
};

export default AudioControlsPanel;
