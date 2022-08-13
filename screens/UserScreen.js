import * as React from 'react';
import {View, Text, SafeAreaView, StyleSheet, Image, FlatList } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../assets/colors/colors';
import ImageDetail from '../components/imageDetail';
import favoritesData from '../assets/data/favoritesData';
import highlyRatedData from '../assets/data/highlyRatedData';

const UserScreen = ()=>{
    return (
        <View  style={{marginTop:60, alignItems:'center'}}> 
            <Text style={{fontSize:50}}>User Screen</Text>
        </View>
    )
};


export default UserScreen;