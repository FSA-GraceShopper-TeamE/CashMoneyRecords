import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
// import axios from "axios";
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

  const album = useSelector(selectSingleAlbum);
  const { title, artistName, price, quantity, tracks, staffPick, description, image, genre } = album
  console.log(album, "album");

  useEffect(() => {
    dispatch(fetchSingleAlbumAsync(id));
  }, [dispatch]);

  return (
        <div className='singleAlbum-container'>
            <div className='card-container'>
            <Card className='singleAlbum-card'>
                <Card.Img variant='top' src={image} />
                <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <div className='d-grid gap-2'>
                    {/* <Button
                    type='submit'
                    variant={addedToCart ? 'success' : 'info'}
                    onClick={this.handleClick}
                    >
                    {addedToCart ? 'Item Added' : 'Add To Cart'}
                    </Button>{' '} */}
                </div>
                {/* <Card.Link href="/cart">add to cart</Card.Link> */}
                </Card.Body>

                {/* <ListGroup className='list-group-flush'>
                {this.props.singleAlbum.tracks ? (
                this.props.singleAlbum.tracks.map((track, i) => (
                    <ListGroup.Item>
                    {i + 1}. {track}
                    </ListGroup.Item>
                ))) : (
                    <div></div>
                )}
                </ListGroup> */}
            </Card>
            </div>
        </div>
  )
}
  ;

export default SingleAlbum;
