import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAlbumsAsync = createAsyncThunk("allAlbums-fetch", async() => {
  try {
    const {data} = await axios.get('/api/albums');
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const fetchFilteredAlbums = createAsyncThunk("filteredAlbums-fetch", async (option) => {
  try {
    const { data } = await axios.get(`/api/albums/filter/${option}`)
    console.log("this is data:", data)
    console.log("this is the slice option:", option)
    return data
  } catch (err) {
    return err
  }
})

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
    }),
    builder.addCase(fetchFilteredAlbums.fulfilled, (state, action) => {
      return action.payload
    })
  },
});

export const selectAlbums = (state) => {
  return state.albums;
}

export default albumsSlice.reducer;
