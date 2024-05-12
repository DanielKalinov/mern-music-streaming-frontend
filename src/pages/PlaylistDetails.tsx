import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Image from '../components/Image';
import NavigationBar from '../components/NavigationBar';
import PageTransition from '../components/PageTransition';
import PlaylistControls from '../components/PlaylistControls';
import TrackList from '../components/TrackList';
import { Playlist } from '../types/Playlist';

const PlaylistDetails = () => {
  const [playlistDetails, setPlaylistDetails] = useState<Playlist>();

  const targetRef = useRef<HTMLDivElement>(null);

  const params = useParams();

  useEffect(() => {
    axios
      .get<Playlist>(`http://localhost:5000/playlists/${params.id}`)
      .then((res) => {
        setPlaylistDetails(res.data);
      });
  }, [params]);

  return playlistDetails ? (
    <PageTransition duration={0.2}>
      <NavigationBar
        text={playlistDetails.name}
        targetRef={targetRef}
        threshold={20}
      />
      <div className='-mx-4'>
        <div className='relative w-full pt-20 pb-8'>
          <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-background-dark backdrop-blur-3xl z-10' />
          <div
            className='absolute top-0 left-0 h-full w-full'
            style={{
              backgroundImage: `url(${playlistDetails.imageUrl})`,
              backgroundSize: 'cover',
            }}
          />
          <div className='relative max-w-2xl m-auto px-4 z-20 sm:flex sm:items-center sm:gap-6 sm:px-0'>
            <Image
              src={playlistDetails.imageUrl}
              height={250}
              width={250}
              classes='shrink-0 m-auto w-fit mb-6 shadow-card rounded-lg aspect-square sm:m-0'
            />
            <div
              ref={targetRef}
              className='relative flex items-center justify-between w-full transition-opacity duration-200'
            >
              <div>
                <h2 className='mb-1'>{playlistDetails.name}</h2>
                <span className='block text-inactive'>
                  {playlistDetails.tracks.length} tracks
                </span>
              </div>
              <PlaylistControls
                playlist={playlistDetails.tracks}
                playlistInfo={{ type: 'playlist', name: playlistDetails.name }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='max-w-2xl m-auto'>
        <p className='text-inactive mb-4'>{playlistDetails.description}</p>
        <TrackList
          tracks={playlistDetails.tracks}
          playlistInfo={{ type: 'playlist', name: playlistDetails.name }}
        />
      </div>
    </PageTransition>
  ) : null;
};

export default PlaylistDetails;
