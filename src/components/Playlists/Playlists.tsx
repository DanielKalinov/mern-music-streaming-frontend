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
      <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {playlists
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(({ _id, imageUrl, name }) => (
            <li
              key={_id}
              className='relative rounded-lg overflow-hidden border border-solid border-secondary shadow-card group'
            >
              <Link to={`/playlists/${_id}`}>
                <Image
                  src={imageUrl}
                  fullWidth
                  classes='aspect-square transition-transform duration-300 disablemobilehover:group-hover:scale-110'
                />
                <span className='absolute left-0 bottom-0 w-full p-4 bg-gradient-to-b from-transparent to-black text-2xl font-semibold md:p-6'>
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
