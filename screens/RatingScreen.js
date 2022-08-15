import * as React from 'react';
import {View, Text, SafeAreaView, StyleSheet, Image, FlatList, TouchableOpacity,Button, ScrollView, StatusBar  } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../assets/colors/colors';
import ImageDetail from '../components/imageDetail';
import favoritesData from '../assets/data/favoritesData';
import highlyRatedData from '../assets/data/highlyRatedData';
import RatingAccessibility from '../components/RatingAccessibility';

const RatingScreen = ()=>{
    const [parkingStars, setParkingStars] = React.useState('0');
    const [wheelchairStars, setWheelchairStars] = React.useState('0');
    const [stairsStars, setStairsStars] = React.useState('0');
    const [toiletStars, setToiletStars] = React.useState('0');

    const setStarRating = (inputStars, setRatingItem) => {
        
        setRatingItem(inputStars)
        console.log(inputStars)
    }

    return (
        <View style={styles.container}> 
            <Text  style={styles.title}>{"How was the parking?"}</Text>
            <RatingAccessibility setStarRating={setStarRating} setRatingItem={setParkingStars}/>
            <Text>{parkingStars}</Text>

            <Text  style={styles.title}>{"Was there wheelchair access?"}</Text>
            <RatingAccessibility setStarRating={setStarRating} setRatingItem={setWheelchairStars}/>
            <Text>{wheelchairStars}</Text>

            <Text  style={styles.title}>{"Was there a stairs alternative?"}</Text>
            <RatingAccessibility setStarRating={setStarRating} setRatingItem={setStairsStars}/>
            <Text>{stairsStars}</Text>

            <Text  style={styles.title}>{"Was there an accessible toilet?"}</Text>
            <RatingAccessibility setStarRating={setStarRating} setRatingItem={setToiletStars}/>
            <Text>{toiletStars}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        marginTop:100,
        alignItems:'center'
    },
    title:{
        fontSize:20,
        marginBottom:5
    }
});

export default RatingScreen;
