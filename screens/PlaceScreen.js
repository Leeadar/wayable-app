import * as React from 'react';
import {View, Text, SafeAreaView, StyleSheet, Image, FlatList,TextInput,Button } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../assets/colors/colors';
import ImageDetail from '../components/imageDetail';
import favoritesData from '../assets/data/favoritesData';
import highlyRatedData from '../assets/data/highlyRatedData';
import { db } from '../Core/Config';
import { getDatabase, ref, set, onValue, update } from "firebase/database";
import { stringLength } from '@firebase/util';



// Recieve place id as parameter
const  PlaceScreen =  ({ route, navigation })=>{

    // replace ' ' with '_' in place's name (for example:"Azrieli Mall" => "Azrieli_Mall")
    const {name} = route.params;
    var str = name;
    var replaced = str.split(' ').join('_');
    
    // Set all ratings state
    const [place,setPlace] = React.useState('')
    const [wheelchair_access, setWheelchair] = React.useState(''); 
    const [way_to_place, setWay] = React.useState(''); 
    const [door_access, setDoor] = React.useState(''); 
    const [stairs_alternative, setStairs] = React.useState(''); 
    const [toilets, setToilets] = React.useState(''); 
    const [parking, setParking] = React.useState('');
    const [numOfRatings, setNumOfRatings] = React.useState('');
    const [averageRating, setAverageRating] = React.useState('');
    

    // Suppose to add a new place to DB with , default values will be -1 , So the first rating will not calculate average with -1 value.
    function createData(placeName) {
        set(ref(db, 'places/' + placeName), {          
            place_id: placeName,
            door_access: 0,  
            parking:0,
            stairs_alternative:0,
            way_to_place:0,
            toilets:0,
            wheelchair_access:0,
            numOfRatings:0,
            averageRating:0,
            
                    }).then(() => {
                      console.log("added data of:")
                      console.log(placeName)
                      alert('Added new place to our database!');    
                  })  
                      .catch((error) => {
                          // The write failed...
                          alert(error);
                      });
    }

    //console.log(replaced) // will print the fixed place name


    // for example: if data base will contain /places/Azrieli_Mall , Then replaced = "Azrieli_Mall". 
    function readData(){
        const placeRef = ref(db, 'places/' + replaced);
        onValue(placeRef, (snapshot) => {
            const data = snapshot.val();
            if(data != null){
                
                setPlace(data.place_id)
                setDoor(data.door_access)
                setParking(data.parking)
                setStairs(data.stairs_alternative)
                setWay(data.way_to_place)
                setToilets(data.toilets)
                setWheelchair(data.wheelchair_access)
                setAverageRating(data.averageRating)
                setNumOfRatings(data.numOfRatings)
               // console.log("successfuly retrieved " + place_id )
                
            }
            else{
                console.log("Need to update")
                
                createData(replaced)
            }
        });
    }
   // console.log(averageRating)
  React.useEffect(()=>{ readData()})
    
    return (
        // <View on style={styles.container}>
                         

        //         <Text>Name: {place}</Text> 
        //         <Text>Parking rate: {parking}</Text> 
        //         <Text>Wheelchair access rate: {wheelchair_access}</Text> 
        //         <Text>Way to place rate: {way_to_place}</Text>
        //         <Text>Door access rate: {door_access}</Text>
        //         <Text>Stairs alternative rate: {stairs_alternative}</Text>
        //         <Text>Toilets rate: {toilets}</Text> 
        //         <Text>number of ratings: {numOfRatings}</Text> 
        //         <Text>Average rating: {averageRating}</Text> 
                 

        // </View>


        <View>
               {/* Header */}
               <SafeAreaView>
                    <View style={styles.headWrapper}>
                        <Image source={require('../assets/images/Wayable.png')} 
                        style={styles.headImage}
                         />                       
                    </View>
                </SafeAreaView>
                {/* TODO : REQUIRE IMAGE FROM GOOGLE API */}
                <Image style={styles.imageStyle} source={require('../assets/images/azrieli-mall.png')} ></Image>

                {/* Place Name */}
                <View style={styles.placeNameWrapper}> 
                    <Text style = {styles.placeNameStyle}>{place}</Text>
                </View>

                {/* Average Rating */}
                <View style={styles.RatingWrapper1}>
                    <View styles={styles.RatingWrapper2}>
                        <Text style={styles.ratingText}>{averageRating}</Text>
                    </View>
                    <View>
                        <Image style={styles.ratingImage} source={require('../assets/images/rate.png')}></Image>
                    </View>
                </View>



                {/* TO DO : Rating Button & Navigate Button */}



                {/* All Ratings: */}
                <View style={styles.RatingsWrapper}>

                        {/* Parking rating */}
                    <View style={styles.ParkingWrapper}>
                        <Image style={styles.ParkingImage} source={require('../assets/images/parking.png')} ></Image>
                        <Text style={styles.DoorAccess}>Parking</Text>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Text style={styles.DoorRate}>{parking}</Text>
                            <Image style={styles.DoorStar} source={require('../assets/images/rate.png')}></Image>
                        </View>
                    </View>

                        {/* WheelChair rating */}
                    <View style={styles.WheelchairWrapper}>
                        <Image style={styles.ParkingImage} source={require('../assets/images/wheelchair.png')} ></Image>
                        <Text style={styles.DoorAccess}>Wheelchair access</Text>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Text style={styles.DoorRate}>{wheelchair_access}</Text>
                            <Image style={styles.DoorStar} source={require('../assets/images/rate.png')}></Image>
                        </View>
                    </View>

                        {/* Way rating */}
                    <View style={styles.WayWrapper}>
                        <Image style={styles.ParkingImage} source={require('../assets/images/way.png')} ></Image>
                        <Text style={styles.DoorAccess}>Way to place</Text>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Text style={styles.DoorRate}>{way_to_place}</Text>
                            <Image style={styles.DoorStar} source={require('../assets/images/rate.png')}></Image>
                        </View>
                    </View>

                      {/* Door rating */}
                    <View style={styles.DoorWrapper}>
                        <Image style={styles.ParkingImage} source={require('../assets/images/door.png')} ></Image>
                        <Text style={styles.DoorAccess}>Door Access</Text>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Text style={styles.DoorRate}>{door_access}</Text>
                            <Image style={styles.DoorStar} source={require('../assets/images/rate.png')}></Image>
                        </View>
                    </View>

                        {/* Stairs rating */}
                    <View style={styles.StairsWrapper}>
                        <Image style={styles.ParkingImage} source={require('../assets/images/stairs.png')} ></Image>
                        <Text style={styles.DoorAccess}>Stairs Alternative</Text>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Text style={styles.DoorRate}>{stairs_alternative}</Text>
                            <Image style={styles.DoorStar} source={require('../assets/images/rate.png')}></Image>
                        </View>
                    </View>

                           {/* Toilets rating */}
                    <View style={styles.ToiletsWrapper}>
                        <Image style={styles.ParkingImage} source={require('../assets/images/toilet.png')} ></Image>
                        <Text style={styles.DoorAccess}>Toilets</Text>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Text style={styles.DoorRate}>{toilets}</Text>
                            <Image style={styles.DoorStar} source={require('../assets/images/rate.png')}></Image>
                        </View>
                    </View>

                </View>




        </View>
    )
};


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textbox:{ 
        width: '90%',
        fontSize: 16,
        padding:12,
        borderColor: 'gray',
        borderWidth:0.2,
        borderRadius:10,
    },
    headWrapper:{
        position: "absolute",
        left:96,
        top:40,
        borderRadius:null,
        width:188,
        height:24,
    },
    imageStyle:{
        position:"absolute",
        alignContent:"center",
        left: 5,
        top:100,
        borderRadius: 10,
        width: 400,
        height:196,
    },
    placeNameWrapper:{
        position:"absolute",
        left:16,
        top:300,
        width:189,
        height:29,
    },
    placeNameStyle:{
        position:"absolute",
        left:0,
        right:-2,
        top:0,
        width:"auto",
        fontSize:28,
        letterSpacing: -0.5,
        
        textAlign: "left",
    },
    RatingWrapper1:{
        position:"absolute",
        left:16,
        top:335,
        width:96,
        height:45,
    },
    DoorStar:{
        marginLeft:5,
    },
    RatingWrapper2:{
        position:"absolute",
        left:0,
        top:5,
        width:48,
        height:39,
    },
    ratingText:{
        position:"absolute",
        left:0,
        top:4,
        width:50,
        fontSize:32,
        letterSpacing:-0.5,
        textAlign:"left",
    },
    ratingImage:{
        position:"absolute",
        left:50,
        top:0,
        borderRadius:null,
        width:45,
        height:45,

    },
    RatingsWrapper:{
        position:"absolute",
        left:1,
        top:387,
        width:375,
        height:339,
        borderColor:'black',
        borderTopColor:`#add8e6`,
        borderTopWidth:1,
        borderTopLeftRadius:30
        
        
    },
    DoorWrapper:{
        position:"absolute",
        left:10,
        top:170,
        width:104,
        height:133,
    },
    StairsWrapper:{
        position:"absolute",
        left:140,
        top:170,
        width:200,
        height:133,
    },
    ToiletsWrapper:{
        position:"absolute",
        left:310,
        top:170,
        width:200,
        height:133,
    },
    ParkingWrapper:{
        position:"absolute",
        left:10,
        top:67,
        width:200,
        height:133,
    },
    WheelchairWrapper:{
        position:"absolute",
        left:140,
        top:67,
        width:200,
        height:133,
    },
    WayWrapper:{
        position:"absolute",
        left:310,
        top:67,
        width:200,
        height:133,
    },
    ParkingImage:{
        position:"absolute",
        top: -50,
        left:0,
        height:50,
        width:50,      
    },
    
    
}
)


export default PlaceScreen;