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
        <View style={styles.screen}>
        <View style={styles.container}>
        {showingRatingAccessibility ? 
        <View>
            <Text  style={styles.pageNumber}>{ratingIndex + 1}/{ratings.length}</Text>
            <Text style={styles.header}>{name}</Text>

            <Text  style={styles.title}>{currentRatingAccessibility.accessibilityTitle}</Text>
            <View style={styles.starsWrapper}>
             <RatingAccessibility key={ratingIndex} setStarRating={setStarRating} setRatingItem={currentRatingAccessibility.setRatingItem}/>
            </View>
            

        </View>
        :
        <View>
            {/* /Here set the data object on data base */}
            <Text style={styles.header}>Thank you!</Text>
            <TouchableOpacity onPress={() =>sendUserToHomePage()} style={styles.button}>
              <Text style={styles.backToHomeButton}>Back To Home</Text>
            </TouchableOpacity>
        </View>
        }
        </View>
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
    screen:{
        alignItems:'center',
        backgroundColor:'#2F80ED',
        flex: 1,
    },
    container:{
        marginTop:150,
        alignItems:'center',
        backgroundColor:'white',
        borderRadius:20,
        minHeight:450,
        minWidth:300
    },
    title:{
        fontSize:20,
        marginBottom:20,
        alignSelf:'center',
        
    },
    header:{
        fontSize:30,
        marginBottom:10,
        fontWeight: 'bold',
        alignSelf:'center',
        marginTop:10
    },
    pageNumber:{
        fontSize:20,
        marginBottom:10,
        alignSelf:'center',
        marginTop:5
    },
    backToHomeButton: {
        marginTop:100,
        paddingTop:20,
        paddingBottom:20,
        color:'white',
        textAlign:'center',
        borderRadius: 25,
        backgroundColor:'#2D9CDB',
        fontSize:18
      },
});

export default RatingScreen;
