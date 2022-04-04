import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, Text, TouchableOpacity, Image } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import MenuDrawer from 'react-native-side-drawer'
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Change to a proper background image and use the hack.

export default class Datos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            runners : "",
            code : "",
            name : "",
            campus : "",
            photo : "",
            open: false
        };
    }
    
    /* Will get the data stored in our json using AsyncStorage. */
    getData = async() => {
        // Get the information stored in our codeStorage (user code).
        const jsonValue = await AsyncStorage.getItem('data');

        // Parse our json, getting an array, our first position is our code because it has only one element.
        this.setState({code : JSON.parse(jsonValue)[0]});
        console.log("Se obtuvo el codigo del json " + this.state.code);
        
        // https://www.w3schools.com/xml/xml_http.asp
        var xhttp = new XMLHttpRequest();

        // This variable represent this Datos, by doing this, allows us to use setState.
        var _this = this;
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
              console.log("Informacion completa del servidor: " + xhttp.responseText);
              var serverData = xhttp.responseText;
              
              // [0] = nombre
              // [1] = codigo
              // [2] = campus
              // [3] = runners
              // [4] = photo
              // Store the data.
              var data = serverData.split(',');
              _this.setState({name : data[0]});
              _this.setState({campus : data[2]});
              _this.setState({runners : data[3]});
              _this.setState({photo: data[4]});
              
              // Save the most updated information
              AsyncStorage.setItem('data', JSON.stringify([data[0], data[1], data[2], data[3], data[4]]));
          }
        }
        xhttp.open("GET", "https://carreracuceipr.000webhostapp.com/Count.php?codigo="+this.state.code, true);
        xhttp.send();
    }

    componentDidMount() {
        this.getData();
    }
    
    /* Will toggle between the drawerContent and the render function, allows us to close it. */
    toggleOpen = () => {
        this.setState({ open: !this.state.open });
      };

    /* Will draw the content returning how it will looks like. */
    drawerContent = () => {
        return (
            <View style={styles.animatedBox}>
                <View style={styles.imgAvatar}>
                    <Avatar 
                        size={64}
                        rounded
                        source={{uri: this.state.photo}}
                    />
                </View>

                <View>
                    <Text> Nombre del corredor: {this.state.name} </Text>
                    <Text> Codigo: {this.state.code} </Text>
                    <Text> Centro universitario: {this.state.campus} </Text>
                </View>

                <View style={{marginTop: 10}}>
                    <Button title="Cerrar" onPress={this.toggleOpen}></Button>
                </View>
            </View>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <MenuDrawer
                  open={this.state.open}
                  position={'left'}
                  drawerContent={this.drawerContent()}
                  drawerPercentage={60}
                  animationTime={250}
                  overlay={true}
                  opacity={0.4}
                >
                <ImageBackground style={styles.bg} source={require("./Imagenes/background_simple.png")}>
            
                    {/* Will wrap the hamburger icon and text */}
                    <View style={{flexDirection: "row"}}>
                        <TouchableOpacity onPress={this.toggleOpen} style={styles.body}>
                            <Image style={styles.imgHamburger} source={require("./Imagenes/Hamburger_icon.png")} />
                        </TouchableOpacity>

                        <Text style={styles.TextoP}> El numero total de corredores son {this.state.runners} </Text>
                    </View>

                </ImageBackground>
                </MenuDrawer>
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
        fontSize: 30,
        color: "black",
        textAlign: "left",
        marginLeft: -30,
    },
    
    imgAvatar: {
        marginBottom: 3,
        alignItems: "center"
    },
    
    imgHamburger: {
        width: 40,
        height: 60,
        marginLeft: -30
    },
    
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        zIndex: 0
    },
    
    animatedBox: {
        flex: 1,
        backgroundColor: "#38C8EC",
        padding: 10
    },
    
    body: {
        width: 100,
        height: 20,
        alignItems: 'center',
    }
})