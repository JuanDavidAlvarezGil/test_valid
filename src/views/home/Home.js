import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import React from 'react'
import GeoControllers from '../../controllers/geoControllers/GeoControllers';

const Tab = createBottomTabNavigator();
export default function Home() {
    return (
        <Tab.Navigator>
             <Tab.Screen name="Geo" component={GeoControllers}
                options={{
                    tabBarLabel: 'Home',
                   
                }} />
        </Tab.Navigator>
    )
}
