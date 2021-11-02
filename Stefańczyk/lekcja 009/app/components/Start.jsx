import React from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text
} from 'react-native'

export default class Start extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
        this.style = StyleSheet.create({
            container: {
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#303F9F'
            },
            text: {
                fontSize: 24,
                color: '#FFFFFF'
            },
            button: {
                fontSize: 64,
                fontWeight: 'bold',
                color: '#FFFFFF'
            }
        })
    }

    render() {
        return (
            <View style={this.style.container}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('s2')}>
                    <Text style={this.style.button}>Camera App</Text>
                </TouchableOpacity>
                <Text style={this.style.text}>Show pictures from gallery</Text>
                <Text style={this.style.text}>Take a picture from camera</Text>
                <Text style={this.style.text}>Save photos to device</Text>
                <Text style={this.style.text}>Delete photos from device</Text>
                <Text style={this.style.text}>Share pictures</Text>
            </View>
        )
    }
}
