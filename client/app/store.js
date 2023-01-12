import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import albumsReducer from "../features/Album/albumsSlice";
import singleAlbumReducer from "../features/singleAlbum/singleAlbumSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    albums: albumsReducer,
    singleAlbum: singleAlbumReducer

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
