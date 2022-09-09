import * as React from 'react';
import {View, Text, SafeAreaView, StyleSheet, Image, FlatList, Dimensions,TouchableOpacity,Button, ImageBackground } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../assets/colors/colors';
import ImageDetail from '../components/imageDetail';
import favoritesData from '../assets/data/favoritesData';
import highlyRatedData from '../assets/data/highlyRatedData';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useSafeAreaFrame } from 'react-native-safe-area-context';

//import Geolocation from '@react-native-community/geolocation';

//Geolocation.getCurrentPosition(info => console.log(info));
//navigator.geolocation = require('react-native-geolocation-service');

// expo install react-native-maps
// npm install react-native-google-places-autocomplete --save
//npm install react-native-geolocation-service ===> for current location (doesnt work yet)


const MapScreen = ({navigation})=>{
    
    const [buttonText, setButtonText] = React.useState("Please find a location")
    const [photoReference, setPhotoReference] = React.useState("")

    function doChanges(text) {
        var ret = "Show '" + text + "'s Detials" 
        setButtonText(ret);

    }
    const [pin,setPin] = React.useState({
        latitude: 32.011261,
        longitude: 34.774811,
    })
    const [region,setRegion] = React.useState({
        latitude: 32.011261,
        longitude: 34.774811,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    })
    const [name,setName] = React.useState("Please find a location")
  
    const [showButton,setShowButton] = React.useState(true)


    return (

        <View > 
                     {/* Header Image */}

                     <SafeAreaView>
                    <View style={styles.headWrapper}>
                        <ImageBackground style={styles.backgroundTitle} resizeMode='cover' source={require('../assets/images/background.jpg')}>
                        <Image source={require('../assets/images/Wayable3.png')}
                        style={styles.headImage}
                         />
                         </ImageBackground>
                         
                    </View>
                </SafeAreaView>
             
       <View style={{marginTop:0,flex: 1,marginBottom:45}}>
                                                                            
                     {/* Google Search Bar */}
            <GooglePlacesAutocomplete
                style={styles.SearchBar}    
				placeholder="Search"
				fetchDetails={true}
                enablePoweredByContainer={false}
				GooglePlacesSearchQuery={{
					rankby: "distance"
                    
				}}
                
				onPress={(data, details=null) => {
					// 'details' is provided when fetchDetails = true
					setPhotoReference(details.photos[0].photo_reference)
                    console.log(details.photos[0].photo_reference)
					setRegion({
						latitude: details.geometry.location.lat,
						longitude: details.geometry.location.lng,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421
					})
                    
                    setPin({
						latitude: details.geometry.location.lat,
						longitude: details.geometry.location.lng,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421
					})

                    setName(details["name"])    
                    setShowButton(false)
                    doChanges(details["name"])
                    
                    
				}}               
                
				query={{
					key: "AIzaSyA0ozFb2HQGkLS5O4_UOo5glqCKPFZrcQM", // My google cloud api (Nati)
					language: "en",
					components: "country:il",
					types: "establishment",
					radius: 30000,
                    location:`${region.latitude}, ${region.longitude}`              					
                }}

                // currentLocation={true}
                // currentLocationLabel='Current location'

				styles={{
					container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
					listView: { backgroundColor: "white" }
				}}
			/>           
           </View> 
        <View>
           <Button  // move to place Button
                title={buttonText} 
                disabled={showButton}          
                onPress={() => {
                            navigation.navigate("Place",{
                                name:name,
                                photoReference:photoReference
                                })
                         }}
            />   
          <MapView style={styles.map} 
            //   initialRegion={{
            //     latitude: 32.011261,
            //     longitude:  34.774811,
            //     latitudeDelta: 0.0922,
            //     longitudeDelta: 0.0421,
            //   }}
              region={region}
              provider="google"
              onRegionChangeComplete={setRegion}
              >
                
                <Marker 
                    coordinate={{ latitude: pin.latitude, longitude: pin.longitude }}
                    title={name}
                    description="This is your location!"
                    
                />

                {/* <Marker 
                    coordinate={pin}
                    pinColor="blue"
                    draggable={true}
                    onDragStart={(e)=>{
                        console.log("Drag Start", e.nativeEvent.coordinate)
                    }}
                    onDragEnd={(e)=>{
                        setPin({
                            latitude: e.nativeEvent.coordinate.latitude,
                            longitude: e.nativeEvent.coordinate.longitude
                        })
                    }}
                    >
                        <Callout>
                            <Text>I'm right here!</Text>
                        </Callout>
                   </Marker>                         */}
            </MapView>

            </View>                              
        </View>
        
    )
};



const styles = StyleSheet.create({
    container: {      
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width ,
      height: Dimensions.get('window').height - 250
    },
    backgroundTitle:{
        width:'100%',
        marginLeft:8,
        height:100,
        borderStartColor:'white',
        borderStartWidth:0,
        borderTopStartRadius:10,
        borderRadius:30,
        borderColor:'white',
        borderWidth:0
        
    },
    headWrapper:{
        justifyContent:'space-between',
        paddingHorizontal: 10,
        paddingTop: 24,
        paddingLeft: 0,
        alignItems:'center',
        marginTop:25
    },
    headImage:{
        width: 223,
        height: 38,
        marginTop:28,
        marginLeft:84,
        marginRight:76,    
    },
    homeBottomWrapper:{
        marginTop:40,
        flexDirection:'row',
        alignItems:'center'
    },
    SearchBar:{
        backgroundColor:"#e0ffff"
    },
        
  });

export default MapScreen;