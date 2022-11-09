import React, { useEffect, useState } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import IconButton from '@mui/material/IconButton';
import PauseIcon from '@mui/icons-material/Pause';
import Slider from '@mui/material/Slider';

const AudioControlsPanel = ({
	audio,
	isPlaying,
	setIsPlaying,
	percent,
	setPercent,
}) => {
	const [inputValue, setInputValue] = useState(0);
	const [seeking, setSeeking] = useState(false);

	useEffect(() => {
		!seeking && setInputValue(percent);
	}, [percent]);

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
				}}>
				<Slider
					value={inputValue}
					size='small'
					aria-label='Small'
					onChange={(e, value) => {
						setInputValue(value);
					}}
					onChangeCommitted={(e, value) => {
						audio.current.currentTime = (value / 100) * audio.current.duration;
						setSeeking(false);
					}}
				/>
			</button>
		</div>
	);
};

export default AudioControlsPanel;
