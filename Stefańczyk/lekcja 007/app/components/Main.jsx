import React from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'
import { Settings } from './Settings'

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

    registerUser() {
        fetch(
            Settings.address +
            ':' +
            Settings.port +
            `/add?user=${this.state.user}&pass=${this.state.pass}`
        )
            .then(response => response.json())
            .then((data) => {
                if (data.error) {
                    alert(data.error)
                } else {
                    this.props.navigation.navigate('s2')
                }
            })
    }

    render() {
        return (
            <View style={this.style.container}>
                <View style={this.style.title}>
                    <Text style={{fontSize: 64, color: '#FFFFFF'}}>
                        Node Register
                    </Text>
                </View>
                <KeyboardAvoidingView style={this.style.login}>
                    <Text style={{marginBottom: 10}}>Login</Text>
                    <TextInput
                        style={{marginBottom: 10}}
                        onChangeText={(user) => this.setState({user: user})} />
                    <Text style={{marginBottom: 10}}>Password</Text>
                    <TextInput
                        style={{marginBottom: 10}}
                        onChangeText={(pass) => this.setState({pass: pass})} />
                    <MyButton
                        title='Register'
                        color='#FFC107'
                        onpress={this.registerUser.bind(this)}
                    />
                </KeyboardAvoidingView>
            </View>
        )
    }
}
