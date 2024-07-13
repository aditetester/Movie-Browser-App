import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useGetNowMoviesMutation} from '../services/movieApi';
import {ErrorResponse, Movie, MoviesResponse} from '../types/apiType';
import {useFocusEffect} from '@react-navigation/native';
import {truncateText} from '../util/truncateText';

const NowPlaying = ({navigation}: {navigation: any}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState<MoviesResponse>();
  const [getNowMovies] = useGetNowMoviesMutation();

  const getMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    try {
      const res: MoviesResponse = await getNowMovies({}).unwrap();
      if (res) {
        setMovies(res);
      }
    } catch (error) {
      const err = error as ErrorResponse;
      console.error('Error ==>', err?.data?.status_message);
    } finally {
      setIsLoading(false);
    }
  }, [getNowMovies]);

  useFocusEffect(
    useCallback(() => {
      getMoviesHandler();
    }, [getMoviesHandler]),
  );

  useEffect(() => {
    getMoviesHandler();
  }, [getMoviesHandler]);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  const renderMovieCard = ({item}: {item: Movie}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('MovieDetail')}
      style={styles.singleCard}>
      <Image
        source={{uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`}}
        style={styles.backdrop}
      />
      <Image
        source={{uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}}
        style={styles.poster}
      />
      <View style={styles.detailView}>
        <View>
          <Text style={styles.movieTitle}>{truncateText(item.title, 20)}</Text>
          <Text style={styles.movieOverview}>{item.release_date}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Text style={styles.movieRating}>{item.vote_average.toFixed(1)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Now Playing</Text>
      <FlatList
        data={movies?.results}
        renderItem={renderMovieCard}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.cardsContainer}
      />
    </View>
  );
};

export default NowPlaying;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
  },
  cardsContainer: {
    paddingBottom: 10,
  },
  singleCard: {
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#f8f8f8',
    borderWidth: 0.2,
    borderColor: 'grey',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  backdrop: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 10,
    position: 'absolute',
    top: 50,
    left: 10,
    borderColor: 'white',
    borderWidth: 2,
  },
  detailView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 10,
    marginLeft: 120,
    marginRight: 20,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  movieOverview: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  ratingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    borderWidth: 3,
    borderRadius: 100,
    width: 40,
    height: 40,
    borderColor: 'green',
  },
  movieRating: {
    fontSize: 14,
    color: '#d70707',
  },
});
