import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AboutSection from '../components/AboutSection';
import DiscographySection from '../components/DiscographySection';
import Image from '../components/Image';
import NavigationBar from '../components/NavigationBar';
import PageTransition from '../components/PageTransition';
import PlaylistControls from '../components/PlaylistControls';
import TrackList from '../components/TrackList';
import Artist from '../types/Artist';
import AudioPlayerState from '../types/AudioPlayerState';

const ArtistDetails = () => {
  const [artistDetails, setArtistDetails] = useState<Artist>();

  const { audioPlayer } = useSelector((state: AudioPlayerState) => state);
  const { currentPlaylistInfo } = audioPlayer;

  const targetRef = useRef(null);

  const params = useParams();

  useEffect(() => {
    axios
      .get<Artist>(`http://localhost:5000/artist/${params.id}`)
      .then((res) => {
        setArtistDetails(res.data);
      });
  }, []);

  return (
    <PageTransition duration={0.2}>
      <div>
        <NavigationBar
          text={artistDetails?.name ?? ''}
          targetRef={targetRef}
          threshold={50}
        />
        <div className='-mx-4 sm:hidden'>
          <div className='relative'>
            <Image
              src={artistDetails?.artistImageUrl ?? ''}
              noPlaceholder
              fullWidth={true}
              classes='grayscale w-full h-64 sm:grayscale-0'
            />
            <div className='absolute top-0 left-0 h-full w-full bg-gradient-to-b from-accent/30 to-background-dark' />
          </div>
        </div>
        <div className='pageContainer'>
          <div className='relative flex items-center sm:mt-24 sm:rounded-lg sm:overflow-hidden sm:p-4'>
            <div className='absolute top-0 left-0 h-full w-full sm:bg-gradient-to-r sm:from-transparent sm:to-primary sm:backdrop-blur-3xl sm:rounded-lg sm:border sm:border-solid sm:border-secondary z-10' />
            <div
              className='hidden absolute top-0 left-0 h-full w-full brightness-50 saturate-150 sm:block'
              style={{
                backgroundImage: `url(${artistDetails?.artistImageUrl ?? ''})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <Image
              src={artistDetails?.artistImageUrl ?? ''}
              width={200}
              height={200}
              classes='hidden aspect-square rounded-full z-20 shadow-card sm:flex'
            />
            <h1
              ref={targetRef}
              className='w-full text-3xl font-bold z-30 sm:ml-4 sm:text-4xl md:text-5xl lg:text-6xl'
            >
              {artistDetails?.name?.toUpperCase()}
            </h1>
          </div>
          <div className='mt-8'>
            <div className='flex gap-8 justify-between'>
              <div className='w-full lg:w-full'>
                <div className='relative mb-4'>
                  <h2>Top tracks</h2>
                  <div className='absolute top-1/2 -translate-y-1/2 right-0'>
                    <PlaylistControls
                      playlist={artistDetails?.tracks ?? []}
                      playlistInfo={{
                        type: 'artist',
                        name: artistDetails?.name ?? '',
                      }}
                    />
                  </div>
                </div>
                <TrackList
                  tracks={artistDetails?.tracks ?? []}
                  showAlbumImage
                  playlistInfo={{
                    type: 'artist',
                    name: artistDetails?.name ?? '',
                  }}
                />
              </div>
              <div className='hidden w-full lg:block'>
                <AboutSection
                  artistDetails={{
                    name: artistDetails?.name ?? '',
                    about: artistDetails?.about ?? '',
                    artistAboutImageUrl:
                      artistDetails?.artistAboutImageUrl ?? '',
                  }}
                />
              </div>
            </div>
          </div>
          <DiscographySection
            artistDetails={artistDetails ?? null}
            currentPlaylistInfo={currentPlaylistInfo}
          />
          <div className='mt-8 lg:hidden'>
            <AboutSection
              artistDetails={{
                name: artistDetails?.name ?? '',
                about: artistDetails?.about ?? '',
                artistAboutImageUrl: artistDetails?.artistAboutImageUrl ?? '',
              }}
            />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ArtistDetails;
