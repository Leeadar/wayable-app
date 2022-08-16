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

  onSkipPress(){
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
            {/* <Button 
              onPress={() => this.onSubmitPress()}
              color={"#2D9CDB"}
              disabled={(this.state.starCount > 0) ? false : true}
              title="Next">
          </Button>  */}
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <TouchableOpacity 
                onPress={() =>this.onSubmitPress()} 
                style={styles.button} 
                disabled={(this.state.starCount > 0) ? false : true}>

              <Text style={styles.nextButton}>Next</Text>
              
            </TouchableOpacity>

            <TouchableOpacity onPress={() =>this.onSkipPress()} style={styles.button}>
              <Text style={styles.cancelButton}>Skip</Text>
            </TouchableOpacity>  

          </View>
  
       
        </View> 
    );
  }
}
 
const styles = StyleSheet.create({
  button: {
    marginTop:50,
  },
  nextButton: {
    paddingTop:20,
    paddingBottom:20,
    color:'white',
    textAlign:'center',
    borderRadius: 25,
    backgroundColor:'#2D9CDB',
    width:150,
    marginRight:10,
    fontSize:18
  },
  cancelButton: {
    paddingTop:20,
    paddingBottom:20,
    color:'#FBFBFB',
    textAlign:'center',
    borderRadius: 25,
    backgroundColor:'#BDBDBD',
    width:100,
    fontSize:18
  }
})


export default RatingAccessibility