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


//navigator.geolocation = require(GEOLOCATION_PACKAGE) // Essential for Current Location feature

const HomeScreen = ({navigation})=>{
    
    const renderFavoriteItem = ({item}) => {
       return (
        <View style={styles.favoritesItemWrapper}>
            <Image 
                source={item.image}
                style={styles.favoritesItemImage} />
             <Text style={styles.favoritesItemText}>{item.title}</Text>
                <Text>
                     <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={styles.favoritesItemStarText}>{item.rate}</Text> 
                        <Image source={require('../assets/images/rate.png')} style={styles.favoritesStar} />
                    </View>
                </Text>

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
                        {/* <Text style={styles.searchText}> Search </Text> */}
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
				            	container: { flex: 0, position: "absolute", width: "100%", zIndex: 1, borderRadius:15},
				            	listView: { backgroundColor: "green" }
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
                        data={highlyRatedData}
                        renderItem={renderFavoriteItem}
                        keyExtractor={(item) => item.id}                    
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}

                        />         
                    </View>
                </View>

                </ScrollView>
                </SafeAreaView>
                    {/* Bottom Buttons */}
                <View style={styles.bottomBarWrapper}>
                    {/* <Image source={require('../assets/images/homeIcon.png')} style={styles.homeBottomImage}/>       */}         
                    <TouchableOpacity
                            onPress={() => navigation.navigate('UserScreen')}
                            >
                         <View style={{ flex:1 }}>                          
                            <Image 
                            source={require('../assets/images/userIcon.png')}
                            style={styles.bottomBarIcon}
                            />
                         </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                            onPress={() => navigation.navigate('MapScreen')}
                            >
                         <View style={{ flex:1 }}>                          
                            <Image 
                            source={require('../assets/images/locationIcon.png')}
                            style={styles.bottomBarIcon}
                            />
                         </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                         <View style={{ flex:1}}>                          
                            <Image 
                            source={require('../assets/images/homeIcon.png')}
                            style={styles.bottomBarIcon}
                            />
                         </View>
                    </TouchableOpacity>   
                </View>
            </View>
    );
};



const styles = StyleSheet.create({
    container:{
        flex:1
    },
    headWrapper:{
        justifyContent:'space-between',
        paddingHorizontal: 20,
        paddingTop: 10,
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
        marginTop:50,
        marginBottom:50
            
    },
    search:{
        flex:1,
        marginRight:10,
        borderBottomColor: colors.textLight,
       // borderBottomWidth: 2,        
    },
    searchText:{
        marginLeft:5,
        fontSize:20,
        marginBottom:3,
        color: colors.textLight,
    },
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
      },
    scrollView: {
        // backgroundColor: 'pink',
        marginBottom:55
      },
    favoritsWrapper:{
        marginTop:8,
    },
    favoritsTitle:{
        fontSize:24,
        paddingHorizontal:5,
    },
    favoritesItemWrapper:{
        marginRight:10

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

    },
    favoritesItemStarText:{
        marginLeft:7,
        marginBottom: 0,

    },
    favoritesStar:{
        marginLeft:7,
    },
    bottomBarWrapper:{
        // marginTop:15,
        position:'absolute',
        bottom:0,
        flexDirection:'row',
        left: 20,
        right: 20,
        elevation:0,
        backgroundColor:'#FAFAFA',
        borderRadius:15,
        height:55,
        // alignItems:'center',
        justifyContent: 'space-evenly',
    },
    bottomBarIcon:{
        
        
        
        // paddingLeft: 8,
        // flex: 1,
        top: 2,
        justifyContent: 'center',
        alignItems: 'center',
        // justifyContent: 'flex-start'
    }
        
    
});

export default HomeScreen;