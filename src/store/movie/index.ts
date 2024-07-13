import {createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'movie',
  initialState: {
    movieData: null,
    isAuth: false,
    perpos: null,
    startupScreen: 'Tutorial',
  },
  reducers: {
    setMovie: (state, {payload: {movieData, startupScreen}}) => {
      // state.movieData = movieData
      // state.isAuth = isAuth
      if (typeof movieData !== 'undefined') {
        state.movieData = null;
        state.movieData = movieData;
      }
      if (typeof startupScreen !== 'undefined') {
        state.startupScreen = startupScreen;
      }
      console.log('Redux', state.movieData);
    },
  },
});

export const {setMovie} = slice.actions;

export default slice.reducer;
