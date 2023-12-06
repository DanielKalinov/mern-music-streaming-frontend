import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import Image from '../components/Image';
import Artist from '../types/Artist';

const Artists = () => {
	const [artists, setArtists] = useState<Artist[]>([]);

	useEffect(() => {
		axios.get('http://localhost:5000/artists').then((res) => {
			setArtists(res.data);
		});
	}, []);

	return (
		<PageTransition duration={1}>
			<div>
				<h1 className='w-full text-center mt-4 mb-8'>Pick an artist</h1>
				<div className='grid grid-cols-2 gap-4 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8'>
					{artists.map(
						(item: { _id: string; name: string; artistImageUrl: string }) => (
							<Link key={item._id} to={`/${item._id}`}>
								<div className='px-1 pt-1 card hover:bg-secondary'>
									<div className='aspect-square'>
										<Image
											src={item.artistImageUrl}
											height={300}
											width={300}
											classes='h-full rounded-lg shadow-md'
										/>
									</div>
									<span className='block py-2 text-center text-sm font-semibold'>
										{item.name}
									</span>
								</div>
							</Link>
						)
					)}
				</div>
			</div>
		</PageTransition>
	);
};

export default Artists;
