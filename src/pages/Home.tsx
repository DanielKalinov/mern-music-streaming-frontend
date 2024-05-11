import React from 'react';
import Artists from '../components/Artists/Artists';
import PageTransition from '../components/PageTransition';
import Playlists from '../components/Playlists';

const Home = () => {
  return (
    <PageTransition duration={1}>
      <div className='pageContainer'>
        <Artists />
        <Playlists />
      </div>
    </PageTransition>
  );
};

export default Home;
