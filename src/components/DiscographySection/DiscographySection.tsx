import React from 'react';
import Artist from '../../types/Artist';
import PlaylistControls from '../PlaylistControls';
import { Link } from 'react-router-dom';
import Image from '../Image';

const DiscographySection = ({
	artistDetails,
	currentPlaylistInfo,
}: {
	artistDetails: Artist | null;
	currentPlaylistInfo: { name: string; type: string };
}) => {
	return (
		<div className='mt-8'>
			<h2 className='mb-4'>Discography</h2>
			<ul className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
				{artistDetails?.albums
					?.slice()
					.sort((a, b) => (a.year > b.year ? -1 : 1))
					.map(({ _id, name, albumImageUrl, tracks, year }) => (
						<li
							key={_id}
							className='relative rounded-lg shadow-card overflow-hidden group'>
							<div className='absolute top-0 left-0 h-full w-full backdrop-blur-0'>
								<div className='absolute top-0 left-0 h-full w-full bg-gradient-to-r from-primary/70 to-primary backdrop-blur-3xl backdrop-saturate-200 z-0' />
								<div
									className='h-full w-full'
									style={{
										backgroundImage: `url('${albumImageUrl}')`,
										backgroundPosition: 'center',
									}}
								/>
							</div>
							<Link
								to={`/albums/${_id}`}
								className='relative flex items-center p-2 transition-colors duration-150 group group-hover:bg-secondary'>
								<Image
									src={albumImageUrl}
									classes='shrink-0 h-[70px] w-[70px] rounded-tl-lg rounded-lg shadow-img lg:h-[100px] lg:w-[100px]'
								/>
								<div className='ml-4 overflow-hidden'>
									<span
										className={`truncate block text-sm font-semibold ${
											currentPlaylistInfo.name == name && 'text-accent'
										}`}>
										{name}
									</span>
									<span className='block text-sm text-inactive'>
										{year} • {tracks.length} tracks
									</span>
								</div>
							</Link>
							<div
								className={`opacity-0 translate-y-2 absolute bottom-2 left-2 duration-300 group-hover:opacity-100 group-hover:translate-y-0`}>
								<PlaylistControls
									playlist={tracks}
									playlistInfo={{ type: 'album', name }}
								/>
							</div>
						</li>
					))}
			</ul>
		</div>
	);
};

export default DiscographySection;
