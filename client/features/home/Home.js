import React from 'react';
import { useSelector } from 'react-redux';
import AllAlbums from '../Album/AllAlbums';

/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <AllAlbums/>

    </div>
  );
};

export default Home;
