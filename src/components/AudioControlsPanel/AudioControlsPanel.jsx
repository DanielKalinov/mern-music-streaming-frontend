import React from 'react';
import Slider from 'rc-slider';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import IconButton from '@mui/material/IconButton';
import PauseIcon from '@mui/icons-material/Pause';
import SliderMUI from '@mui/material/Slider';

const AudioControlsPanel = ({ audio, isPlaying, setIsPlaying }) => {
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

			{/* <Slider
				railStyle={{ backgroundColor: '#71717a', cursor: 'pointer' }}
				trackStyle={[{ backgroundColor: '#db2777', cursor: 'pointer' }]}
				handleStyle={[
					{
						backgroundColor: '#db2777',
						borderColor: '#db2777',
						cursor: 'pointer',
						boxShadow: 'none',
						opacity: 1,
					},
				]}
				onAfterChange={(value) => {
					audio.current.currentTime = (value / 100) * audio.current.duration;
				}}
			/> */}

			<SliderMUI
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
