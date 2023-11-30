import React, { useState } from 'react';

const Image = ({
	image,
	width,
	height,
	classes,
}: {
	image: { large: string; small: string };
	width: number;
	height: number;
	placeholder?: boolean;
	classes?: string;
}) => {
	const [loaded, setLoaded] = useState(false);

	return (
		<>
			<div className='relative'>
				<img
					className={
						classes +
						`${
							loaded ? ' opacity-1' : ' opacity-0'
						} transition-opacity duration-300`
					}
					width={width}
					height={height}
					src={image.large}
					onLoad={() => setLoaded(true)}
				/>

				<div
					className={`absolute top-0 left-0 h-full w-full bg-white/10 pb-[calc(${
						width > height
							? `${height}/${width}*100%`
							: `${width}/${height}*100%`
					} ${
						!loaded && 'animate-pulse'
					} rounded-lg transition-opacity duration-300 ${
						loaded ? 'opacity-0' : 'opacity-1'
					}`}
				/>
			</div>
		</>
	);
};

export default Image;
