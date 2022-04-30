import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, Text, TouchableOpacity, Image, ScrollView, Button } from 'react-native';
import { Avatar } from 'react-native-elements';
import { NavigationContext } from '@react-navigation/native';
import MenuDrawer from 'react-native-side-drawer'
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Check if we can have and use runner object inside this.state
// TODO: Try to avoid using margin with magic numbers, figure out how to set the margin based in cellphone resolution.
// TODO: Probably is a good idea to have a table to show the ranking
// TODO: Function getData() is too big... refactorize.

export default class Datos extends Component {
    static contextType = NavigationContext;
    
    constructor(props) {
        super(props);
        this.state = {
            totalRunners : "",
            position : 0,
            distance : 0,
            time : 0,
            code : "",
            name : "",
            campus : "",
            photo : "",
            open: false,
            inRanking: true,
            rankingTable : [], // Will be an array of runners.
            topThree : [],      // First three runners.
        };
    }

    /* Will print in the cellphone basic runner information.*/
    getRunnerInfo = (inRanking) => {
        if(!inRanking) {
            console.log(inRanking);
            return <Text style={styles.TextoP}> Datos del corredor: {this.state.name} {"\n"} Posicion: {this.state.position} | Distancia: {this.state.distance}m | Tiempo: {this.state.time} </Text> ;
        }
        return null;
    }

