import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Playlist } from '../../types/Playlist';

const Playlists = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    axios.get<Playlist[]>('http://localhost:5000/playlists').then((res) => {
      setPlaylists(res.data);
    });
  }, []);

  console.log(playlists);

  return <div>Playlists</div>;
};

export default Playlists;
