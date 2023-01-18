import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { v4 as uuidv4 } from "uuid";
import { addToCart } from "../Cart/cartSlice";
import EditAlbum from "../EditAlbum/EditAlbum.js";

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";

import { fetchSingleAlbumAsync, selectSingleAlbum } from "./singleAlbumSlice";
import { green } from "@mui/material/colors";

const SingleAlbum = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [addedToCart, setAddedToCart] = useState(false);

  const album = useSelector(selectSingleAlbum);
  const { title, artistName, price, tracks, description, image, genre } = album;

  useEffect(() => {
    dispatch(fetchSingleAlbumAsync(id));
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    setAddedToCart(true);
    dispatch(addToCart(album));
  };

  return (
    <div className="singleAlbum-container">
      <EditAlbum />
      <div className="card-container">
        <Card
          className="singleAlbum-card"
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <img variant="top" src={image} style={{ alignSelf: "center", width:500, height: 500 }} />
          <Card.Body>
            <Card.Title style={{fontSize:50, fontStyle:"italic"}}>{title}</Card.Title>
            <Card.Title style={{fontSize:50, fontWeight:"bolder"}}>{artistName}</Card.Title>
            <Card.Title style={{fontSize: 30, color: "green", fontWeight:"bold"}}>${price}</Card.Title>
            <Card.Title style={{fontSize: 20, fontStyle:"italic"}}>{genre}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <div className="d-grid gap-2">
              <Button
                style={{border:"2px solid black", backgroundColor:"grey", padding:5}}
                type="submit"
                variant={addedToCart ? "success" : "info"}
                onClick={handleClick}
              >
                {addedToCart ? "Item Added To Cart" : "Add To Cart"}
              </Button>{" "}
            </div>
          </Card.Body>

          <ListGroup>
            {tracks ? (
              tracks.map((track, i) => (
                <ListGroup.Item key={uuidv4()}>
                  {i + 1}. {track}
                </ListGroup.Item>
              ))
            ) : (
              <div></div>
            )}
          </ListGroup>
        </Card>
      </div>
    </div>
  );
};
export default SingleAlbum;
