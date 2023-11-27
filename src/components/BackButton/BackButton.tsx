import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = ({ url, text }: { url: string; text: string }) => {
	return (
		<div className='fixed top-0 left-0 px-4 w-full z-20 transition-colors duration-300'>
			<Link to={url}>
				<IconButton edge='start'>
					<ArrowBackIcon fontSize='large' />
				</IconButton>
			</Link>
			<span className='opacity-0 transition-all duration-300'>{text}</span>
		</div>
	);
};

export default BackButton;
