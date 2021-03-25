import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import React from 'react'
import GeoControllers from '../../controllers/geoControllers/GeoControllers';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import SearchController from '../../controllers/searchController/SearchController';
import TrackController from '../../controllers/tracksController/TracksControllers';
import ArtistController from '../../controllers/artistController/ArtistController';

const Tab = createBottomTabNavigator();
export default function Home() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Artis" component={ArtistController}
                options={{
                    tabBarLabel: 'Artistas',
                    tabBarIcon: ({ tintColor }) => (
                        <Icon name="music-tone-alt" color={tintColor} size={25} />
                    )
                }} />
            <Tab.Screen name="Track" component={TrackController}
                options={{
                    tabBarLabel: 'Caciones',
                    tabBarIcon: ({ tintColor }) => (
                        <Icon name="disc" color={tintColor} size={25} />
                    )
                }} />
            <Tab.Screen name="Search" component={SearchController}
                options={{
                    tabBarLabel: 'Buscar',
                    tabBarIcon: ({ tintColor }) => (
                        <Icon name="playlist" color={tintColor} size={25} />
                    )
                }} />
        </Tab.Navigator>
    )
}