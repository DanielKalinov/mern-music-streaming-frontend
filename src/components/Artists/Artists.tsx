import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Artist from '../../types/Artist';
import AudioPlayerState from '../../types/AudioPlayerState';
import Image from '../Image';
import PlaylistControls from '../PlaylistControls';

const Artists = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const { audioPlayer } = useSelector((state: AudioPlayerState) => state);
  const { currentPlaylistInfo } = audioPlayer;

  useEffect(() => {
    axios.get<Artist[]>('http://localhost:5000/artists').then((res) => {
      setArtists(res.data);
    });
  }, []);

  return (
    <>
      <h1 className='w-full my-8'>Artists</h1>
      <ul className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6'>
        {artists
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(({ _id, name, artistImageUrl, tracks }: Artist) => (
            <li key={_id} className='relative group'>
              <Link to={`/artist/${_id}`}>
                <div className='p-4 rounded-lg transition-all duration-300 ease-in-out group disablemobilehover:group-hover:bg-primary disablemobilehover:group-hover:shadow-card'>
                  <div className='transition-all duration-300 ease-in-out disablemobilehover:group-hover:p-2'>
                    <Image
                      src={artistImageUrl}
                      fullWidth={true}
                      classes='aspect-square rounded-full shadow-card'
                    />
                  </div>
                  <span
                    className={`mt-4 block text-center text-sm font-semibold truncate sm:text-base md:text-lg ${
                      currentPlaylistInfo.name === name ? 'text-accent' : ''
                    }`}
                  >
                    {name}
                  </span>
                </div>
              </Link>
              <div
                className={`hidden absolute bottom-16 right-8 transition-all duration-300 disablemobilehover:group-hover:visible disablemobilehover:group-hover:opacity-100 lg:block ${
                  currentPlaylistInfo.name === name
                    ? 'visible opacity-100'
                    : 'invisible opacity-0'
                }`}
              >
                <PlaylistControls
                  playlist={tracks}
                  playlistInfo={{ type: 'artist', name: name }}
                />
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Artists;
