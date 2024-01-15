import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { ChevronRight, Close } from '@mui/icons-material';
import PageTransition from '../components/PageTransition';
import TopBar from '../components/TopBar';
import Image from '../components/Image';
import TrackList from '../components/TrackList';
import Artist from '../types/Artist';
import PlaylistControls from '../components/PlaylistControls';
import Track from '../types/Track';
import { useSelector } from 'react-redux';
import AudioPlayerState from '../types/AudioPlayerState';

const ArtistDetails = () => {
	const [artistDetails, setArtistDetails] = useState<Artist>();
	const [showBioWindow, setShowBioWindow] = useState(false);
	const { audioPlayer } = useSelector((state: AudioPlayerState) => state);
	const { currentPlaylistInfo } = audioPlayer;

	const targetRef = useRef(null);
	const bioWindowRef = useRef<HTMLDivElement>(null);

	const params = useParams();

	useEffect(() => {
		axios.get(`http://localhost:5000/artist/${params.id}`).then((res) => {
			setArtistDetails({
				...res.data,
				tracks: res.data.tracks.map(
					({ track, _id }: { track: Track; _id: string }) => ({
						...track,
						_id,
					})
				),
			});
		});
	}, []);

	return (
		<PageTransition duration={0.2}>
			<div>
				<TopBar
					url='/'
					text={artistDetails?.name ?? ''}
					targetRef={targetRef}
					threshold={50}
				/>
				<div className='-mx-4'>
					<div className='relative'>
						<Image
							src={artistDetails?.artistImageUrl ?? ''}
							noPlaceholder
							fullSize={true}
							classes='grayscale w-full h-64 sm:grayscale-0'
						/>
						<div className='absolute top-0 left-0 h-full w-full bg-gradient-to-b from-accent/30 to-background-dark sm:backdrop-blur-3xl sm:from-transparent sm:to-background-dark' />
					</div>
				</div>
				<div className='pageContainer'>
					<div className='flex items-center'>
						<Image
							src={artistDetails?.artistImageUrl ?? ''}
							width={200}
							height={200}
							classes='hidden aspect-square rounded-full z-10 shadow-img sm:flex'
						/>
						<h1
							ref={targetRef}
							className='w-full text-3xl font-bold sm:ml-4 sm:text-4xl md:text-5xl lg:text-6xl'>
							{artistDetails?.name?.toUpperCase()}
						</h1>
						<PlaylistControls
							playlist={artistDetails?.tracks ?? []}
							playlistInfo={{ type: 'artist', name: artistDetails?.name ?? '' }}
						/>
					</div>
					<div className='mt-8'>
						<h2 className='mb-4'>Top tracks</h2>
						<TrackList
							tracks={artistDetails?.tracks ?? []}
							showAlbumImage
							playlistInfo={{ type: 'artist', name: artistDetails?.name ?? '' }}
						/>
					</div>
					<div className='mt-8'>
						<h2 className='mb-4'>Discography</h2>
						<div className='md:hidden'>
							<ul className='grid grid-cols-1 gap-3 xs:grid-cols-2 sm:hidden'>
								{artistDetails?.albums
									?.slice()
									.sort((a, b) => (a.year > b.year ? -1 : 1))
									.map((item) => (
										<li key={item._id}>
											<Link
												to={`/albums/${item._id}`}
												className='flex items-center'>
												<Image
													src={item.albumImageUrl}
													width={70}
													height={70}
													classes='shrink-0 rounded-lg'
												/>
												<div className='ml-3 overflow-hidden'>
													<span
														className={`truncate block text-sm font-semibold ${
															currentPlaylistInfo.name == item.name &&
															'text-accent'
														}`}>
														{item.name}
													</span>
													<span className='block text-sm text-inactive'>
														{item.year} • {item.tracks.length} tracks
													</span>
												</div>
											</Link>
										</li>
									))}
							</ul>
						</div>
						<div className='hidden grid-cols-2 gap-4 sm:grid sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6'>
							{artistDetails?.albums?.map((item) => (
								<Link
									key={item._id}
									to={`/albums/${item._id}`}
									className='p-3 card hover:bg-secondary'>
									<Image
										src={item.albumImageUrl}
										classes='aspect-square shadow-lg rounded-lg'
									/>
									<div className='mt-3'>
										<span
											className={`block mb-1 text-sm font-semibold ${
												currentPlaylistInfo.name == item.name && 'text-accent'
											}`}>
											{item.name}
										</span>
										<span className='block text-sm text-inactive'>
											{item.year} • {item.tracks.length} tracks
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
								width={480}
								height={360}
								fullSize={true}
								classes='w-full rounded-lg shadow-img h-[360px]'
							/>
							<div className='absolute bottom-0 left-0 w-full flex items-center justify-between p-4 bg-gradient-to-b from-transparent to-black rounded-b-lg'>
								<p className='text-sm line-clamp-2'>{artistDetails?.bio}</p>
								<ChevronRight fontSize='large' />
							</div>
						</div>
					</div>

					<div
						className={`fixed top-0 left-0 w-full h-full z-30 transition-all duration-200 xs:bg-black/60 xs:backdrop-blur-2xl xs:px-8 xs:py-16 ${
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
								fullSize
								classes='m-auto shadow-img h-[240px] xs:h-[360px]'
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
										setShowBioWindow(false);
										document.body.style.overflow = 'auto';
									}}>
									<Close />
								</IconButton>
							</div>
							<div className='p-4 pb-8'>
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
