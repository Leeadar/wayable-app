import React from 'react';
import {View, Text, StyleSheet ,Image} from 'react-native';

const ImageDetail = props => {
    console.log(props.title);
    return (<View>
             <Image 
             source={props.imageSource}
             style={styles.homeImages} />
            <Text> {props.title} </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    homeImages:{
        width: 223,
        height: 38,
         
    }
});

export default ImageDetail; 