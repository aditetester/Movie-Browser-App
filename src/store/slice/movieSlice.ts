import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: 'ideal',
};

const movieSlice = createSlice({
  name: 'movie',
  initialState: initialState,
  reducers: {
    updateMovieStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const {updateMovieStatus} = movieSlice.actions;
export default movieSlice.reducer;
