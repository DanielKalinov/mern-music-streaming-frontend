import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Albums = () => {
	const [albumList, setAlbumList] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:5000/albums').then((res) => {
			setAlbumList(res.data);
		});
	}, []);

	return (
		<div>
			{albumList.map((item) => (
				<img
					key={item._id}
					src={item.albumImageUrl}
					width={'100%'}
					height={'100%'}
				/>
			))}
		</div>
	);
};

export default Albums;
