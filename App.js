import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import UserScreen from './screens/UserScreen';
import PlaceScreen from './screens/PlaceScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MapScreen">
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
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}