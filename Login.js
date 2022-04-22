import React, { Component } from 'react';
// TouchableOpacity nos permite onclick, es transparente.
import { View, Text, ImageBackground, StyleSheet, Dimensions, TouchableOpacity, Image, Alert } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { Input, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Login extends Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);
    this.state = {
      // Variables to use to save the Input information.
      code:"",
      password:"",
      regexCode : /^[0-9]{9}$/, // Match only numbers with only 9 numbers.
    };
  }

    render() {
      const navigation = this.context;
      // This variable represent this Login, by doing this, allows us to use setState.
      var _this = this;

      /* Will validate if the fields have the corresponding letters or if are empty. */
      const validateFields = () => {
        if(!this.state.regexCode.test(this.state.code))
        {
          Alert.alert("Error!!", "Hay algun campo invalido, vuelva a revisar", [
            { text:"OK", onPress:() => console.log("Campo invalido")}
          ])

          return false;
        }
        return true;
      }

      /* Allows us to change to Registro window. */
      const btn_register = () => {
          console.log("Button registrar pressed");
          // Allows us to move to our Registro window.
          navigation.navigate("Registro");
      }

      /* Validate codigo and password input fields. */
      const btn_send = () => {
        console.log("Button enviar pressed");

        // https://www.w3schools.com/xml/xml_http.asp
        var xhttp = new XMLHttpRequest();

        if(validateFields)
        {
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              console.log(xhttp.responseText);

              if(xhttp.responseText == "-1")
              {
                Alert.alert("Error!!", "Hay algun campo vacio, llene todos los campos", [
                  { text:"OK", onPress:() => console.log("Campo vacio")}
                ])
              }

              // Usuario reconocido.
              if(xhttp.responseText == "1")
              {
                console.log("Usuario certificado");
                // It will create a file 'codeStorage' that will contain our code.
                AsyncStorage.setItem('data', JSON.stringify([_this.state.code]));
                console.log("desde login " + _this.state.code);

                // Move to Datos window.
                navigation.navigate("Datos");
              }

              if(xhttp.responseText == "2")
              {
                Alert.alert("Error!!", "Password erroneo intente de nuevo", [
                  { text:"OK", onPress:() => console.log("pass error")}
                ]);
              }

              if(xhttp.responseText == "0")
              {
                Alert.alert("Error!!", "Usuario no reconocido", [
                  { text:"OK", onPress:() => console.log("user error")}
                ]);
              }
            }
          }
        }

      // GET is the server method, communication channel.
      // The second parameter should be our URL from webhost page, this URL needs to have the correct format
      // and needs to use the correct variables.
      // state is to show values, setState is to assign values.
      xhttp.open("GET", "https://carreracuceipr.000webhostapp.com/Login.php?codigo="+this.state.code+"&password="+this.state.password, true);
      xhttp.send();
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
                keyboardType='numeric'
                // Save the input value to our variable code.
                onChangeText={code => this.setState({code})}
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
                // Save the input value to our variable password.
                onChangeText={password => this.setState({password})}
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

              <TouchableOpacity onPress={btn_send}>
                {/* Enviar button */}
                <Image style={styles.btn_send} source={require("./Imagenes/btn_send.png")} />
              </TouchableOpacity>

              {/* Posicionar correctamente en el boton, llamara una funcion que se llama login. */}
              <TouchableOpacity onPress={btn_register}>
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

// This values are just a little hack, are used to get the correct
// size for background image.
const win = Dimensions.get('window');
const ratio = win.width / 1080;

// Los estilos afectan cada uno de los elementos graficos.
const styles = StyleSheet.create({
    bg: {
        width: win.width,
        height: 2045 * ratio
    },

    btn_send:{
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
