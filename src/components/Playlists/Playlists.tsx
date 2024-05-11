import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Playlist } from '../../types/Playlist';
import Image from '../Image';

const Playlists = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    axios.get<Playlist[]>('http://localhost:5000/playlists').then((res) => {
      setPlaylists(res.data);
    });
  }, []);

  return (
    <>
      <h1 className='w-full my-8'>Playlists</h1>
      <ul className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6'>
        {playlists.map(({ _id, imageUrl, name }) => (
          <li key={_id} className='relative rounded-lg overflow-hidden'>
            <Link to={`/playlists/${_id}`}>
              <Image src={imageUrl} classes='aspect-square shadow-card' />
              <span className='absolute left-0 bottom-0 w-full p-4 bg-gradient-to-b from-transparent to-black text-2xl font-semibold'>
                {name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Playlists;
