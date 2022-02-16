import React, { Component } from 'react';
import { View, Text, ImageBackground, Dimensions, StyleSheet } from 'react-native';

export default class Ventana2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <ImageBackground source={{uri:"https://www.lacasadeel.net/wp-content/uploads/2014/01/Tarzan.jpg"}}
            resizeMode='cover'
            style={styles.bg}>
            <Text style={styles.login}> Login </Text>
        </ImageBackground>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    bg:{
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height
    },

    login:{
        fontSize: 30,
        color: "red",
        fontWeight: "bold",
        textAlign: "center"
    }
})


