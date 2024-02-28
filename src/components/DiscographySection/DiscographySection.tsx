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
			<ul className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
				{artistDetails?.albums
					?.slice()
					.sort((a, b) => (a.year > b.year ? -1 : 1))
					.map(({ _id, name, albumImageUrl, tracks, year }) => (
						<li
							key={_id}
							className='relative rounded-lg shadow-card overflow-hidden group'>
							<div className='absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent to-primary backdrop-blur-3xl rounded-lg border border-solid border-secondary z-10' />
							<div
								className='absolute top-0 left-0 h-full w-full brightness-50 z-0 saturate-150'
								style={{
									backgroundImage: `url(${albumImageUrl})`,
									backgroundPosition: 'center',
								}}
							/>
							<Link
								to={`/albums/${_id}`}
								className='relative flex items-center p-2 transition-colors group disablemobilehover:group-hover:bg-secondary z-20'>
								<Image
									src={albumImageUrl}
									classes='shrink-0 h-[70px] w-[70px] rounded-md shadow-card lg:h-[100px] lg:w-[100px]'
								/>
								<div className='ml-4 overflow-hidden'>
									<span
										className={`truncate block text-sm font-semibold lg:text-base ${
											currentPlaylistInfo.name == name && 'text-accent'
										}`}>
										{name}
									</span>
									<span className='block text-sm text-inactive lg:text-base'>
										{year} • {tracks.length} tracks
									</span>
								</div>
							</Link>
							<div
								className={`hidden absolute bottom-4 left-4 duration-300 lg:block ${
									currentPlaylistInfo.name == name
										? 'visible opacity-100 translate-y-0'
										: 'invisible opacity-0 translate-y-2'
								} group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 z-30`}>
								<PlaylistControls
									playlist={tracks}
									playlistInfo={{ type: 'album', name }}
									small
								/>
							</div>
						</li>
					))}
			</ul>
		</div>
	);
};

export default DiscographySection;
