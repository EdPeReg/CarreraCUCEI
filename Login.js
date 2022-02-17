import React, { Component } from 'react';
// TouchableOpacity nos permite onclick, es transparente.
import { View, Text, ImageBackground, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { Input, Icon } from 'react-native-elements';

export default class Login extends Component {
  static contextType = NavigationContext;
  constructor(props) {
    super(props);
    this.state = {
    };
  }

    render() {
    const navigation = this.context;

    const btnLogin = () => {
        // Mostrara en la consola este mensaje.
        console.log("Preisonado")
        navigation.navigate("Registro");
    }  

    return (
      <View>
        <ImageBackground style={styles.bg} source={require("./Imagenes/background.png")}>
          <View style={styles.input}>
            {/* Codigo field. */}
            <Input
                placeholder='Codigo'
                placeholderTextColor='white'
                color="white"
                leftIcon={
                  <Icon 
                    type='font-awesome'
                    name='user-circle'
                    size={24}
                    color='white'
                  />
                }
            />
          </View>

          <View>
            {/* Pass field */}
            <Input
                placeholder='Password'
                placeholderTextColor='white'
                color="white"
                leftIcon={
                  <Icon
                    type='font-awesome'
                    name='lock'
                    size={24}
                    color='white'
                  />
                }
            />
          </View>
      

            {/* Allows us to put a button side by side. */}
            <View style={{ flexDirection:"row" }}>

              {/* Enviar button */}
              <Image style={styles.btn_send} source={require("./Imagenes/btn_send.png")} />

              {/* Posicionar correctamente en el boton, llamara una funcion que se llama login. */}
              <TouchableOpacity onPress={btnLogin}>
                  {/* Registrarse button */}
                  <Image style={styles.btn_reg} source={require("./Imagenes/btn_register.png")} />
      
                  {/* A fuerza ocupa haber un elemento, este es en blanco. */}
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

// Los estilos afectan cada uno de los elementos graficos.
const styles = StyleSheet.create({
    bg: {
        width: win.width,
        height: 2045 * ratio
    },

    btn_send:{
        borderWidth:3,
        borderColor: "white",
        marginTop: 80,
        marginLeft: 50,
        width:150,
        height:40
    },

    btn_reg: {
        borderColor: "white",
        marginTop: 80,
        marginLeft: 30,
        width:150,
        height:40
    },
    
    // This is only to get the correct margin for the inputs.
    input:{
      marginTop: 480,
    },
})