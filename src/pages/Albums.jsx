import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
				<Link key={item._id} to={`/albums/${item._id}`}>
					<img src={item.albumImageUrl} width={'100%'} height={'100%'} />
				</Link>
			))}
		</div>
	);
};

export default Albums;
