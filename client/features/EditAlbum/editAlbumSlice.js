import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateAlbumAsync = createAsyncThunk(
  "album/update",
  async ({ id, newPrice, newQuantity, newGenre }) => {
    try {
      const { data } = await axios.put(`/api/albums/${id}`, {
        price: newPrice,
        quantity: newQuantity,
        genre: newGenre,
      });
      console.log("this is the data for update album:", data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const editAlbumSlice = createSlice({
  name: "editAlbum",
  initialState: [],
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(updateAlbumAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectSingleAlbum = (state) => state.singleAlbum;

export default editAlbumSlice.reducer;
