import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';

export default class Address extends Component {

    constructor() {
        super()
        this.state = {
            latitude: 0,
            longitude: 0,
            error: null,
            Address: null
        }
    }

    async componentDidMount() {
        Geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                Geocoder.from(position.coords.latitude, position.coords.longitude)
                    .then(json => {
                        var addressComponent = json.results[0].address_components;
                        this.setState({
                            Address: addressComponent
                        })
                       
                    })
                    .catch(error => console.warn(error));
            },
            (error) => {

                 this.setState({ error: error.message })
                  
             },
            { enableHighAccuracy: false, timeout: 10000, maximumAge: 100000 }
        );
    }

    render() {
        return (
            <View style={styles.MainContainer}>
                <Text style={styles.text}> Latitude = {this.state.latitude}</Text>
                <Text style={styles.text}> Longitude = {this.state.longitude}</Text>
                <Text style={styles.text}>{this.state.Address}</Text>
                {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f5fcff',
        padding: 11
    },
    text: {
        fontSize: 22,
        color: '#000',
        textAlign: 'center',
        marginBottom: 10
    },
});