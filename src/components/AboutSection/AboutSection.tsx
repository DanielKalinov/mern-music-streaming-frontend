import React, { useRef, useState } from 'react';
import Image from '../Image';
import { IconButton } from '@mui/material';
import { ChevronRight, Close } from '@mui/icons-material';

const AboutSection = ({
	artistDetails: { name, about, artistAboutImageUrl },
}: {
	artistDetails: {
		name: string;
		about: string;
		artistAboutImageUrl: string;
	};
}) => {
	const [showAboutWindow, setShowAboutWindow] = useState(false);

	const AboutWindowRef = useRef<HTMLDivElement>(null);

	return (
		<>
			<div>
				<h2 className='mb-4'>About</h2>
				<div
					className='relative cursor-pointer'
					onClick={() => {
						AboutWindowRef.current?.scrollTo(0, 0);
						setShowAboutWindow(true);
						document.body.style.overflow = 'hidden';
					}}>
					<Image
						src={artistAboutImageUrl ?? ''}
						width={480}
						height={360}
						fullSize={true}
						classes='w-full rounded-lg shadow-card h-[360px]'
					/>
					<div className='absolute bottom-0 left-0 w-full flex items-center justify-between p-4 bg-gradient-to-b from-transparent to-black rounded-b-lg'>
						<p className='text-sm line-clamp-2'>{about}</p>
						<ChevronRight fontSize='large' />
					</div>
				</div>
			</div>
			<div
				className={`fixed top-0 left-0 w-full h-full z-30 transition-all duration-200 xs:bg-black/60 xs:backdrop-blur-2xl xs:px-8 xs:py-16 ${
					showAboutWindow ? 'opacity-1 visible' : 'opacity-0 invisible'
				}`}
				onClick={() => {
					setShowAboutWindow(false);
					document.body.style.overflow = 'auto';
				}}>
				<div
					ref={AboutWindowRef}
					className={`relative w-full h-full m-auto bg-background-dark overflow-hidden transition-transform duration-200 xs:rounded-lg sm:w-[600px] ${
						showAboutWindow ? 'scale-100' : 'scale-90'
					}`}
					onClick={(e) => e.stopPropagation()}>
					<div className='overflow-y-auto max-h-full'>
						<Image
							src={artistAboutImageUrl ?? ''}
							fullSize
							classes='m-auto shadow-card h-[240px] xs:h-[360px]'
						/>

						<div className='absolute h-full top-2 right-2'>
							<IconButton
								size='medium'
								disableRipple
								sx={{
									position: 'sticky',
									top: 8,
									right: 0,
									backgroundColor: 'rgba(0, 0, 0, 0.7)',
								}}
								onClick={() => {
									setShowAboutWindow(false);
									document.body.style.overflow = 'auto';
								}}>
								<Close />
							</IconButton>
						</div>
						<div className='p-4 pb-8'>
							<h1 className='mb-4'>{name}</h1>
							<p
								className='text-sm text-inactive '
								dangerouslySetInnerHTML={{
									__html: about ?? '',
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AboutSection;
