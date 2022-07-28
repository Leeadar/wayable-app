import * as React from 'react';
import {View, Text, SafeAreaView, StyleSheet, Image, FlatList } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../assets/colors/colors';
import ImageDetail from '../components/imageDetail';
import favoritesData from '../assets/data/favoritesData';
import highlyRatedData from '../assets/data/highlyRatedData';

const PlaceScreen = ({ route, navigation })=>{
    const {name} = route.params;
    console.log(name)

    //console.log("stam")
    return (
        <View style={{flex:1,alignItems:'center'}}>
            <Text style={{fontSize:50}}>  {name} </Text>
            
        </View>
    )
};


export default PlaceScreen;