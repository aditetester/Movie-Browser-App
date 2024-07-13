import React from 'react';
import {ActivityIndicator, AppRegistry} from 'react-native';
import {SafeAreaView, StyleSheet} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {persistor, store} from './src/store/store';
import {PersistGate} from 'redux-persist/integration/react';

const RootComponent = () => (
  <Provider store={store}>
    <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
      <SafeAreaView style={styles.container}>
        <App />
      </SafeAreaView>
    </PersistGate>
  </Provider>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

AppRegistry.registerComponent(appName, () => RootComponent);
