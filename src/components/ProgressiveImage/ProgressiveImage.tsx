import React, { useState } from 'react';

const ProgressiveImage = ({
	image,
	width,
	height,
	classes,
}: {
	image: { large: string; small: string };
	width?: number;
	height?: number;
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
					className={`absolute top-0 left-0 h-full w-full transition-opacity duration-300 ${
						loaded ? 'opacity-0' : 'opacity-1'
					}`}>
					<div className='relative'>
						<img
							className={`${classes}`}
							width={width}
							height={height}
							src={image.small}
						/>
						<div
							className={'absolute top-0 left-0 h-full w-full backdrop-blur-sm'}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProgressiveImage;
