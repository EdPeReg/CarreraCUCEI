import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, Text } from 'react-native';

// TODO: Change to a proper background image and use the hack.
// TODO: Choose another proper file name.

export default class Conteo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            runners : ""
        };
    }
    
    render() {
        // https://www.w3schools.com/xml/xml_http.asp
        var xhttp = new XMLHttpRequest();

        // This variable represent this Conteo, by doing this, allows us to use setState.
        var _this = this;
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
              // Using this Conteo setState.
              _this.setState({runners : xhttp.responseText});
          }
        }

        xhttp.open("GET", "https://carreracuceipr.000webhostapp.com/Count.php", true);
        xhttp.send();
        
        return (
            <View>
                <ImageBackground style={styles.bg} source={require("./Imagenes/background_simple.png")}>
                    <Text style={styles.TextoP}> El numero total de corredores son {this.state.runners} </Text>
                </ImageBackground>
            </View>
        );
    }
}

// This values are just a little hack, are used to get the correct size for background image.
const win = Dimensions.get('window');
const ratio = win.width / 1080;

const styles = StyleSheet.create({
    bg : {
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height
    },
    
    TextoP: {
        fontSize: 50,
        color: "white",
        textAlign: "center",
    },
})