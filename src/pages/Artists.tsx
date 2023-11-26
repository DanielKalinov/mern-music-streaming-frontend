import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Artists = () => {
	const [artists, setArtists] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:5000/artists').then((res) => {
			setArtists(res.data);
		});
	}, []);

	return (
		<>
			<h1 className='text-center mt-4 mb-8'>Pick an artist</h1>
			<div className='grid grid-cols-2 gap-4 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8'>
				{artists.map(
					(item: { _id: string; name: string; artistImageUrl: string }) => (
						<Link key={item._id} to={`/${item._id}`}>
							<div className='aspect-square px-2 pt-2 bg-primary rounded-lg border solid border-slate-700 shadow-xl'>
								<img
									src={item.artistImageUrl}
									className='object-cover w-full h-full rounded-lg shadow-md'
								/>
								<span className='block py-3 text-center text-sm font-semibold'>
									{item.name}
								</span>
							</div>
						</Link>
					)
				)}
			</div>
		</>
	);
};

export default Artists;
