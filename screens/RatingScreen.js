import * as React from 'react';
import {View, Text, SafeAreaView, StyleSheet, Image, FlatList, TouchableOpacity,Button, ScrollView, StatusBar  } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../assets/colors/colors';
import ImageDetail from '../components/imageDetail';
import favoritesData from '../assets/data/favoritesData';
import highlyRatedData from '../assets/data/highlyRatedData';
import { db } from '../Core/Config';
import { getDatabase, ref, set, onValue, update } from "firebase/database";
import RatingAccessibility from '../components/RatingAccessibility';

const RatingScreen = ({ route, navigation })=>{
    const {name} = route.params;
    var str = name;
    var replacedPlaceName = str.split(' ').join('_');

    const [parkingStars, setParkingStars] = React.useState(0);
    const [wheelchairStars, setWheelchairStars] = React.useState(0);
    const [stairsStars, setStairsStars] = React.useState(0);
    const [toiletStars, setToiletStars] = React.useState(0);

    // Set all ratings state
    const [wheelchair_access, setWheelchair] = React.useState(0); 
    const [way_to_place, setWay] = React.useState(0); 
    const [door_access, setDoor] = React.useState(0); 
    const [stairs_alternative, setStairs] = React.useState(0); 
    const [toilets, setToilets] = React.useState(0); 
    const [parking, setParking] = React.useState(0);
    const [numOfRatings, setNumOfRatings] = React.useState(0);
    const [averageRating, setAverageRating] = React.useState(0);

    const [ratingIndex, setRatingIndex] = React.useState(0);
    const [showingRatingAccessibility, setShowingRatingAccessibility] = React.useState(true);


    const ratings = [
        {
            accessibilityTitle:"How was the parking?",
            setRatingItem: setParkingStars
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
    const getAvgValue = (currentAvg, newValue)=> {
        return (currentAvg + newValue) / numOfRatings;
    }


    const printData = () =>{
        console.log({wheelchair_access}, {stairs_alternative}, {toilets}, {parking})
    }


    const setPlaceData = () => {

        readData()
        
        setNumOfRatings(numOfRatings + 1)
        setParking(getAvgValue(parking, parkingStars))
        setStairs(getAvgValue(stairs_alternative, stairsStars))
        setToilets(getAvgValue(toilets, toiletStars))
        setWheelchair(getAvgValue(wheelchair_access, wheelchairStars))
        

        update(ref(db, 'places/' + replacedPlaceName), {           
            parking:parking,
            stairs_alternative:stairs_alternative,
            toilets:toilets,
            wheelchair_access:wheelchair_access,
            // numOfRatings:numOfRatings,
            // averageRating:averageRating,
            
                    }).then(() => {
                  })  
                      .catch((error) => {
                          // The write failed...
                          alert(error);
                      });
    }
    
    function readData(){
        const placeRef = ref(db, 'places/' + replacedPlaceName);
        onValue(placeRef, (snapshot) => {
            const data = snapshot.val();
            if(data != null){
                
                // setDoor(data.door_access)
                setParking(data.parking)
                setStairs(data.stairs_alternative)
                // setWay(data.way_to_place)
                setToilets(data.toilets)
                setWheelchair(data.wheelchair_access)
                setAverageRating(data.averageRating)
                setNumOfRatings(data.numOfRatings)
               // console.log("successfuly retrieved " + place_id )
                
            }
            else{
                console.log("New place")
            }
        });
    }

    const setStarRating = (inputStars, setRatingItem) => {  
        setRatingItem(inputStars)

        if(ratingIndex< ratings.length-1){
            setRatingIndex(ratingIndex+1)
        }
        else{ //last accessibility parameter to rate
            setRatingIndex(0)        
            setShowingRatingAccessibility(false)
            //setPlaceData()
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
            <Text>Parking: {parkingStars}</Text>
            <Text>WheelChair: {wheelchairStars}</Text>
            <Text>stairs: {stairsStars}</Text>
            <Text>toilet: {toiletStars}</Text>
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
