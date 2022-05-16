import React, { Component } from 'react';
import { View, Button, PermissionsAndroid, DevSettings, Text } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Our private access token created from Mapbox.com
MapboxGL.setAccessToken('sk.eyJ1IjoiZWRwZXJlZyIsImEiOiJjbDJzamQ1eGowaHp0M2Jxcjhycml3aGtzIn0.vTrYBmMpL00uIbnzZGEkPA');

export default class Mapa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kilometers : 0,
            code : 0
        };
    }
  
    /* Gets the latitude and longitude from the cellphone, every time the cellphone moves,
     * this function is called, updating the position in the map. */
    onLocationUpdate = (e) => {
      // this.onLocationUpdate(e);

      this.setState(
        {
          coordinates: [e.coords.longitude, e.coords.latitude],
        },
        () => {
          // console.log(this.state.coordinates);
        }
      )
    }
  
    componentDidMount = async() => {
      var xhttp = new XMLHttpRequest();
      let _this = this;
      
      // Get the information stored in our data (data information).
      const jsonValue = await AsyncStorage.getItem('data');
      console.log("json value " + jsonValue);
      this.setState({code : JSON.parse(jsonValue)[1]});

      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          console.log("Datos: " + xhttp.responseText);

          // Typical action to be performed when the document is ready:
          _this.setState({kilometers: xhttp.responseText});
        }
      };
      xhttp.open(
        'GET',
        'https://carreracuceipr.000webhostapp.com/Avance.php?codigo='+this.state.code,
        true,
      );

      xhttp.send();
    }  
  
    Permisos = async () => {
        // Permissions call for device location.
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    // This doesn't really show.
                    // TODO: FIX THIS. IT SHOULD BE SHOWN WHEN YOU ASK PERMISSION ABOUT DEVICE LOCATION.
                    title: 'PERMISO LOCALIZACION',
                    message: 'PERMISO LOCALIZACION' + 'POSICION EN EL MAPA',
                    buttonNeutral: 'Ask me later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );

            if (granted == PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
            } else {
                console.log('Camera permissions denied');
            }
        } catch {
            // Refresh the app when you reload from androidStudio.
            DevSettings.reload();
        }
    };


    render() {
        // CUCEI Coordinates.
        const defaultCoordinates = [-103.32821378851337, 20.656413039139803];

        return (
          // Fit to all the screen.
          <View style={{flex: 1, height: '100%', width: '100%'}}>
            <Text
              style={{
                fontSize: 40,
                color: 'red',
                textAlign: 'center',
                marginBottom: 20,
              }}>
              Mi avance
            </Text>

            {/* // Kilometers animated circle.   */}
            <View style={{marginLeft: 200, width: 120, height: 100}}>
              <AnimatedCircularProgress
                arcSweepAngle={180}
                rotation={-90}
                size={120}
                width={15}
                fill={this.state.kilometers}
                tintColor="#00e0ff"
                backgroundColor="#3d5875">
                {fill => (
                  <Text style={{color: 'black'}}>
                    {this.state.kilometers / 10}km / 10 km
                  </Text>
                )}
              </AnimatedCircularProgress>
            </View>

            {/* // Days animated circle.   */}
            <View style={{marginTop: -100, marginLeft: 50}}>
              <AnimatedCircularProgress
                arcSweepAngle={180}
                rotation={-90}
                size={120}
                width={15}
                fill={50}
                tintColor="#00e0ff"
                backgroundColor="#3d5875">
                  {/* // TODO: what is this? */}
                {fill => <Text style={{color: 'black'}}>3 dias / 5 dias</Text>}
              </AnimatedCircularProgress>
            </View>

            {/* Map configuration. */}
            <MapboxGL.MapView
              styleURL={MapboxGL.StyleURL.Street}
              zoomLevel={16}
              centerCoordinate={defaultCoordinates}
              style={{flex: 1}}>

              {/* Allows us to show our user location. */}
              <MapboxGL.UserLocation
                visible={true}
                onUpdate={this.onLocationUpdate}
              />

              <MapboxGL.Camera
                zoomLevel={16}
                centerCoordinate={defaultCoordinates}
                animationMode={'moveTo'}
                animationDuration={0}
                followUserLocation={true}></MapboxGL.Camera>
            </MapboxGL.MapView>

            <Button title="Permisos" onPress={this.Permisos}></Button>
          </View>
        );
    }
}
