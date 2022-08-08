import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import UserScreen from './screens/UserScreen';
import PlaceScreen from './screens/PlaceScreen';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const homeName = "Home";
const mapName = "Map";
const userName = "User"
export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{
          headerShown: false,
        }}
        />
        <Stack.Screen 
        name="MapScreen" 
        component={MapScreen} 
        options={{
          headerShown: false,
        }}
        />
                  <Stack.Screen 
        name="UserScreen" 
        component={UserScreen} 
        options={{
          headerShown: false,
        }}
        />
        <Stack.Screen 
        name="PlaceScreen" 
        component={PlaceScreen} 
        options={{
          headerShown: false,
        }}
        />
        
      </Stack.Navigator> */}


      <Tab.Navigator
        initialRouteName="HomeScreen"
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
            else if (rn === userName) {
              iconName = focused ? 'person' : 'person-outline';
            } 

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#2F80ED',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 1, fontSize: 10},
          style: { padding: 10, height: 75}
        }}>

        <Tab.Screen name={userName} component={UserScreen} />
        <Tab.Screen name={mapName} component={MapScreen} />
        <Tab.Screen name={homeName} component={HomeScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}