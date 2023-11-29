import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { ButtonBase } from '@mui/material';
import PageTransition from '../components/PageTransition';

const ArtistDetails = () => {
	const [artistDetails, setArtistDetails] = useState<{
		name: string;
		artistImageUrl: string;
		bio: string;
		albums: {
			_id: string;
			name: string;
			albumImageUrl: string;
		}[];
	}>();
	const targetRef = useRef(null);
	const [readMore, setReadMore] = useState(false);
	const [loaded, setLoaded] = useState(false);

	const params = useParams();

	useEffect(() => {
		axios.get(`http://localhost:5000/artist/${params.id}`).then((res) => {
			setArtistDetails(res.data);
		});
	}, []);

	useEffect(() => {
		const img = new Image();
		img.onload = () => setLoaded(true);
		img.src = artistDetails?.artistImageUrl ?? '';
	}, [artistDetails]);

	return loaded ? (
		<PageTransition duration={0.2}>
			<div>
				<BackButton
					url='/'
					text={artistDetails?.name ?? ''}
					targetRef={targetRef}
					threshold={50}
				/>
				<div className='-mx-4'>
					<div className='relative'>
						<img
							src={artistDetails?.artistImageUrl}
							className='object-cover w-full h-72 grayscale'
						/>
						<div className='absolute top-0 left-0 h-full w-full bg-gradient-to-b from-accent/20 to-background-dark' />
					</div>
				</div>
				<div>
					<h1
						ref={targetRef}
						className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-green-500'>
						{artistDetails?.name}
					</h1>
					<div className='mt-8'>
						<h2 className='mb-4'>Discography</h2>
						<div className='grid grid-cols-2 gap-4 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8'>
							{artistDetails?.albums.map((item) => (
								<Link key={item._id} to={`/${params.id}/albums/${item._id}`}>
									<div className='aspect-square px-2 pt-2 card'>
										<img
											src={item.albumImageUrl}
											className='object-cover w-full h-full rounded-lg shadow-md'
										/>
										<span className='block py-3 text-center text-sm font-semibold'>
											{item.name}
										</span>
									</div>
								</Link>
							))}
						</div>
					</div>
					<div className='mt-8'>
						<h2 className='mb-4'>Bio</h2>
						<div className='card'>
							<img
								src={artistDetails?.artistImageUrl}
								className='w-full rounded-t-md border-b border-style'
							/>
							<ButtonBase
								className='!block !p-4 text-left'
								onClick={() => setReadMore(!readMore)}>
								<p className={`${!readMore && 'line-clamp-2'}`}>
									{artistDetails?.bio}
								</p>

								<span className='block text-inactive mt-2'>
									{readMore ? 'Read less' : 'Read more'}
								</span>
							</ButtonBase>
						</div>
					</div>
				</div>
			</div>
		</PageTransition>
	) : null;
};

export default ArtistDetails;
