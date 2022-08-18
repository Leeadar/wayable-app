import * as React from 'react';
import {View, Text, SafeAreaView, StyleSheet, Image, FlatList, TouchableOpacity,Button, ScrollView, StatusBar  } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../assets/colors/colors';
import ImageDetail from '../components/imageDetail';
import favoritesData from '../assets/data/favoritesData';
import highlyRatedData from '../assets/data/highlyRatedData';
import { NavigationContainer } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { YellowBox } from 'react-native-web';
import recommendedPlaces from '../assets/data/RecommendedPlaces';


// check git
//navigator.geolocation = require(GEOLOCATION_PACKAGE) // Essential for Current Location feature

const HomeScreen = ({navigation})=>{
    
    const renderFavoriteItem = ({item}) => {
       return (
        <View style={styles.favoritesItemWrapper}>
            <TouchableOpacity 
                    onPress={()=>{
                    console.log(item.title)
                    navigation.navigate("Place",{name:item.title})}}
            >
            <Image source={item.image} style={styles.favoritesItemImage} />
             <Text style={styles.favoritesItemText}>{item.title}</Text>
                <Text>
                     <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={styles.favoritesItemStarText}>{item.rate}</Text> 
                        <Image source={require('../assets/images/rate.png')} style={styles.favoritesStar} />
                    </View>
                </Text>
            </TouchableOpacity>

        </View>       
       );
    }

    return (
            <View style={styles.container}>
                {/* Header */}
                <SafeAreaView>
                    <View style={styles.headWrapper}>
                        <Image source={require('../assets/images/Wayable.png')}
                        style={styles.headImage}
                         />
                         
                    </View>
                </SafeAreaView>

                {/* Search Bar */}
                <View style={styles.searchWrapper}>
                    {/* <Feather name="search" size={25} color={colors} /> */}
                    <View style={styles.search}>
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
				        	key: "AIzaSyA0ozFb2HQGkLS5O4_UOo5glqCKPFZrcQM",
					        language: "he",
					        components: "country:il",
					        types: "establishment",
					        radius: 30000,
					
			            	}}
				            styles={{
				            	container: { flex: 0, position: "absolute", width: "100%", zIndex: 1},
				            	listView: { backgroundColor: "black" },
                                textInput: {height:50,backgroundColor:"#F6F6F6", fontSize: 16, borderRadius:30},
                                    }}
		            	/>
                    </View>
                </View>
                
                {/* Favorites */}
                <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                <View style={styles.favoritsWrapper}>   
                    <Text style={styles.favoritsTitle}> Favorites </Text>
                    <View style={styles.favoritsList}>
                    <FlatList
                        data={favoritesData}
                        renderItem={renderFavoriteItem}
                        keyExtractor={(item) => item.id}                    
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}

                        />         
                    </View>
                </View>
                     {/* {TO BE FIXED - CURRENTLY USING FAVORITES COMPONENTS}    */}
                    {/* Highly Rated Places    */}    
                <View style={styles.favoritsWrapper}>   
                    <Text style={styles.favoritsTitle}> Highly Rated Places </Text>
                    <View style={styles.favoritsList}>
                    <FlatList
                        //inverted
                        data={highlyRatedData}
                        renderItem={renderFavoriteItem}
                        keyExtractor={(item) => item.id}                    
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}

                        />         
                    </View>
                </View>
                <View style={styles.favoritsWrapper}>   
                    <Text style={styles.favoritsTitle}> Recommended Places </Text>
                    <View style={styles.favoritsList}>
                    <FlatList
                       // inverted
                        data={recommendedPlaces}
                        renderItem={renderFavoriteItem}
                        keyExtractor={(item) => item.id}                    
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}

                        />         
                    </View>
                </View>

                </ScrollView>
                </SafeAreaView>
            </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor:"#FFFFFF"
      },
    headWrapper:{
        justifyContent:'space-between',
        paddingHorizontal: 10,
        paddingTop: 0,
        paddingLeft: 0,
        alignItems:'center',
    },
    headImage:{
        width: 223,
        height: 38,
        marginTop:28,
        marginLeft:76,
        marginRight:76,    
    },
    searchWrapper:{
        hight: 100,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:20,
        marginTop:30,
        marginBottom:50,
        backgroundColor:"yellow"
            
    },
    search:{
        flex:1,
        marginRight:10,
        borderBottomColor: colors.textLight,
        borderColor:colors.black
       // borderBottomWidth: 2,        
    },
    searchText:{
        marginLeft:5,
        fontSize:20,
        marginBottom:3,
        color: colors.textLight,
    },
    scrollView: {
        // backgroundColor: 'pink',
        marginBottom:2
      },
    favoritsWrapper:{
        marginTop:8,
    },
    favoritsTitle:{
        fontSize:24,
        paddingHorizontal:5,
    },
    favoritesItemWrapper:{
        marginRight:10,
        justifyContent:'center'
        

    },
    favoritesItemImage:{
        width: 110,
        height: 110,
        
        marginTop: 10,
        backgroundColor:'#2F80ED',
        borderRadius:10,
        alignSelf:'center',
    },
    favoritesItemText:{
        marginLeft:7,
        alignSelf:'center',
        flex:1

    },
    favoritesItemStarText:{
        marginLeft:7,
        marginBottom: 0,

    },
    favoritesStar:{
        marginLeft:7,
    },
        
    
});

export default HomeScreen;