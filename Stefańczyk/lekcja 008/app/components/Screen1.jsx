import React from 'react'

import {
    StyleSheet,
    Text,
    View
} from 'react-native'

import * as Font from 'expo-font'
import * as Location from 'expo-location'

import MyButton from './MyButton'

export default class Screen1 extends React.Component {
    constructor(props) {
        super(props)
        this.props = props

        this.state = {
            user: '',
            pass: ''
        }

        this.style = StyleSheet.create({
            container: {
                display: 'flex',
                flex: 1,
                flexDirection: 'column'
            },
            title: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#3F51B5',
            },
            login: {
                flex: 1,
            }
        })
    }

    async setPermissions() {
        const { status } = await  Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            alert('Odmawiam przydzielenia uprawnień do czytania lokalizacji.')
        }
    }

    async componentDidMount() {
        this.setPermissions()
        await Font.loadAsync({
            'vt323': require('../assets/VT323-Regular.ttf')
        })
        this.setState({ fontloaded: true })
    }

    render() {
        return (
            this.state.fontloaded
            ? <View style={this.style.container}>
                <View style={this.style.title}>
                    <Text style={{
                        fontSize: 72,
                        fontFamily: 'vt323',
                        color: '#FFFFFF'
                    }}>
                        Node Geolocation
                    </Text>
                </View>
                <View style={this.style.login}>
                    <MyButton
                        title='Start'
                        color='#FFC107'
                        onpress={() => this.props.navigation.navigate('s2')}
                    ></MyButton>
                </View>
            </View>
            : null
        )
    }
}
