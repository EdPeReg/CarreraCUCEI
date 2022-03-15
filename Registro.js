import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions, Image, TouchableOpacity, Alert } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { Input } from 'react-native-elements'

export default class Registro extends Component {
  static contextType = NavigationContext;
  constructor(props) {
    super(props);
    this.state = {
      // Variables used to save user information.
      name : "",
      code : "",
      password : "",
      phone : "",
      email : "",
      campus : "",
      semester : "",
      regexCode : /^[0-9]{9}$/,         // Match only numbers with only 9 numbers.
      regexPhone : /^[0-9]{10}$/,       // Match only numbers with only 10 numbers.
      regexLetters : /^[A-Za-z\s]+$/,   // Match only letters with white spaces.
      regexEmail : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    };
  }

  render() {
    const navigation = this.context;
    
    /* Will validate if the fields have the corresponding letters or if are empty. */
    validateFields = () => {
      if((!this.state.regexLetters.test(this.state.name)) ||
         (!this.state.regexCode.test(this.state.code))    || 
         (!this.state.regexPhone.test(this.state.phone))  ||
         (!this.state.regexEmail.test(this.state.email))  ||
         (!this.state.regexLetters.test(this.state.campus)) ||
         (!this.state.regexLetters.test(this.state.semester))) 
      {
        Alert.alert("Error!!", "Hay algun campo invalido, vuelva a revisar", [
          { text:"OK", onPress:() => console.log("Campo invalido")}
        ])
        
        return false;
      } 
      return true;
    }
    
    const btnToLogin = () => {
      console.log("Registro window button regresar pressed");
      navigation.navigate("Login");
    }

    const btnEnviar = () => {
      console.log("Registro window button enviar pressed");
      
      /**** xhttp request to validate user information. ****/
      // https://www.w3schools.com/xml/xml_http.asp
      var xhttp = new XMLHttpRequest();

      if(validateFields()) 
      {
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            console.log(xhttp.responseText);

            // A field is empty, show an error.
            if (xhttp.responseText == '-1') {
              Alert.alert(
                'Error!!',
                'Hay algun campo vacio, llene todos los campos',
                [{text: 'OK', onPress: () => console.log('Campo vacio')}],
              );
            }

            // User is registered already.
            if (xhttp.responseText == '3') {
              Alert.alert(
                'Error!!',
                'Usuario ya registrado, registre otro usuario',
                [
                  {
                    text: 'OK',
                    onPress: () => console.log('Usuario ya registrado'),
                  },
                ],
              );
            }

            // User was registered successfully, go to login.
            if (xhttp.responseText == '1') {
              console.log('Usuario registrado exitosamente');
              navigation.navigate('Login');
            }

            // Something else happened, probably from the query side.
            if (xhttp.responseText == '0') {
              Alert.alert(
                'Error!!',
                'Algo raro acaba de pasar... revisar el php',
                [{text: 'OK', onPress: () => console.log('Error del servidor')}],
              );
            }
          }
        };
      } 

    xhttp.open("GET", "https://carreracuceipr.000webhostapp.com/Registro.php?nombre="
                       +this.state.name+"&codigo="+this.state.code+"&correo="
                       +this.state.email+"&telefono="+this.state.phone+"&password="
                       +this.state.password+"&centro="+this.state.campus+"&semestre="
                       +this.state.semester, 
                       true);
    xhttp.send();
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
            onChangeText={name => this.setState({name})}
          />
        </View>

        <View style={{marginTop:-40}}>
          <Input
            style={styles.input}
            placeholder="Codigo"
            placeholderTextColor="white"
            color="white"
            backgroundColor="#5C6161"
            keyboardType='numeric'
            onChangeText={code => this.setState({code})}
          />
        </View>

        <View style={{marginTop:-40}}>
          <Input
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="white"
            color="white"
            backgroundColor="#5C6161"
            onChangeText={password => this.setState({password})}
          />
        </View>
      
        <View style={{marginTop:-40}}>
          <Input
            style={styles.input}
            placeholder="Telefono"
            placeholderTextColor="white"
            color="white"
            backgroundColor="#5C6161"
            keyboardType='numeric'
            onChangeText={phone => this.setState({phone})}
          />
        </View>
      
        <View style={{marginTop:-40}}>
          <Input
            style={styles.input}
            placeholder="Correo"
            placeholderTextColor="white"
            color="white"
            backgroundColor="#5C6161"
            keyboardType='email-address'
            onChangeText={email => this.setState({email})}
          />
        </View>

        <View style={{marginTop:-40}}>
          <Input
            style={styles.input}
            placeholder="Centro"
            placeholderTextColor="white"
            color="white"
            backgroundColor="#5C6161"
            onChangeText={campus => this.setState({campus})}
          />
        </View>

        <View style={{marginTop:-40}}>
          <Input
            style={styles.input}
            placeholder="Semestre"
            placeholderTextColor="white"
            color="white"
            backgroundColor="#5C6161"
            onChangeText={semester => this.setState({semester})}
          />
        </View>
        {/********************************* */}
      
        {/* Allows us to put a button side by side. */}
        <View style={{ flexDirection:"row" }}>
            {/* Call the next function to give the corresponding behaviour. */}
            <TouchableOpacity onPress={btnEnviar}>
              {/* Enviar button */}
              <Image style={styles.btn_send} source={require("./Imagenes/btn_send.png")} />

              <Text></Text>  
            </TouchableOpacity>

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
