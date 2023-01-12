import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";

// import { fetchAlbums } from "../store/allAlbums";
// import Footer from "./Footer";


// const handleUnregister = async (e) => {
//   const studentId = e.target.value;
//   await axios.put(`/api/students/${studentId}`);
//   window.location.reload(true);
// };


const AllAlbums = () => {
    // const dispatch = useDispatch();

  // const albums = useSelector((state) => state.albums);

  const [albums, setAlbums] = React.useState([]);

  const albumsList = async () => {
    const { data } = await axios.get("/api/albums");
    return setAlbums(data);
  }


  useEffect(() => {
    albumsList()

  }, []);

  return (
    <div className="home">
      <div className="allAlbums-title"></div>
      <div className="allAlbums">
        {albums.length ? (
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
    {/* //   <Footer /> */}
    </div>
  );
};

export default AllAlbums;
