import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

import movieApi from '../services/movieApi';
import movieSlice from './slice/movieSlice';

const rootReducer = combineReducers({
  [movieApi.reducerPath]: movieApi.reducer,
  movie: movieSlice,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(movieApi.middleware);

    return middlewares;
  },
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
