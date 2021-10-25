import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import login from '../assets/login.jpg'

export default class Screen1 extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
        this.style = StyleSheet.create({
            container: {
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }
        })
    }

    render() {
        return (
            <View style={this.style.container}>
                <Image source={login} style={{width: 240, height: 240}} />
                <Text>Login: {this.props.route.params.data.user}</Text>
                <Text>Password: {this.props.route.params.data.pass}</Text>
                <Text>Registered: {this.props.route.params.data.date}</Text>
            </View>
        )
    }
}
