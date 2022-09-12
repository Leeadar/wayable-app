import * as React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, ScrollView, FlatList, TextInput, Button, TouchableOpacity, ImageBackground } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../assets/colors/colors';
import ImageDetail from '../components/imageDetail';
import favoritesData from '../assets/data/favoritesData';
import highlyRatedData from '../assets/data/highlyRatedData';
import { db } from '../Core/Config';
import { getDatabase, ref, set, onValue, update } from "firebase/database";
import { stringLength } from '@firebase/util';
import reviewItemData from '../assets/data/reviewItemData';
import { useIsFocused } from '@react-navigation/native'




// Recieve place id as parameter s
const PlaceScreen = ({ route, navigation }) => {

    // replace ' ' with '_' in place's name (for example:"Azrieli Mall" => "Azrieli_Mall")
    const { name } = route.params;
    const { photoReference } = route.params;

    var str = name;
    var replacedPlaceName = str.split(' ').join('_'); // Compitable id with db's id

    // Set all ratings state
    const [place, setPlace] = React.useState('')
    const [wheelchair_access, setWheelchair] = React.useState('');
    const [way_to_place, setWay] = React.useState('');
    const [door_access, setDoor] = React.useState('');
    const [stairs_alternative, setStairs] = React.useState('');
    const [toilets, setToilets] = React.useState('');
    const [parking, setParking] = React.useState('');
    const [numOfRatings, setNumOfRatings] = React.useState('');
    const [averageRating, setAverageRating] = React.useState('');
    const [dataReviews, setDataReviews] = React.useState([{}]);
    const [placePhotoUrl, setPlacePhotoUrl] = React.useState('https://worker4rent.ee/wp-content/themes/consultix/images/no-image-found-360x260.png');

    const isFocused = useIsFocused() // Is screen focused


    const setUrl = async() => {
        const url=`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=${photoReference}&key=AIzaSyAgQEoppUMU2a9-ZNWs_4l14KrDWsFcKHc`;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = () => {
            setPlacePhotoUrl(xhr.responseURL)
        };
        xhr.send(null);
    }

    
    // Render reviews flatlist
    const renderReviewItem = ({ item }) => {
        return (
            <View style={styles.textReviewlil}>

                <View style={styles.reviewWrap}>
                    <Text style={styles.textReview}>{item.review}</Text>
                </View>
            </View>
        );
    }


    //  add a new place to DB with , default values will be -1 , So the first rating will not calculate average with -1 value.
    function createData(placeName) {
        set(ref(db, 'places/' + placeName), {
            place_id: placeName,
            door_access: 0,
            parking: 0,
            stairs_alternative: 0,
            way_to_place: 0,
            toilets: 0,
            wheelchair_access: 0,
            numOfRatings: 0,
            averageRating: 0,
            reviews: ["check", "if entered"],


        }).then(() => {
            alert('Added new place to our database!');
        })
            .catch((error) => {
                // The write failed...
                alert(error);
            });
    }


    // console.log(replacedPlaceName) // will print the fixed place name


    // Get reviews by place name and mapping id-review to flatList
    function setReviews() {


        const db = getDatabase();
        const dbRef = ref(db, '/places/' + replacedPlaceName + '/reviews')
        const res = []
        let id = 0
        onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childKey = id;
                const childData = childSnapshot.val();
                // console.log("REVIEW_______:\n",childData.review_text,'\n',childKey)           
                res.push({ id: id, review: childData.review_text })
                id++
            });

            setDataReviews((prev) => {
                return res
            })
        })
    }




    // for example: if data base will contain /places/Azrieli_Mall , Then replaced = "Azrieli_Mall". 
    function readData() {
        setUrl();
        const placeRef = ref(db, 'places/' + replacedPlaceName);
        onValue(placeRef, (snapshot) => {
            const data = snapshot.val();
            if (data != null) {

                setPlace(data.place_id)
                setDoor(data.door_access)
                setParking(data.parking)
                setStairs(data.stairs_alternative)
                setWay(data.way_to_place)
                setToilets(data.toilets)
                setWheelchair(data.wheelchair_access)
                setAverageRating(data.averageRating)
                setNumOfRatings(data.numOfRatings)
                setReviews() // Uses setDataReviews

            }
            else {
                console.log("Need to update")
                createData(replacedPlaceName)
            }
        });
    }


    React.useEffect(() => {
        readData()
            //dataFix()
            ;
    }, [isFocused])

    return (
        
        <View style={{flex:1}}>
               {/* Header */}
               <SafeAreaView>
                    <View style={styles.headWrapper}>
                        <Image source={require('../assets/images/Wayable.png')}
                        style={styles.headImage}
                         />
                    </View>
                </SafeAreaView>

           
            <View style={styles.placeImageWrapper}>
                {/* <Image style={styles.imageStyle} source={require('../assets/images/no_image.png')} ></Image> */}
                <Image
                    style={styles.imageStyle}
                    source={{ uri: placePhotoUrl }}
                />
            </View>


            {/* Place Name - Average Rating - Rate Place! */}
            <View style={styles.placeWrapper}>
                <View style={styles.placeWrapperLEFT}>
                    <Text style={styles.placeNameStyle}>{name}</Text>
                    <Text style={styles.ratingText}>{averageRating}</Text>
                    <Image style={styles.ratingImage} source={require('../assets/images/rate.png')}></Image>
                </View>
                <View style={styles.placeWrapperLEFT}>
                    <TouchableOpacity
                        title="Rate This Place"
                        onPress={() => { navigation.navigate("Rating", { key: name, name: name }) }}
                        style={{ flex: 1, alignItems: 'center', marginTop: 5, }}
                    >
                        <Image style={styles.rateImage} source={require('../assets/images/rate_image.png')}></Image>
                        <Text style={styles.rateText}> Rate Place! </Text>

                    </TouchableOpacity>

                </View>
            </View>


            {/* Numeric Reviews by criteria */}
            <View style={styles.reviewsWrapper}>

                <View style={styles.reviewWrapper}>
                    <Image style={styles.ReviewImage} source={require('../assets/images/wheelchair.png')} ></Image>
                    <Text style={styles.ReviewText}>Wheelchair access</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.ReviewNumber}>{wheelchair_access}</Text>
                        <Image style={styles.ReviewStar} source={require('../assets/images/rate.png')}></Image>
                    </View>
                </View>

                <View style={styles.reviewWrapper}>
                    <Image style={styles.ReviewImage} source={require('../assets/images/way.png')} ></Image>
                    <Text style={styles.ReviewText}>Way to place</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.ReviewNumber}>{way_to_place}</Text>
                        <Image style={styles.ReviewStar} source={require('../assets/images/rate.png')}></Image>
                    </View>
                </View>


                <View style={styles.reviewWrapper}>
                    <Image style={styles.ReviewImage} source={require('../assets/images/door.png')} ></Image>
                    <Text style={styles.ReviewText}>Door accessibility</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.ReviewNumber}>{door_access}</Text>
                        <Image style={styles.ReviewStar} source={require('../assets/images/rate.png')}></Image>
                    </View>
                </View>

                <View style={styles.reviewWrapper}>
                    <Image style={styles.ReviewImage} source={require('../assets/images/stairs.png')} ></Image>
                    <Text style={styles.ReviewText}>Stairs alternative</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.ReviewNumber}>{stairs_alternative}</Text>
                        <Image style={styles.ReviewStar} source={require('../assets/images/rate.png')}></Image>
                    </View>
                </View>

                <View style={styles.reviewWrapper}>
                    <Image style={styles.ReviewImage} source={require('../assets/images/toilet.png')} ></Image>
                    <Text style={styles.ReviewText}>Toilets accessibility</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.ReviewNumber}>{toilets}</Text>
                        <Image style={styles.ReviewStar} source={require('../assets/images/rate.png')}></Image>
                    </View>
                </View>

                <View style={styles.reviewWrapper}>
                    <Image style={styles.ReviewImage} source={require('../assets/images/parking.png')} ></Image>
                    <Text style={styles.ReviewText}>Parking availability</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.ReviewNumber}>{parking}</Text>
                        <Image style={styles.ReviewStar} source={require('../assets/images/rate.png')}></Image>
                    </View>
                </View>

            </View>


            {/* Text Reviews */}
            <View style={{ backgroundColor: 'white', }}>
                <Text style={styles.reviewsText}>{reviewItemData.length ? 'Reviews' : ''}</Text>

            </View>

           
            <FlatList
                //extraData={dataFixed}
                data={dataReviews}
                renderItem={renderReviewItem}
                keyExtractor={(item) => item.id}
            //horizontal
            />
        </View>
    )
};


