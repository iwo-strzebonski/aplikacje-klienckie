import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

import MyButton from './MyButton'

export default class ListItem extends React.Component {
    constructor(props) {
        super(props)
    
        this.props = props
        this.style = StyleSheet.create({
            container: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center'
            },
            text: {
                textAlign: 'center',
            }
        })
    }

    render() {
        return (
            <View style={this.style.container}>
            </View>
        )
    }
}
