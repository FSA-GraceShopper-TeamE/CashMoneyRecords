import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {cart:[]},
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find((item) => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.id !== action.payload
      );
      state.cart = removeItem;
    },
  },
});

const cartReducer = cartSlice.reducer;
export default cartReducer ;

export const { addToCart, incrementQuantity, decrementQuantity, removeItem } =
cartSlice.actions;

// export default cartSlice.reducer



















// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const addToCartAsync = createAsyncThunk("singleAlbumAddCart", async(id) => {
//   try {
//     const { data } = await axios.post(`/api/orders`);
//     return data;
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// });

// export const cartSlice = createSlice({
//   name: "cart",
//   initialState: [],
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(addToCartAsync.fulfilled, (state, action) => {
//       return action.payload;
//     });
//     builder.addCase(addToCartAsync.rejected, (state, action) => {
//       state.error = action.error; //returns error when rejected
//     });
//   },
// });

// export const selectCart = (state) => state.cart;

// export default cartSlice.reducer;



















// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const addToCartAsync = createAsyncThunk("singleAlbumAddCart", async(id) => {
//   try {
//     const { data } = await axios.post(`/api/orders`);
//     return data;
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// });

// export const cartSlice = createSlice({
//   name: "cart",
//   initialState: [],
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(addToCartAsync.fulfilled, (state, action) => {
//       return action.payload;
//     });
//     builder.addCase(addToCartAsync.rejected, (state, action) => {
//       state.error = action.error; //returns error when rejected
//     });
//   },
// });

// export const selectCart = (state) => state.cart;

// export default cartSlice.reducer;