    /* Will get the data stored in our json using AsyncStorage. */
    getData = async() => {
        // Get the information stored in our data (data information).
        const jsonValue = await AsyncStorage.getItem('data');

        // Parse our json, getting an array, our first position is our code because it has only one element.
        this.setState({code : JSON.parse(jsonValue)[0]});
        console.log("Se obtuvo el codigo del json " + this.state.code);

        // https://www.w3schools.com/xml/xml_http.asp
        var xhttp = new XMLHttpRequest();

        // This variable represent this Datos, by doing this, allows us to use setState.
        var _this = this;
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log("Informacion completa del servidor: " + xhttp.responseText);

                let serverData = xhttp.responseText;
                const INDEX_START_RANKING = 5;    // At this index start our ranking table information.

                // [0] = nombre
                // [1] = codigo
                // [2] = campus
                // [3] = totalRunners
                // [4] = photo
                // Store the data, we don't store our code because we have it already.
                let data = serverData.split(',');
                _this.setState({name : data[0]});
                _this.setState({campus : data[2]});
                _this.setState({totalRunners : data[3]});
                _this.setState({photo: data[4]});

                // Save runner information in our rank table, here we have our full ranking table.
                // TODO: Investigate why 2, it affects the ranking table that is printed in the conole.
                let pos = 1;
                for(let i = INDEX_START_RANKING; i < data.length - 2;)
                {
                    let runner = {
                        position: 0,
                        code: "",
                        distance: 0,
                        time: 0,
                    }

                    // Assign the corresponding values to our runner.
                    runner['position'] = pos++;
                    runner['code'] = data[i++];
                    runner['distance'] = data[i++];
                    runner['time'] = data[i++];
                    _this.state.rankingTable.push(runner);
                    
                    // We found the current runner in our full rank table.
                    if(runner['code'] == _this.state.code) 
                    {
                        _this.setState({position : runner['position']});
                        _this.setState({distance : runner['distance']});
                        _this.setState({time : runner['time']});
                    }
                }
                
                // Save top three runners.
                _this.state.topThree.push(_this.state.rankingTable[0]);
                _this.state.topThree.push(_this.state.rankingTable[1]);
                _this.state.topThree.push(_this.state.rankingTable[2]);
                
                // There is information from our runner that is not in the top three.
                // This will add a new row in our ranking table.
                let last_element = data.length - 1;
                if(data[last_element] != "")
                {
                    // Our runner is not in our ranking.
                    _this.setState({inRanking : false});
                    
                    let runner = {
                        position: 0,
                        code: "",
                        distance: 0,
                        time: 0,
                    }

                    runner['position'] = _this.state.position;
                    runner['code'] = _this.state.code;
                    runner['distance'] = _this.state.distance;
                    runner['time'] = _this.state.time;
                    _this.state.topThree.push(runner);
                }
                
                // Give ranking table information and save every item in our ranking table,
                // this will be used to show in the cellphone.
                const rankingTable_formatted = _this.state.topThree.map((item) =>
                    <Text style={{ fontWeight : "bold" }}>
                        Posicion { item['position'] } : { item['code'] } | Distancia: { item['distance'] }m | 
                        Tiempo: { item['time'] } {"\n"} 
                        -------------------- {"\n"}
                    </Text>
                );

                // I'm pretty sure there is a javascript way to do this, just some log information to debug.
                for(let i = 0; i < _this.state.rankingTable.length; ++i) 
                {
                    console.log("Lugar " + _this.state.rankingTable[i].position + ":" + _this.state.rankingTable[i].code + " | " + 
                                "Distancia:" + _this.state.rankingTable[i].distance + " | " + 
                                "Tiempo: " + _this.state.rankingTable[i].time);
                }

                // At this point our ranking table has a valid format.
                _this.setState({rankingTable : rankingTable_formatted});
                
                // Save the most updated information
                // AsyncStorage.setItem('data', JSON.stringify([data[0], data[1], data[2], data[3], data[4]]));
            }
        }
        xhttp.open("GET", "https://carreracuceipr.000webhostapp.com/Count.php?codigo="+this.state.code, true);
        xhttp.send();
    }

    componentDidMount() {
        this.getData();
    }

    /* Will toggle between the drawerContent and the render function, allows us to close it. */
    toggleOpen = () => {
        this.setState({ open: !this.state.open });
      };

    /* Will draw the content returning how it will looks like; this represents our hamburger menu. */
    drawerContent = () => {
        return (
            <View style={styles.animatedBox}>
                <View style={styles.imgAvatar}>
                    <Avatar
                        size={64}
                        rounded
                        // To avoid a warning about uri is empty string.
                        source={{uri: this.state.photo ? this.state.photo : null}}
                    />
                </View>

                <View>
                    <Text> Nombre del corredor: {this.state.name} </Text>
                    <Text> Codigo: {this.state.code} </Text>
                    <Text> Centro universitario: {this.state.campus} </Text>
                </View>

                <View style={{marginTop: 10}}>
                    <Button title="Cerrar" onPress={this.toggleOpen}></Button>
                </View>
            </View>
        );
    };

    render() {
        const navigation = this.context;

        return (
            <View style={styles.container}>
                <MenuDrawer
                    open={this.state.open}
                    position={'left'}
                    drawerContent={this.drawerContent()}
                    drawerPercentage={60}
                    animationTime={250}
                    overlay={true}
                    opacity={0.4}
                >
                    <ImageBackground style={styles.bg} source={require("./Imagenes/bg_data_window.jpg")}>

                        {/* Will wrap the hamburger icon */}
                        <View style={{marginBottom: 40}}>
                            <TouchableOpacity onPress={this.toggleOpen} style={styles.body}>
                                <Image style={styles.imgHamburger} source={require("./Imagenes/Hamburger_icon.png")} />
                            </TouchableOpacity>
                        </View>

                        {/* Logo for udg pet */}
                        <View>
                            <Image style={styles.logo} source={require("./Imagenes/mascota_udg_logo.png")} />
                        </View>
            
                        {/* Body information showing total number of runners and ranking. */}
                        <View>
                            <Text style={styles.TextoP}> Corredores totales: {this.state.totalRunners} </Text>
                            <Text style={styles.TextoP}> Ranking de Corredores: </Text>
                        </View>
            
                        {/* Scroll box using flex to scroll. */}
                        <View style={{flex : 1}}>
                            <ScrollView>
                                <Text style={styles.textoRanking}> {this.state.rankingTable} </Text>
                            </ScrollView>
                        </View>
            
                        {/* Current runner logged info */}
                        <View>
                            {this.getRunnerInfo(this.state.inRanking)}
                        </View>

                        {/* Button to go to login window */}
                        <View style={styles.btn}>
                            <Button title="Cerrar Sesión" color="#3d71d9" onPress={() => navigation.navigate('Login')}> </Button>
                        </View>
                    </ImageBackground>
                </MenuDrawer>
            </View>
        );
    }
}

// This values are just a little hack, are used to get the correct size for background image.
const win = Dimensions.get('window');
const ratio = win.width / 1080;

const styles = StyleSheet.create({
    // Background image, will fit the image properly depending of the cellphone resolution.
    bg : {
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height
    },

    TextoP: {
        fontSize: 30,
        color: "black",
        textAlign: "center",
    },
    
    textoRanking: {
        color: "black",
        textAlign: "center",
        fontSize: 15,
        marginTop: 15,
    },

    imgAvatar: {
        marginBottom: 3,
        alignItems: "center"
    },

    imgHamburger: {
        width: 40,
        height: 60,
    },

    // Main container, this flex allows us to scroll.
    container: {
        flex: 1,
    },

    animatedBox: {
        flex: 1,
        backgroundColor: "#38C8EC",
        padding: 10
    },

    body: {
        width: 100,
        height: 20,
        alignItems: 'center',
    },
    
    logo:{
        width: 140,
        height: 160,
        marginTop: -50,
        marginLeft: 140        
    },
    
    btn: {
        flex: 1,                 // Allows us to show the button.
        width: 200,
        marginLeft: 107,
        marginTop: -100,         // Accomodate data runner and table ranking, space between them is deleted.
        justifyContent: "center" // Center the button.
    }
})
