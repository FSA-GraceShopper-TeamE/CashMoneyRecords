import React from "react";
import { useSelector } from "react-redux";
import AllAlbums from "../Album/AllAlbums";
import { connect } from "react-redux";

/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <AllAlbums />
    </div>
  );
};

// export default Home;

const mapState = (state) => {
  return {
    username: state.auth.username,
    user: state.user,
  };
};

export default connect(mapState)(Home);
