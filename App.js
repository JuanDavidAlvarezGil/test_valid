import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import ArtistDetailController from './src/controllers/artistDetailController/ArtistDetailController';
import TrackDetailController from './src/controllers/trackDetailController/TrackDetailController';
import Home from './src/views/home/Home';
import TracksControllers from './src/controllers/tracksController/TracksControllers'
import ArtistController from './src/controllers/artistController/ArtistController';

const Stack = createStackNavigator();
export default function App() {

  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{
          headerShown: false
        }
        } />
        <Stack.Screen name="Track" component={TracksControllers} />
        <Stack.Screen name="TrackDetail" component={TrackDetailController} />
        <Stack.Screen name="Artist" component={ArtistController} />
        <Stack.Screen name="ArtistDetail" component={ArtistDetailController} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
