import React, { useEffect, useRef } from 'react';
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
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		const handleScroll = () => {
			if (targetRef?.current && textRef.current && containerRef.current) {
				// Distance to the top of the viewport
				const { top } = targetRef.current.getBoundingClientRect();

				if (top > threshold) {
					targetRef.current.style.opacity = '1';
					textRef.current.style.opacity = '0';
					containerRef.current.style.backgroundColor = 'rgba(30, 41, 59, 0)';
				} else {
					targetRef.current.style.opacity = '0';
					textRef.current.style.opacity = '1';
					containerRef.current.style.backgroundColor = 'rgba(30, 41, 59, 1)';
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
			ref={containerRef}
			id='container'
			className='fixed top-0 left-0 px-4 w-full z-20 transition-colors duration-300'>
			<Link to={url}>
				<IconButton edge='start'>
					<ArrowBackIcon fontSize='large' />
				</IconButton>
			</Link>
			<span ref={textRef} className='opacity-0 transition-all duration-300'>
				{text}
			</span>
		</div>
	);
};

export default BackButton;
