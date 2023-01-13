import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import ListGroup from "react-bootstrap/ListGroup";
import Button from 'react-bootstrap/Button';
import { v4 as uuidv4 } from 'uuid';
import { addToCartAsync } from "../Cart/cartSlice";


import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";

import { fetchSingleAlbumAsync, selectSingleAlbum } from "./singleAlbumSlice";

const SingleAlbum = () => {
  const { id } = useParams()
  const dispatch = useDispatch();

  const [addedToCart, setAddedToCart] = useState(false)

  const album = useSelector(selectSingleAlbum);
  const { title, artistName, price, quantity, tracks, staffPick, description, image, genre } = album
  console.log(album, "album");

  useEffect(() => {
    dispatch(fetchSingleAlbumAsync(id));
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    // console.log("clicked", e);
    setAddedToCart(true);
    dispatch(addToCartAsync(e.target.id.value))

  }

  return (
        <div className='singleAlbum-container'>
            <div className='card-container'>
            <Card className='singleAlbum-card' style={{display:"flex", flexDirection:"column", textAlign:"center"}}>
                <img variant='top' src={image} style={{textAlign:"center"}}/>
                <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Title>{artistName}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <div className='d-grid gap-2'>
                    <Button
                    type='submit'
                    variant={addedToCart ? 'success' : 'info'}
                    onClick={handleClick}
                    >
                    {addedToCart ? 'Item Added' : 'Add To Cart'}
                    </Button>{' '}
                </div>
                {/* <Card.Link href="/cart">add to cart</Card.Link> */}
                </Card.Body>

                <ListGroup className='list-group-flush'>
                {tracks ? (
                tracks.map((track, i) => (
                  <ListGroup.Item key={uuidv4()}>
                    {i + 1}.  {track}
                    </ListGroup.Item>
                ))) : (
                    <div></div>
                )}
                </ListGroup>
            </Card>
            </div>
        </div>
  )
}
  ;

export default SingleAlbum;
