import { StatusBar } from 'expo-status-bar';
import React from 'react';

import Home from './screens/Home';
import Upcoming from './screens/upcoming';
import Popular from './screens/popular';
import TopRated from './screens/topRated';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { StyleSheet } from 'react-native';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <StatusBar style='auto' />
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Upcoming' component={Upcoming} />
        <Stack.Screen name='Popular' component={Popular} />
        <Stack.Screen name='TopRated' component={TopRated} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfbfb',
    justifyContent: 'flex-start',
    padding: 70,
    paddingHorizontal: 20,
  },
});
