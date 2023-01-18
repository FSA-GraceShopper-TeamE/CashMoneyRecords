import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleAlbumAsync = createAsyncThunk(
  "singleAlbum-fetch",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/albums/${id}`);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

export const singleAlbumSlice = createSlice({
  name: "singleAlbum",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleAlbumAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchSingleAlbumAsync.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});

export const selectSingleAlbum = (state) => {
  return state.singleAlbum;
};

export default singleAlbumSlice.reducer;
