import * as React from 'react';
import {View, Text, SafeAreaView, StyleSheet, Image, FlatList, TouchableOpacity,Button, ScrollView, StatusBar  } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../assets/colors/colors';
import ImageDetail from '../components/imageDetail';
import favoritesData from '../assets/data/favoritesData';
import highlyRatedData from '../assets/data/highlyRatedData';
import { db } from '../Core/Config';
import RatingAccessibility from '../components/RatingAccessibility';

const RatingScreen = ({ route, navigation })=>{
    const {name} = route.params;
    var str = name;
    var replacedPlaceName = str.split(' ').join('_');

    const [parkingStars, setParkingStars] = React.useState('0');
    const [wheelchairStars, setWheelchairStars] = React.useState('0');
    const [stairsStars, setStairsStars] = React.useState('0');
    const [toiletStars, setToiletStars] = React.useState('0');

    const [ratingIndex, setRatingIndex] = React.useState(0);
    const [showingRatingAccessibility, setShowingRatingAccessibility] = React.useState(true);
    const [currentName, setCurrentName] = React.useState('');

    const ratings = [
        {
            accessibilityTitle:"How was the parking?",
            setRatingItem:setParkingStars
        },
        {
            accessibilityTitle:"Was there wheelchair access?",
            setRatingItem:setWheelchairStars
        },
        {
            accessibilityTitle:"Was there a stairs alternative?",
            setRatingItem:setStairsStars
        },
        {
            accessibilityTitle:"Was there an accessible toilet?",
            setRatingItem:setToiletStars
        }
    ]
    
    var currentRatingAccessibility = ratings[ratingIndex];

    
    const setData = () => {

        ///need to read data, calculate the new data, and set data


        // set(ref(db, 'places/' + replacedPlaceName), {          
        //     // door_access: 0,  
        //     parking:parkingStars,
        //     stairs_alternative:0,
        //     way_to_place:0,
        //     toilets:0,
        //     wheelchair_access:0,
        //     numOfRatings:0,
        //     averageRating:0,
        //     // numOfRatings:0,
        //     // averageRating:0,
            
        //             }).then(() => {
        //               console.log("set data of:")
        //               console.log(placeName)
        //           })  
        //               .catch((error) => {
        //                   // The write failed...
        //                   alert(error);
        //               });
    }
    

    const setStarRating = (inputStars, setRatingItem) => {    
        setRatingItem(inputStars)
        if(ratingIndex< ratings.length-1){
            setRatingIndex(ratingIndex+1)
        }
        else{
            setRatingIndex(0)
            setShowingRatingAccessibility(false)
        }
    }

    const sendUserToHomePage = ()=> {
        setShowingRatingAccessibility(true)
        navigation.navigate("Home")
    }
    return (
        <View style={styles.container}>
        {showingRatingAccessibility ? 
        <View>
            <Text style={styles.header}>{name}</Text>

            <Text  style={styles.title}>{currentRatingAccessibility.accessibilityTitle}</Text>
            <RatingAccessibility key={ratingIndex} setStarRating={setStarRating} setRatingItem={currentRatingAccessibility.setRatingItem}/>

        </View>
        :
        <View>
            {/* /Here set the data object on data base */}
            <Text>Thank you!</Text>
            <View>
                <Text>{parkingStars}</Text>
                <Text>{wheelchairStars}</Text>
                <Text>{stairsStars}</Text>
                <Text>{toiletStars}</Text> 
            </View>
            <Button  //Back to home
                title="Back To Home"         
                onPress={() => {sendUserToHomePage()}}
            />  
        </View>
        }
            {/* <Text style={styles.header}>{name}</Text>

            <Text  style={styles.title}>{currentRatingAccessibility.accessibilityTitle}</Text>
            <RatingAccessibility setStarRating={setStarRating} setRatingItem={currentRatingAccessibility.setRatingItem}/>

            <Text>{parkingStars}</Text>
            <Text>{wheelchairStars}</Text>
            <Text>{stairsStars}</Text>
            <Text>{toiletStars}</Text>  */}
            {/* <Text  style={styles.title}>{"How was the parking?"}</Text>
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
            <Text>{toiletStars}</Text> */}
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        marginTop:50,
        alignItems:'center'
    },
    title:{
        fontSize:20,
        marginBottom:5
    },
    header:{
        fontSize:30,
        marginBottom:10
    }
});

export default RatingScreen;
