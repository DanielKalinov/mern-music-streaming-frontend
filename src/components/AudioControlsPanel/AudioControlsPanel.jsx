import Slider from 'rc-slider';
import React from 'react';

const AudioControlsPanel = ({ audio }) => {
	return (
		<div style={{ width: '300px' }}>
			<Slider
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
					audio.currentTime = (value / 100) * audio.duration;
				}}
			/>
		</div>
	);
};

export default AudioControlsPanel;
