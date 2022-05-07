import React, { Component } from 'react';
import { View, Text, Button, PermissionsAndroid, DevSettings } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

// Our private access token created from Mapbox.com
MapboxGL.setAccessToken('sk.eyJ1IjoiZWRwZXJlZyIsImEiOiJjbDJzamQ1eGowaHp0M2Jxcjhycml3aGtzIn0.vTrYBmMpL00uIbnzZGEkPA');

export default class Mapa extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
          <MapboxGL.MapView
            styleURL={MapboxGL.StyleURL.Street}
            zoomLevel={16}
            centerCoordinate={defaultCoordinates}
            style={{flex: 1}}>
          
            <MapboxGL.UserLocation/>

            <MapboxGL.Camera
              zoomLevel={16}
              centerCoordinate={defaultCoordinates}
              animationMode={'moveTo'}
              animationDuration={0}
              followUserLocation={true}>

              </MapboxGL.Camera>

          </MapboxGL.MapView>

          <Button title="Permisos" onPress={this.Permisos}></Button>
        </View>
      );
  }
}
