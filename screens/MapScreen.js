import * as React from 'react';
import {View, Text, SafeAreaView, StyleSheet, Image, FlatList, Dimensions,TouchableOpacity } from 'react-native';
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


const MapScreen = ({navigation})=>{
    const [pin,setPin] = React.useState({
        latitude: 32.011261,
        longitude: 34.774811,
    })
    const [region,setRegion] = React.useState({
        latitude: 32.011261,
        longitude: 34.774811,
    })
    const [name,setName] = React.useState([])

    // React.useEffect(
    //     ((data)=>data.json()).then((json)=>{
    //         setName(json.name)
    //     })
    //     )
    

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
					setName(details["name"])
                    console.log(details["name"])
                    console.log(data["description"])
                    
					setRegion({
						latitude: details.geometry.location.lat,
						longitude: details.geometry.location.lng,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421
					})
                    navigation.navigate("PlaceScreen",name)              
				}}               

				query={{
					key: "AIzaSyA0ozFb2HQGkLS5O4_UOo5glqCKPFZrcQM", // My google cloud api (Nati)
					language: "en",
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
                                          
            

                        {/* Bottom Buttons */}
            
                <View style={{}} >
                        <TouchableOpacity style={{alignItems:'center',flex:1}}
                                onPress={() => navigation.navigate('HomeScreen')}
                                >
                            <View style={{ flexDirection: 'row' }}>                          
                                <Image 
                                source={require('../assets/images/homeIcon.png')}
                                style={styles.homeBottomImage}
                                />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{}}
                                onPress={() => navigation.navigate('MapScreen')}
                                >
                            <View style={{ flexDirection: 'row' }}>                          
                                <Image 
                                source={require('../assets/images/locationIcon.png')}
                                style={styles.homeBottomImage}
                                />
                            </View>
                        </TouchableOpacity >
                        <TouchableOpacity style={{}}
                                onPress={() => navigation.navigate('UserScreen')}
                                >
                            <View style={styles.userImage}>                          
                                <Image 
                                source={require('../assets/images/userIcon.png')}
                                style={styles.homeBottomImage}
                                />
                            </View>
                        </TouchableOpacity>                   
                    </View>
                    
        
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
      height: Dimensions.get('window').height - 300
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
    homeBottomWrapper:{
        marginTop:40,
        flexDirection:'row',
        alignItems:'center'
    },
    homeBottomImage:{
        marginLeft:60,
        
        flexDirection:'row',
        alignItems:'center',
    },
    userImage:{
        marginLeft:60,
        
        flexDirection:'row',
        alignItems:'center',
    }
  });

export default MapScreen;