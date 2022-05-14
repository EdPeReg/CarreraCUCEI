# CarreraCUCEI

## Dependencies
We use **React Navigation**, the next dependencies are needed (run this commands inside folder proyect):

>`npm install @react-navigation/native` <br>
`npm install react-native-screens react-native-safe-area-context` <br>
`npm install @react-navigation/native-stack` <br>
`npm i react-native-side-drawer` <br>
`npm install @react-native-async-storage/async-storage` <br>
`npm install @react-native-mapbox-gl/maps --save` <br>
`npm i --save react-native-circular-progress react-native-svg` <br>
`react-native link react-native-svg` <br>

For more information visit: https://reactnavigation.org/docs/hello-react-navigation

Also you will need:
- NodeJS installed.
- Java JDK.
- Android Studio.

## How to Run
Run this command inside folder project: <br>

`npx react-native start` <br>

Open the folder *android* on Android Studio, and open the folder project on Visual Studio Code. <br>
Also you should run this command in your path where your have SDK installed (Android/Sdk/platform-tools): <br>

`./adb reverse tcp:8081 tcp:8081` <br>

By doing this, you will get refresh immediately in your cellphone. <br>

Also is recommended to use your cellphone instead simulating one on Android Studio, for that by connecting your cellphone <br>
using USB and enable developer options should be enough. <br>

## Map Implementation Instructions
You need to create a free account on [mapbox.com](https://www.mapbox.com/), create a secret token, remember to save this secret token. <br>


