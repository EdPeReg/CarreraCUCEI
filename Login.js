import React, { Component } from 'react';
// TouchableOpacity nos permite onclick, es transparente.
import { View, Text, ImageBackground, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { NavigationContext } from '@react-navigation/native';

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
        {/* Poner aqui la imagne de telegram del profe */}
        <ImageBackground style={styles.bg} source={require("./Imagenes/login.png")}>
            <View style={styles.btn}>
                {/* Posicionar correctamente en el boton, llamara una funcion que se llama login. */}
                <TouchableOpacity onPress={btnLogin}>
                    {/* A fuerza ocupa haber un elemento, este es en blanco. */}
                    <Text></Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
      </View>
    );
  }
}

// Los estilos afectan cada uno de los elementos graficos.
const styles = StyleSheet.create({
    bg: {
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height
    },
    btn:{
        borderWidth:3,
        borderColor: "white",
        marginTop: 520,
        marginLeft: Dimensions.get("screen").width/3.5,
        width:150,
        height:40
    }
})