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
      <select onChange={(e) => setOption(e.target.value)}>
        <option value="">Choose Genre</option>
        <option value="bluegrass">Bluegrass</option>
        <option value="country">Country</option>
        <option value="electronic">Electronic</option>
        <option value="pop">Pop</option>
        <option value="rap">Rap</option>
        <option value="rock">Rock</option>
      </select>
      <button onClick={handleClick}>Select Genre</button>
      <br></br>
      <button onClick={handleReset}>All Albums</button>
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