const styles = StyleSheet.create({
    reviewsText: {
        marginRight: 2,
        fontSize: 24,
        letterSpacing: -0.5,
        fontWeight: "500",
        color: "#2e6990",
        textAlign: "center",
        opacity: 1,
        textShadowColor: "black",
        textShadowRadius: 1,
        paddingBottom: 10,
        marginTop: 5,
    },
    reviewWrap: {
        width: '100%',
        backgroundColor: 'white',
        height: 60,
        alignContent: 'center',
        marginLeft: 50,
        marginTop: 10,
        marginBottom: 10,
        borderColor: 'grey',
        borderWidth: 1,

    },
    reviewsWrapper: {
        width: '100%',
        height: 100,
        backgroundColor: 'white',
        flexDirection: 'column',
        flexWrap: 'wrap',

    },
    titleBackground: {
        opacity: 1,
        width: '100%',
    },
    textReviewlil: {

        width: '80%',
        backgroundColor: "lightcyan",
        borderStartColor: 'white',
        borderEndColor: 'white',
        borderStartWidth: 5,
        borderEndWidth: 5,
        borderTopColor: 'white',
        borderBottomColor: 'white',
        borderWidth: 0.5,
        borderBottomWidth: 2,
        borderTopWidth: 0,


    },
    textReview: {
        width: '100%',

        letterSpacing: -0.5,
        fontWeight: "500",
        color: "#2e6990",
        textAlign: "center",
        marginBottom: 20,
        marginTop: 20,

    },
    ScrollStyle: {
        width: '100%',
        // height:1000,
        flexGrow: 1,
        maxHeight: 1000,

    },
    textReviewsWrapper: {
        width: '100%',
        height: 300,
        backgroundColor: 'white',
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderStartColor: 'blue',
        borderStartWidth: 1,
    },
    reviewWrapper: {
        marginRight: 0,
        marginLeft: 5,
        marginTop: 7,
        width: '15.4%',
        height: '70%',
        borderBottomColor: 'green',
        flexDirection: 'column',
        alignItems: 'center',
        borderRightColor: '#d3d3d3',
        borderRightWidth: 0.2,

        //flexWrap:'wrap',
    },
    ReviewText: {
        marginRight: 2,
        fontSize: 12,
        letterSpacing: -0.5,
        fontWeight: "500",
        color: "#2e6990",
        textAlign: "center",
        opacity: 1,
        textShadowColor: "black",
        textShadowRadius: 1,
        paddingBottom: 10,
    },
    ReviewNumber: {
        fontSize: 16,
        letterSpacing: -0.5,
        fontWeight: "500",
        color: "#4682b4",
        textAlign: "center",
        opacity: 1,
        textShadowColor: "black",
        textShadowRadius: 2,
        paddingBottom: 10,
    },
    rateWrapper: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 0,
        paddingHorizontal: 0,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',



    },
    rateText: {
        fontSize: 20,
        letterSpacing: -0.5,
        fontWeight: "500",
        color: "#2e6990",
        textAlign: "left",
        opacity: 0.8,
        textShadowColor: "black",
        textShadowRadius: 1,
        paddingBottom: 10,
    },
    scrollWrapper: {
        width: '100%',
        height: 500,
        top: 0
    },
    rateImage: {
        height: 60,
        width: 60,
    },
    placeWrapperLEFT: {
        flex: 1,

        width: '50%',
        borderRightColor: "#2e6990",
        borderRightWidth: 0.3,
        borderRadius: 10,
        borderEndWidth: 2,
        height: '100%',
        backgroundColor: 'white',
    },
    placeImageWrapper: {
        paddingTop: 0,
        width: '100%',
        backgroundColor: 'white',
        borderBottomColor: "#2e6990",
        borderBottomWidth: 1,
        borderBottomStartRadius: 0,
        borderBottomLeftRadius: 30,
        height: '30%',
    },
    placeWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'white',
        width: '100%',
        height: '15%',
        top: 0,

    },
    textbox: {
        width: '90%',
        fontSize: 16,
        padding: 12,
        borderColor: 'gray',
        borderWidth: 0.2,
        borderRadius: 10,
    },
    headWrapper: {
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingTop: 20,
        paddingLeft: 0,
        alignItems: 'center',
        paddingBottom: 10,
        borderBottomColor: "#2e6990",
        marginTop: 25
    },
    headImage: {
        width: 223,
        height: 38,
        marginTop: 40,
        marginLeft: 85,
        marginRight: 76,
        opacity: 1,

    },
    backgroundTitle: {
        height: 100,
        width: '100%',
        marginLeft: 10,
    },
    imageStyle: {
        // position:"absolute",


        top: 0,
        borderRadius: 10,
        width: '100%',
        height: '100%',
        opacity: 0.7,


    },
    placeNameWrapper: {
        //position:"absolute",
        left: 16,
        top: 300,
        width: 189,
        height: 29,
        borderBottomColor: 'grey'

    },
    placeNameStyle: {
        // position:"absolute",
        paddingLeft: 10,
        left: 0,
        right: -2,
        top: 0,
        width: '100%',
        fontSize: 23,
        letterSpacing: -0.5,
        fontWeight: "500",
        color: "#2e6990",
        textAlign: "left",
        opacity: 0.8,
        textShadowColor: "black",
        textShadowRadius: 1,
        paddingBottom: 3,


    },
    RatingWrapper1: {
        //position:"absolute",
        left: 16,
        top: 335,
        width: 110,
        height: 45,
        borderBottomColor: 'grey'

    },
    ReviewStar: {
        opacity: 0.3,
        top: -5,
        marginLeft: 3,
        height: 0,
        width: 0,
    },
    RatingWrapper2: {
        //position:"absolute",
        left: 0,
        top: 5,
        width: 48,
        height: 39,
        borderBottomColor: 'grey'

    },
    ratingText: {
        // position:"absolute",
        paddingLeft: 10,
        left: 0,
        right: -2,
        top: 0,
        width: 250,
        fontSize: 30,
        letterSpacing: -0.5,
        fontWeight: "500",
        color: "#4682b4",
        textAlign: "left",
        opacity: 1,
        textShadowColor: "black",
        textShadowRadius: 5,
    },
    ratingImage: {
        // position:"absolute",
        left: 85,
        top: -45,
        borderRadius: null,
        width: 45,
        height: 45,
        opacity: 0.7,


    },
    RatingsWrapper: {
        //  position:"absolute",
        left: 1,
        top: 387,
        width: 375,
        height: 339,
        borderColor: 'black',
        borderTopColor: `#add8e6`,
        borderTopWidth: 1,
        borderTopLeftRadius: 30,
        borderBottomColor: 'grey'



    },
    DoorWrapper: {
        //   position:"absolute",
        left: 10,
        top: 170,
        width: 104,
        height: 133,
    },
    StairsWrapper: {
        // position:"absolute",
        left: 140,
        top: 170,
        width: 200,
        height: 133,
    },
    ToiletsWrapper: {
        //   position:"absolute",
        left: 310,
        top: 170,
        width: 200,
        height: 133,
    },
    ParkingWrapper: {
        //  position:"absolute",
        left: 10,
        top: 67,
        width: 200,
        height: 133,
    },
    WheelchairWrapper: {
        // position:"absolute",
        left: 140,
        top: 67,
        width: 200,
        height: 133,
    },
    WayWrapper: {
        //   position:"absolute",
        left: 310,
        top: 67,
        width: 200,
        height: 133,
    },
    ReviewImage: {
        //  position:"absolute",
        top: 0,
        left: 0,
        height: 30,
        width: 30,
    },
    placeWrapperRIGHT: {
        width: '50%',
        position: 'relative',
        height: 50,
        backgroundColor: 'grey',
        left: 100,

    },
    ButtonStyle: {
        width: 10,
        textAlignVertical: "center",
        textShadowColor: "black",
        shadowRadius: 50,
        shadowOpacity: 0,
    }


}
)


export default PlaceScreen;