import * as React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, FlatList, TextInput, TouchableOpacity, Button, ScrollView, StatusBar, Alert  } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../assets/colors/colors';
import ImageDetail from '../components/imageDetail';
import favoritesData from '../assets/data/favoritesData';
import highlyRatedData from '../assets/data/highlyRatedData';
import { db } from '../Core/Config';
import { getDatabase, ref, set, onValue, update,push,child } from "firebase/database";
import RatingAccessibility from '../components/RatingAccessibility';
import RNRestart from "react-native-restart";


const RatingScreen = ({ route, navigation }) => {
    const { name } = route.params;
    var str = name;
    var replacedPlaceName = str.split(' ').join('_');
    
    const [parkingStars, setParkingStars] = React.useState(0);
    const [wheelchairStars, setWheelchairStars] = React.useState(0);
    const [stairsStars, setStairsStars] = React.useState(0);
    const [toiletStars, setToiletStars] = React.useState(0);
    const [wayStars, setWayStars] = React.useState(0);
    const [doorStars, setDoorStars] = React.useState(0);

    // Set all ratings state
    const [wheelchair_access, setWheelchair] = React.useState(0);
    const [way_to_place, setWay] = React.useState(0);
    const [door_access, setDoor] = React.useState(0);
    const [stairs_alternative, setStairs] = React.useState(0);
    const [toilets, setToilets] = React.useState(0);
    const [parking, setParking] = React.useState(0);
    const [numOfRatings, setNumOfRatings] = React.useState(0);
    const [averageRating, setAverageRating] = React.useState(0);


    // Set new rating values
    const [new_wheelchair_access, setNewWheelchair] = React.useState(0);
    const [new_way_to_place, setNewWay] = React.useState(0);
    const [new_door_access, setNewDoor] = React.useState(0);
    const [new_stairs_alternative, setNewStairs] = React.useState(0);
    const [new_toilets, setNewToilets] = React.useState(0);
    const [new_parking, setNewParking] = React.useState(0);
    const [new_numOfRatings, setNewNumOfRatings] = React.useState(0);
    const [new_averageRating, setNewAverageRating] = React.useState(0);
    const [checkUpdate, setCheckUpdate] = React.useState(0);
    const [submitBackgroundColor, setSubmitBackgroundColor] = React.useState('white');
    const [backButton, setBackButton] = React.useState(true);
    const [submitButton, setSubmitButton] = React.useState(false);
    const [ratingIndex, setRatingIndex] = React.useState(0);
    const [showingRatingAccessibility, setShowingRatingAccessibility] = React.useState(true);
    const [submited, setSubmited] = React.useState(false)
    const [confirmed, setConfirmed] = React.useState("Click to confirm!")
    const [review_text, onChangeText] = React.useState("Enter review here");
    const [number, onChangeNumber] = React.useState(null);
    const [reviews, setReviews] = React.useState('');

    const ratings = [
        {
            accessibilityTitle: "How was the parking?",
            setRatingItem: setParkingStars
        },
        {
            accessibilityTitle: "Was there wheelchair access?",
            setRatingItem: setWheelchairStars
        },
        {
            accessibilityTitle: "How was the way?",
            setRatingItem: setWayStars
        },
        {
            accessibilityTitle: "How accessible were the doors?",
            setRatingItem: setDoorStars
        },
        {
            accessibilityTitle: "Was there a stairs alternative?",
            setRatingItem: setStairsStars
        },
        {
            accessibilityTitle: "How were the toilets?",
            setRatingItem: setToiletStars
        },
    ]



    var currentRatingAccessibility = ratings[ratingIndex];
    const getAvgValue = (currentAvg, newValue) => {
        // If num of ratings = 0 
        if(currentAvg == 0 && numOfRatings == 0){
            return newValue
        }
        let avg = ((currentAvg * (numOfRatings - 1)) + newValue) / numOfRatings;
        avg = (Math.round(avg * 100) / 100)
        return avg;

    }

    const onButtonClick = () => {
        RNRestart.Restart();
        };

    const printData = () => {
       
        console.log(wheelchair_access,stairs_alternative,toilets,parking,numOfRatings)
    }


    function setPlaceData(){

       // readData()
        //while(new_door_access){console.log("waited")}

        
            setNumOfRatings(numOfRatings + 1)
            setWay(getAvgValue(way_to_place,wayStars))
            setParking(getAvgValue(parking, parkingStars))
            setStairs(getAvgValue(stairs_alternative, stairsStars))
            setToilets(getAvgValue(toilets, toiletStars))
            setWheelchair(getAvgValue(wheelchair_access, wheelchairStars))
            //setWay((currentState)=>{return getAvgValue(currentState,wayStars)})
            setDoor(getAvgValue(door_access,doorStars))
            setNewParking(1)
           // console.log("Set place data")
            handleReview()
    }

    function handleReview(){
        if(review_text == 'Enter review here' || review_text== ""){
            return
        }
        const postListRef = ref(db, '/places/' + replacedPlaceName + '/reviews');       
        const newPostRef = push(postListRef);    
        set(newPostRef, {
            review_text
        });

        onChangeText('Enter review here')

    }


    function updateData() {
        //console.log(parking,way_to_place,door_access,wheelchair_access,toilets)
         
        console.log( set(ref(db,'/places/' + replacedPlaceName), {
            place_id:replacedPlaceName,
            averageRating:getAvgRating(),
            parking: parking,
            stairs_alternative: stairs_alternative,
            toilets: toilets,
            wheelchair_access: wheelchair_access,
            numOfRatings: numOfRatings,
            way_to_place:way_to_place,
            door_access:door_access,
            reviews:reviews
            //reviews:reviews
        }))

        
        console.log(reviews)

    }



    async function readData() {
        const placeRef = await ref(db, 'places/' + replacedPlaceName);
        onValue(placeRef, (snapshot) => {
            const data = snapshot.val();
            if (data != null) {

                setCheckUpdate(data.rating_manager)
                setDoor(data.door_access)
                setParking(data.parking)
                setStairs(data.stairs_alternative)
                setWay(data.way_to_place)
                setToilets(data.toilets)
                setWheelchair(data.wheelchair_access)
                setAverageRating(data.averageRating)
                setNumOfRatings(data.numOfRatings)
                setNewDoor(1)
                setReviews(data.reviews)
               // console.log("first")

            }
            else {
              //  console.log("Need to update")

                // createData(replaced)
            }
        });
    }


    const setStarRating = (inputStars, setRatingItem) => {
        setRatingItem(inputStars)

        if (ratingIndex < ratings.length - 1) {
            setRatingIndex(ratingIndex + 1)
        }
        else { //last accessibility parameter to rate
            setRatingIndex(0)
            setShowingRatingAccessibility(false)
            //setPlaceData()
        }
    }
    function getAvgRating(){
        
        return (Math.round(((door_access+parking+stairs_alternative+way_to_place+toilets+wheelchair_access)/6) * 100) / 100)
    }


    const sendUserToHomePage = () => {
        setShowingRatingAccessibility(true)
        readData()
        setPlaceData()
        updateData()
        printData()
        //setSubmited("Read Data")
        // updateValues();

        //setSubmited("updated values")
        // updateData();
        navigation.navigate("Home")
    }


    //React.useEffect(()=>{ },[parking])

    React.useEffect(() => {readData();},[name])

    
    
    return (
        <View style={styles.screen}>
            <View style={styles.container}>
                {showingRatingAccessibility ?
                    <View>
                        <Text style={styles.pageNumber}>{ratingIndex + 1}/{ratings.length}</Text>
                        <Text style={styles.header}>{name}</Text>

                        <Text style={styles.title}>{currentRatingAccessibility.accessibilityTitle}</Text>
                        <View style={styles.starsWrapper}>
                            <RatingAccessibility key={ratingIndex} setStarRating={setStarRating} setRatingItem={currentRatingAccessibility.setRatingItem} />
                        </View>


                    </View>
                    :
                    <View>
                        <View style={styles.ratingsWrapper}>
                        {/* /Here set the data object on data base */}
                        <Text style={styles.header}>Thank you!</Text>
                        <Text>Parking: {parkingStars}</Text>
                        <Text>WheelChair Accessibility: {wheelchairStars}</Text>
                        <Text>Way to place : {wayStars}</Text>
                        <Text>Door Accessibility: {doorStars}</Text>
                        <Text>Stairs Alternative: {stairsStars}</Text>
                        <Text>Toilets: {toiletStars}</Text>
                        </View>
                        
                        <TextInput
                            style={styles.input}
                            
                            onChangeText={newText => onChangeText(newText)}
                            value={number}
                            placeholder="Enter review here"
                            //keyboardType="numeric"
                            disabled={backButton}
                            
                        />
                        
                        <TouchableOpacity 
                        onPress={() => {
                            //console.log("Starting Values:\n")
                            printData()           // Print data BEFORE changes
                            setPlaceData()        // Set all new averages
                            setSubmitButton(true) // Make BACK button pressable
                            setBackButton(false) // Make Confirm button unpressable
                           // alert("Confirmed review!")
                            setConfirmed("Confirmed!")
                            
                            
                        }} 
                        disabled={submitButton}
                        >
                            <Text style={{    marginTop: 100,
                                    paddingTop: 20,
                                    paddingBottom: 20,
                                    color:'white',
                                    textAlign: 'center',
                                    borderRadius: 25,
                                    backgroundColor: '#2D9CDB',
                                    fontSize: 18}}
                            >
                            {confirmed}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => {
                             //   console.log("Average Values:\n")
                                
                                //printData() // Print data AFTER changes
                                updateData() // Update new data to DB
                                setRatingIndex(0) // Reset rating's list index
                                setShowingRatingAccessibility(true) 
                                setSubmitButton(false) // Make CONFIRM button pressable
                                setBackButton(true) // Make BACK button unpressable
                                setConfirmed("Click to confirm!")
                                console.log(review_text)
                                Alert.alert( "Thank you!","Successfuly sent review!")

                                navigation.goBack()                                         
                            }} 
                            disabled={backButton}
                            style={styles.button}>
                            <Text style={styles.backToHomeButton}>Submit and Back to home</Text>
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
    screen: {
        alignItems: 'center',
        backgroundColor: '#2F80ED',
        flex: 1,
    },
    ratingsWrapper:{
        marginTop:20,
        padding:20,
        width:270,
        borderColor:'grey',
        borderWidth:1
    },  
    container: {
        marginTop: 150,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        minHeight: 450,
        minWidth: 300
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        alignSelf: 'center',

    },
    header: {
        fontSize: 30,
        marginBottom: 10,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 10
    },
    pageNumber: {
        fontSize: 20,
        marginBottom: 10,
        alignSelf: 'center',
        marginTop: 5
    },
    backToHomeButton: {
        marginTop: 20,
        paddingTop: 20,
        paddingBottom: 20,
        color: 'white',
        textAlign: 'center',
        borderRadius: 15,
        backgroundColor: '#2D9CDB',
        fontSize: 18,
        width:'100%',
        backgroundColor:'grey',
        marginBottom:20,
    },

});

export default RatingScreen;
