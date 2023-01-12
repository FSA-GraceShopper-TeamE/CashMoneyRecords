import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAlbumsAsync = createAsyncThunk("allAlbums-fetch", async() => {
  try {
    const  {data}  = await axios.get('/api/albums');
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const albumsSlice = createSlice({
  name: "allAlbums",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbumsAsync.fulfilled, (state, action) => {
      return action.payload;
    }),
    builder.addCase(fetchAlbumsAsync.rejected, (state, action) =>{
      state.error = action.error; //returns error when rejected
    })
  },
});

export const selectAlbums = (state) => {
  return state.albums;

}

export default albumsSlice.reducer;
