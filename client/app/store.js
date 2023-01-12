import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/auth/authSlice';
import albumsReducer from '../features/src/albums/albumsSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    albums: albumsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/authSlice';
