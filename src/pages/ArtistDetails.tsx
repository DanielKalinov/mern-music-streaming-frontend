import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import PageTransition from '../components/PageTransition';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, ButtonBase } from '@mui/material';
import Image from '../components/Image';
import { useSelector, useDispatch } from 'react-redux';
import AudioPlayerState from '../types/AudioPlayerState';
import {
	setQueue,
	setCurrentSongInfo,
	togglePlaying,
} from '../features/audioPlayerSlice';
import WaveAnimation from '../components/WaveAnimation';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

const ArtistDetails = () => {
	const [artistDetails, setArtistDetails] = useState<{
		name: string;
		artistImageUrl: string;
		artistBioImageUrl: string;
		bio: string;
		albums: {
			_id: string;
			name: string;
			albumImageUrl: string;
		}[];
		topTracks: {
			_id: string;
			title: string;
			name: string;
			audioUrl: string;
			album: { albumImageUrl: string };
		}[];
	}>();
	const targetRef = useRef(null);
	const [showBioWindow, setShowBioWindow] = useState(false);

	const bioWindowRef = useRef<HTMLDivElement>(null);

	const params = useParams();

	const currentSongInfo = useSelector(
		(state: AudioPlayerState) => state.audioPlayer.currentSongInfo
	);
	const isPlaying = useSelector(
		(state: AudioPlayerState) => state.audioPlayer.isPlaying
	);

	const dispatch = useDispatch();

	useEffect(() => {
		axios.get(`http://localhost:5000/artist/${params.id}`).then((res) => {
			setArtistDetails(res.data);
		});
	}, []);

	return (
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
						<Image
							src={artistDetails?.artistImageUrl ?? ''}
							width={640}
							height={480}
							classes='grayscale w-full sm:h-96 sm:grayscale-0'
						/>
						<div className='absolute top-0 left-0 h-full w-full bg-gradient-to-b from-accent/20 to-background-dark sm:backdrop-blur-3xl sm:from-transparent sm:to-background-dark' />
					</div>
				</div>
				<div className='pageContainer'>
					<div className='flex items-center'>
						<Image
							src={artistDetails?.artistImageUrl ?? ''}
							width={100}
							height={100}
							classes='object-cover h-[100px] w-[100px] rounded-full z-10 sm:h-[150px] sm:w-[150px] md:h-[200px] md:w-[200px]'
						/>
						<h1
							ref={targetRef}
							className='ml-4 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-lime-500 sm:text-4xl md:text-5xl lg:text-6xl'>
							{artistDetails?.name.toUpperCase()}
						</h1>
					</div>
					<div className='mt-8'>
						<h2 className='mb-4'>Top tracks</h2>
						<ul>
							{artistDetails?.topTracks.map((item, index) => (
								<li
									key={item._id}
									className={`flex ${
										item.title == currentSongInfo.title &&
										'bg-gradient-to-r from-white/5 to-transparent rounded-xl'
									}`}>
									<ButtonBase
										className='w-full text-left !rounded-xl'
										onClick={() => {
											if (item.audioUrl == currentSongInfo.audioUrl) {
												if (isPlaying) {
													dispatch(togglePlaying(false));
												} else {
													dispatch(togglePlaying(true));
												}
											} else {
												dispatch(
													setCurrentSongInfo({
														_id: item._id,
														title: item.title,
														album: { ...item.album, name: artistDetails.name },
														audioUrl: item.audioUrl,
													})
												);
												dispatch(togglePlaying(true));
												dispatch(setQueue(artistDetails.topTracks));
											}
										}}>
										<div className='w-full flex justify-between py-2 px-4'>
											<div
												className={`flex items-center transition-colors duration-200 ease-in-out font-medium ${
													item.title == currentSongInfo.title && 'text-accent'
												}`}>
												{item.title == currentSongInfo.title && isPlaying ? (
													<WaveAnimation />
												) : (
													<span className='w-4 text-center mr-2'>
														{index + 1}
													</span>
												)}
												<Image
													src={item.album.albumImageUrl}
													width={50}
													height={50}
													classes='h-11 shadow-md rounded-md mr-2'
												/>
												<div>
													<span className='block text-sm'>{item.title}</span>
													<span className='block text-sm text-inactive font-normal'>
														{artistDetails.name}
													</span>
												</div>
											</div>
										</div>
									</ButtonBase>

									<IconButton>
										<MoreVertRoundedIcon />
									</IconButton>
								</li>
							))}
						</ul>
					</div>
					<div className='mt-8'>
						<h2 className='mb-4'>Discography</h2>
						<div className='grid grid-cols-2 gap-4 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6'>
							{artistDetails?.albums.map((item) => (
								<Link key={item._id} to={`/${params.id}/albums/${item._id}`}>
									<div className='aspect-square px-2 pt-2 card'>
										<Image
											src={item.albumImageUrl}
											width={300}
											height={300}
											classes='shadow-md rounded-lg'
										/>
										<span className='block py-3 text-center text-sm font-semibold'>
											{item.name}
										</span>
									</div>
								</Link>
							))}
						</div>
					</div>
					<div className='max-w-[480px] mt-8'>
						<h2 className='mb-4'>Bio</h2>
						<div
							className='relative cursor-pointer'
							onClick={() => {
								bioWindowRef.current?.scrollTo(0, 0);
								setShowBioWindow(true);
								document.body.style.overflow = 'hidden';
							}}>
							<Image
								src={artistDetails?.artistBioImageUrl ?? ''}
								width={640}
								height={480}
								classes='w-full rounded-lg shadow-xl'
							/>
							<div className='absolute bottom-0 left-0 w-full flex items-center justify-between p-4 bg-gradient-to-b from-transparent to-black rounded-b-lg'>
								<p className='text-sm line-clamp-2'>{artistDetails?.bio}</p>
								<ChevronRightIcon fontSize='large' />
							</div>
						</div>
					</div>

					<div
						className={`fixed top-0 left-0 w-full h-full z-20 transition-all duration-200 xs:bg-black/60 xs:backdrop-blur-2xl xs:px-8 xs:py-16 ${
							showBioWindow ? 'opacity-1 visible' : 'opacity-0 invisible'
						}`}
						onClick={() => {
							setShowBioWindow(false);
							document.body.style.overflow = 'auto';
						}}>
						<div
							ref={bioWindowRef}
							className={`relative w-full h-full m-auto bg-background-dark overflow-y-scroll transition-transform duration-200 xs:rounded-lg sm:w-[600px] ${
								showBioWindow ? 'scale-100' : 'scale-90'
							}`}
							onClick={(e) => e.stopPropagation()}>
							<Image
								src={artistDetails?.artistBioImageUrl ?? ''}
								width={640}
								height={480}
								classes='m-auto'
							/>

							<div className='absolute h-full top-2 right-2'>
								<IconButton
									size='medium'
									disableRipple
									sx={{
										position: 'sticky',
										top: 8,
										right: 0,
										backgroundColor: 'rgba(0, 0, 0, 0.5)',
									}}
									onClick={() => {
										setShowBioWindow(false);
										document.body.style.overflow = 'auto';
									}}>
									<CloseIcon />
								</IconButton>
							</div>
							<div className='px-4 pt-4 pb-40'>
								<h1 className='mb-4'>{artistDetails?.name}</h1>
								<p
									className='text-sm text-inactive '
									dangerouslySetInnerHTML={{ __html: artistDetails?.bio ?? '' }}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</PageTransition>
	);
};

export default ArtistDetails;
