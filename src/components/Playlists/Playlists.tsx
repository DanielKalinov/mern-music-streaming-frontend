import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Playlist } from '../../types/Playlist';
import Image from '../Image';

const Playlists = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get<Playlist[]>('http://localhost:5000/playlists').then((res) => {
      setPlaylists(res.data);
    });
  }, []);

  return (
    <>
      <h1 className='w-full my-8'>Playlists</h1>
      <ul className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
        {playlists
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(({ _id, imageUrl, name }) => (
            <li
              key={_id}
              onClick={() => navigate(`/playlists/${_id}`)}
              className='h-[150px] relative rounded-lg overflow-hidden border border-solid border-secondary shadow-card group cursor-pointer lg:h-[200px]'
            >
              <Image
                src={imageUrl}
                fullWidth
                classes='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square transition-transform duration-300 disablemobilehover:group-hover:scale-110'
              />
              <span className='absolute left-0 bottom-0 w-full p-4 bg-gradient-to-b from-transparent to-black text-xl font-semibold'>
                {name}
              </span>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Playlists;
