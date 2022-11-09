import React from 'react';
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

			<Slider
				value={percent}
				size='small'
				aria-label='Small'
				onChangeCommitted={(e, value) => {
					audio.current.currentTime = (value / 100) * audio.current.duration;
				}}
			/>
		</div>
	);
};

export default AudioControlsPanel;
