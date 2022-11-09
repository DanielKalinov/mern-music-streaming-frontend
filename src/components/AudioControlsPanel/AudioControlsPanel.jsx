import React, { useEffect, useState } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import IconButton from '@mui/material/IconButton';
import PauseIcon from '@mui/icons-material/Pause';
import Slider from '@mui/material/Slider';

const AudioControlsPanel = ({
	audio,
	isPlaying,
	setIsPlaying,
	percentProgress,
}) => {
	const [rangeInputValue, setRangeInputValue] = useState(0);
	const [seeking, setSeeking] = useState(false);

	useEffect(() => {
		// if not seeking, change range input value to one from ontimeupdate,
		// otherwise do nothing in order to avoid setting state from both places, which causes the handle to 'glitch' back and forth
		!seeking && setRangeInputValue(percentProgress);
	}, [percentProgress]);

	return (
		<div style={{ width: '300px' }}>
			<IconButton
				style={{ color: 'white' }}
				onClick={() => {
					if (audio.current.paused) {
						setIsPlaying(true);
					} else {
						setIsPlaying(false);
					}
				}}>
				{isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
			</IconButton>

			<button
				style={{ width: '100%' }}
				onMouseDown={() => {
					setSeeking(true);
				}}
				onMouseUp={() => {
					// on mouse up, set the audio currentTime to percentProgress converted to milliseconds
					audio.current.currentTime =
						(rangeInputValue / 100) * audio.current.duration;

					setSeeking(false);
				}}>
				<Slider
					value={rangeInputValue}
					size='small'
					aria-label='Small'
					onChange={(e, value) => {
						setRangeInputValue(value);
					}}
				/>
			</button>
		</div>
	);
};

export default AudioControlsPanel;
