import * as React from 'react';
import {View, Text, SafeAreaView, StyleSheet, Image, FlatList, TouchableOpacity,Button } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../assets/colors/colors';
import ImageDetail from '../components/imageDetail';
import favoritesData from '../assets/data/favoritesData';
import highlyRatedData from '../assets/data/highlyRatedData';
import { NavigationContainer } from '@react-navigation/native';


const HomeScreen = ({navigation})=>{
    
    const renderFavoriteItem = ({item}) => {
       return (
        <View style={styles.favoritesItemWrapper}>
            <Image source={item.image} style={styles.favoritesItemImage} />
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
                    <Feather name="search" size={25} color={colors} />
                    <View style={styles.search}>
                        <Text style={styles.searchText}> Search </Text>
                    </View>
                </View>

                {/* Favorites */}
                <View style={styles.favoritsWrapper}>   
                    <Text style={styles.favoritsTitle}> Favorites: </Text>
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
                    <Text style={styles.favoritsTitle}> Highly Rated Places: </Text>
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

                    {/* Bottom Buttons */}
                <View style={styles.homeBottomWrapper}>
                    <Image source={require('../assets/images/homeIcon.png')} style={styles.homeBottomImage}/>                  
                    <TouchableOpacity
                            onPress={() => navigation.navigate('MapScreen')}
                            >
                         <View style={{ flexDirection: 'row' }}>                          
                            <Image 
                            source={require('../assets/images/locationIcon.png')}
                            style={styles.homeBottomImage}
                            />
                         </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                            onPress={() => navigation.navigate('UserScreen')}
                            >
                         <View style={{ flexDirection: 'row' }}>                          
                            <Image 
                            source={require('../assets/images/userIcon.png')}
                            style={styles.homeBottomImage}
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
        paddingTop: 100,
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
        hight: 50,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:20,
        marginTop:50,
            
    },
    search:{
        flex:1,
        marginRight:10,
        borderBottomColor: colors.textLight,
        borderBottomWidth: 2,        
    },
    searchText:{
        marginLeft:5,
        fontSize:20,
        marginBottom:3,
        color: colors.textLight,
    },
    favoritsWrapper:{
        marginTop:32,
    },
    favoritsTitle:{
        fontSize:24,
        paddingHorizontal:20,
    },
    favoritesItemWrapper:{


    },
    favoritesItemImage:{

        width: 110,
        height: 110,
        marginLeft:18,
        marginTop: 10,
        backgroundColor:'#2F80ED',
        borderRadius:10,
        alignSelf:'center',
    },
    favoritesItemText:{
        marginLeft:18,
        alignSelf:'center',

    },
    favoritesItemStarText:{
        marginLeft:20,
        marginBottom: 0,
        
     

    },
    favoritesStar:{
        marginLeft:20,
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
    }
        
    
});

export default HomeScreen;