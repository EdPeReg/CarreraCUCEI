import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { Input } from 'react-native-elements'

export default class Registro extends Component {
  static contextType = NavigationContext;
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const navigation = this.context;
    
    const btnToLogin = () => {
      console.log("Registro window button regresar pressed");
      navigation.navigate("Login");
    }
    
    return (
      <View>
        <ImageBackground style={styles.bg} source={require("./Imagenes/background.png")} >
          <Text style={styles.txtRegister}> Registro </Text>
      
        {/* Each view for the input has this marginTop=-10 to not have all the inputs separated. */}
        {/**********  INPUTS  **************/}
        <View style={{marginTop:-10}}>
          <Input
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor="white"
            color="white"
            backgroundColor="#5C6161"
          />
        </View>

        <View style={{marginTop:-40}}>
          <Input
            style={styles.input}
            placeholder="Codigo"
            placeholderTextColor="white"
            color="white"
            backgroundColor="#5C6161"
          />
        </View>

        <View style={{marginTop:-40}}>
          <Input
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="white"
            color="white"
            backgroundColor="#5C6161"
          />
        </View>
      
        <View style={{marginTop:-40}}>
          <Input
            style={styles.input}
            placeholder="Telefono"
            placeholderTextColor="white"
            color="white"
            backgroundColor="#5C6161"
          />
        </View>
      
        <View style={{marginTop:-40}}>
          <Input
            style={styles.input}
            placeholder="Correo"
            placeholderTextColor="white"
            color="white"
            backgroundColor="#5C6161"
          />
        </View>

        <View style={{marginTop:-40}}>
          <Input
            style={styles.input}
            placeholder="Escuela"
            placeholderTextColor="white"
            color="white"
            backgroundColor="#5C6161"
          />
        </View>

        <View style={{marginTop:-40}}>
          <Input
            style={styles.input}
            placeholder="Grado"
            placeholderTextColor="white"
            color="white"
            backgroundColor="#5C6161"
          />
        </View>
        {/********************************* */}
      
        {/* Allows us to put a button side by side. */}
        <View style={{ flexDirection:"row" }}>
            {/* Enviar button */}
            <Image style={styles.btn_send} source={require("./Imagenes/btn_send.png")} />

            {/* Posicionar correctamente en el boton, llamara una funcion que se llama login. */}
            <TouchableOpacity onPress={btnToLogin}>
                {/* Regresar button */}
                <Image style={styles.btn_regresar} source={require("./Imagenes/btn_regresar.png")} />
    
                {/* Mandatory */}
                <Text></Text>
            </TouchableOpacity>
        </View>

        </ImageBackground>
      </View>
    );
  }
}

const win = Dimensions.get('window');
const ratio = win.width / 1080;

const styles = StyleSheet.create({
    bg: {
        width: win.width,
        height: 2045 * ratio,
    },
    
    txtRegister: {
      color: "white",
      fontSize: 50,
      marginTop: 75,
      marginLeft: Dimensions.get("screen").width / 4.5
    },

    input: {
      height: 10,
      margin: 12,
      borderWidth: 2,
      padding: 10,
    },

    btn_send: {
        borderWidth:3,
        borderColor: "white",
        marginTop: 150,
        marginLeft: 50,
        width:150,
        height:40
    },
    
    btn_regresar: {
        borderColor: "white",
        marginTop: 150,
        marginLeft: 30,
        width:150,
        height:40
    },
})
