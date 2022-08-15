import React, {Component} from 'react';
import {View, Text, SafeAreaView, StyleSheet, Image, FlatList, TouchableOpacity,Button, ScrollView, StatusBar  } from 'react-native';
import StarRating from 'react-native-star-rating';
 
class RatingAccessibility extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      starCount: 0,
    };
  }
 
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }
 
  render() {
    return (
      <View>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={this.state.starCount}
            selectedStar={(rating) => 
              this.onStarRatingPress(rating)
              }
            fullStarColor={'#FFB84E'}
          />
          <View style={styles.button}>
            <Button 
              onPress={() => this.props.setStarRating(this.state.starCount, this.props.setRatingItem)}
              color={"#2D9CDB"}
              title="Submit">
          </Button> 
          </View>      
       
        </View> 
    );
  }
}
 
const styles = StyleSheet.create({
  button: {

  }})


export default RatingAccessibility