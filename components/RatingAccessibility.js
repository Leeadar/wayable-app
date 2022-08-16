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
 
  onSubmitPress() {
      this.props.setStarRating(this.state.starCount, this.props.setRatingItem)
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
              onPress={() => this.onSubmitPress()}
              color={"#2D9CDB"}
              disabled={(this.state.starCount > 0) ? false : true}
              title="Next">
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