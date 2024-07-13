import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.themoviedb.org/3/movie/',
  prepareHeaders: headers => {
    const token =
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYWNhYTdhYmFhNzYyOWRlODFiYzIyNDcwMzYzZjZiMiIsIm5iZiI6MTcyMDY5NTUyNC4yMTIzODMsInN1YiI6IjY2OGZiODVjOWNkZGU2M2I4M2I2MzFlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zHV_2yWu3st8rha1gbo8UpSmSQ9t_X4Qfio3dXTpoxA';
    if (token) {
      headers.set('Authorization', token);
    }
    return headers;
  },
});

const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery,
  tagTypes: ['Movies'],
  endpoints: builder => ({
    //#####################################
    // NOW PLAYING MOVIES API
    //#####################################
    getNowMovies: builder.mutation({
      query: () => ({
        url: 'now_playing',
        method: 'GET',
      }),
    }),
    getNowPlayingMovieById: builder.mutation({
      query: id => ({
        url: `now_playing/${id}`,
        method: 'GET',
      }),
    }),
    //#####################################
    // POPULAR MOVIES API
    //#####################################
    getPopularMovies: builder.mutation({
      query: () => ({
        url: 'popular',
        method: 'GET',
      }),
    }),
    getPopularMovieById: builder.mutation({
      query: id => ({
        url: `popular/${id}`,
        method: 'GET',
      }),
    }),
    //#####################################
    // TOP-RATED MOVIES API
    //#####################################
    getTopRatedMovies: builder.mutation({
      query: () => ({
        url: 'top_rated',
        method: 'GET',
      }),
    }),
    getTopRatedPlayingMovieById: builder.mutation({
      query: id => ({
        url: `top_rated/${id}`,
        method: 'GET',
      }),
    }),
    //#####################################
    // UPCOMING MOVIES API
    //#####################################
    getUpcomingMovies: builder.mutation({
      query: () => ({
        url: 'upcoming',
        method: 'GET',
      }),
    }),
    getUpcomingMovieById: builder.mutation({
      query: id => ({
        url: `upcoming/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  // Now Playing Movies
  useGetNowMoviesMutation,
  useGetNowPlayingMovieByIdMutation,

  // Popular Movies
  useGetPopularMoviesMutation,
  useGetPopularMovieByIdMutation,

  // Top-Rated Movies
  useGetTopRatedMoviesMutation,
  useGetTopRatedPlayingMovieByIdMutation,

  // Upcoming Movies
  useGetUpcomingMoviesMutation,
  useGetUpcomingMovieByIdMutation,
} = movieApi;
export default movieApi;
