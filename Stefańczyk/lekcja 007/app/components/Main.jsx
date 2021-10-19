import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import MyButton from './MyButton'

export default class Screen1 extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
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
                flex: 1
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
                <View style={this.style.login}>
                    <MyButton
                        title='Register'
                        color='#FFC107'
                        onpress={
                            () => this.props.navigation.navigate(
                                    's2',
                                    {a: 1,b: 2}
                                )
                            }
                    />
                </View>
            </View>
        )
    }
}
