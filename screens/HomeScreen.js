import * as React from 'react';
import {View, Text, SafeAreaView, StyleSheet, Image, FlatList,ImageBackground, TouchableOpacity,Button, ScrollView, StatusBar  } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../assets/colors/colors';
import ImageDetail from '../components/imageDetail';
import favoritesData from '../assets/data/favoritesData';
import highlyRatedData from '../assets/data/highlyRatedData';
import { NavigationContainer } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { YellowBox } from 'react-native-web';
import recommendedPlaces from '../assets/data/RecommendedPlaces';

const HomeScreen = ({navigation})=>{

    const renderFavoriteItem = ({item}) => {
        return (
         <View style={styles.favoritesItemWrapper}>
             <TouchableOpacity 
                     onPress={()=>{
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
             <SafeAreaView>
                    <View style={styles.headWrapper}>
                        <ImageBackground style={styles.backgroundTitle} resizeMode='cover' source={require('../assets/images/background.jpg')}>
                        <Image source={require('../assets/images/Wayable3.png')}
                        style={styles.headImage}
                         />
                         </ImageBackground>
                         
                    </View>
                </SafeAreaView>
                <SafeAreaView>
                {/* Search Bar */}
                <View style={styles.searchWrapper}>
                    {/* <Feather name="search" size={25} color={colors} /> */}
                    <View>
                        <GooglePlacesAutocomplete
				            placeholder="Search"
				            fetchDetails={true}
                            enablePoweredByContainer={false}
				            GooglePlacesSearchQuery={{
					        rankby: "distance"
				                }}
				            onPress={(data, details = null) => {
                                navigation.navigate("Place",{name:details["name"]})
				            }}
				            query={{
				        	key: "AIzaSyA0ozFb2HQGkLS5O4_UOo5glqCKPFZrcQM",
					        language: "he",
					        components: "country:il",
					        types: "establishment",
					        radius: 30000,
			            	}}
				            styles={{
				            	container: { flex: 0, zIndex: 1, position: "absolute", width: "100%"},
                                textInput: {height:50,backgroundColor:"#F6F6F6", fontSize: 16, borderRadius:30},
                                    }}
		            	/>
                    </View>
                </View>
                </SafeAreaView>
                <SafeAreaView style={styles.favoritesContainer }>
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
                <View style={styles.favoritsWrapper} >   
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


    )
};

const styles = StyleSheet.create({
    backgroundTitle:{
        width:'100%',
        marginLeft:8,
        height:170,
        borderStartColor:'white',
        borderStartWidth:0,
        borderTopStartRadius:10,
        borderRadius:30,
        borderColor:'white',
        borderWidth:0
        
    },
    container: {
        flex: 1,
        backgroundColor:"#FFFFFF"
      },
    headWrapper:{
        paddingTop: StatusBar.currentHeight,
        justifyContent:'space-between',
        paddingHorizontal: 10,
        paddingLeft: 0,
        alignItems:'center',
        height:'10%',
    },
    headImage:{
        width: 223,
        height: 38,
        marginTop:28,
        marginLeft:85,
        marginRight:76,  
          
    },
    searchWrapper:{
        flex:1,
        hight: 100,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:20,
        marginTop:30,
        marginBottom:50,
            
    },
    favoritesContainer:{
        flex:1,
        paddingTop:15,
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