import React, { Component } from 'react';
// Dimensiosn will known our cellphone resolution.
import { View, Text , ImageBackground , StyleSheet, Dimensions} from 'react-native';
import { Input, Icon , Button } from 'react-native-elements';

export default class Ventana2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <ImageBackground source={{uri:"https://as2.ftcdn.net/v2/jpg/00/82/89/91/1000_F_82899107_V6loIc5HVTNaak8PUmOr7tHbNrmtA7oV.jpg"}}
                                resizeMode='cover'
                                style={styles.imgBackground}>
            <Text style={styles.txtLogin}> Login </Text>
        
            {/* User field. */}
            <Input
                placeholder='Usuario'
                leftIcon={
                  <Icon
                    type='font-awesome'
                    name='user-circle'
                    size={24}
                    color='green'
                  />
                }
          />

            {/* Pass field */}
            <Input
                placeholder='Password'
                leftIcon={
                  <Icon
                    type='font-awesome'
                    name='lock'
                    size={24}
                    color='green'
                  />
                }
          />
        
            {/* Log in button */}
            <Button
                    title="Log in"

                    icon={{
                        name: 'home',
                        type: 'font-awesome',
                        size: 15,
                        color: 'white',
                    }}

                    loading={false}
                    loadingProps={{ size: 'small', color: 'white' }}
                    buttonStyle={{
                      backgroundColor: 'rgba(111, 202, 186, 1)',
                      borderRadius: 10,
                    }}
                    titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
                    containerStyle={{
                      marginHorizontal: 110,
                      height: 50,
                      width: 200,
                      marginVertical: 10,
                    }}
                    onPress={() => console.log('aye')}
          />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    imgBackground:{
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height
    },

    txtLogin:{
        color: "black",
        textAlign: "center",
        fontSize: 30,
        fontWeight: "600"
    }
})