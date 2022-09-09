import "./IgnoreWarnings"; // This is to ignore ViewPropTypes warnings
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import PlaceScreen from './screens/PlaceScreen';
import RatingScreen from './screens/RatingScreen';
import {ViewPropTypes} from 'deprecated-react-native-prop-types';

const Tab = createBottomTabNavigator();


const homeName = "Home";
const mapName = "Map";
const placeName = "Place";
const ratingName = "Rating";

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === mapName) {
              iconName = focused ? "navigate" : 'navigate-outline';
            }
            else if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false,
          activeTintColor: '#2F80ED',
          inactiveTintColor: 'grey',
          "tabBarLabelStyle": {"paddingBottom": 1,"fontSize": 10 },
          tabBarHideOnKeyboard:true,
          "tabBarStyle": [{"display": "flex", backgroundColor:"#FAFAFA"},null],
          
        })}>

        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={mapName} component={MapScreen} />
        <Tab.Screen name={placeName} component={PlaceScreen}       
            options={() => ({
                tabBarButton: () => null,
            })}
        />
      <Tab.Screen name={ratingName} component={RatingScreen}
            options={() => ({
                tabBarButton: () => null,
                tabBarStyle: { display: "none" },
            })}
      />

      </Tab.Navigator>
    </NavigationContainer>
  );
}