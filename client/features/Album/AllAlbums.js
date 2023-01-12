import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import axios from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";

import { fetchAlbumsAsync, selectAlbums } from "./albumsSlice";

const AllAlbums = () => {
  const dispatch = useDispatch();

  const albums = useSelector(selectAlbums);

  useEffect(() => {
    dispatch(fetchAlbumsAsync());
  }, [dispatch]);

  return (
    <div className="home">
      <div className="allAlbums-title"></div>
      <div className="allAlbums">
        {albums ? (
          albums.map((album) => (
            <div key={album.id}>
              <form onSubmit={(ev) => ev.preventDefault()}></form>
              <Link to={`/albums/${album.id}`} key={album.id}>
                <div className="specificAlbum" key={album.id}>
                  <MDBCard className="albums-view" style={{ width: "18rem" }}>
                    <MDBCardImage src={album.image} position="top" alt="..." />
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
