import React, { useEffect, useState } from "react";
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

import { fetchAlbumsAsync, fetchFilteredAlbums, selectAlbums } from "./albumsSlice";

const AllAlbums = () => {
  const dispatch = useDispatch();

  let rawAlbums = useSelector(selectAlbums);
  let albums = rawAlbums;

  const [option, setOption] = useState("");

  const handleClick = () => {
    let filteredAlbums = dispatch(fetchFilteredAlbums(option))
    return albums = filteredAlbums
  }

  const handleReset = () => {
    window.location.reload(true);
  }

  useEffect(() => {
    dispatch(fetchAlbumsAsync());
  }, [dispatch]);

  return (
    <div className="home">
      <div className="allAlbums-title"></div>
      <select onChange={(e)=> setOption(e.target.value)}>
        <option value="">Choose Genre</option> 
        <option value="bluegrass">bluegrass</option> 
        <option value="country">country</option> 
        <option value="electronic">electronic</option> 
        <option value="pop">pop</option> 
        <option value="rap">rap</option> 
        <option value="rock">rock</option>    
      </select>
      <button onClick={handleClick}>Select Genre</button><br></br><button onClick={handleReset}>Display All Albums</button>
      <div className="allAlbums" style={{backgroundColor:"#7E5F1F"}}>
        {albums ? (
          albums.map((album) => (
            <div key={album.id} style={{backgroundColor:"#CEA27E", fontFamily:"Roboto Slab', serif", border:"5px solid black", margin:"5px"}}>
              <form onSubmit={(ev) => ev.preventDefault()}></form>
              <Link to={`/albums/${album.id}`} key={album.id}>
                <div className="specificAlbum" key={album.id}>
                  <MDBCard className="albums-view" style={{ width: "18rem" }}>
                    <MDBCardImage style={{borderRadius: "10px", width:"150px"}}src={album.image} position="top" alt="..." />
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
