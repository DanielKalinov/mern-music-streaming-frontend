import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Artists = () => {
	const [artists, setArtists] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:5000/artists').then((res) => {
			setArtists(res.data);
		});
	}, []);

	return (
		<>
			<h1 className='text-center mt-4 mb-8'>Artists</h1>
			<div className='grid grid-cols-2 gap-4 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8'>
				{artists.map(
					(item: { _id: string; name: string; artistImageUrl: string }) => (
						<div className='aspect-square px-2 pt-2 bg-primary rounded-lg border solid border-slate-700 shadow-xl'>
							<img
								src={item.artistImageUrl}
								key={item._id}
								className='object-cover w-full h-full rounded-lg shadow-md'
							/>
							<span className='block py-3 text-center text-sm font-semibold'>
								{item.name}
							</span>
						</div>
					)
				)}
				{artists.map(
					(item: { _id: string; name: string; artistImageUrl: string }) => (
						<div className='aspect-square px-2 pt-2 bg-primary rounded-lg border solid border-slate-700 shadow-xl'>
							<img
								src='https://images.pexels.com/photos/13037579/pexels-photo-13037579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
								key={item._id}
								className='object-cover w-full h-full rounded-lg shadow-md'
							/>
							<span className='block py-3 text-center text-sm font-semibold'>
								Lorem Ipsum
							</span>
						</div>
					)
				)}
				{artists.map(
					(item: { _id: string; name: string; artistImageUrl: string }) => (
						<div className='aspect-square px-2 pt-2 bg-primary rounded-lg border solid border-slate-700 shadow-xl'>
							<img
								src='https://images.pexels.com/photos/18704271/pexels-photo-18704271/free-photo-of-man-in-orange-jacket-under-umbrella-by-lake.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
								key={item._id}
								className='object-cover w-full h-full rounded-lg shadow-md'
							/>
							<span className='block py-3 text-center text-sm font-semibold'>
								Lauge
							</span>
						</div>
					)
				)}
				{artists.map(
					(item: { _id: string; name: string; artistImageUrl: string }) => (
						<div className='aspect-square px-2 pt-2 bg-primary rounded-lg border solid border-slate-700 shadow-xl'>
							<img
								src='https://images.pexels.com/photos/19078080/pexels-photo-19078080/free-photo-of-young-man-with-umbrella-standing-in-the-rain-on-the-lake-pier.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
								key={item._id}
								className='object-cover w-full h-full rounded-lg shadow-md'
							/>
							<span className='block py-3 text-center text-sm font-semibold'>
								Dolor Sit
							</span>
						</div>
					)
				)}
			</div>
		</>
	);
};

export default Artists;
