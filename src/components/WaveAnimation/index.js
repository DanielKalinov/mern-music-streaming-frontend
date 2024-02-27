import React from 'react';

const WaveAnimation = () => {
	return (
		<div className='flex justify-center items-center h-4 w-4 space-x-1'>
			<div className='h-full w-0.5 bg-accent rounded-full strokeWave' />
			<div className='h-full w-0.5 bg-accent rounded-full strokeWave' />
			<div className='h-full w-0.5 bg-accent rounded-full strokeWave' />
		</div>
	);
};

export default WaveAnimation;
