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


    // Suppose to add a new place to DB with , default values will be -1 , So the first rating will not calculate average with -1 value.
    function createData() {
        console.log("ok")
        set(ref(db, 'users/' + username), {          
                username: username,
                email: email  
                    }).then(() => {
                      // Data saved successfully!
                      alert('data updated!');    
                  })  
                      .catch((error) => {
                          // The write failed...
                          alert(error);
                      });
    }

    console.log(replaced) // will print the fixed place name


    // for example: if data base will contain /places/Azrieli_Mall , Then replaced = "Azrieli_Mall". 
    function readData(){
        const placeRef = ref(db, 'places/' + replaced);
        onValue(placeRef, (snapshot) => {
            const data = snapshot.val();
            setPlace(data.place_id)
            setDoor(data.door_access)
            setParking(data.parking)
            setStairs(data.stairs_alternative)
            setWay(data.way_to_place)
            setToilets(data.toilets)
            setWheelchair(data.wheelchair_access)
        });
    }

   React.useEffect(()=>{
    readData()
   })

    


    
    return (

        

        <View on style={styles.container}>
                         

                <Text>Name: {place}</Text> 
                <Text>Parking rate: {parking}</Text> 
                <Text>Wheelchair access rate: {wheelchair_access}</Text> 
                <Text>Way to place rate: {way_to_place}</Text>
                <Text>Door access rate: {door_access}</Text>
                <Text>Stairs alternative rate: {stairs_alternative}</Text>
                <Text>Toilets rate: {toilets}</Text> 
                <Button title="submit" 
                onPress={readData}> </Button>    

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