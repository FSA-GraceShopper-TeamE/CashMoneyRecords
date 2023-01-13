import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addToCartAsync = createAsyncThunk("singleAlbumAddCart", async(id) => {
  try {
    const { data } = await axios.post(`/api/orders`);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
});

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCartAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addToCartAsync.rejected, (state, action) => {
      state.error = action.error; //returns error when rejected
    });
  },
});

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;
