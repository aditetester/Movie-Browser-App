import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {enableScreens} from 'react-native-screens';
import NowPlaying from '../screens/NowPlaying';
import Popular from '../screens/Popular';
import TopRated from '../screens/TopRated';
import Upcoming from '../screens/Upcoming';

const AppNavigation = () => {
  const Tab = createBottomTabNavigator();
  enableScreens();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarIconStyle: {display: 'none'},
          tabBarLabelStyle: {
            fontSize: 15,
          },
          tabBarActiveTintColor: 'red',
          tabBarStyle: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
          },
          tabBarBadgeStyle: {
            display: 'flex',
            justifyContent: 'center',
          },
          tabBarItemStyle: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}>
        <Tab.Screen name="Now Playing" component={NowPlaying} />
        <Tab.Screen name="Popular" component={Popular} />
        <Tab.Screen name="Top-Rated" component={TopRated} />
        <Tab.Screen name="Upcoming" component={Upcoming} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
