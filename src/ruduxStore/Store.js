// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from '../reducers/authSlice';
import profileSlice from '../reducers/profileSlice';
import cartSlice from '../reducers/cartSlice';
import  categorySlice  from '../reducers/categories';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import expireTransform from 'redux-persist-transform-expire';

// persist config
const persistConfig = {
  key: 'my app storage',
  storage,
  whitelist: ['auth', 'profile', 'cart', 'category'], // only these reducers will be persisted
  // transforms: [
  //   expireTransform({
  //     expireIn: 30, 
  //   }),
  // ],
};

// combine reducers
const rootReducer = combineReducers({
  auth: authSlice,
  profile: profileSlice,
  cart: cartSlice,
  category: categorySlice,
});

// wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// configure store
export const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // to avoid warnings from redux-persist
    }),
});

// create persistor
export const persistor = persistStore(Store);
