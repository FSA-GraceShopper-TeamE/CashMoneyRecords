import React from "react";
import { useSelector } from "react-redux";
import AllAlbums from "../Album/AllAlbums";
import { connect } from "react-redux";

const Home = () => {
  const email = useSelector((state) => state.auth.me.email);

  return (
    <div style={{ backgroundColor: "#7E5F1F", textAlign: "center" }}>
      <h3 style={{ color: "#CC6491", fontSize: "40px", marginTop: "0px" }}>
        {" "}
        Welcome, {email}
      </h3>
      <AllAlbums />
    </div>
  );
};

const mapState = (state) => {
  return {
    username: state.auth.username,
    user: state.user,
  };
};

export default connect(mapState)(Home);
