// Se va a poner todas las directivas o la configuracion de la navegacion.
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importaciones de ventanas.
import LOGIN from "./Login";
import REGISTRO from "./Registro";

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const Stack = createNativeStackNavigator();  
      
    return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown:false}}>
              {/* Habra tantos stack como ventanas importemos. El orden tiene que ver. */}
              <Stack.Screen name="Login" component={LOGIN} />
              <Stack.Screen name="Registro" component={REGISTRO} />
          </Stack.Navigator>
        </NavigationContainer>
    );
  }
}
