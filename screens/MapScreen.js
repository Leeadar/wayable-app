import * as React from 'react';
import {View, Text, SafeAreaView, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../assets/colors/colors';
import ImageDetail from '../components/imageDetail';
import favoritesData from '../assets/data/favoritesData';
import highlyRatedData from '../assets/data/highlyRatedData';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// expo install react-native-maps
// npm install react-native-google-places-autocomplete --save
//npm install react-native-geolocation-service ===> for current location (doesnt work yet)


const MapScreen = ()=>{
    const [pin,setPin] = React.useState({
        latitude: 32.011261,
        longitude: 34.774811,
    })
    const [region,setRegion] = React.useState({
        latitude: 32.011261,
        longitude: 34.774811,
    })

    return (

        <View> 
                     {/* Header Image */}
                    <View style={styles.headWrapper}>
                        <Image source={require('../assets/images/Wayable.png')}
                        style={styles.headImage} />                      
                    </View>
             
       <View style={{marginTop:20,flex: 1}}>
                                                                            
                     {/* Google Search Bar */}

            <GooglePlacesAutocomplete
                    
				placeholder="Search"
				fetchDetails={true}
				GooglePlacesSearchQuery={{
					rankby: "distance"
				}}
				onPress={(data, details = null) => {
					// 'details' is provided when fetchDetails = true
					console.log(data, details)
					setRegion({
						latitude: details.geometry.location.lat,
						longitude: details.geometry.location.lng,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421
					})
				}}
				query={{
					key: "AIzaSyA0ozFb2HQGkLS5O4_UOo5glqCKPFZrcQM", // My google cloud api (Nati)
					language: "he",
					components: "country:il",
					types: "establishment",
					radius: 30000,
                    location:`${region.latitude}, ${region.longitude}`              					
				    }}
            
				styles={{
					container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
					listView: { backgroundColor: "white" }
				}}
			/>

          <MapView style={styles.map} 
              initialRegion={{
                latitude: 32.011261,
                longitude:  34.774811,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              provider="google"
              >

                <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />

                <Marker 
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
                   </Marker>    
             
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
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    headWrapper:{
        justifyContent:'space-between',
        paddingHorizontal: 20,
        paddingTop: 100,
        paddingLeft: 0,
        alignItems:'center',
    },
    headImage:{
        width: 223,
        height: 38,
        marginTop:10,
        marginLeft:76,
        marginRight:76,
     
    },
  });

export default MapScreen;