import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";

import {
  fetchAlbumsAsync,
  fetchFilteredAlbums,
  selectAlbums,
} from "./albumsSlice";

const AllAlbums = () => {
  const dispatch = useDispatch();

  let albums = useSelector(selectAlbums);

  const [option, setOption] = useState("");

  const handleClick = () => {
    if (option === "") {
      return;
    }
    dispatch(fetchFilteredAlbums(option));
  };

  const handleReset = () => {
    dispatch(fetchAlbumsAsync());
  };

  useEffect(() => {
    dispatch(fetchAlbumsAsync());
  }, [dispatch]);

  return (
    <div className="home">
      <div className="allAlbums-title"></div>
      <select onChange={(e) => setOption(e.target.value)} style={{border:"2px solid black", backgroundColor:"lightGrey", padding:5, marginTop:1}}>
        <option value="">Choose Genre</option>
        <option value="Jazz">Jazz</option>
        <option value="Techno">Techno</option>
        <option value="Hip Hop">Hip Hop</option>
        <option value="Instrumental">Instrumental</option>
        <option value="Alternative">Alternative</option>
        <option value="Reggae">Reggae</option>
      </select>
      <button style={{border:"2px solid black", backgroundColor:"lightGrey", padding:5, margin:10, marginBottom:2}} onClick={handleClick}>Select Genre</button>
      <br></br>
      <button style={{border:"2px solid black", backgroundColor:"lightGrey", padding:5, margin:10}} onClick={handleReset}>All Albums</button>
      <div className="allAlbums">
        {albums ? (
          albums.map((album) => (
            <div className="singleAlbum" key={album.id}>
              <form onSubmit={(ev) => ev.preventDefault()}></form>
              <Link to={`/albums/${album.id}`} key={album.id}>
                <div className="specificAlbum" key={album.id}>
                  <MDBCard className="albums-view">
                    <MDBCardImage className="albums-image"
                      src={album.image}
                      position="top"
                      alt="..."
                    />
                    <MDBCardBody>
                      <MDBCardTitle className="album-title">
                        {album.title}
                      </MDBCardTitle>
                      <MDBCardText className="price">
                        {`$${album.price}`}
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No albums...</p>
        )}
      </div>
    </div>
  );
};

export default AllAlbums;
