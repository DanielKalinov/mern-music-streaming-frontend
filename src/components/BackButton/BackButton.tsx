import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = ({
	url,
	text,
	targetRef,
	threshold,
}: {
	url: string;
	text: string;
	targetRef?: React.RefObject<HTMLDivElement>;
	threshold: number;
	background?: boolean;
}) => {
	const [containerVisible, setContainerVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (targetRef?.current) {
				// Distance to the top of the viewport
				const { top } = targetRef.current.getBoundingClientRect();

				if (top > threshold) {
					setContainerVisible(false);
				} else {
					setContainerVisible(true);
				}
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<div
			id='container'
			className={`fixed top-0 left-0 flex items-center w-full p-2 z-20 transition-colors duration-200 ${
				containerVisible
					? 'bg-primary/100 shadow-md'
					: 'bg-primary/0 backdrop-blur-0 shadow-none'
			}`}>
			<Link to={url}>
				<IconButton
					sx={{
						backgroundColor: `rgba(0, 0, 0, ${containerVisible ? 0 : 0.5})`,
					}}>
					<ArrowBackIcon />
				</IconButton>
			</Link>
			<span
				className={`transition-opacity duration-200 ${
					containerVisible ? 'opacity-1' : 'opacity-0'
				}`}>
				{text}
			</span>
		</div>
	);
};

export default BackButton;
