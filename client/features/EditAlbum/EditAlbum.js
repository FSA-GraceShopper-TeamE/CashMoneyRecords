import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectSingleAlbum, updateAlbumAsync } from "./editAlbumSlice";
import { useParams } from "react-router-dom";

const EditAlbum = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const album = useSelector(selectSingleAlbum);
  const { price, quantity, genre } = album;

  const [newPrice, setNewPrice] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [newGenre, setNewGenre] = useState("");

  const handleSubmit = async () => {
    dispatch(updateAlbumAsync({ id, newPrice, newQuantity, newGenre }));
  };

  const handleClick = () => {
    console.log("click");
  };

  return (
    <div>
      <h1 style={{fontSize:50, fontWeight:"bolder"}}>UPDATE ALBUM</h1>
      <form method="post" action={`/albums/${id}`} onSubmit={handleSubmit}>
        <label>Price</label>
        <input
          required
          style={{ width: 350, border: "2px solid black" }}
          value={newPrice}
          placeholder={price}
          onChange={(e) => setNewPrice(e.target.value)}
        ></input>
        <br></br>
        <label>Quantity</label>
        <input
          required
          style={{ width: 350, border: "2px solid black" }}
          value={newQuantity}
          placeholder={quantity}
          onChange={(e) => setNewQuantity(e.target.value)}
        ></input>
        <br></br>
        <label>Genre</label>
        <input
          required
          style={{ width: 350, border: "2px solid black" }}
          value={newGenre}
          placeholder={genre}
          onChange={(e) => setNewGenre(e.target.value)}
        ></input>
        <br></br>
        <button style={{border:"2px solid black", backgroundColor:"grey", padding:5, marginTop:10}} type="submit" onClick={handleClick}>
          Update
        </button>
      </form>
    </div>
  );
};

export default EditAlbum;
