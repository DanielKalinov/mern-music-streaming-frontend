import React from 'react';

const WaveAnimation = () => {
	return (
		<div className='flex justify-center items-center m-auto h-4 w-4 mr-2 space-x-1'>
			<div className='h-full w-0.5 bg-accent rounded-full strokeWave' />
			<div className='h-full w-0.5 bg-accent rounded-full strokeWave' />
			<div className='h-full w-0.5 bg-accent rounded-full strokeWave' />
		</div>
	);
};

export default WaveAnimation;
