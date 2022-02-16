// Importancion de los objetos visibles y no visibles
import { Text, View, StyleSheet, Image, Button, TextInput } from 'react-native';
import React, { Component } from 'react';

export default class Ventana1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
        // Se declaran aqui las variables, es necesario inicializarlos si o si.
      Juve: 1,
      Man: 0,
      Goles1: 0,
      Goles2: 0
    };
  }

// Esto forma parte de lo visual (front end).
  render() {
      // Aqui va la programacion grafica, programacion de los botones, sliders y mas, o sea los eventos.
      const Cmarcador = () => {
        // Assign values to variables, mostrar en la pantalla usando setState, para asignar.
        // this.setState({Juve: 0});
        // this.setState({Man: 1});

        // State es para mostrar.
        this.setState({Juve: this.state.Goles1});
        this.setState({Man: this.state.Goles2});
        
        // Do operation.
        // var golesTotal = Juve + contrario;
        // this.setState({Gtotal:golesTotal})
      };

    return (
        // Aqui es toda la parte visible que se moestrara en el celular.
        // El view es como la pantalla del celular, necesario para mostrar elementos.
        <View>
            <Text style={styles.TextoP}> Partido </Text>
            <Image style={styles.logo} source={require("./Imagenes/Juve_logo.jpeg")} />
            <Text style={styles.TextoVS}> VS </Text>
            <Image style={styles.logo} source={{uri:"https://a.espncdn.com/i/teamlogos/soccer/500/360.png"}} />

            <View>
              <Text style={styles.TextoVS}> Marcador de lo equipos </Text>

              {/* Showing variables. */}
              <Text style={styles.TextoVS}> Juventus: {this.state.Juve} </Text>
              <Text style={styles.TextoVS}> Manchester: {this.state.Man} </Text>
            </View>
      
          <View style={styles.btn}>
            <Button title="Cambiar marcador" onPress={Cmarcador}> </Button>
          </View>
      
          <View style={styles.input}>
            {/* On change state will save the value from the textField into the variable. */}
            <TextInput placeholder='Goles Equipo 1' onChangeText={(Goles1) => this.setState({Goles1})}></TextInput>
          </View>

          <View style={styles.input}>
            <TextInput placeholder='Goles Equipo 2' onChangeText={(Goles2) => this.setState({Goles2})}></TextInput>
          </View>
        </View>
    );
  }
}

// Los estilos afectan cada uno de los elementos graficos.
const styles = StyleSheet.create({
    TextoP:{
        fontSize: 50,
        color: "black",
        textAlign: "center"
    },

    logo:{
        width: 140,
        height: 160,
        marginLeft: 140        
    },
    
    TextoVS:{
        fontSize: 40,
        color: "black",
        textAlign: "center"
    },

    btn: {
      width: 200,
      height: 50,
      marginLeft: 100
    },

    input: {
      borderWidth: 2,
      borderColor: "red",
      width: 120,
      height: 50,
      marginLeft: 100,
      marginTop: 3
    }
})