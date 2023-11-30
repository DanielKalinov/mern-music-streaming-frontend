import React, { useState } from 'react';

const Image = ({
	src,
	width,
	height,
	classes,
}: {
	src: string;
	width: number | string;
	height: number | string;
	classes?: string;
}) => {
	const [loaded, setLoaded] = useState(false);

	return (
		<>
			<div className={`relative overflow-hidden ${classes}`}>
				<img
					className={`${
						loaded ? ' opacity-1' : ' opacity-0'
					} w-full h-full object-cover transition-opacity duration-300 ease-in-out`}
					width={width}
					height={height}
					src={src}
					onLoad={() => setLoaded(true)}
				/>

				<div
					className={`absolute top-0 left-0 h-full w-full bg-white/10 pb-[calc(${
						width > height
							? `${height}/${width}*100%`
							: `${width}/${height}*100%`
					} ${
						!loaded && 'animate-pulse'
					} rounded-lg transition-opacity duration-300 ease-in-out ${
						loaded ? 'opacity-0' : 'opacity-1'
					}`}
				/>
			</div>
		</>
	);
};

export default Image;
