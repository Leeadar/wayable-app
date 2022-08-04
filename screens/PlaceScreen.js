import * as React from 'react';
import {View, Text, SafeAreaView, StyleSheet, Image, FlatList,TextInput,Button } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../assets/colors/colors';
import ImageDetail from '../components/imageDetail';
import favoritesData from '../assets/data/favoritesData';
import highlyRatedData from '../assets/data/highlyRatedData';
import { db } from '../Core/Config';
import { getDatabase, ref, set, onValue, update } from "firebase/database";



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

   // console.log(replaced) // will print the fixed place name


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
                console.log("successfuly retrieved " + place_id )
            }
            else{
                console.log("Need to update")
                
                createData(replaced)
            }
        });
    }

  React.useEffect(()=>{ readData()},[])
    
    return (
        <View on style={styles.container}>
                         

                <Text>Name: {place}</Text> 
                <Text>Parking rate: {parking}</Text> 
                <Text>Wheelchair access rate: {wheelchair_access}</Text> 
                <Text>Way to place rate: {way_to_place}</Text>
                <Text>Door access rate: {door_access}</Text>
                <Text>Stairs alternative rate: {stairs_alternative}</Text>
                <Text>Toilets rate: {toilets}</Text> 
                <Text>number of ratings: {numOfRatings}</Text> 
                <Text>Average rating: {averageRating}</Text> 
                 

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
        fontSize: 18,
        padding:12,
        borderColor: 'gray',
        borderWidth:0.2,
        borderRadius:10,
    }
})

export default PlaceScreen;